import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";

export const GET = async (request) => {
  try {

    // Obtener la cookie de la solicitud
    const cookieValue = request.cookies.get("cookieInformacion").value;
console.log(cookieValue)

const a = verify(cookieValue, "secret")
console.log(a)
    // Verificar si la cookie existe
    if (!cookieValue) {
      throw new Error("La cookie 'cookieInformacion' no se encontró en la solicitud.");
    }

    // Consultar la base de datos para obtener la información actualizada del perfil
    const consultaActualizacionPerfil = `SELECT id_persona, fotoPerfil FROM personas AS p WHERE correo_electronico = ?;`;
    const actualizacionPerfil = await cmsConexion.query(consultaActualizacionPerfil, [a.correoElectronicoDeUsuario]);

    // Decodificar la cookie JWT para obtener los datos originales
    const decodedToken = verify(cookieValue, "secret");

    // Modificar los datos según sea necesario
    decodedToken.fotoPerfil = actualizacionPerfil[0].fotoPerfil;

    // Codificar los datos modificados en un nuevo JWT
    const nuevoToken = sign(decodedToken, "secret");

    console.log(nuevoToken)
    const e = verify(nuevoToken, "secret")
    console.log(e)
    // Crear una nueva cookie con el nuevo JWT
    const nuevaCookie = serialize("cookieInformacion", nuevoToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 días
      path: "/", // Ruta de acceso de la cookie
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


