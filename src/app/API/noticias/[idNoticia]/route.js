import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";
import { promises as fs } from "fs";
import path from "path";
import { hash, compare } from "bcryptjs";

export const DELETE = async (request, { params: { idNoticia } }) => {
  try {
    console.log(idNoticia);

    const consultaPublicacion = `DELETE FROM noticias WHERE id_noticia = ?;`;
    const respuestaPublicacion = await cmsConexion.query(consultaPublicacion, [
      Number(idNoticia),
    ]);

    return NextResponse.json(respuestaPublicacion);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
