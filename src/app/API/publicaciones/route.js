import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";
import { promises as fs } from "fs";
import path from "path";
import { hash, compare } from "bcryptjs";

export const POST = async (request) => {
  try {
    const { mensaje, nombreImagen, enlaces, imagen, imagenesRuta, youtubeUrl } =
      await request.json();

    console.log(
      mensaje,
      nombreImagen,
      enlaces,
      imagen,
      imagenesRuta,
      youtubeUrl
    );

    const enlaceValor = enlaces && enlaces.length > 0 ? enlaces : null;
    const imagenValor = imagen && imagen.length > 0 ? imagen : null;
    const videoValor =
      nombreImagen.includes(".mp4") && imagen.length > 0 ? imagen : null;
    const youtubeUrlValor =
      youtubeUrl && youtubeUrl.length > 0 ? youtubeUrl : null;
    console.log(videoValor);

    const fechaActual = () => {
      const ahora = new Date();
      const year = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, "0");
      const dia = String(ahora.getDate()).padStart(2, "0");

      return `${year}-${mes}-${dia}`;
    };

    const fecha = fechaActual();

    console.log(mensaje.replace(/<.*?>/g, ""));
    const cookieValue = request.cookies.get("cookieInformacion").value;
    console.log(cookieValue);

    const verificacionCookie = verify(cookieValue, "secret");
    console.log(verificacionCookie);

    if (!cookieValue) {
      throw new Error(
        "La cookie 'cookieInformacion' no se encontró en la solicitud."
      );
    }

    const consultaPerfil = `SELECT id_persona FROM personas AS p WHERE id_persona = ?;`;
    const recoleccionId = await cmsConexion.query(consultaPerfil, [
      verificacionCookie.idPersona,
    ]);

    const idPersona = recoleccionId[0].id_persona;
    console.log(idPersona);

    const imagenesRutaJson = JSON.stringify(imagenesRuta);

    const imagenesRutasExisten =
      imagenesRutaJson && imagenesRutaJson.length > 0 ? imagenesRutaJson : null;

    console.log(JSON.parse(imagenesRutaJson));

    const consultaPublicacion = `INSERT INTO publicaciones (
  id_publicacion, 
  id_persona, 
  descripcion_publicacion, 
  fecha, 
  enlace, 
  imagen, 
  video, 
  urlVideo
) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    const publicacion = await cmsConexion.query(consultaPublicacion, [
      null,
      idPersona,
      mensaje.replace(/<.*?>/g, ""),
      fecha,
      enlaceValor,
      imagenesRutasExisten,
      videoValor,
      youtubeUrlValor,
    ]);

    console.log(publicacion);
    console.log(idPersona);
    /*
    if (titulo || informacion) {
      const consultaInterfaz = `INSERT INTO options (nombre_interfaz)  VALUES (?)`;
      const actualizacionInterfaces = await cmsConexion.query(
        consultaInterfaz,
        ["Titulo"]
      );

      const consultaOpciones = `INSERT INTO options (id_interfaz, id_persona, titulo, contenido)  VALUES (?, ?, ?, ?)`;
      const actualizacionOpciones = await cmsConexion.query(consultaOpciones, [
        1,
        idPersona,
        "Titulo",
        "Informacion",
      ]);
    }
      */

    const respuestaPublicacion = `SELECT
  public.id_publicacion, 
  p.nombre,
  p.apellido,
  p.fotoPerfil,
  public.id_persona,
  public.descripcion_publicacion, 
  public.fecha, 
  public.enlace, 
  public.imagen, 
  public.video, 
  public.urlVideo
FROM
  publicaciones AS public
JOIN
  personas AS p ON public.id_persona = p.id_persona;
`;

    const enviandoPublicaciones = await cmsConexion.query(respuestaPublicacion);

    console.log(enviandoPublicaciones);

    return NextResponse.json(enviandoPublicaciones);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
