import nodemailer from "nodemailer";
import path from "path";

/**
 * Gera o template HTML do e-mail com os dados do briefing.
 * A função mapeia os campos para nomes amigáveis e trata os campos dinâmicos.
 */
function generateEmailTemplate(data) {
  // Mapeamento dos campos para rótulos amigáveis
  const fieldMapping = {
    companyName: "Nome da Empresa",
    tagline: "Tagline do Logotipo",
    slogan: "Slogan",
    role: "Função dentro da Empresa",
    marketView: "Como você enxerga o mercado regional",
    projectReasons: "Principais Motivos para Construir o Projeto",
    brandRelation: "Relação Especial com a Marca",
    brandMeaning: "Significado do Nome da Marca",
    founded: "Ano de Fundação",
    offerings: "O que a Empresa Oferece",
    keywords: "Palavras-chave da Empresa",
    consumerProfile: "Perfil do Consumidor Final",
    mainProduct: "Produto ou Serviço Mais Forte",
    idealCustomer: "Cliente Ideal",
    customerDoubts: "Principais Dúvidas e Dores do Cliente",
    companyWeakness: "Aspectos onde a Empresa Perde para os Concorrentes",
    brandApplication: "Onde Gostaria de Ver a Marca Aplicada",
    competitors: "Principais Concorrentes",
    strongestCompetitor: "Concorrente Mais Forte",
    differential: "Diferencial que Destaca a Empresa",
    gender: "Gênero Predominante do Público-Alvo",
    ageRange: "Faixa Etária do Público-Alvo",
    targetType: "Tipo de Público-Alvo",
    reach: "Abrangência da Empresa",
    brandCharacteristics: "Três Principais Características da Marca",
    nonBrandCharacteristics: "Características que Não Têm Relação com a Marca",
    typography: "Typography (Tipografia)",
    primaryPalette: "Paleta de Cores Proposta – Primária",
    secondaryPalette: "Paleta de Cores Proposta – Secundária",
    colorPsychology: "Psicologia das Cores",
    concept: "Concept (Conceito)",
    sensations: "Sensações Transmitidas",
    graphicElements: "Elementos Gráficos",
    brandStructure: "Estrutura da Marca",
  };

  let htmlMessage = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Briefing da ${data.companyName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border: 1px solid #ddd; }
          .header { background: #00272C; padding: 20px; text-align: center; }
          .header img { max-width: 150px; }
          .content { padding: 20px; }
          h2 { color: #00272C; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; border: 1px solid #ddd; text-align: left; vertical-align: top; }
          .section-title { background: #eee; text-align: center; font-weight: bold; }
          .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="cid:logo2@cid" alt="Soma Logo" />
          </div>
          <div class="content">
            <h2>Detalhes do Briefing</h2>
            <table>
              <thead>
                <tr>
                  <th>Pergunta</th>
                  <th>Resposta</th>
                </tr>
              </thead>
              <tbody>
  `;

  // Adiciona os campos mapeados
  for (const key in fieldMapping) {
    if (data[key] && data[key].toString().trim() !== "") {
      htmlMessage += `<tr><td>${fieldMapping[key]}</td><td>${data[key]}</td></tr>`;
    }
  }

  // Campos dinâmicos: Metas
  if (data.metas && Array.isArray(data.metas)) {
    const metasFiltradas = data.metas.filter((m) => m && m.trim() !== "");
    if (metasFiltradas.length > 0) {
      htmlMessage += `<tr><td>Metas Alcançáveis</td><td>${metasFiltradas.join("<br/>")}</td></tr>`;
    }
  }

  // Campos dinâmicos: Valores (Missão, Visão e Valores)
  if (data.valores && Array.isArray(data.valores)) {
    const valoresFormatados = data.valores
      .filter((item) => item.value && item.value.toString().trim() !== "")
      .map((item) => `${item.placeholder}: ${item.value}`)
      .join("<br/>");
    if (valoresFormatados) {
      htmlMessage += `<tr><td>Missão, Visão e Valores</td><td>${valoresFormatados}</td></tr>`;
    }
  }

  // Campos dinâmicos: Canais de Comunicação
  if (data.channels && Array.isArray(data.channels) && data.channels.length > 0) {
    htmlMessage += `<tr><td>Canais de Comunicação</td><td>${data.channels.join(", ")}</td></tr>`;
  }

  // Seção para a Escala de Características da Marca (Step 7)
  const characteristics = [
    "Sério",
    "Divertido",
    "Básico",
    "Complexo",
    "Vibrante",
    "Neutro",
    "Moderno",
    "Tradicional",
    "Elegante",
    "Popular",
    "Digital",
    "Físico",
    "Conservador",
    "Ousado",
    "Masculino",
    "Feminino",
    "Leve",
    "Robusto",
    "Empresarial",
    "Humano",
  ];
  let escalaExiste = false;
  let escalaRows = "";
  characteristics.forEach((char) => {
    const keyName = char.toLowerCase().replace(/\s/g, "");
    if (data[keyName]) {
      escalaExiste = true;
      escalaRows += `<tr><td>${char}</td><td>${data[keyName]}</td></tr>`;
    }
  });
  if (escalaExiste) {
    htmlMessage += `
      <tr>
        <td colspan="2" class="section-title">Escala de Características da Marca</td>
      </tr>
      ${escalaRows}
    `;
  }

  htmlMessage += `
              </tbody>
            </table>
          </div>
          <div class="footer">
            <p>Enviado pelo sistema Soma</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return htmlMessage;
}

/**
 * Envia o e-mail do briefing utilizando nodemailer.
 */
export async function sendBriefingEmail(data) {
  const htmlMessage = generateEmailTemplate(data);
  const subject = `Briefing da ${data.companyName}`;
  const logoPath = path.join(process.cwd(), "public", "images", "logo2.svg");

  // Cria o transporte do e-mail utilizando Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verifica a configuração do transporte
  await transporter.verify();

  // Envia o e-mail com o template HTML e o anexo inline da logo
  await transporter.sendMail({
    from: `"Briefing" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject,
    html: htmlMessage,
    attachments: [
      {
        filename: "logo2.svg",
        path: logoPath,
        cid: "logo2@cid",
      },
    ],
  });
}
