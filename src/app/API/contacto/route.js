import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";

export const GET = async (request) => {
  try {
    const consultaActualizacionPerfil = `SELECT id_option, contenido FROM options as opt WHERE opt.id_interfaz = 4;`;
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
    const { nuevoValor } = await request.json();
    console.log(nuevoValor);
    const consultaActualizacionPerfil = `UPDATE options AS opt SET opt.contenido = ? WHERE id_option = ?;`;
    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil,
      [nuevoValor.contenido, nuevoValor.id_option]
    );

    const response = new NextResponse(JSON.stringify(actualizacionPerfil));
    return response;
  } catch (error) {
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
