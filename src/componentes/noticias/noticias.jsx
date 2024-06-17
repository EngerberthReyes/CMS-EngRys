"use client";

import Image from "next/image";
import Link from "next/link";
import Details from "@/componentes/tiptap/Details";
import stylesPost from "../CSSComponentes/noticias.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const NoticiasPublicadas = ({
  noticia,
  nombreDeUsuario,
  usuario,
  enviandoBorrado,
}) => {
  console.log(noticia);

  const borrarNoticia = async (idNoticia) => {
    try {
      const respuestaBorrado = await axios.delete(
        `http://localhost:3000/API/noticias/${idNoticia}`
      );

      const publicacionBorrada = respuestaBorrado;

      enviandoBorrado(publicacionBorrada);
    } catch (error) {
      console.error("Error al borrar la publicación:", error);
    }
  };

  return (
    <>
      {noticia.length > 0
        ? noticia.map((elementoNoticia, index) => (
            <section
              key={elementoNoticia.id_noticia}
              className={stylesPost.seccionPrincipal}
            >
              <section className={stylesPost.seccionGrid}>
                <section style={{ display: "flex", width: "100%" }}>
                  {elementoNoticia?.id_persona !== usuario?.idPersona ? (
                    <>
                      <Link
                        className={`${stylesPost.enlace} ${stylesPost.usuarioPerfil}`}
                        style={{
                          border: "none",
                          wordBreak: "keep-all",
                          height: "4rem",
                          margin: "0 0 1rem 0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "default",
                        }}
                        href=""
                      >
                        <Image
                          className={stylesPost.imagenes}
                          width={35}
                          height={20}
                          src={
                            elementoNoticia?.fotoPerfil
                              ? elementoNoticia.fotoPerfil
                              : "/IMG/epigrafe73.png"
                          }
                        />
                        <section style={{ wordBreak: "keep-all" }}>
                          <section>
                            {`${elementoNoticia.nombre.split(" ")[0]}
                              ${elementoNoticia.apellido.split(" ")[0]}`}
                          </section>
                        </section>
                      </Link>
                    </>
                  ) : (
                    <>
                      <section
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Link
                          className={`${stylesPost.enlace} ${stylesPost.usuarioPerfil}`}
                          style={{
                            border: "none",
                            wordBreak: "keep-all",
                            height: "4rem",
                            margin: "0 0 1rem 0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "default",
                          }}
                          href=""
                        >
                          <Image
                            className={stylesPost.imagenes}
                            width={35}
                            height={20}
                            src={
                              elementoNoticia.fotoPerfil
                                ? elementoNoticia.fotoPerfil
                                : "/IMG/epigrafe73.png"
                            }
                          />
                          <section style={{ wordBreak: "keep-all" }}>
                            <section>
                              {`${elementoNoticia.nombre.split(" ")[0]}
                              ${elementoNoticia.apellido.split(" ")[0]}`}
                            </section>
                          </section>
                        </Link>
                        <section
                          title="Eliminar Noticia"
                          className={`${stylesPost.enlace} ${stylesPost.seccionBorrar} ${stylesPost.usuarioPerfil}`}
                          style={{
                            border: "none",
                            wordBreak: "keep-all",
                            height: "4rem",
                            margin: "0 0 1rem 0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            borrarNoticia(elementoNoticia.id_noticia)
                          }
                        >
                          <Image
                            className={stylesPost.imagenes}
                            width={20}
                            height={20}
                            style={{ height: "2rem", borderRadius: "0" }}
                            src={"/x-solid.svg"}
                            alt={"Eliminar Noticia"}
                          />
                        </section>
                      </section>
                    </>
                  )}
                </section>
                <section>
                  <>
                    {elementoNoticia.mensaje && (
                      <Details description={elementoNoticia.mensaje} />
                    )}
                  </>
                  {elementoNoticia.enlaces && (
                    <>
                      {elementoNoticia.enlaces.map((enlace, index) => (
                        <>
                          <Link
                            key={index}
                            className={stylesPost.links}
                            href={`${enlace} `}
                            target="_blank"
                          >
                            {enlace}
                          </Link>
                          <br />
                        </>
                      ))}
                    </>
                  )}
                </section>
                {(elementoNoticia.imagen.length > 0 ||
                  elementoNoticia.youtubeUrl.length > 0) && (
                  <section className={stylesPost.lineaPunteada}></section>
                )}
                <section className={stylesPost.seccionGridImagenes}>
                  {elementoNoticia.imagenUrl && (
                    <>
                      {elementoNoticia.imagenUrl.map((url, index) => (
                        <img
                          className={stylesPost.imagen}
                          key={index}
                          src={url}
                          alt="Imagen de Internet (URL)"
                        />
                      ))}
                    </>
                  )}
                  {elementoNoticia.imagen.length > 0 && (
                    <>
                      {elementoNoticia.imagen.map((archivo, index) => (
                        <>
                          <section key={index}>
                            {archivo.includes(".mp4") ? (
                              <>
                                <video
                                  className={stylesPost.imagen}
                                  src={archivo}
                                  property
                                  fill
                                  controls
                                ></video>
                              </>
                            ) : (
                              <img
                                className={stylesPost.imagen}
                                src={archivo}
                              />
                            )}
                          </section>
                        </>
                      ))}
                    </>
                  )}
                  {elementoNoticia.youtubeUrl.length > 0 && (
                    <section>
                      {elementoNoticia.youtubeUrl.map((videoYoutube, index) => (
                        <>
                          <iframe
                            key={elementoNoticia.id_noticia}
                            style={{ width: "100%", aspectRatio: "16 / 9" }}
                            src={videoYoutube.replace("watch?v=", "embed/")}
                            title={`youtube-video-${index}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={stylesPost.imagen}
                          ></iframe>
                        </>
                      ))}
                    </section>
                  )}
                </section>
                {/*      <section className={stylesPost.lineaPunteada}></section>
              <section className={stylesPost.seccionElementos}>
                  <section className={stylesPost.item}>Cajas</section>
                  <section className={stylesPost.item}>Cajas</section>
                  <section className={stylesPost.item}>Cajas</section>
                  <section className={stylesPost.item}>Cajas</section>
                </section> */}
              </section>
            </section>
          ))
        : null}
    </>
  );
};

export default NoticiasPublicadas;
