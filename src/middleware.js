import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export const middleware = (request) => {
  const cookieValor = request.cookies.get("cookieInformacion");
  console.log(cookieValor);

  if (request.nextUrl.pathname.includes("/perfil")) {
    if (cookieValor === undefined) {
      return NextResponse.redirect(new URL("/iniciar_sesion", request.url));
    }
  }

  return NextResponse.next();
};
