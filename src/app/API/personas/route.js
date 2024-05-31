import { conexion } from "@/db/database.js";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    consulta = `
    SELECT * from direcciones;
    `;

    const respuesta = await conexion.query(consulta);

    console.log(respuesta);

    return NextResponse.json({
      mensaje: "GOD",
    });
  } catch (error) {}
};

export const POST = async (request) => {
  try {
    const {
      nombres,
      apellido,
      cedula,
      sexo,
      nacimiento,
      direccion,
      pais,
      estado,
      ciudad,
      municipio,
      parroquia,
      codigo,
      facebook,
      instagram,
      x,
      tiktok,
      sitio_web,
      correo,
      clave,
      repetirClave,
    } = await request.json();

    console.log(
      nombres,
      apellido,
      cedula,
      sexo,
      nacimiento,
      direccion,
      pais,
      estado,
      ciudad,
      municipio,
      parroquia,
      codigo,
      facebook,
      instagram,
      x,
      tiktok,
      sitio_web,
      correo,
      clave,
      repetirClave
    );

    const consultaGrabar = `INSERT INTO direcciones (id_direccion, id_codigo_postal, direccion_completa) values ($1, $2, $3);`;

    const grabador = conexion.query(consultaGrabar, [null, 1, direccion]);

    return NextResponse.json(
      { mensaje: "Todo salió bien", grabado: grabador },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
};
