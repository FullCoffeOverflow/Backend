import { IEmail, enviaEmail } from "../utils/Emailer"

describe('Emailer Configurations', () => {
  it('Testing integration with SendGrid', async () => {
    const email: IEmail = {
        to: "adrissonsamersla@gmail.com",
        from: "test@fco.com.br",
        subject: "Test FCO",
        content: "Testing integration with SendGrid - " + Date()
    }

    await enviaEmail(email)
  });
});