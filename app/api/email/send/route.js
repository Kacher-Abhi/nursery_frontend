// import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from "resend";
import { NextResponse } from "next/server";
import YelpRecentLoginEmail from "@/components/Email/email-template";

export async function POST(request) {
    const res = await request.json();
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: res.email,
      subject: "Hello world",
      react: YelpRecentLoginEmail({ firstName: 'John' }),
    });

    return NextResponse.json({ data });
    // return Response.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
