import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const GET = (request) => {
  try {
    // Obtener las cookies de la solicit

    const cookieValue = request.cookies.get("cookieInformacion").value;

    console.log(cookieValue);

    // Verificar si la cookie 'cookieInformacion' está presente
    if (!cookieValue) {
      throw new Error("No se Encontro la Cookie");
    }

    // Verificar el token JWT
    const sesionUsuario = verify(cookieValue, "secret");

    const serialized = serialize("cookieInformacion", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    });

    const response = new NextResponse({
      headers: new Headers({
        "Set-Cookie": serialized,
        "Content-Type": "application/json",
      }),
      status: 200,
    });

    console.log(sesionUsuario);

    // Responder con los datos del usuario
    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
};
