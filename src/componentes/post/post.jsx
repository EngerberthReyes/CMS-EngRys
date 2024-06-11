"use client";

import Image from "next/image";
import Link from "next/link";
import stylesPost from "../CSSComponentes/post.module.css";

const Post = ({ post }) => {
  console.log(post);
  return (
    <>
      {post
        .slice()
        .reverse()
        .map((elementoPost, index) => (
          <section
            key={elementoPost.id}
            className={stylesPost.seccionPrincipal}
          >
            <section className={stylesPost.seccionGrid}>
              <h1>Las Opciones Van Aqui Arriba</h1>
              <section>
                <h1 className={stylesPost.mensaje}>{elementoPost.mensaje}</h1>
              </section>
              {(elementoPost.imagen.length > 0 ||
                elementoPost.imagenUrl.length > 0) && (
                <section className={stylesPost.lineaPunteada}></section>
              )}
              <section className={stylesPost.seccionGridImagenes}>
                {elementoPost.imagenUrl && (
                  <>
                    {elementoPost.imagenUrl.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt="Imagen subida"
                        style={{ marginTop: "10px", maxWidth: "100%" }}
                      />
                    ))}
                  </>
                )}
                {elementoPost.imagen && (
                  <>
                    {elementoPost.imagen.map((archivo, index) => (
                      <>
                        <section key={index}>
                          {elementoPost.imagen &&
                          archivo.name.includes(".mp4") ? (
                            <>
                              <video
                                className={stylesPost.imagen}
                                src={URL.createObjectURL(archivo)}
                                property
                                fill
                                controls
                              ></video>
                            </>
                          ) : (
                            <img
                              className={stylesPost.imagen}
                              src={URL.createObjectURL(archivo)}
                            />
                          )}
                        </section>
                      </>
                    ))}
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
        ))}
    </>
  );
};

export default Post;
