import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";
export const GET = async (request, { params: { index } }) => {
  try {
    console.log(index);

    // Consultar la base de datos
    const consultaActualizacionPerfil = `SELECT contenido FROM options as opt WHERE id_option = ?;`;
    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil,
      [Number(index)]
    );

    // Crear y enviar la respuesta
    const response = new NextResponse(JSON.stringify(actualizacionPerfil));
    return response;
  } catch (error) {
    // Manejar errores
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};

export const PUT = async (request, { params: { index } }) => {
  try {
    const { description } = await request.json();
    console.log(index);
    console.log(description);
    const consultaActualizacionPerfil = `UPDATE options AS opt SET opt.contenido = ? WHERE id_option = ?;`;
    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil,
      [description.replace(/<.*?>/g, ""), Number(index)]
    );
    console.log(actualizacionPerfil);
    const response = new NextResponse(
      JSON.stringify({ contenido: description })
    );
    return response;
  } catch (error) {
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
