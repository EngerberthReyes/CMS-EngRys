import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cmsConexion } from "@/db/database";

export const GET = async (request) => {
  try {
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

export const PUT = async (req, res) => {
  try {
    const datos = await req.formData();

    const correoElectronico = datos.get("correoElectronico");

    const consultaUsuario = `SELECT p.id_persona, p.nombre, p.apellido FROM personas AS p WHERE p.correo_electronico = ?`;

    const datosUsuario = await cmsConexion.query(consultaUsuario, [
      correoElectronico,
    ]);

    console.log(datosUsuario);

    const imagenArchivo = datos.get("archivo");
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

    const consultaActualizacionPerfil = `UPDATE personas AS p SET fotoPerfil = ? WHERE p.id_persona = ?;`;

    const actualizacionPerfil = await cmsConexion.query(
      consultaActualizacionPerfil,
      [fotoPerfil, datosUsuario[0].id_persona]
    );

    return NextResponse.json({ fotoPerfil, correoElectronico });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ mensaje: "error" });
  }
};
