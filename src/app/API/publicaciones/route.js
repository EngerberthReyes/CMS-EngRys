import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";
import { hash, compare } from "bcryptjs";

export const POST = async (request) => {
  try {
    const postEnviado = await request.json();
    console.log(postEnviado);
    const cookieValue = request.cookies.get("cookieInformacion").value;
    console.log(cookieValue);

    const verificacionCookie = verify(cookieValue, "secret");
    console.log(verificacionCookie);

    if (!cookieValue) {
      throw new Error(
        "La cookie 'cookieInformacion' no se encontró en la solicitud."
      );
    }

    const consultaActualizacionPerfil = `SELECT id_persona FROM personas AS p WHERE id_persona = ?;`;
    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil,
      [verificacionCookie.idPersona]
    );

    const idPersona = actualizacionPerfil[0].id_persona;
    console.log(idPersona);

    return NextResponse.json(postEnviado);
  } catch (error) {
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
