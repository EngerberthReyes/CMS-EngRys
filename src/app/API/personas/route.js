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

    console.log("País:", pais);

    const consultaGrabarPais = `INSERT INTO paises (nombre_pais) VALUES (?);`;
    const grabador = await cmsConexion.query(consultaGrabarPais, [pais]);

    const idPais = grabador.insertId;
    console.log("ID del País:", idPais);

    const consultaGrabarEstado = `INSERT INTO estados (id_pais, nombre_estado) VALUES (?, ?);`;
    const grabadorEstado = await cmsConexion.query(consultaGrabarEstado, [idPais, estado]);

    const idEstado = grabadorEstado.insertId;
    console.log("ID del Estado:", idEstado);

    const consultaGrabarMunicipio = `INSERT INTO municipios (id_estado, nombre_municipio) VALUES (?, ?);`;
    const grabadorMunicipio = await cmsConexion.query(consultaGrabarMunicipio, [idEstado, municipio]);

    const idMunicipio = grabadorMunicipio.insertId;
    console.log("ID del Municipio:", idMunicipio);

    const consultaGrabarParroquia = `INSERT INTO parroquias (id_municipio, nombre_parroquia) VALUES (?, ?);`;
    const grabadorParroquia = await cmsConexion.query(consultaGrabarParroquia, [idMunicipio, parroquia]);

    const idParroquia = grabadorParroquia.insertId;
    console.log("ID de la Parroquia:", idParroquia);

    const consultaGrabarCodigoPostal = `INSERT INTO codigos_postales (id_parroquia, numero_codigo_postal) VALUES (?, ?);`;
    const grabadorCodigoPostal = await cmsConexion.query(consultaGrabarCodigoPostal, [idParroquia, codigo]);

    return NextResponse.json(
      { Exitoso: "Datos Insertados Correctamente" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error al grabar los datos:", error);
    return NextResponse.json(
      { mensaje: "Ocurrió un error al grabar los datos", error: error.message },
      { status: 500 }
    );
  }
};