import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const GET = (request) => {
  try {
    const cookieValue = request.cookies.get("cookieInformacion").value;

    console.log(cookieValue);

    if (!cookieValue) {
      throw new Error("No se encontró la cookie");
    }

    const serialized = serialize("cookieInformacion", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    });

    const response = new NextResponse(
      JSON.stringify({ Ok: "Cookie Eliminada" }),
      {
        headers: new Headers({
          "Set-Cookie": serialized,
          "Content-Type": "application/json",
        }),
      }
    );

    // Devolver la respuesta
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
};
