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
                <h1>{elementoPost.mensaje}</h1>
              </section>
              {elementoPost.imagen.length > 0 && (
                <section className={stylesPost.lineaPunteada}></section>
              )}
              <section className={stylesPost.seccionGridImagenes}>
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
                                alt={archivo.name.includes(".mp4")}
                                src={URL.createObjectURL(archivo)}
                                property
                                fill
                                controls
                              ></video>
                            </>
                          ) : (
                            <Image
                              className={stylesPost.imagen}
                              alt={archivo.name}
                              src={URL.createObjectURL(archivo)}
                              property
                              fill
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
