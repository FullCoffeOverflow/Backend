import sgMail from "@sendgrid/mail"

import configs from "../config/Config"

sgMail.setApiKey(configs.SENDGRID_KEY);

interface IEmail {
    to: string,
    from: string,
    subject: string,
    content: string
}

const enviaEmail = async (email: IEmail) => {

    const msg = {
        to: email.to,
        from: email.from,
        subject: email.subject,
        text: email.content,
        html: '<strong>' + email.content + '<strong>'
    }

    try {
        console.log('Sending an email to ' + email.to + ' ...')
        const response = await sgMail.send(msg);
        console.log('Response from SendGrid: ' + response[0].statusMessage)
    } catch (err) {
        console.log('Error while sending an email!')
        throw err
    }
}

export {
    IEmail,
    enviaEmail
}
