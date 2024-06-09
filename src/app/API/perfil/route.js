import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const GET = (request) => {
  try {
    // Obtener las cookies de la solicit

    const cookieValue = request.cookies.get("cookieInformacion").value;

    console.log(cookieValue);

    // Verificar si la cookie 'cookieInformacion' está presente
    if (!cookieValue) {
      throw new Error("No se Encontro la Cookie");
    }

    // Verificar el token JWT
    const sesionUsuario = verify(cookieValue, "secret");
    console.log(sesionUsuario);

    // Responder con los datos del usuario
    return NextResponse.json({ sesionUsuario });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
};

export const POST = async (req, res) => {
  try {
    const imagen = await req.formData();
    const imagenArchivo = imagen.get("archivo");
    console.log(imagenArchivo);
    const bytes = await imagenArchivo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = imagenArchivo.name;
    const filePath = path.posix.join(
      process.cwd(),
      "public/FotosDePerfil",
      fileName
    );

    await fs.writeFile(filePath, buffer);

    const fotoPerfil = path.posix.join("/FotosDePerfil", fileName);

    return NextResponse.json({ fotoPerfil });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ mensaje: "error" });
  }
};
