"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import stylesRegistro from "../CSS/styles-registro.module.css";

const Registro = () => {
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

  console.log(temaActual);

  console.log(clave);

  console.log(segundaClave);

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

  console.log(mostrarClave);

  const [mostrarSegundaClave, setMostrarSegundaClave] = useState(false);

  const mostrarPassword = (claveInput) => {
    if (claveInput === "PrimeraClave") {
      setClaveActiva(true);
      setMostrarClave(false);
      return;
    } else if (claveInput === "SegundaClave") {
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
          <section className={stylesRegistro.seccionNacionalidad}>
            <select
              className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} rounded-2`}
            >
              <option>V</option>
            </select>
            <input
              className={`${stylesRegistro.input_texto} rounded-2`}
              type="text"
            />
          </section>
          <label className={stylesRegistro.label}>Correo Electrónico</label>
          <input
            className={`${stylesRegistro.input_texto} rounded-2`}
            type="email"
          />
          <label className={stylesRegistro.label}>Fecha de Nacimiento</label>
          <input
            className={`${stylesRegistro.input_texto} ${stylesRegistro.input_fecha} rounded-2`}
            type="date"
          />
          <label className={stylesRegistro.labelClave}>Contraseña</label>
          <section className={stylesRegistro.contenedor_input_password}>
            <input
              className={`${stylesRegistro.input_texto} rounded-2`}
              onChange={obtenerClave}
              type={mostrarClave ? "text" : "password"}
            />
            {temaActual === "oscuro" &&
            mostrarClave &&
            !claveActiva &&
            clave ? (
              <Image
                className={stylesRegistro.icono_password}
                onClick={() => mostrarPassword("PrimeraClave")}
                width={20}
                height={20}
                src={`/BlancoAbierto.svg`}
              />
            ) : null}
            {temaActual === "oscuro" && clave && claveActiva ? (
              <Image
                className={stylesRegistro.icono_password}
                onClick={() => mostrarPassword(clave)}
                width={20}
                height={20}
                src={`/BlancoAbiertoOblicua.svg`}
              />
            ) : null}
                        {temaActual === "claro" &&
            mostrarClave &&
            !claveActiva &&
            clave ? (
              <Image
                className={stylesRegistro.icono_password}
                onClick={() => mostrarPassword("PrimeraClave")}
                width={20}
                height={20}
                src={`/BlancoAbierto.svg`}
              />
            ) : null}
            {temaActual === "claro" && clave && claveActiva ? (
              <Image
                className={stylesRegistro.icono_password}
                onClick={() => mostrarPassword(clave)}
                width={20}
                height={20}
                src={`/BlancoAbiertoOblicua.svg`}
              />
            ) : null}
          </section>
          <label className={stylesRegistro.labelClave}>
            Repetir Contraseña
          </label>
          <section className={stylesRegistro.contenedor_input_password}>
            <input
              className={`${stylesRegistro.input_texto} ${stylesRegistro.input_ultimo} rounded-2`}
              onChange={obtenerSegundaClave}
              type={mostrarSegundaClave ? "text" : "password"}
            />
            {temaActual === "oscuro" &&
            mostrarSegundaClave &&
            !segundaClaveActiva &&
            segundaClave ? (
              <Image
                className={`${stylesRegistro.icono_password} ${stylesRegistro.icono_ultimo}`}
                onClick={() => mostrarPassword("SegundaClave")}
                width={20}
                height={20}
                src={`/BlancoAbierto.svg`}
              />
            ) : null}
            {temaActual === "oscuro" && segundaClave && segundaClaveActiva ? (
              <Image
                className={`${stylesRegistro.icono_password} ${stylesRegistro.icono_ultimo}`}
                onClick={() => mostrarPassword(segundaClave)}
                width={20}
                height={20}
                src={`/BlancoAbiertoOblicua.svg`}
              />
            ) : null}
                        {temaActual === "claro" &&
            mostrarSegundaClave &&
            !segundaClaveActiva &&
            segundaClave ? (
              <Image
                className={`${stylesRegistro.icono_password} ${stylesRegistro.icono_ultimo}`}
                onClick={() => mostrarPassword("SegundaClave")}
                width={20}
                height={20}
                src={`/BlancoAbierto.svg`}
              />
            ) : null}
            {temaActual === "claro" && segundaClave && segundaClaveActiva ? (
              <Image
                className={`${stylesRegistro.icono_password} ${stylesRegistro.icono_ultimo}`}
                onClick={() => mostrarPassword(segundaClave)}
                width={20}
                height={20}
                src={`/BlancoAbiertoOblicua.svg`}
              />
            ) : null}
          </section>
          <section className={stylesRegistro.contenedor_passoword_perdida}>
            <Link
              className={stylesRegistro.link_password}
              href="../iniciar_sesion"
            >
              ¿Ya tienes una cuenta?
            </Link>
          </section>
          <button
            className={`${stylesRegistro.boton} rounded-2`}
            onClick={verificacion}
          >
            Registrarse
          </button>
        </form>
      </body>
    </>
  );
};

export default Registro;
