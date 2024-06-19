import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { cmsConexion } from "@/db/database";
import { hash, compare } from "bcryptjs";

export const GET = async () => {
  try {
    const { nombre, asunto, mensaje, correo, telefono } = await request.json();
    console.log(nombre, asunto, mensaje, correo, telefono);
  } catch (error) {
    NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
};
export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: `Method ${req.method} Not Allowed` },
        { status: 405 }
      );
    }

    const { nombre, asunto, mensaje, correo, telefono } = await req.json();
    const datosUsuario = `
      SELECT id_persona, nombre, correo_electronico, clave 
      FROM personas
      WHERE correo_electronico = ?;
    `;

    const respuestaUsuario = await cmsConexion.query(datosUsuario, [correo]);

    console.log(respuestaUsuario);

    const resultadoFiltrado = respuestaUsuario.filter((itemsUsuarioBd) => {
      return itemsUsuarioBd.correo_electronico === correo;
    });

    console.log(resultadoFiltrado);

    if (respuestaUsuario.length === 0) {
      return NextResponse.json({ resultadoFiltrado });
    }

    if (!correo) {
      return NextResponse.json(
        { message: "Falta el correo electrónico" },
        { status: 400 }
      );
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN, //Hay que Irlo Actualizando
        accessToken: process.env.OAUTH_ACCESS_TOKEN, // Hay que Irlo Actualizando
      },
    });

    // Configuración del correo electrónico
    let optionsEmail = {
      from: `${correo}`,
      to: "engerberthr73@gmail.com",
      bcc: process.env.MAIL_USERNAME,
      subject: `Mensaje de Contacto Para EpíComputers: ${asunto}`,
      text: `Nombre y Apellido: ${nombre}\n\nMensaje: ${mensaje}\n\nTeléfono: ${telefono}`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(optionsEmail);
    console.log("Email enviado");
    return NextResponse.json({ resultadoFiltrado }, { status: 200 });
  } catch (error) {
    console.error("Error enviando email", error.message);
    return NextResponse.json(
      { message: "Error al enviar el correo", error: error.message },
      { status: 500 }
    );
  }
}
