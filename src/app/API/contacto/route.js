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

    const consultaActualizacionPerfil = `SELECT contenido FROM options as opt WHERE opt.id_interfaz = 2;`;
    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil
    );

    console.log(actualizacionPerfil);

    const response = new NextResponse(JSON.stringify(actualizacionPerfil));
    return response;
  } catch (error) {
    // Manejar errores
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};

export const PUT = async (request) => {
  try {
    const { description } = await request.json();
    console.log(description);
    const consultaActualizacionPerfil = `UPDATE options AS opt SET opt.contenido = ? WHERE id_interfaz = 2;`;
    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil,
      [description]
    );

    const response = new NextResponse(JSON.stringify(description));
    return response;
  } catch (error) {
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
