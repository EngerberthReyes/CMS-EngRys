"use client";

import Image from "next/image";
import Link from "next/link";
import stylesNoticias from "../CSSComponentes/post.module.css";

const Post = () => {
  console.log("Nuevo Mensaje");
  return (
    <>
      <section className={stylesNoticias.seccionPrincipal}>
        <section className={stylesNoticias.seccionGrid}>
          <h1>Aqui va algo</h1>
          <section>
            <textarea className={stylesNoticias.textArea}></textarea>
          </section>
          <section className={stylesNoticias.seccionElementos}>
            <section>Cajas</section>
            <section>Cajas</section>
            <section>Cajas</section>
            <section>Cajas</section>
          </section>
        </section>
      </section>
    </>
  );
};

export default Post;
