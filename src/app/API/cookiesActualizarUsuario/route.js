import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";

export const PUT = async (request) => {
  try {
    const {
      nombreDeUsuario,
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
      instagram,
      x,
      tiktok,
    } = await request.json();

    const elementosActualizar = {
      nombre: nombreCompletoUsuario,
      cedula,
      correo_electronico: correoElectronicoDeUsuario,
      fecha_nacimiento: fechaNacimiento,
      clave: claveDesencriptada,
      direccion_completa: direccionCompleta,
      nacionalidad: nacional,
      id_genero: genero,
      facebook,
      instagram,
      x,
      tiktok,
      sitio_web: sitioWeb,
      numero_codigo_postal: numeroCodigoPostal,
      nombre_parroquia: nombreParroquia,
      nombre_municipio: nombreMunicipio,
      nombre_ciudad: nombreCiudad,
      nombre_estado: nombreEstado,
      nombre_pais: nombrePais,
    };

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

    const idPersona = actualizacionPerfil[0].id_persona;
    const actualizarYObtenerCookie = async (
      cookieValue,
      elementosActualizar,
      idPersona,
      cmsConexion
    ) => {
      // Verificar el token y obtener los datos del usuario
      let decodedToken = verify(cookieValue, "secret");
      console.log(decodedToken);
      console.log(elementosActualizar);

      // Filtrar los elementos a actualizar que tengan un valor
      const elementosActualizados = Object.keys(elementosActualizar)
        .filter((campo) => elementosActualizar[campo])
        .reduce((obj, campo) => {
          // Actualizar decodedToken
          if (campo === "nombre") {
            decodedToken.nombreCompletoUsuario = elementosActualizar[campo];
          } else if (campo === "fecha_nacimiento") {
            decodedToken.fechaNacimiento = elementosActualizar[campo];
          } else if (campo === "numero_codigo_postal") {
            decodedToken.numeroCodigoPostal = elementosActualizar[campo];
          } else if (campo === "nombre_parroquia") {
            decodedToken.nombreParroquia = elementosActualizar[campo];
          } else if (campo === "nombre_municipio") {
            decodedToken.nombreMunicipio = elementosActualizar[campo];
          } else if (campo === "nombre_ciudad") {
            decodedToken.nombreCiudad = elementosActualizar[campo];
          } else if (campo === "nombre_estado") {
            decodedToken.nombreEstado = elementosActualizar[campo];
          } else if (campo === "nombre_pais") {
            decodedToken.nombrePais = elementosActualizar[campo];
          } else if (campo === "direccion_completa") {
            decodedToken.direccionCompleta = elementosActualizar[campo];
          } else if (campo === "nacionalidad") {
            decodedToken.nacional = elementosActualizar[campo];
          } else if (campo === "id_genero") {
            decodedToken.genero = elementosActualizar[campo];
          } else if (campo === "correo_electronico") {
            decodedToken.correoElectronicoDeUsuario =
              elementosActualizar[campo];
          } else if (campo === "clave") {
            decodedToken.claveDesencriptada = elementosActualizar[campo];
          }

          decodedToken[campo] = elementosActualizar[campo];
          obj[campo] = elementosActualizar[campo];
          return obj;
        }, {});

      console.log(elementosActualizados);

      // Actualizar los datos del usuario en la base de datos

      // Imprimir los datos actualizados del usuario
      console.log(decodedToken);

      // Generar nuevo token con los valores actualizados
      const nuevoToken = sign(decodedToken, "secret");
      console.log(nuevoToken);

      // Configurar la nueva cookie
      const nuevaCookie = serialize("cookieInformacion", nuevoToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30 * 100,
        path: "/",
      });

      // Devolver el nuevo token y la nueva cookie
      return { nuevoToken, nuevaCookie, elementosActualizados };
    };

    const { nuevoToken, nuevaCookie, elementosActualizados } =
      await actualizarYObtenerCookie(
        cookieValue,
        elementosActualizar,
        idPersona,
        cmsConexion
      );
    console.log(nuevoToken);
    console.log(nuevaCookie);

    // Configurar la nueva cookie en la respuesta
    const response = new NextResponse(JSON.stringify(elementosActualizados), {
      headers: {
        "Set-Cookie": nuevaCookie,
      },
    });
    return response;
  } catch (error) {
    // Manejar errores
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
