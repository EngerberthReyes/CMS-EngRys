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
        public.id_publicacion, 
        p.nombre,
        p.apellido,
        p.fotoPerfil,
        public.id_persona,
        public.descripcion_publicacion as mensaje, 
        public.fecha as fecha, 
        public.enlace as enlaces, 
        public.imagen as imagen, 
        public.video as imagenes,
        public.urlVideo as youtubeUrl
    FROM
        publicaciones AS public
    JOIN
        personas AS p ON public.id_persona = p.id_persona;
    `;

    const enviandoPublicaciones = await cmsConexion.query(respuestaPublicacion);

    console.log(enviandoPublicaciones);

    const publicacionesConImagenesParseadas = enviandoPublicaciones.map(
      (publicacion) => {
        let imagen = null;
        let enlaces = null;
        let youtubeUrl = null;
        try {
          imagen = publicacion.imagen ? JSON.parse(publicacion.imagen) : null;
          enlaces = publicacion.enlaces
            ? JSON.parse(publicacion.enlaces)
            : null;
          youtubeUrl = publicacion.youtubeUrl
            ? JSON.parse(publicacion.youtubeUrl)
            : null;
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        return { ...publicacion, imagen, enlaces, youtubeUrl };
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
    const enlaces = formData.get("enlaces");
    const youtubeUrl = formData.get("youtubeUrl");
    const imagen = formData.getAll("imagenes");
    const imagenesRuta = formData.getAll("imagenesRuta");

    const parsedEnlaces = enlaces ? JSON.parse(enlaces) : null;
    const enlaceValor =
      parsedEnlaces && parsedEnlaces.length > 0 ? parsedEnlaces : null;
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

    const consultaPublicacion = `INSERT INTO publicaciones (
        id_persona, descripcion_publicacion, fecha, enlace, imagen, video, urlVideo
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
      public.id_publicacion, 
      p.nombre,
      p.apellido,
      p.fotoPerfil,
      public.id_persona,
      public.descripcion_publicacion AS mensaje, 
      public.fecha AS fecha, 
      public.enlace AS enlaces, 
      public.imagen AS imagen, 
      public.video AS imagenes,
      public.urlVideo AS youtubeUrl
    FROM
      publicaciones AS public
    JOIN
      personas AS p ON public.id_persona = p.id_persona;`;

    const enviandoPublicaciones = await cmsConexion.query(respuestaPublicacion);

   const publicacionesConImagenesParseadas = enviandoPublicaciones.map(
      (publicacion) => {
        let imagen = null;
        let enlaces = null;
        let youtubeUrl = null;
        mensaje = mensaje;
        try {
          imagen = publicacion.imagen ? JSON.parse(publicacion.imagen) : null;
          enlaces = publicacion.enlaces
            ? JSON.parse(publicacion.enlaces)
            : null;
          youtubeUrl = publicacion.youtubeUrl
            ? JSON.parse(publicacion.youtubeUrl)
            : null;
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        return { ...publicacion, mensaje, imagen, enlaces, youtubeUrl };
      }
    );

    return NextResponse.json(publicacionesConImagenesParseadas);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
