import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { cmsConexion } from "@/db/database";

export const GET = async () => {
  try {
    const { correo, clave } = await request.json();
    console.log(correo, clave);
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

    const { correoElectronico, codigo } = await req.json();
    const datosUsuario = `
      SELECT id_persona, nombre, correo_electronico, clave 
      FROM personas
      WHERE correo_electronico = ?;
    `;

    const respuestaUsuario = await cmsConexion.query(datosUsuario, [
      correoElectronico,
    ]);

    console.log(respuestaUsuario);

    const resultadoFiltrado = respuestaUsuario.filter((itemsUsuarioBd) => {
      return itemsUsuarioBd.correo_electronico === correoElectronico;
    });

    console.log(resultadoFiltrado);

    if (respuestaUsuario.length === 0) {
      return NextResponse.json({ resultadoFiltrado });
    }

    console.log(codigo);
    if (!correoElectronico) {
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
      from: process.env.MAIL_USERNAME,
      to: correoElectronico,
      bcc: process.env.MAIL_USERNAME,
      subject: "Recuperar Contraseña - EpíComputers",
      text: `Este es un Mensaje de Recuperación Para su Contraseña: ${codigo}`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(optionsEmail);
    console.log("Email enviado");
    return NextResponse.json(
      { resultadoFiltrado },
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

export const PUT = async (req) => {
  try {
    const { nuevaClave } = await req.json
    const claveActualizar = `
    UPDATE personas
    SET clave = ?
    WHERE correo_electronico = ?;
  `;
  
  const claveHash = await hash(nuevaClave)
  
  const restablecerClave = await cmsConexion.query(claveActualizar, [
    claveHash, 
    correoElectronico
  ]);
  } catch (error) {
console.log(error)
  }

}
