"use client";

import Image from "next/image";
import Link from "next/link";
import Details from "@/componentes/tiptap/Details";
import stylesPost from "../CSSComponentes/post.module.css";
import axios from "axios";
import { useEffect } from "react";

const Post = ({ post, nombreDeUsuario, usuario }) => {
  console.log(post);
  return (
    <>
      {post.length > 0
        ? post
            .slice()
            .reverse()
            .map((elementoPost, index) => (
              <section
                key={elementoPost.id_publicacion}
                className={stylesPost.seccionPrincipal}
              >
                <section className={stylesPost.seccionGrid}>
                  <section style={{ display: "flex", width: "95%" }}>
                    {usuario && (
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
                          }}
                          href="/perfil"
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
                          <Link
                            key={index}
                            className={stylesPost.mensaje}
                            href={`${enlace} `}
                            target="_blank"
                          >
                            {`${enlace} `}
                          </Link>
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
