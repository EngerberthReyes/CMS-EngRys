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
      <body style={{ alignItems: "flex-start" }}>
        <header className={stylesInicio.header}>
          <h1>Header</h1>
          <button className={`${stylesInicio.boton} rounded-2`}>
            Iniciar Sesión
          </button>
        </header>
      </body>
    </>
  );
};

export default Inicio;
