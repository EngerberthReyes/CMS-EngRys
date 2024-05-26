"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import stylesClave from "../CSS/styles-recuperarContrasena.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const recuperarClave = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [temaActual, setTemaActual] = useState();

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

  const generarCodigoRandom = (longitud) => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indiceAleatorio];
    }
    return codigo;
  };

  const enviarDatos = async (dato) => {
    const codigo = generarCodigoRandom(11);
    try {
      const correoElectronico = dato.correo;
      console.log(correoElectronico)
      const respuesta = await axios.post("/API/sendemail", {
        codigo,
        correoElectronico,
      });
  
      if (respuesta.status < 200 || respuesta.status >= 300) {
        throw new Error("Error en la solicitud");
      }
  
      const datos = respuesta.data;
      console.log(datos);
    } catch (error) {
      console.error("Error:", error);
    }
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
              href="../iniciar_sesion"
            >
              ¿Ya tienes una cuenta?
            </Link>
          </section>
          <button
            disabled={!isValid}
            className={`${stylesClave.boton} rounded-2`}
          >
            Enviar Codigo de Verificación
          </button>
        </form>
      </body>
    </>
  );
};

export default recuperarClave;
