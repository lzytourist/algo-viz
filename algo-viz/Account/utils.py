from datetime import datetime
from random import randrange
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from .models import AccountVerification


def send_verification_email(user, verification_token=None):
    token = randrange(10000, 99999)
    message_body = render_to_string(
        template_name='emails/activation.html',
        context={
            'token': token,
            'user': user
        }
    )

    email = EmailMessage(
        subject='Account Verification - Algo Viz',
        body=message_body,
        from_email='no-reply@algo-viz.app',
        to=(user.email,)
    )
    email.content_subtype = 'html'
    email.send()

    if not verification_token:
        AccountVerification.objects.create(
            user_id=user.id,
            token=token,
            sent_at=datetime.now()
        )
    else:
        verification_token.token = token
        verification_token.sent_at = datetime.now()
        verification_token.save()
