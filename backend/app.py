from chalice import Chalice
import boto3
from botocore.exceptions import ClientError
import os
import urllib.request
import urllib.parse

app = Chalice(app_name='backend')

SENDER = os.environ['SENDER']
RECIPIENT = os.environ['RECIPIENT']
SECRET_KEY = os.environ['SECRET_KEY']

CHARSET = "UTF-8"

@app.route('/users', methods=['POST'], cors=True)
def create_user():
    user_as_json = app.current_request.json_body

    print(user_as_json)

    email = app.current_request.json_body['email']

    name = app.current_request.json_body['name']

    message = app.current_request.json_body['message']

    body = ("Nombre: {} \r\n"
               "Correo: {} \r\n"
               "Mensaje: {}").format(name, email, message)

    recaptchaResponse = app.current_request.json_body['recaptchaResponse']
    private_recaptcha = SECRET_KEY
    
    url = 'https://www.google.com/recaptcha/api/siteverify'
    
    
    params = urllib.urlencode({
            'secret': private_recaptcha,
            'response': recaptchaResponse
        })
    
    data = urllib.urlopen(url, params).read()
    result = json.loads(data)
    success = result.get('success', None)
    message = "Failure"
    if success:
    
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
        
        message = "Success"


    return {'message': message}
