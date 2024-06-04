import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Verificar el método HTTP
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: `Method ${req.method} Not Allowed` },
        { status: 405 }
      );
    }

    // Parsear el cuerpo de la solicitud
    const { correoElectronico, subject, text } = await req.json();

    // Verificar si se recibió el correo electrónico
    if (!correoElectronico) {
      return NextResponse.json(
        { message: "Falta el correo electrónico" },
        { status: 400 }
      );
    }

    // Crear el transporte de Nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: process.env.OAUTH_ACCESS_TOKEN,
      },
    });

    // Configuración del correo electrónico
    let optionsEmail = {
      from: process.env.MAIL_USERNAME,
      to: correoElectronico,
      subject: subject || "Hola",
      text: text || "Hola",
    };

    // Enviar el correo electrónico
    await transporter.sendMail(optionsEmail);
    console.log("Email enviado");
    return NextResponse.json(
      { message: "Correo enviado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error enviando email", error.message);
    return NextResponse.json(
      { message: "Error al enviar el correo", error: error.message },
      { status: 500 }
    );
  }
}
