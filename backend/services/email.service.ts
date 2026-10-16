import { mailer, user } from "../utils/config.mail";

export async function sendVerificationEmail(email: string, code: number) {
    await mailer.sendMail({
        from: user,
        to: email,
        subject: 'Boas vindas ao Devoday!',
        html: `
            <h1>Boas vindas!</h1>
            <p>Seu código de verificação é ${code}.</p>

			<span>Se não foi você que solicitou, ignore este email</span>
        `,
    });
}
