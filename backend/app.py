from chalice import Chalice
import boto3
from botocore.exceptions import ClientError
import os

app = Chalice(app_name='backend')


@app.route('/')
def index():
    return {'hello': 'world'}


SENDER = os.environ['SENDER']
RECIPIENT = os.environ['RECIPIENT']
SECRET_KEY = os.environ['SECRET_KEY']

CHARSET = "UTF-8"

@app.route('/users', methods=['POST'], cors=True)
def create_user():
    user_as_json = app.current_request.json_body

    email = app.current_request.json_body['email']

    name = app.current_request.json_body['name']

    message = app.current_request.json_body['message']

    body = ("Nombre: {} \r\n"
               "Correo: {} \r\n"
               "Mensaje: {}").format(name, email, message)

    print(body)

    client = boto3.client('ses')
    
    response = client.send_email(
        Destination={
            'ToAddresses': [
                RECIPIENT,
            ],
        },
        Message={
            'Body': {
                'Text': {
                    'Charset': CHARSET,
                    'Data': body,
                },
            },
            'Subject': {
                'Charset': CHARSET,
                'Data': "Contacto para informes.",
            },
        },
        Source=SENDER,
    )


    return {'message': "Success"}


# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#

#
