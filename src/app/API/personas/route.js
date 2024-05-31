import { conexion } from "@/db/database.js";
import { NextResponse } from "next/server";

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

    return NextResponse.json(
      { mensaje: "Todo salió bien" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
