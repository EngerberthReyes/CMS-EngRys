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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body id={stylesRegistro.body}>
        <section
          className={`${stylesRegistro.contenedor_general} w-50`}
        ></section>
        <form className={stylesRegistro.contenedor_form}>
          <h1 className={stylesRegistro.titulo_form}>Registrar Cuenta</h1>
          <label className={stylesRegistro.label}>Nombres</label>
          <input
            className={`${stylesRegistro.input_texto} rounded-2`}
            type="text"
          />
          <label className={stylesRegistro.label}>Apellidos</label>
          <input
            className={`${stylesRegistro.input_texto} rounded-2`}
            type="text"
          />
          <label className={stylesRegistro.label}>Cédula</label>
          <input
            className={`${stylesRegistro.input_texto} rounded-2`}
            type="text"
          />
          <label className={stylesRegistro.label}>Nacionalidad</label>
          <input
            className={`${stylesRegistro.input_texto} rounded-2`}
            type="text"
          />
          <label className={stylesRegistro.label}>Correo Electrónico</label>
          <input
            className={`${stylesRegistro.input_texto} rounded-2`}
            type="text"
          />
          <label className={stylesRegistro.labelClave}>Contraseña</label>
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
          </section>
          <label className={stylesRegistro.labelClave}>Repetir Contraseña</label>
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
          </section>
          <label className={stylesRegistro.label}>Fecha de Nacimiento</label>
          <input
            className={`${stylesRegistro.input_texto} rounded-2`}
            type="text"
          />
          <section className={stylesRegistro.contenedor_passoword_perdida}>
            <Link
              className={stylesRegistro.link_password}
              href="../iniciar_sesion"
            >
              ¿Ya tienes una cuenta?
            </Link>
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
