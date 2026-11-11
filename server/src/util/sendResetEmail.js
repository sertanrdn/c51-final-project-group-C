import { Resend } from "resend";

export async function sendResetEmail(email, resetToken) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const { error } = await resend.emails.send({
    from: "ELVA <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `
      <p>Please reset your password: <a href="${resetLink}">${resetLink}</a></p>
    `,
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
}
