import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";

export const PUT = async (request) => {
  try {
    const elementosActualizados = await request.json();
    const cookieValue = request.cookies.get("cookieInformacion").value;
    console.log(cookieValue);

    const verificacionCookie = verify(cookieValue, "secret");
    console.log(verificacionCookie);

    if (!cookieValue) {
      throw new Error(
        "La cookie 'cookieInformacion' no se encontró en la solicitud."
      );
    }

    const consultaActualizacionPerfil = `SELECT id_persona FROM personas AS p WHERE correo_electronico = ?;`;
    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil,
      [verificacionCookie.correoElectronicoDeUsuario]
    );
    console.log(elementosActualizados);
    const idPersona = actualizacionPerfil[0].id_persona;
    for (const [campo, valor] of Object.entries(elementosActualizados)) {
      if (
        campo === "nombre" &&
        campo === "fecha_nacimiento" &&
        campo === "nacionalidad" &&
        campo === "id_genero" &&
        campo === "correo_electronico" &&
        campo === "clave"
      ) {
        const consultaActualizar = `UPDATE personas AS p SET p.${campo} = ? WHERE id_persona = ?;`;

        try {
          await cmsConexion.query(consultaActualizar, [valor, idPersona]);
        } catch (error) {
          console.log(error);
        }
      } else if (campo === "nacionalidad") {
        const nuevaNacionalidad = `UPDATE personas p
JOIN nacionalidades nacional ON nacional.id_nacionalidad = p.id_nacionalidad
SET p.id_nacionalidad = ?
WHERE p.id_persona = ?;`;

        try {
          await cmsConexion.query(nuevaNacionalidad, [
            `${valor === "Venezolano" ? 1 : 2}`,
            idPersona,
          ]);
        } catch (error) {
          console.log(error);
        }
      } else if (campo === "nombre_pais") {
        const nuevoNombrePais = `UPDATE paises pais
            JOIN estados est ON est.id_pais = pais.id_pais
            JOIN municipios muni ON muni.id_estado = est.id_estado
            JOIN parroquias parr ON parr.id_municipio = muni.id_municipio
            JOIN codigos_postales cod ON cod.id_parroquia = parr.id_parroquia
            JOIN direcciones dirr ON dirr.id_codigo_postal = cod.id_codigo_postal
            JOIN personas p ON p.id_direccion = dirr.id_direccion
            SET pais.nombre_pais = ?
            WHERE p.id_persona = ?;`;
        try {
          await cmsConexion.query(nuevoNombrePais, [valor, idPersona]);
        } catch (error) {
          console.log(error);
        }
      } else if (campo === "numero_codigo_postal") {
        const nuevoNombreParroquia = `UPDATE codigos_postales cod
JOIN direcciones dirr ON dirr.id_codigo_postal = cod.id_codigo_postal
JOIN personas p ON p.id_direccion = dirr.id_direccion
SET cod.numero_codigo_postal = ?
WHERE p.id_persona = ?;`;
        try {
          await cmsConexion.query(nuevoNombreParroquia, [valor, idPersona]);
        } catch (error) {
          console.log(error);
          console.log(error);
        }
      } else if (campo === "nombre_parroquia") {
        const nuevoNombreParroquia = `UPDATE parroquias parr
JOIN codigos_postales cod ON cod.id_parroquia = parr.id_parroquia
JOIN direcciones dirr ON dirr.id_codigo_postal = cod.id_codigo_postal
JOIN personas p ON p.id_direccion = dirr.id_direccion
SET parr.nombre_parroquia = ?
WHERE p.id_persona = ?;`;
        try {
          await cmsConexion.query(nuevoNombreParroquia, [valor, idPersona]);
        } catch (error) {
          console.log(error);
        }
      } else if (campo === "nombre_municipio") {
        const nuevoNombreMunicipio = `UPDATE municipios muni
JOIN parroquias parr ON parr.id_municipio = muni.id_municipio
JOIN codigos_postales cod ON cod.id_parroquia = parr.id_parroquia
JOIN direcciones dirr ON dirr.id_codigo_postal = cod.id_codigo_postal
JOIN personas p ON p.id_direccion = dirr.id_direccion
SET ciu.nombre_municipio = ?
WHERE p.id_persona = ?;`;
        try {
          await cmsConexion.query(nuevoNombreMunicipio, [valor, idPersona]);
        } catch (error) {
          console.log(error);
        }
      } else if (campo === "nombre_ciudad") {
        const nuevoNombreCiudad = `UPDATE ciudades ciu
JOIN municipios muni ON muni.id_ciudad = ciu.id_ciudad
JOIN parroquias parr ON parr.id_municipio = muni.id_municipio
JOIN codigos_postales cod ON cod.id_parroquia = parr.id_parroquia
JOIN direcciones dirr ON dirr.id_codigo_postal = cod.id_codigo_postal
JOIN personas p ON p.id_direccion = dirr.id_direccion
SET ciu.nombre_ciudad = ?
WHERE p.id_persona = ?;`;
        try {
          await cmsConexion.query(nuevoNombreCiudad, [valor, idPersona]);
        } catch (error) {
          console.log(error);
        }
      } else if (campo === "nombre_estado") {
        const nuevoNombreEstado = `UPDATE estados est
JOIN ciudades ciu ON ciu.id_estado = est.id_estado
JOIN municipios muni ON muni.id_ciudad = ciu.id_ciudad
JOIN parroquias parr ON parr.id_municipio = muni.id_municipio
JOIN codigos_postales cod ON cod.id_parroquia = parr.id_parroquia
JOIN direcciones dirr ON dirr.id_codigo_postal = cod.id_codigo_postal
JOIN personas p ON p.id_direccion = dirr.id_direccion
SET est.nombre_estado = ?
WHERE p.id_persona = ?;`;
        try {
          await cmsConexion.query(nuevoNombreEstado, [valor, idPersona]);
        } catch (error) {
          console.log(error);
        }
      } else if (campo === "direccion_completa") {
        const nuevaDireccionCompleta = `UPDATE direcciones dirr
JOIN personas p ON p.id_direccion = dirr.id_direccion
SET est.nombre_estado = ?
WHERE p.id_persona = ?;`;
        try {
          await cmsConexion.query(nuevaDireccionCompleta, [valor, idPersona]);
        } catch (error) {
          console.log(error);
        }
      } else if (campo === "id_genero") {
        const nuevoGenero = `UPDATE personas p
JOIN generos g ON p.id_genero = g.id_genero
SET p.id_genero = ?
WHERE p.id_persona = ?;`;

        try {
          await cmsConexion.query(nuevoGenero, [
            `${valor === "Masculino" ? 1 : 2}`,
            idPersona,
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    }
    return NextResponse.json(elementosActualizados);
  } catch (error) {
    // Manejar errores
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
