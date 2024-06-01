import { cmsConexion, informacionPais as venezuela } from "@/db/database.js";
import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async () => {
  try {
    const consulta = `
    SELECT * from paises;
    `;

    const consultarPais = `
    SELECT DISTINCT est.estado, cd.capital, cd.ciudad, muni.municipio, parr.parroquia
    FROM ciudades as cd, estados as est, municipios as muni, parroquias as parr
    WHERE est.id_estado = cd.id_estado
    AND muni.id_estado = parr.id_municipio
    ORDER BY RAND()
    LIMIT 12;
    `;
    const respuestaPais = await venezuela.query(consultarPais);

    const respuesta = await cmsConexion.query(consulta);

    console.log(respuesta)

    return NextResponse.json(respuestaPais);
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      error: "Ocurrió un error al procesar la solicitud.",
    });
  }
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

    console.log(pais)

    const consultaGrabar = `INSERT INTO paises (id_pais, nombre_pais) values (?, ?);`;

    const grabador = await cmsConexion.query(consultaGrabar, [null, pais]);

    return NextResponse.json(
      { grabador: grabador },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error al grabar el país:", error);
    return NextResponse.json(
      { mensaje: "Ocurrió un error al grabar el país", error: error.message },
      { status: 500 }
    );
  }
};
