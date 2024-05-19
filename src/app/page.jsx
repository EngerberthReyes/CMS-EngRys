"use client";

import Image from "next/image";
import Link from "next/link";
import stylesInicio from "./CSS/styles-inicio.module.css";

const Inicio = () => {
  const mostrarPassword = () => {
    alert("Le Diste Click a La Contraseña");
  };
  console.log("Nuevo Mensaje");
  return (
    <>
      <head>
        <title>inicio - CMS</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={stylesInicio.body}>
        <section className={`${stylesInicio.contenedor_general} w-50`}></section>
        <form className={stylesInicio.contenedor_form}>
          <h1 className={stylesInicio.titulo_form}>Iniciar Sesión</h1>
          <label className={stylesInicio.label}>Algo</label>
          <input
            className={`${stylesInicio.input_texto} rounded-2`}
            type="text"
          />
          <label className={stylesInicio.label}>Algo 2</label>
          <section className={stylesInicio.contenedor_input_password}>
            <input
              className={`${stylesInicio.input_texto} rounded-2`}
              type="text"
            />
            <Image
              className={stylesInicio.icono_password}
              onClick={mostrarPassword}
              width={20}
              height={20}
              src={`/eye-solid.svg`}
            />
          </section>
          <section className={stylesInicio.contenedor_passoword_perdida}>
            <Link className={stylesInicio.link_password} href="/registro">
              ¿Aún no tienes cuenta?
            </Link>
            <Link
              className={stylesInicio.link_password}
              href="/recuperar_contrasena"
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </section>
          <button className={`${stylesInicio.boton} rounded-2`}>
            Iniciar Sesión
          </button>
        </form>
      </body>
    </>
  );
};

export default Inicio;
