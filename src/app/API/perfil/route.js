import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = (request) => {
  try {
    // Obtener las cookies de la solicit

    const cookieValue = request.cookies.get("cookieInformacion").value;

    console.log(cookieValue);

    // Verificar si la cookie 'cookieInformacion' está presente
    if (!cookieValue) {
      throw new Error("Cookie 'cookieInformacion' not found in cookies");
    }

    // Verificar el token JWT
    const sesionUsuario = verify(cookieValue, "secret");
    console.log(sesionUsuario);

    // Responder con los datos del usuario
    return NextResponse.json({ sesionUsuario });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
};
