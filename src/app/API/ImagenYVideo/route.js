import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";
import { promises as fs } from "fs";
import path from "path";
import { hash, compare } from "bcryptjs";

export const POST = async (request) => {
  try {
    const imagenes = await request.formData();

    const imagen = imagenes.get("imagenes");
    console.log(imagen)
    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = imagen.name;
    const filePath = path.posix.join(
      process.cwd(),
      "public/FotosEnPublicaciones",
      fileName
    );

    await fs.writeFile(filePath, buffer);

    const fotoPublicacion = path.posix.join("/FotosEnPublicaciones", fileName);

    return NextResponse.json(fotoPublicacion);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
