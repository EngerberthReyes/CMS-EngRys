"use client";

import Image from "next/image";
import Link from "next/link";
import stylesNosotros from "../CSS/styles-sobreNosotros.module.css";

const SobreNosotros = () => {
  console.log("Nuevo Mensaje");
  return (
    <>
      <head>
        <title>Sobre Nosotros - EpíComputers</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesNosotros.body}>
        <header className={stylesNosotros.header}>
          <Link className={stylesNosotros.enlaceNormal} href={"/"}>
            <h1 className={stylesNosotros.tituloHeader}>EpíComputers</h1>
          </Link>
          <section
            className={`${stylesNosotros.seccionEnlace} ${stylesNosotros.seccionEnlaceAumentada}`}
          >
            <Link className={stylesNosotros.enlace} href="/noticias">
              Noticias
            </Link>
            <Link className={stylesNosotros.enlace} href="/sobre_nosotros">
              Sobre Nosotros
            </Link>
            <Link className={stylesNosotros.enlace} href="/contactanos">
              Contactanos
            </Link>
          </section>
          <section className={stylesNosotros.seccionEnlace}>
            <Link className={stylesNosotros.enlace} href="/iniciar_sesion">
              Iniciar Sesión
            </Link>
            <Link className={stylesNosotros.enlace} href="/registro">
              Registrarse
            </Link>
          </section>
        </header>
        <main>
          <section
            className={`${stylesNosotros.main} ${stylesNosotros.seccionSecundariaAjuste}`}
          >
            <section
              className={`${stylesNosotros.seccionPrincipal} ${stylesNosotros.seccionSecundariaAjuste}`}
            >
              <section className={stylesNosotros.seccionGrid}>
                <h1>Aqui va algo</h1>
                <section>
                  <h1>Aqui Podria ir otra cosa</h1>
                </section>
              </section>
            </section>
          </section>
          <section className={stylesNosotros.main}>
            <section className={stylesNosotros.seccionSecundaria}>
              <section className={stylesNosotros.seccionAjustes}>
                <h1>Aqui podrias poner Puntos sobre nuestros servicios</h1>
                <section className={stylesNosotros.seccionFlex}>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                </section>
              </section>
            </section>
            <section className={stylesNosotros.seccionPrincipal}>
              <section className={stylesNosotros.seccionGrid}>
                <h1>Aqui muchas mas cosas</h1>
                <section>
                  <h1>Aqui se podria poner una descripción de algo</h1>
                  <p>Texto</p>
                </section>
              </section>
            </section>
          </section>
        </main>
      </body>
    </>
  );
};

export default SobreNosotros;
