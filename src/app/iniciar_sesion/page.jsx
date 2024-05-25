"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import stylesLogin from "../CSS/styles-login.module.css";
import { useForm } from "react-hook-form";

const Login = () => {
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
        <title>Iniciar Sesión</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body id={stylesLogin.body_modificable}>
        <section className={`${stylesLogin.contenedor_general} w-50`}></section>
        <form
          className={stylesLogin.contenedor_form}
          onSubmit={handleSubmit(enviarDatos)}
        >
          <h1 className={stylesLogin.titulo_form}>Iniciar Sesión</h1>
          <label htmlFor="correo" className={stylesLogin.label}>
            Correo Electrónico
          </label>
          <input
            id="correo"
            className={`${stylesLogin.input_texto} rounded-2`}
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
            <section className={stylesLogin.seccionError}>
              <p className={stylesLogin.errorInput}>{errors.correo.message}</p>
            </section>
          )}
          <label htmlFor="clave" className={stylesLogin.labelClave}>
            Contraseña
          </label>
          <section className={stylesLogin.contenedor_input_password}>
            <input
              id="clave"
              className={`${stylesLogin.input_texto} rounded-2`}
              type={mostrarClave ? "text" : "password"}
              {...register("clave", {
                required: "Introduzca una Contraseña",
                minLength: {
                  value: 8,
                  message: "La Contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
            {mostrarClave ? (
              <Image
                className={stylesLogin.icono_password}
                onClick={() => mostrarPassword(clave)}
                width={20}
                height={20}
                src={
                  temaActual === "oscuro"
                    ? `/BlancoAbierto.svg`
                    : `/OjoNegroAbierto.svg`
                }
                alt="Ocultar Contraseña"
              />
            ) : (
              <Image
                className={stylesLogin.icono_password}
                onClick={() => mostrarPassword(clave)}
                width={20}
                height={20}
                src={
                  temaActual === "oscuro"
                    ? `/BlancoAbiertoOblicua.svg`
                    : `/OjoNegroAbiertoOblicuo.svg`
                }
                alt="Mostrar Contraseña"
              />
            )}
          </section>
          {errors.clave && (
            <section className={stylesLogin.seccionError}>
              <p className={stylesLogin.errorInput}>{errors.clave.message}</p>
            </section>
          )}
          <section className={stylesLogin.contenedor_passoword_perdida}>
            <Link className={stylesLogin.link_password} href="../registro">
              ¿Aun no tienes una cuenta?
            </Link>
            <Link
              className={stylesLogin.link_password}
              href="../recuperar_contrasena"
            >
              ¿Se ha olvido de su contraseña?
            </Link>
          </section>
          <button
            disabled={!isValid}
            type="submit"
            className={`${stylesLogin.boton} rounded-2`}
          >
            Iniciar Sesión
          </button>
          <button
          className={`${stylesLogin.boton} rounded-2`}
          onClick={async () => {
            try {
              const respuesta = await fetch("/API/sendemail", {
                method: "POST",
              });
              if (!respuesta.ok) {
                throw new Error('Error en la solicitud');
              }
              const datos = await respuesta.json();
              console.log(datos);
            } catch (error) {
              console.error('Error:', error);
            }
          }}
        >
          Enviar Correo
        </button>
        </form>
      </body>
    </>
  );
};

export default Login;
