import {
  cmsConexion,
  paisesMundo as consultarMundo,
  venezuela as informacionVenezuela,
} from "@/db/database.js";
import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async () => {
  try {
    const datosUsuario = `
    SELECT id_persona, cedula, correo_electronico, clave from personas;
    `;

    const consultarPaises = `
SELECT
    p.name AS paises,
    GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ', ') AS estados,
    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS ciudades
FROM cities c
JOIN states s ON c.state_id = s.id
JOIN countries p ON s.country_id = p.id
GROUP BY p.id;
    `;

    const consultarVenezuela = `
SELECT GROUP_CONCAT(DISTINCT m.municipio ORDER BY m.id_estado SEPARATOR ', ') AS municipios,
    GROUP_CONCAT(DISTINCT p.parroquia ORDER BY p.parroquia SEPARATOR ', ') AS parroquias FROM  municipios as m JOIN parroquias as p ON m.id_municipio = p.id_municipio;
        `;

    const [respuestaPersona, respuestaPaises, respuestaVenezuela] =
      await Promise.all([
        cmsConexion.query(datosUsuario),
        consultarMundo.query(consultarPaises),
        informacionVenezuela.query(consultarVenezuela),
      ]);

    console.log(respuestaPersona);
    console.log(respuestaPaises);

    return NextResponse.json({
      personas: respuestaPersona,
      paises: respuestaPaises,
      venezuela: respuestaVenezuela,
    });
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
      nacionalidad,
      nacimiento,
      direccionDescripcion,
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
      claveHash,
      repetirClave,
      imagenSitioWeb,
    } = await request.json();

    const antiInyeccioneSql = (valor) => {
      return valor.replace(/[<>;():{}'"=]/g, "").replace(/[\W]+/g, " ");
    };

    const direccion = antiInyeccioneSql(direccionDescripcion);

    console.log("País:", pais);

    const consultaGrabarPais = `INSERT INTO paises (nombre_pais) VALUES (?);`;
    const grabador = await cmsConexion.query(consultaGrabarPais, [pais]);

    const idPais = grabador.insertId;
    console.log("ID del País:", idPais);

    const consultaGrabarEstado = `INSERT INTO estados (id_pais, nombre_estado) VALUES (?, ?);`;
    const grabadorEstado = await cmsConexion.query(consultaGrabarEstado, [
      idPais,
      estado,
    ]);

    const idEstado = grabadorEstado.insertId;
    console.log("ID del Estado:", idEstado);

    const consultaGrabarCiudad = `INSERT INTO ciudades (id_estado, nombre_ciudad) VALUES (?, ?);`;
    const grabadorCiudad = await cmsConexion.query(consultaGrabarCiudad, [
      idEstado,
      ciudad,
    ]);

    const idCiudad = grabadorCiudad.insertId;
    console.log("ID del Ciudad:", idCiudad);

    const consultaGrabarMunicipio = `INSERT INTO municipios (id_ciudad, nombre_municipio) VALUES (?, ?);`;
    const grabadorMunicipio = await cmsConexion.query(consultaGrabarMunicipio, [
      idCiudad,
      municipio,
    ]);

    const idMunicipio = grabadorMunicipio.insertId;
    console.log("ID del Municipio:", idMunicipio);

    const consultaGrabarParroquia = `INSERT INTO parroquias (id_municipio, nombre_parroquia) VALUES (?, ?);`;
    const grabadorParroquia = await cmsConexion.query(consultaGrabarParroquia, [
      idMunicipio,
      parroquia,
    ]);

    const idParroquia = grabadorParroquia.insertId;
    console.log("ID de la Parroquia:", idParroquia);

    const consultaGrabarCodigoPostal = `INSERT INTO codigos_postales (id_parroquia, numero_codigo_postal) VALUES (?, ?);`;
    const grabadorCodigoPostal = await cmsConexion.query(
      consultaGrabarCodigoPostal,
      [idParroquia, codigo]
    );

    const idCodigoPostal = grabadorCodigoPostal.insertId;
    console.log("ID de la Codigo Postal:", idCodigoPostal);

    const consultaGrabarDireccion = `INSERT INTO direcciones (id_codigo_postal, direccion_completa) VALUES (?, ?);`;
    const grabadorDireccion = await cmsConexion.query(consultaGrabarDireccion, [
      idCodigoPostal,
      direccion,
    ]);

    const idDireccion = grabadorDireccion.insertId;
    console.log("ID de la Direccion:", idDireccion);

    const idGenero = sexo === "Masculino" ? 1 : 2;

    console.log(idGenero);

    const idNacionalidad = nacionalidad === "V" ? 1 : 2;

    const idRol = 2;

    console.log(
      nombres,
      apellido,
      cedula,
      sexo,
      nacionalidad,
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
      claveHash,
      repetirClave,
      imagenSitioWeb
    );
console.log(idGenero)
    const consultaGrabarPersonas = `
    INSERT INTO personas (
      id_persona, 
      id_genero, 
      id_rol, 
      id_nacionalidad, 
      id_direccion, 
      nombre, 
      apellido, 
      cedula,
      fecha_nacimiento,
      correo_electronico,
      clave,
      facebook,
      instagram,
      x,
      tiktok,
      sitio_web,
      url_imagen_pagina
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
  `;

    const grabadorPersonas = await cmsConexion.query(consultaGrabarPersonas, [
      null,
      idGenero,
      idRol,
      idNacionalidad,
      idDireccion,
      nombres,
      apellido,
      cedula,
      nacimiento,
      correo,
      claveHash,
      facebook,
      instagram,
      x,
      tiktok,
      sitio_web,
      imagenSitioWeb,
    ]);

    return NextResponse.json({ Exitoso: grabadorPersonas }, { status: 200 });
  } catch (error) {
    console.error("Error al grabar los datos:", error);
    return NextResponse.json(
      { mensaje: "Ocurrió un error al grabar los datos", error: error.message },
      { status: 500 }
    );
  }
};
