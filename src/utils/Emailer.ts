import sgMail from '@sendgrid/mail';

import { ClientResponse } from '@sendgrid/client/src/response';

type EmailResponse = ClientResponse;

import configs from '../config/Config';

sgMail.setApiKey(configs.SENDGRID_KEY);

type Email = {
    to: string;
    from: string;
    subject: string;
    content: string;
};

const enviaEmail = async (email: Email): Promise<number> => {
    const msg = {
        to: email.to,
        from: email.from,
        subject: email.subject,
        text: email.content,
        html: '<strong>' + email.content + '<strong>',
    };

    try {
        console.log('Sending an email to ' + msg.to + ' ...');
        const response = await sgMail.send(msg);
        const statusCode = response[0].statusCode;
        console.log('Response from SendGrid: ' + response[0].statusMessage);
        return statusCode;
    } catch (err) {
        console.log('Error while sending an email!');

        throw err;
    }
};

export { Email, EmailResponse, enviaEmail };
