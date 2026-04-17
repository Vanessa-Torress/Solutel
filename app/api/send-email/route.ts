import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/services/emailService";

// In-Memory Rate Limit (Aviso: Em Serverless, zera a cada cold start, mas ainda mitiga spams instantâneos)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 3; // MAX 3 emails
const RATE_LIMIT_WINDOW = 60 * 1000 * 60; // 1 Hora

export async function POST(req: NextRequest) {
  try {
    // Basic Rate Limiting by IP
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    
    if (ip !== "unknown") {
      const userLimit = rateLimit.get(ip) || { count: 0, lastReset: now };
      
      if (now - userLimit.lastReset > RATE_LIMIT_WINDOW) {
        userLimit.count = 1;
        userLimit.lastReset = now;
      } else {
        userLimit.count++;
      }
      
      rateLimit.set(ip, userLimit);
      
      if (userLimit.count > RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Muitas requisições. Tente novamente mais tarde." },
          { status: 429 }
        );
      }
    }

    const formData = await req.formData();
    
    const type = formData.get("type") as string;
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const area = formData.get("area") as string;
    const vaga = formData.get("vaga") as string;
    const mensagem = formData.get("mensagem") as string;
    const curriculo = formData.get("curriculo") as File | null;

    if (!nome || !email || !type) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    let attachment = undefined;
    if (curriculo) {
      if (curriculo.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Arquivo muito grande. O limite máximo é 5MB." },
          { status: 400 }
        );
      }

      const arrayBuffer = await curriculo.arrayBuffer();
      attachment = {
        filename: curriculo.name,
        content: Buffer.from(arrayBuffer),
      };
    }

    await emailService.sendFormEmail({
      type,
      nome,
      email,
      telefone,
      area,
      vaga,
      mensagem,
      attachment,
    });

    return NextResponse.json({ success: true, message: "E-mail enviado com sucesso!" });

  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Erro interno ao disparar o e-mail." },
      { status: 500 }
    );
  }
}
