import { Resend } from "resend";

export async function sendVerificationEmail(email, verificationToken) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Creating the email verification link
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  // Sending the verification email
  const { error } = await resend.emails.send({
    from: "ELVA <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email address",
    html: `
      <h2>Welcome to ELVA</h2>
      <p>Please verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}
