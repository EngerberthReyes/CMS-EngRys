"use client";

import Image from "next/image";
import Link from "next/link";
import Details from "@/componentes/tiptap/Details";
import stylesPost from "../CSSComponentes/post.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Post = ({ post, nombreDeUsuario, usuario, enviandoBorrado }) => {
  console.log(post);
  console.log(usuario);
  const borrarPublicacion = async (idPublicacion) => {
    try {
      const respuestaBorrado = await axios.delete(
        `http://localhost:3000/API/publicaciones/${idPublicacion}`
      );

      const publicacionBorrada = respuestaBorrado;

      enviandoBorrado(publicacionBorrada);
    } catch (error) {
      console.error("Error al borrar la publicación:", error);
    }
  };

  return (
    <>
      {post.length > 0
        ? post.map((elementoPost, index) => (
            <section
              key={elementoPost.id_publicacion}
              className={stylesPost.seccionPrincipal}
            >
              <section className={stylesPost.seccionGrid}>
                <section
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {elementoPost?.id_persona !== usuario?.idPersona &&
                  usuario?.idRol !== 1 &&
                  usuario !== undefined ? (
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
                          style={{ objectFit: "cover" }}
                          src={
                            elementoPost?.fotoPerfil
                              ? elementoPost.fotoPerfil
                              : "/IMG/epigrafe73.png"
                          }
                        />
                        <section style={{ wordBreak: "keep-all" }}>
                          <section>
                            {`${elementoPost.nombre.split(" ")[0]}
                              ${elementoPost.apellido.split(" ")[0]}`}
                          </section>
                        </section>
                      </Link>
                    </>
                  ) : (
                    <>
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
                              style={{ objectFit: "cover" }}
                              src={
                                elementoPost.fotoPerfil
                                  ? elementoPost.fotoPerfil
                                  : "/IMG/epigrafe73.png"
                              }
                            />
                            <section style={{ wordBreak: "keep-all" }}>
                              <section>
                                {`${elementoPost.nombre.split(" ")[0]}
                              ${elementoPost.apellido.split(" ")[0]}`}
                              </section>
                            </section>
                          </Link>
                          {elementoPost?.id_persona === usuario?.idPersona &&
                            usuario?.idRol !== 1 &&
                            usuario !== undefined && (
                              <section
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
                                  borrarPublicacion(elementoPost.id_publicacion)
                                }
                              >
                                <Image
                                  className={stylesPost.imagenes}
                                  width={20}
                                  height={20}
                                  style={{ height: "2rem", borderRadius: "0" }}
                                  src={"/x-solid.svg"}
                                />
                                <section style={{ wordBreak: "keep-all" }}>
                                  <section>Eliminar Publicación</section>
                                </section>
                              </section>
                            )}
                        </section>
                      </>
                    </>
                  )}
                  {usuario?.idRol === 1 && usuario !== undefined ? (
                    <>
                      <section
                        className={`${stylesPost.enlace} ${stylesPost.seccionBorrar} ${stylesPost.usuarioPerfil}`}
                        style={{
                          border: "none",
                          wordBreak: "keep-all",
                          width: "22rem",
                          height: "4rem",
                          margin: "0 0 1rem 0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          borrarPublicacion(elementoPost.id_publicacion)
                        }
                      >
                        <Image
                          className={stylesPost.imagenes}
                          width={20}
                          height={20}
                          style={{ height: "2rem", borderRadius: "0" }}
                          src={"/x-solid.svg"}
                        />
                        <section style={{ wordBreak: "keep-all" }}>
                          <section>Eliminar Publicación</section>
                        </section>
                      </section>
                    </>
                  ) : null}
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
                {(elementoPost.imagen.length > 0 ||
                  elementoPost?.youtubeUrl.length > 0) && (
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
                                  style={{
                                    objectFit: "contain",
                                  }}
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
                  {elementoPost?.youtubeUrl.length > 0 && (
                    <section>
                      {elementoPost?.youtubeUrl.map((videoYoutube, index) => (
                        <>
                          <iframe
                            key={elementoPost.id_publicacion}
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

export default Post;
