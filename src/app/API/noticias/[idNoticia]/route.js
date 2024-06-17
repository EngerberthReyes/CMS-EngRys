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

    const consultaPublicacion = `DELETE FROM publicaciones WHERE id_publicacion = ?;`;
    const respuestaPublicacion = await cmsConexion.query(consultaPublicacion, [
      Number(idPublicacion),
    ]);

    return NextResponse.json(respuestaPublicacion);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
