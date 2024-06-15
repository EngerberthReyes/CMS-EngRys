import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";
import { promises as fs } from "fs";
import path from "path";
import { hash, compare } from "bcryptjs";

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const imagenes = formData.getAll("imagenes");
    console.log(imagenes);

    const rutasImagenes = [];

    for (const imagen of imagenes) {
      const bytes = await imagen.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = imagen.name;
      const filePath = path.posix.join(
        process.cwd(),
        "public/FotosEnPublicaciones",
        fileName
      );

      await fs.writeFile(filePath, buffer);

      const fotoPublicacion = path.posix.join(
        "/FotosEnPublicaciones",
        fileName
      );

      rutasImagenes.push(fotoPublicacion);
    }
    console.log(rutasImagenes);
    return NextResponse.json(rutasImagenes);
  } catch (error) {
    console.error("Error processing images:", error);
    return NextResponse.error();
  }
};
