import * as nodemailer from 'nodemailer';

export type SendResult = { success: true } | { success: false; error: string };

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);

  if (!host || !port) {
    throw new Error('SMTP env vars not loaded');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * TODO: have better modulation and structure to send email. fine for mvp
 * @param to
 * @param subject
 * @param body
 * @returns
 */
export async function sendEmail(
  to: string,
  subject: string,
  body: string,
): Promise<SendResult> {
  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text: body,
    });

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message ?? 'Email send failed',
    };
  }
}
