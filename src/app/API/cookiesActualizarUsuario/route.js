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

    const consultaActualizacionPerfil = `SELECT id_persona, fotoPerfil FROM personas AS p WHERE correo_electronico = ?;`;
    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil,
      [a.correoElectronicoDeUsuario]
    );

    const idPersona = actualizacionPerfil[0].id_persona;

    console.log(idPersona);

    const decodedToken = verify(cookieValue, "secret");

    decodedToken.fotoPerfil = actualizacionPerfil[0].fotoPerfil;

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
