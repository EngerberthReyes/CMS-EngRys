"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import stylesClave from "../CSS/styles-recuperarContrasena.module.css";
import { useForm } from "react-hook-form";

const recuperarClave = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [mostrarClave, setMostrarClave] = useState(false);
  const [temaActual, setTemaActual] = useState();

  const clave = watch("clave");

  const mostrarPassword = () => {
    setMostrarClave(!mostrarClave);
  };

  const manejarCambioDeTema = (event) => {
    const modoOscuro = event.matches;

    document.body.classList.toggle("modo-oscuro", modoOscuro);
    setTemaActual(modoOscuro ? "oscuro" : "claro");
  };

  useEffect(() => {
    const consultaModoOscuro = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    consultaModoOscuro.addEventListener("change", manejarCambioDeTema);

    setTemaActual(consultaModoOscuro.matches ? "oscuro" : "claro");

    return () => {
      consultaModoOscuro.removeEventListener("change", manejarCambioDeTema);
    };
  }, []);

  const enviarDatos = (datos) => {
    console.log(datos);
  };

  return (
    <>
      <head>
        <title>Recuperar Contraseña</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body id={stylesClave.body_modificable}>
        <section className={`${stylesClave.contenedor_general} w-50`}></section>
        <form
          className={stylesClave.contenedor_form}
          onSubmit={handleSubmit(enviarDatos)}
        >
          <h1 className={stylesClave.titulo_form}>Recuperar Contraseña</h1>
          <label htmlFor="correo" className={stylesClave.label}>
            Correo Electrónico
          </label>
          <input
            id="correo"
            className={`${stylesClave.input_texto} rounded-2`}
            type="email"
            {...register("correo", {
              required: "Introduzca su Correo Electrónico",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato de Correo Electrónico Inválido",
              },
            })}
          />
          {errors.correo && (
            <section className={stylesClave.seccionError}>
              <p className={stylesClave.errorInput}>{errors.correo.message}</p>
            </section>
          )}
          <section className={stylesClave.contenedor_passoword_perdida}>
            <Link className={stylesClave.link_password} href="../registro">
              ¿Aun no tienes una cuenta?
            </Link>
            <Link
              className={stylesClave.link_password}
              href="../recuperar_contrasena"
            >
              ¿Se ha olvido de su contraseña?
            </Link>
          </section>
          <button
            disabled={!isValid}
            className={`${stylesClave.boton} rounded-2`}
            onClick={async () => {
              try {
                const respuesta = await fetch("/API/sendemail", {
                  method: "POST",
                });
                if (!respuesta.ok) {
                  throw new Error("Error en la solicitud");
                }
                const datos = await respuesta.json();
                console.log(datos);
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            Enviar Codigo de Verificación
          </button>
        </form>
      </body>
    </>
  );
};

export default recuperarClave;
