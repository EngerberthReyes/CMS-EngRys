"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import stylesLogin from "../CSS/styles-login.module.css";

const Login = () => {
  const [clave, setClave] = useState();

  const [segundaClave, setSegundaClave] = useState();

  const [claveActiva, setClaveActiva] = useState(true);

  const [segundaClaveActiva, setSegundaClaveActiva] = useState(true);

  const manejarCambioDeTema = (event) => {
    const modoOscuro = event.matches;

    document.body.classList.toggle("modo-oscuro", modoOscuro);
    return modoOscuro ? "oscuro" : "claro";
  };

  const consultaModoOscuro = window.matchMedia("(prefers-color-scheme: dark)");
  consultaModoOscuro.addEventListener("change", manejarCambioDeTema);

  const temaActual = manejarCambioDeTema({
    matches: consultaModoOscuro.matches,
  });

  const obtenerClave = (event) => {
    setClave(event.target.value);
  };

  const obtenerSegundaClave = (event) => {
    setSegundaClave(event.target.value);
  };

  const verificacion = () => {
    if (clave && segundaClave) {
      if (clave === segundaClave) {
        alert("¡Es correcto!");
      } else {
        alert("Las claves no coinciden.");
      }
    } else {
      alert("Por favor ingresa ambas claves.");
    }
  };

  const [mostrarClave, setMostrarClave] = useState();

  const [mostrarSegundaClave, setMostrarSegundaClave] = useState(false);

  const mostrarPassword = (claveInput) => {
    if (claveInput === "PrimeraClave") {
      setClaveActiva(true);
      setMostrarClave(false);
      return;
    }

    if (claveInput === "SegundaClave") {
      setSegundaClaveActiva(true);
      setMostrarSegundaClave(false);
      return;
    }

    if (claveInput === clave) {
      setMostrarClave(claveInput);
      setClaveActiva(false);
    } else if (claveInput === segundaClave) {
      setMostrarSegundaClave(claveInput);
      setSegundaClaveActiva(false);
    } else {
    }
  };

  return (
    <>
      <head>
        <title>Iniciar Sesión</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body id={stylesLogin.body_modificable}>
        <section className={`${stylesLogin.contenedor_general} w-50`}></section>
        <form className={stylesLogin.contenedor_form}>
          <h1 className={stylesLogin.titulo_form}>Iniciar Sesión</h1>
          <label className={stylesLogin.label}>
            Nombre o Correo Electrónico
          </label>
          <input
            className={`${stylesLogin.input_texto} rounded-2`}
            type="text"
          />
          <label className={stylesLogin.labelClave}>Contraseña</label>
          <section className={stylesLogin.contenedor_input_password}>
            <input
              className={`${stylesLogin.input_texto} rounded-2`}
              onChange={obtenerClave}
              type={mostrarClave ? "text" : "password"}
            />
            {temaActual === "oscuro" &&
            mostrarClave &&
            !claveActiva &&
            clave ? (
              <Image
                className={stylesLogin.icono_password}
                onClick={() => mostrarPassword("PrimeraClave")}
                width={20}
                height={20}
                src={`/BlancoAbierto.svg`}
              />
            ) : null}
            {temaActual === "oscuro" && clave && claveActiva ? (
              <Image
                className={stylesLogin.icono_password}
                onClick={() => mostrarPassword(clave)}
                width={20}
                height={20}
                src={`/BlancoAbiertoOblicua.svg`}
              />
            ) : null}
            {temaActual === "claro" && mostrarClave && !claveActiva && clave ? (
              <Image
                className={stylesLogin.icono_password}
                onClick={() => mostrarPassword("PrimeraClave")}
                width={20}
                height={20}
                src={`/OjoNegroAbierto.svg`}
              />
            ) : null}
            {temaActual === "claro" && clave && claveActiva ? (
              <Image
                className={stylesLogin.icono_password}
                onClick={() => mostrarPassword(clave)}
                width={20}
                height={20}
                src={`/OjoNegroAbiertoOblicuo.svg`}
              />
            ) : null}
          </section>
          <section className={stylesLogin.contenedor_passoword_perdida}>
            <Link className={stylesLogin.link_password} href="../registro">
              ¿Aun no tienes una cuenta?
            </Link>
            <Link className={stylesLogin.link_password} href="../recuperar_contrasena">
              ¿Se ha olvido de su contraseña?
            </Link>
          </section>
          <button
            className={`${stylesLogin.boton} rounded-2`}
            onClick={verificacion}
          >
            Iniciar Sesión
          </button>
        </form>
      </body>
    </>
  );
};

export default Login;
