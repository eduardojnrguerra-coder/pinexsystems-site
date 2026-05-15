import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  name: string;
  businessName: string;
  phone: string;
  email?: string;
  industry?: string;
  biggestProblem: string;
  systemNeeded?: string;
  preferredContact?: string;
  lead_offer?: string;
  source?: string;
  demo_slug?: string;
  industry_slug?: string;
  lead_intent?: string;
  calculator_results?: string | Record<string, unknown>;
}

const requiredFields = [
  "name",
  "businessName",
  "phone",
  "biggestProblem",
] as const;

function valueOrFallback(value: string | undefined, fallback: string) {
  return value?.trim() ? value : fallback;
}

function buildEmailHtml(body: ContactBody): string {
  const calculatorResults =
    typeof body.calculator_results === "string"
      ? body.calculator_results
      : body.calculator_results
        ? JSON.stringify(body.calculator_results, null, 2)
        : undefined;

  const rows = [
    ["Name", body.name],
    ["Business Name", body.businessName],
    ["Phone / WhatsApp", body.phone],
    ["Email Address", valueOrFallback(body.email, "Not supplied")],
    ["Industry", valueOrFallback(body.industry, "Not supplied")],
    ["Biggest Operational Problem", body.biggestProblem],
    ["System Needed", valueOrFallback(body.systemNeeded, "Free audit ideas requested")],
    ["Preferred Contact Method", valueOrFallback(body.preferredContact, "WhatsApp")],
    ["Lead Offer", valueOrFallback(body.lead_offer, "General contact form")],
    ["Source", valueOrFallback(body.source, "Website contact form")],
    ["Demo Slug", valueOrFallback(body.demo_slug, "Not supplied")],
    ["Industry Slug", valueOrFallback(body.industry_slug, "Not supplied")],
    ["Lead Intent", valueOrFallback(body.lead_intent, "Not supplied")],
    ["Calculator Results", valueOrFallback(calculatorResults, "Not supplied")],
  ];

  const trs = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;white-space:nowrap;vertical-align:top;color:#1e293b">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#334155">${value}</td></tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table style="max-width:600px;margin:24px auto;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
    <tr><td style="padding:20px 24px;background:#0f172a;color:#fff;font-size:18px;font-weight:700">New Lead - Pine X Systems</td></tr>
    <tr><td style="padding:0">
      <table style="width:100%;border-collapse:collapse">${trs}</table>
    </td></tr>
    <tr><td style="padding:12px 24px;background:#f8fafc;color:#64748b;font-size:12px">Submitted ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })}</td></tr>
  </table>
</body></html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    for (const field of requiredFields) {
      if (!body[field]?.trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!toEmail || !fromEmail || !smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error("Missing email env vars:", {
        hasTo: !!toEmail,
        hasFrom: !!fromEmail,
        hasHost: !!smtpHost,
        hasPort: !!smtpPort,
        hasUser: !!smtpUser,
        hasPass: !!smtpPass,
      });
      return NextResponse.json(
        { error: "Email provider not configured. Please set SMTP environment variables." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Pine X Systems Contact" <${fromEmail}>`,
      to: toEmail,
      replyTo: body.email?.trim() || undefined,
      subject: `New lead from ${body.name} - ${body.businessName}`,
      text: [
        "New lead from the contact form:",
        "",
        `Name: ${body.name}`,
        `Business name: ${body.businessName}`,
        `Phone / WhatsApp: ${body.phone}`,
        `Email: ${valueOrFallback(body.email, "Not supplied")}`,
        `Industry: ${valueOrFallback(body.industry, "Not supplied")}`,
        `Biggest problem: ${body.biggestProblem}`,
        `System needed: ${valueOrFallback(body.systemNeeded, "Free audit ideas requested")}`,
        `Preferred contact: ${valueOrFallback(body.preferredContact, "WhatsApp")}`,
        `Lead offer: ${valueOrFallback(body.lead_offer, "General contact form")}`,
        `Source: ${valueOrFallback(body.source, "Website contact form")}`,
        `Demo slug: ${valueOrFallback(body.demo_slug, "Not supplied")}`,
        `Industry slug: ${valueOrFallback(body.industry_slug, "Not supplied")}`,
        `Lead intent: ${valueOrFallback(body.lead_intent, "Not supplied")}`,
        `Calculator results: ${
          typeof body.calculator_results === "string"
            ? body.calculator_results
            : body.calculator_results
              ? JSON.stringify(body.calculator_results, null, 2)
              : "Not supplied"
        }`,
      ].join("\n"),
      html: buildEmailHtml(body),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or contact us directly." },
      { status: 500 },
    );
  }
}
