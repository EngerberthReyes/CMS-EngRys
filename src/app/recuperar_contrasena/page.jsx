"use client";

import Image from "next/image";
import Link from "next/link";
import stylesContrasena from "../CSS/styles-recuperarContrasena.module.css";

const RecuperarContraseña = () => {
  const mostrarPassword = () => {
    alert("Le Diste Click a La Contraseña");
  };
  console.log("Nuevo Mensaje");
  return (
    <>
      <head>
        <title>Recuperar Contraseña</title>
        <link rel="icon" href="/eye-solid.svg" />
      </head>
      <body>
        <section className={stylesContrasena.contenedor_general}></section>
        <form className={stylesContrasena.contenedor_form}>
          <h1 className={stylesContrasena.titulo_form}>Recuperar Algo</h1>
          <label className={stylesContrasena.label}>Algo</label>
          <input
            className={`${stylesContrasena.input_texto} rounded-2`}
            type="text"
          />
          <label className={stylesContrasena.label}>Algo 2</label>
          <section className={stylesContrasena.contenedor_input_password}>
            <input
              className={`${stylesContrasena.input_texto} rounded-2`}
              type="text"
            />
            <Image
              className={stylesContrasena.icono_password}
              onClick={mostrarPassword}
              width={20}
              height={20}
              src={`/eye-solid.svg`}
            />
            <section className={stylesContrasena.cotenedor_passoword_perdida}>
              <Link className={stylesContrasena.link_password} href="/">
                Volver al Inicio Sesión
              </Link>
            </section>
          </section>
          <button className={`${stylesContrasena.boton} rounded-2`}>
            Continuar
          </button>
        </form>
      </body>
    </>
  );
};

export default RecuperarContraseña;
