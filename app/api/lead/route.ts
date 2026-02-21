import { NextResponse } from "next/server";

const requiredFields = [
  "name",
  "company",
  "segment",
  "volume",
  "whatsapp",
  "email"
] as const;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const missing = requiredFields.filter((field) => {
      const value = String(body?.[field] ?? "").trim();
      return value.length === 0;
    });

    if (missing.length > 0) {
      return NextResponse.json(
        {
          error: "Campos obrigatorios ausentes.",
          fields: missing
        },
        { status: 400 }
      );
    }

    if (!emailRegex.test(String(body.email))) {
      return NextResponse.json(
        { error: "E-mail invalido." },
        { status: 400 }
      );
    }

    if (String(body.whatsapp).replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        { error: "WhatsApp invalido." },
        { status: 400 }
      );
    }

    const payload = {
      name: String(body.name).trim(),
      company: String(body.company).trim(),
      segment: String(body.segment).trim(),
      volume: String(body.volume).trim(),
      whatsapp: String(body.whatsapp).trim(),
      email: String(body.email).trim(),
      source: "disparohq-lp",
      createdAt: new Date().toISOString()
    };

    const webhookUrl = process.env.WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!webhookResponse.ok) {
        return NextResponse.json(
          { error: "Falha ao enviar para webhook." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar a solicitacao." },
      { status: 500 }
    );
  }
}