// route.js
import { NextResponse } from "next/server";
import { sendBriefingEmail } from "@/utils/emailService"; // Ajuste o caminho de importação conforme a sua estrutura

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const data = await request.json();

    // Validação básica: o nome da empresa é obrigatório
    if (!data.companyName || data.companyName.trim() === "") {
      return NextResponse.json(
        { message: "O nome da empresa é obrigatório." },
        { status: 400 }
      );
    }

    // Outras validações e sanitizações podem ser adicionadas aqui, se necessário

    await sendBriefingEmail(data);

    return NextResponse.json({ message: "Email enviado com sucesso" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { message: "Erro ao enviar email. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
