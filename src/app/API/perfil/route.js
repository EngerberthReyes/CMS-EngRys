import { cmsConexion, informacionPais as venezuela } from "@/db/database.js";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export const GET = async (request) => {
  try {
    const { token } = await request.cookies;
    const user = verify(token, "secret");

    console.log(user);

    return NextResponse.json({ user })


    console.log(request.cookies);
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (request, res) => {};
