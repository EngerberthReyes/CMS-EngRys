import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const middleware = async (request) => {
  try {
    const cookieValor = request.cookies.get("cookieInformacion");
    if (request.nextUrl.pathname.includes("/perfil")) {
      if (cookieValor === undefined) {
        return NextResponse.redirect(new URL("/iniciar_sesion", request.url));
      }

      const { payload } = await jwtVerify(
        cookieValor,
        new TextEncoder().encode("secret")
      );

      return NextResponse.next();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/iniciar_sesion", request.url));
  }

  return NextResponse.next();
};
