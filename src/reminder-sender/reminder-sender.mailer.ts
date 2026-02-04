export type SendResult = { success: true } | { success: false; error: string };

export async function sendEmail(
  to: string,
  subject: string,
  body: string,
): Promise<SendResult> {
  // 🔴 TEMP: mock sender
  console.log('📧 Sending email to:', to);
  console.log(body);

  // simulate success
  return { success: true };

  // later:
  // integrate SES / SMTP / Resend
}
