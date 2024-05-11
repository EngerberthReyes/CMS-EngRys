"use client";

import Image from "next/image";
import Link from "next/link";
import stylesLogin from "./CSS/styles-login.module.css";

const Index = () => {
  const mostrarPassword = () => {
    alert("Le Diste Click a La Contraseña");
  };
  console.log("Nuevo Mensaje");
  return (
    <>
      <head>
        <title>Hola</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <section className={`${stylesLogin.contenedor_general} w-50`}></section>
      <form className={stylesLogin.contenedor_form}>
        <h1 className={stylesLogin.titulo_form}>Iniciar Sesión</h1>
        <label className={stylesLogin.label}>Algo</label>
        <input className={`${stylesLogin.input_texto} rounded-2`} type="text" />
        <label className={stylesLogin.label}>Algo 2</label>
        <section className={stylesLogin.contenedor_input_password}>
          <input
            className={`${stylesLogin.input_texto} rounded-2`}
            type="text"
          />
          <Image
            className={stylesLogin.icono_password}
            onClick={mostrarPassword}
            width={20}
            height={20}
            src={`/eye-solid.svg`}
          />
          <section className={stylesLogin.cotenedor_passoword_perdida}>
            <Link className={stylesLogin.link_password} href="/registro">
              ¿Has olvidado tu contraseña?
            </Link>
          </section>
        </section>
        <button className={`${stylesLogin.boton} rounded-2`}>Iniciar Sesión</button>
      </form>
    </>
  );
};

export default Index;
