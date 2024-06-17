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
    const imagenesNoticias = formData.getAll("imagenesNoticias");
    console.log(imagenesNoticias);
    console.log(imagenes);
    const rutasImagenes = [];
    const rutasImagenesNoticias = [];

    if (imagenesNoticias) {
      for (const imagenNoticia of imagenesNoticias) {
        const bytes = await imagenNoticia.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = imagenNoticia.name;
        const filePath = path.posix.join(
          process.cwd(),
          "public/FotosenNoticias",
          fileName
        );

        await fs.writeFile(filePath, buffer);

        const fotoPublicacion = path.posix.join("/FotosenNoticias", fileName);

        rutasImagenesNoticias.push(fotoPublicacion);
      }
    }

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
    console.log(rutasImagenesNoticias);
    console.log(rutasImagenes);
    return NextResponse.json({rutasImagenes, rutasImagenesNoticias});
  } catch (error) {
    console.error("Error processing images:", error);
    return NextResponse.error();
  }
};
