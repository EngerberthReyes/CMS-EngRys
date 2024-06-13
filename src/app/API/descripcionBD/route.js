import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";



export const GET = async (request) => {
  try {

    const cookieValue = request.cookies.get("cookieInformacion").value;
    console.log(cookieValue);

    const verificacionCookie = verify(cookieValue, "secret");
    console.log(verificacionCookie);

    if (!cookieValue) {
      throw new Error(
        "La cookie 'cookieInformacion' no se encontró en la solicitud."
      );
    }

      const consultaActualizacionPerfil = `SELECT p.descripcion_personal FROM personas as p WHERE id_persona = ?;`;
      const actualizacionPerfil = await cmsConexion.query(
        consultaActualizacionPerfil,
        [
          verificacionCookie.idPersona,
        ]
      );

      console.log(actualizacionPerfil)

    const response = new NextResponse(JSON.stringify(actualizacionPerfil[0]));
    return response;
  } catch (error) {
    // Manejar errores
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
