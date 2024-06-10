import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";

export const PUT = async (request) => {
  try {
    const {
      nombreCompletoUsuario,
      cedula,
      correoElectronicoDeUsuario,
      fechaNacimiento,
      claveDesencriptada,
      nacional,
      genero,
      nombrePais,
      nombreEstado,
      nombreCiudad,
      nombreMunicipio,
      nombreParroquia,
      numeroCodigoPostal,
      direccionCompleta,
      sitioWeb,
      facebook,
      instragram,
      x,
      tiktok,
    } = await request.json();

    console.log(
      nombreCompletoUsuario,
      cedula,
      correoElectronicoDeUsuario,
      fechaNacimiento,
      claveDesencriptada,
      nacional,
      genero,
      nombrePais,
      nombreEstado,
      nombreCiudad,
      nombreMunicipio,
      nombreParroquia,
      numeroCodigoPostal,
      direccionCompleta,
      sitioWeb,
      facebook,
      instragram,
      x,
      tiktok
    );

    const cookieValue = request.cookies.get("cookieInformacion").value;
    console.log(cookieValue);

    const a = verify(cookieValue, "secret");
    console.log(a);

    if (!cookieValue) {
      throw new Error(
        "La cookie 'cookieInformacion' no se encontró en la solicitud."
      );
    }

    const consultaActualizacionPerfil = `SELECT id_persona FROM personas AS p WHERE correo_electronico = ?;`;
    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil,
      [a.correoElectronicoDeUsuario]
    );

    const idPersona = actualizacionPerfil[0].id_persona;

    const consultaActualizarPais = `UPDATE paises SET nombre_pais =? WHERE id_pais =?;`;
    const resultadoActualizacionPais = await cmsConexion.query(
      consultaActualizarPais,
      [nuevoNombrePais, idPais]
    );

    console.log("País actualizado:", resultadoActualizacionPais.affectedRows);

    const consultaActualizarEstado = `UPDATE estados SET nombre_estado =? WHERE id_estado =?;`;
    const resultadoActualizacionEstado = await cmsConexion.query(
      consultaActualizarEstado,
      [nuevoNombreEstado, idEstado]
    );

    console.log(
      "Estado actualizado:",
      resultadoActualizacionEstado.affectedRows
    );

    const consultaActualizarCiudad = `UPDATE ciudades SET nombre_ciudad =? WHERE id_ciudad =?;`;
    const resultadoActualizacionCiudad = await cmsConexion.query(
      consultaActualizarCiudad,
      [nuevoNombreCiudad, idCiudad]
    );

    console.log(
      "Ciudad actualizada:",
      resultadoActualizacionCiudad.affectedRows
    );

    const consultaActualizarMunicipio = `UPDATE municipios SET nombre_municipio =? WHERE id_municipio =?;`;
    const resultadoActualizacionMunicipio = await cmsConexion.query(
      consultaActualizarMunicipio,
      [nuevoNombreMunicipio, idMunicipio]
    );

    console.log(
      "Municipio actualizado:",
      resultadoActualizacionMunicipio.affectedRows
    );

    const consultaActualizarParroquia = `UPDATE parroquias SET nombre_parroquia =? WHERE id_parroquia =?;`;
    const resultadoActualizacionParroquia = await cmsConexion.query(
      consultaActualizarParroquia,
      [nuevoNombreParroquia, idParroquia]
    );

    console.log(
      "Parroquia actualizada:",
      resultadoActualizacionParroquia.affectedRows
    );

    const consultaActualizarCodigoPostal = `UPDATE codigos_postales SET numero_codigo_postal =? WHERE id_codigo_postal =?;`;
    const resultadoActualizacionCodigoPostal = await cmsConexion.query(
      consultaActualizarCodigoPostal,
      [nuevoCodigoPostal, idCodigoPostal]
    );

    console.log(
      "Código Postal actualizado:",
      resultadoActualizacionCodigoPostal.affectedRows
    );

    const consultaActualizarDireccion = `UPDATE direcciones SET direccion_completa =? WHERE id_codigo_postal =?;`;
    const resultadoActualizacionDireccion = await cmsConexion.query(
      consultaActualizarDireccion,
      [nuevaDireccion, idCodigoPostal]
    );

    console.log(
      "Dirección actualizada:",
      resultadoActualizacionDireccion.affectedRows
    );

    const consultaActualizarPersona = `UPDATE personas AS p SET p.nombre = ? WHERE correo_electronico = ?;`;
    const resultadoActualizacionPersona = await cmsConexion.query(
      consultaActualizarDireccion,
      [nombreCompletoUsuario, a.correoElectronicoDeUsuario]
    );

    console.log(idPersona);

    const decodedToken = verify(cookieValue, "secret");

    decodedToken.nombreCompletoUsuario = actualizacionPerfil[0].nombre;

    const nuevoToken = sign(decodedToken, "secret");

    console.log(nuevoToken);
    const e = verify(nuevoToken, "secret");
    console.log(e);

    const nuevaCookie = serialize("cookieInformacion", nuevoToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30 * 100,
      path: "/",
    });

    // Configurar la nueva cookie en la respuesta
    const response = new NextResponse(JSON.stringify(e), {
      headers: {
        "Set-Cookie": nuevaCookie,
      },
    });

    // Devolver la respuesta
    return response;
  } catch (error) {
    // Manejar errores
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
