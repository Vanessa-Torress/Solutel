import nodemailer from "nodemailer";

export interface EmailData {
  type: string;
  nome: string;
  email: string;
  telefone?: string;
  area?: string;
  vaga?: string;
  mensagem?: string;
  attachment?: {
    filename: string;
    content: Buffer;
  };
}

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendFormEmail(data: EmailData) {
    let subject = "";
    if (data.type === "currículo") {
      subject = `[Currículo] - ${data.vaga || data.area} - ${data.nome}`;
    } else if (data.type === "orçamento") {
      subject = `[Orçamento] - ${data.nome}`;
    } else {
      subject = `Novo Contato de ${data.nome}`;
    }

    const emailBody = `
      Novo formulário recebido via site:
      
      Tipo: ${data.type.toUpperCase()}
      Nome: ${data.nome}
      E-mail: ${data.email}
      Telefone: ${data.telefone || "N/A"}
      ${data.vaga ? `Vaga Desejada: ${data.vaga}` : ""}
      ${data.area ? `Área de Interesse: ${data.area}` : ""}
      
      Mensagem:
      ${data.mensagem || "Sem mensagem adicional."}
    `;

    const mailOptions: any = {
      from: process.env.SENDER_EMAIL,
      to: process.env.TARGET_EMAIL,
      replyTo: data.email,
      subject: subject,
      text: emailBody,
    };

    if (data.attachment) {
      mailOptions.attachments = [data.attachment];
    }

    return await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
