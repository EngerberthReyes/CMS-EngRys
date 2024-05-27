"use client";

import Image from "next/image";
import Link from "next/link";
import stylesNoticias from "../CSSComponentes/post.module.css";

const Post = ({ post }) => {
  console.log(post);
  return (
    <>
      {post
        .slice()
        .reverse()
        .map((elementoPost, index) => (
          <section key={elementoPost.id} className={stylesNoticias.seccionPrincipal}>
            <section className={stylesNoticias.seccionGrid}>
              <h1>Aqui va algo</h1>
              <section>
                <h1>{elementoPost.mensaje}</h1>
              </section>
              <section className={stylesNoticias.seccionElementos}>
                <section>Cajas</section>
                <section>Cajas</section>
                <section>Cajas</section>
                <section>Cajas</section>
              </section>
            </section>
          </section>
        ))}
    </>
  );
};

export default Post;
