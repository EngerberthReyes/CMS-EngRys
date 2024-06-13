import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";

export const PUT = async (request) => {
  try {
    const { descripcionPerfil } = await request.json();
    console.log(descripcionPerfil);
    const elementosActualizar = {
      descripcion_personal: descripcionPerfil,
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

      const consultaActualizacionPerfil = `UPDATE personas AS p SET p.descripcion_personal = ? WHERE correo_electronico = ?;`;
      const actualizacionPerfil = await cmsConexion.query(
        consultaActualizacionPerfil,
        [
          descripcionPerfil.replace(/<.*?>/g, ""),
          verificacionCookie.correoElectronicoDeUsuario,
        ]
      );

      // Filtrar los elementos a actualizar que tengan un valor
      const elementosActualizados = Object.keys(elementosActualizar)
        .filter((campo) => elementosActualizar[campo])
        .reduce((obj, campo) => {
          // Actualizar decodedToken
          if (campo === "descripcion_personal") {
            decodedToken.descripcionPerfil = elementosActualizar[campo];
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
    const response = new NextResponse(JSON.stringify(descripcionPerfil));
    return response;
  } catch (error) {
    // Manejar errores
    console.error("Error al modificar la cookie con JWT:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
