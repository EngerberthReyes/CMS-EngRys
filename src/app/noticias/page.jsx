"use client";

import Image from "next/image";
import Link from "next/link";
import stylesNoticias from "../CSS/styles-noticias.module.css";

const Noticias = () => {
  console.log("Nuevo Mensaje");
  return (
    <>
      <head>
        <title>Noticias - EpíComputers</title>
        <link rel="icon" href="/IMG/Icono No Lineal.png" type="Image/png" />
      </head>
      <body id={stylesNoticias.body}>
        <header className={stylesNoticias.header}>
          <Link className={stylesNoticias.enlaceNormal} href={'/'}><h1 className={stylesNoticias.tituloHeader}>EpíComputers</h1></Link>
          <section
            className={`${stylesNoticias.seccionEnlace} ${stylesNoticias.seccionEnlaceAumentada}`}
          >
            <Link className={stylesNoticias.enlace} href="/noticias">
              Noticias
            </Link>
            <Link className={stylesNoticias.enlace} href="/sobre_nosotros">
              Sobre Nosotros
            </Link>
            <Link className={stylesNoticias.enlace} href="/contactanos">
              Contactanos
            </Link>
          </section>
          <section className={stylesNoticias.seccionEnlace}>
            <Link className={stylesNoticias.enlace} href="/iniciar_sesion">
              Iniciar Sesión
            </Link>
            <Link className={stylesNoticias.enlace} href="/registro">
              Registrarse
            </Link>
          </section>
        </header>
        <main>
          <section className={stylesNoticias.main}>
            <section className={stylesNoticias.seccionSecundaria}>
              <section className={stylesNoticias.seccionAjustes}>
                <h1>Lateral</h1>
                <section className={stylesNoticias.seccionFlex}>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                </section>
              </section>
            </section>
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
            <section className={stylesNoticias.seccionTerciaria}>
              <section className={stylesNoticias.seccionAjustes}>
                <h1>Lateral</h1>
                <section className={stylesNoticias.seccionFlex}>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                </section>
              </section>
            </section>
          </section>
        </main>
      </body>
    </>
  );
};

export default Noticias;
