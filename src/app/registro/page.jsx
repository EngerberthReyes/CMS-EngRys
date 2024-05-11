"use client";

import Image from "next/image";
import Link from "next/link";
import stylesRegistro from "../CSS/styles-registro.module.css";

const Registro = () => {
  const mostrarPassword = () => {
    alert("Le Diste Click a La Contraseña");
  };
  console.log("Nuevo Mensaje");
  return (
    <>
      <head>
        <title>Registrar Cuenta</title>
        <link rel="icon" href="/eye-solid.svg" />
      </head>
      <body>
        <section className={`${stylesRegistro.contenedor_general} w-50`}></section>
        <form className={stylesRegistro.contenedor_form}>
          <h1 className={stylesRegistro.titulo_form}>Registrar Algo</h1>
          <label className={stylesRegistro.label}>Algo</label>
          <input
            className={`${stylesRegistro.input_texto} rounded-2`}
            type="text"
          />
          <label className={stylesRegistro.label}>Algo 2</label>
          <section className={stylesRegistro.contenedor_input_password}>
            <input
              className={`${stylesRegistro.input_texto} rounded-2`}
              type="text"
            />
            <Image
              className={stylesRegistro.icono_password}
              onClick={mostrarPassword}
              width={20}
              height={20}
              src={`/eye-solid.svg`}
            />
            <section className={stylesRegistro.cotenedor_passoword_perdida}>
              <Link className={stylesRegistro.link_password} href="/">
                ¿Ya dispone de una cuenta?
              </Link>
            </section>
          </section>
          <button className={`${stylesRegistro.boton} rounded-2`}>
            Registrarse
          </button>
        </form>
      </body>
    </>
  );
};

export default Registro;
