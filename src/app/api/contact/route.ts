import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, timestamp } = body;

    // Basic server-side validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    // Send email using Resend
    // Important: Until your domain is verified on Resend, you can only send to yourself
    // and must use 'onboarding@resend.dev' as the from address.
    // Once verified, you can use 'contact@andreashilgers.de' etc.
    const { data, error } = await resend.emails.send({
      from: 'Andreas Hilgers Portfolio <onboarding@resend.dev>',
      to: 'andreas_hilgers@icloud.com',
      replyTo: email,
      subject: `Portfolio Kontaktanfrage: ${name || email}`,
      text: `
Name: ${name}
Email: ${email}
Telefon: ${phone || 'Nicht angegeben'}
Firma: ${company || 'Nicht angegeben'}
Zeitpunkt: ${timestamp}

Nachricht:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
