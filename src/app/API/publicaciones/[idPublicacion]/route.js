import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";
import { promises as fs } from "fs";
import path from "path";
import { hash, compare } from "bcryptjs";

export const DELETE = async (request, { params: { idPublicacion } }) => {
  try {
    console.log(idPublicacion);

    const consultaPerfil = `SELECT id_persona FROM publicaciones WHERE id_publicacion = ?;`;
    const recoleccionId = await cmsConexion.query(consultaPerfil, [
      Number(idPublicacion),
    ]);

    return NextResponse.json(recoleccionId);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
