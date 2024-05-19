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
      <body style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", rowGap: "5%"}}>
        <header className={stylesInicio.header}>
          <h1>CMS</h1>
          <button className={`${stylesInicio.boton} rounded-2`}>
            Iniciar Sesión
          </button>
        </header>
        <section className={stylesInicio.seccionPrincipal}>
          <section>
        <h1>Aqui va algo</h1>
          <section>
            <section>Cajas</section>
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
          <section>
            <h1>Lateral</h1>
            <section>
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
      </body>
    </>
  );
};

export default Inicio;
