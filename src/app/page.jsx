"use client";

import Image from "next/image";
import Link from "next/link";
import stylesInicio from "./CSS/styles-inicio.module.css";

const Inicio = () => {
  console.log("Nuevo Mensaje");
  return (
    <>
      <head>
        <title>inicio - CMS</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body id={stylesInicio.body}>
        <header className={stylesInicio.header}>
          <h1 className={stylesInicio.tituloHeader}>CMS</h1>
          <section className={stylesInicio.seccionEnlace}>
            <Link className={stylesInicio.enlace} href="/iniciar_sesion">
              Iniciar Sesión
            </Link>
            <Link className={stylesInicio.enlace} href="/registro">
              Registrarse
            </Link>
          </section>
        </header>
        <main className={stylesInicio.main}>
          <section className={stylesInicio.seccionSecundaria}>
            <section className={stylesInicio.seccionAjustes}>
              <h1>Lateral</h1>
              <section className={stylesInicio.seccionFlex}>
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
          <section className={stylesInicio.seccionPrincipal}>
            <section className={stylesInicio.seccionGrid}>
              <h1>Aqui va algo</h1>
              <section className={stylesInicio.seccionElementos}>
                <section>
                  <Image
                    className={stylesInicio.elemento}
                    src={"/IMG/epigrafe73.png"}
                    width={200}
                    height={200}
                    alt={"Imagen"}
                  />
                </section>
                <section>Cajas</section>
                <section>Cajas</section>
                <section>Cajas</section>
                <section>Cajas</section>
                <section>Cajas</section>
                <section>Cajas</section>
                <section>Cajas</section>
                <section>Cajas</section>
              </section>
            </section>
          </section>
        </main>
      </body>
    </>
  );
};

export default Inicio;
