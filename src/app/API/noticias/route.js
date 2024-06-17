import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cmsConexion } from "@/db/database";
import { promises as fs } from "fs";
import path from "path";
import { hash, compare } from "bcryptjs";

export const GET = async () => {
  try {
    const respuestaPublicacion = `SELECT
        notic.id_noticia,
        p.nombre,
        p.apellido,
        p.fotoPerfil,
        notic.id_persona,
        notic.descripcion_noticia as mensaje, 
        notic.fecha as fecha, 
        notic.enlace as enlaces, 
        notic.imagen as imagen, 
        notic.video as imagenes,
        notic.urlVideo as youtubeUrl
    FROM
        noticias AS notic
    JOIN
        personas AS p ON notic.id_persona = p.id_persona;
    `;

    const enviandoPublicaciones = await cmsConexion.query(respuestaPublicacion);

    console.log(enviandoPublicaciones);

    const publicacionesConImagenesParseadas = enviandoPublicaciones.map(
      (noticia) => {
        let imagen = null;
        let enlaces = null;
        let youtubeUrl = null;
        try {
          imagen = noticia.imagen ? JSON.parse(noticia.imagen) : null;
          enlaces = noticia.enlaces ? JSON.parse(noticia.enlaces) : null;
          youtubeUrl = noticia.youtubeUrl
            ? JSON.parse(noticia.youtubeUrl)
            : null;
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        return { ...noticia, imagen, enlaces, youtubeUrl };
      }
    );

    console.log(publicacionesConImagenesParseadas);
    return NextResponse.json(publicacionesConImagenesParseadas);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    let mensaje = formData.get("mensaje");
    const enlaces = formData.getAll("enlaces");
    const youtubeUrl = formData.get("youtubeUrl");
    const imagen = formData.getAll("imagenes");
    const imagenesRuta = formData.getAll("imagenesRuta");

    const enlaceValor = enlaces ? enlaces : null;
    const imagenValor = imagen && imagen.length > 0 ? imagen : null;
    const videoValor = imagen.includes(".mp4") && imagen ? imagen : null;
    let youtubeUrlValor =
      youtubeUrl && youtubeUrl.length > 0 ? youtubeUrl : null;

    const fechaActual = () => {
      const ahora = new Date();
      const year = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, "0");
      const dia = String(ahora.getDate()).padStart(2, "0");
      return `${year}-${mes}-${dia}`;
    };

    const fecha = fechaActual();
    const mensajeSinEtiquetas = mensaje.replace(/<.*?>/g, "");

    const cookieValue = request.cookies.get("cookieInformacion")?.value;
    if (!cookieValue) {
      throw new Error(
        "La cookie 'cookieInformacion' no se encontró en la solicitud."
      );
    }

    const verificacionCookie = verify(cookieValue, "secret");

    const consultaPerfil = `SELECT id_persona FROM personas WHERE id_persona = ?;`;
    const recoleccionId = await cmsConexion.query(consultaPerfil, [
      verificacionCookie.idPersona,
    ]);

    const idPersona = recoleccionId[0].id_persona;

    const imagenesRutaJson = imagenesRuta[0]
      ? JSON.parse(imagenesRuta[0])
      : null;

    const consultaPublicacion = `INSERT INTO noticias (
        id_persona, descripcion_noticia, fecha, enlace, imagen, video, urlVideo
      ) VALUES (?, ?, ?, ?, ?, ?, ?);`;

    const respuestaPublicacionEnviada = await cmsConexion.query(
      consultaPublicacion,
      [
        idPersona,
        mensaje,
        fecha,
        enlaceValor,
        JSON.stringify(imagenesRutaJson),
        videoValor,
        youtubeUrlValor,
      ]
    );

    const respuestaPublicacion = `SELECT
      notic.id_noticia, 
      p.nombre,
      p.apellido,
      p.fotoPerfil,
      notic.id_persona,
      notic.descripcion_noticia AS mensaje, 
      notic.fecha AS fecha, 
      notic.enlace AS enlaces, 
      notic.imagen AS imagen, 
      notic.video AS imagenes,
      notic.urlVideo AS youtubeUrl
    FROM
      noticias AS notic
    JOIN
      personas AS p ON notic.id_persona = p.id_persona;`;

    const enviandoPublicaciones = await cmsConexion.query(respuestaPublicacion);

    const publicacionesConImagenesParseadas = enviandoPublicaciones.map(
      (noticia) => {
        let imagen = null;
        let enlaces = null;
        let youtubeUrl = null;
        try {
          imagen = noticia.imagen ? JSON.parse(noticia.imagen) : null;
          enlaces = noticia.enlaces ? JSON.parse(noticia.enlaces) : null;
          youtubeUrl = noticia.youtubeUrl
            ? JSON.parse(noticia.youtubeUrl)
            : null;
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        return { ...noticia, imagen, enlaces, youtubeUrl };
      }
    );

    return NextResponse.json(publicacionesConImagenesParseadas);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
