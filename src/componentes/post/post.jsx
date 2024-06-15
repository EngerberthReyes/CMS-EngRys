"use client";

import Image from "next/image";
import Link from "next/link";
import Details from "@/componentes/tiptap/Details";
import stylesPost from "../CSSComponentes/post.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Post = ({ post, nombreDeUsuario, usuario }) => {
  console.log(post);

  const [nombreDeUsuarioBD, setNombreDeUsuarioBD] = useState("");

  useEffect(() => {
    if (!post || !Array.isArray(post)) return;

    const nombresDeUsuarios = post
      .map((elementoUsuario, index) => {
        const nombreCompleto = `${elementoUsuario.nombre} ${elementoUsuario.apellido}`;
        const nombreApellido = nombreCompleto ? nombreCompleto.split(" ") : [];
        const nombreDeUsuario = `${nombreApellido[0]} ${
          nombreApellido[nombreApellido.length - 1]
        }`;
        return nombreDeUsuario;
      });

    setNombreDeUsuarioBD(nombresDeUsuarios[nombresDeUsuarios.length - 1]);
  }, [post]);

  console.log(nombreDeUsuarioBD);

  return (
    <>
      {post.length > 0
        ? post
            .map((elementoPost, index) => (
              <section key={index} className={stylesPost.seccionPrincipal}>
                <section className={stylesPost.seccionGrid}>
                  <section style={{ display: "flex", width: "95%" }}>
                    {!usuario ? (
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
                              usuario?.fotoPerfil
                                ? usuario.fotoPerfil
                                : "/IMG/epigrafe73.png"
                            }
                          />
                          <section style={{ wordBreak: "keep-all" }}>
                            <section>{nombreDeUsuario}</section>
                          </section>
                        </Link>
                      </>
                    ) : (
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
                              elementoPost.fotoPerfil
                                ? elementoPost.fotoPerfil
                                : "/IMG/epigrafe73.png"
                            }
                          />
                          <section style={{ wordBreak: "keep-all" }}>
                            <section>{nombreDeUsuarioBD}</section>
                          </section>
                        </Link>
                      </>
                    )}
                  </section>
                  <section>
                    <>
                      {elementoPost.mensaje && (
                        <Details description={elementoPost.mensaje} />
                      )}
                    </>
                    {elementoPost.enlaces && (
                      <>
                        {elementoPost.enlaces.map((enlace, index) => (
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
                  {elementoPost.imagen.length > 0 && (
                    <section className={stylesPost.lineaPunteada}></section>
                  )}
                  <section className={stylesPost.seccionGridImagenes}>
                    {elementoPost.imagenUrl && (
                      <>
                        {elementoPost.imagenUrl.map((url, index) => (
                          <img
                            className={stylesPost.imagen}
                            key={index}
                            src={url}
                            alt="Imagen de Internet (URL)"
                          />
                        ))}
                      </>
                    )}
                    {elementoPost.imagen.length > 0 && (
                      <>
                        {elementoPost.imagen.map((archivo, index) => (
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
                        {elementoPost.youtubeUrl.length > 0 && (
                          <section>
                            {elementoPost.imagen.length === 0 && (
                              <section
                                className={stylesPost.lineaPunteada}
                              ></section>
                            )}
                            {elementoPost.youtubeUrl.map(
                              (videoYoutube, index) => (
                                <>
                                  <iframe
                                    key={elementoPost.id_publicacion}
                                    style={{ width: "100%" }}
                                    src={videoYoutube.replace(
                                      "watch?v=",
                                      "embed/"
                                    )}
                                    title={`youtube-video-${index}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className={stylesPost.imagen}
                                  ></iframe>
                                </>
                              )
                            )}
                          </section>
                        )}
                      </>
                    )}
                  </section>
                  <section className={stylesPost.lineaPunteada}></section>
                  <section className={stylesPost.seccionElementos}>
                    <section className={stylesPost.item}>Cajas</section>
                    <section className={stylesPost.item}>Cajas</section>
                    <section className={stylesPost.item}>Cajas</section>
                    <section className={stylesPost.item}>Cajas</section>
                  </section>
                </section>
              </section>
            ))
        : null}
    </>
  );
};

export default Post;
