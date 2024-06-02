import { cmsConexion, informacionPais as venezuela } from "@/db/database.js";
import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async () => {
  try {
    const datosUsuario = `
    SELECT id_persona, cedula, correo_electronico, clave from personas;
    `;

    const consultarPais = `
    SELECT DISTINCT est.estado, cd.capital, cd.ciudad, muni.municipio, parr.parroquia
    FROM ciudades as cd, estados as est, municipios as muni, parroquias as parr
    WHERE est.id_estado = cd.id_estado
    AND muni.id_municipio = parr.id_municipio
    ORDER BY RAND()
    LIMIT 23;
    `;

    const [respuestaPersona, respuestaPais] = await Promise.all([
      cmsConexion.query(datosUsuario),
      venezuela.query(consultarPais),
    ]);

    console.log(respuestaPersona);
    console.log(respuestaPais);

    return NextResponse.json({
      personas: respuestaPersona,
      paises: respuestaPais,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      error: "Ocurrió un error al procesar la solicitud.",
    });
  }
};

export const POST = async (request, response) => {
  try {
    const { correo, clave } = await request.json();
    console.log(correo, clave);

    const datosUsuario = `
      SELECT id_persona, nombre, correo_electronico, clave 
      FROM personas
      WHERE correo_electronico = ? AND clave = ?;
    `;

    const respuestaUsuario = await cmsConexion.query(datosUsuario, [
      correo,
      clave,
    ]);

    console.log(correo, clave);
    console.log(respuestaUsuario);
    // Retornar la respuesta al cliente
    return NextResponse.json({
      respuestaUsuario,
    });
  } catch (error) {
    console.error("Error al registrar la persona:", error);
    // Retornar un error al cliente si ocurre una excepción
    return NextResponse.status(500).json({
      error: "Error interno del servidor",
    });
  }
};
