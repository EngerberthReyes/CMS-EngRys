"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import stylesLogin from "../CSS/styles-login.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const enrutadorMaster = useRouter();

  const [mostrarClave, setMostrarClave] = useState(false);
  const [temaActual, setTemaActual] = useState();

  const clave = watch("clave");
  const correo = watch("correo");
  const [claves, setClaves] = useState([]);
  const [mensajeClave, setMensajeClave] = useState("");
  const [estatusClave, setEstatusClave] = useState(false);
  const [correos, setCorreos] = useState([]);
  const [mensajeCorreo, setMensajeCorreo] = useState("");
  const [estatusCorreo, setEstatusCorreo] = useState(false);
  const [idPersona, setIdPersona] = useState([]);
  const [informacionPersona, setInformacionPersona] = useState([]);

  const obtenerInformacionBaseDeDatos = async () => {
    try {
      const datosRepetidos = await axios.get("../API/personas");
      const dataPersona = datosRepetidos.data.personas;
      setInformacionPersona(dataPersona);
    } catch (error) {
      console.error(
        "Error al obtener las cédulas de la base de datos: ",
        error
      );
      throw new Error("Error al obtener las cédulas de la base de datos.");
    }
  };

  useEffect(() => {
    obtenerInformacionBaseDeDatos();
  }, []);

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

  const enviarDatos = async (datos) => {
    const { correo, clave } = datos;

    const resultadoFiltroPersona = informacionPersona.filter((persona) => {
      return persona.correo_electronico === correo && persona.clave === clave;
    });

    console.log(resultadoFiltroPersona);

    if (resultadoFiltroPersona.length === 0) {
      setEstatusClave(true);
      setEstatusCorreo(true);
    } else {
      if (resultadoFiltroPersona) {
        setEstatusClave(false);
        alert("clave bien", clave);
        setEstatusCorreo(false);
        alert("correo bien", correo);
        enrutadorMaster.push("../noticias");
      }

      try {
        const envio = await axios.get(
          `../API/personas/usuario/${resultadoFiltroPersona.id_personas}`
        );
      } catch (error) {
        console.error(error);
      }

      console.log(datos);
    }
  };

  return (
    <>
      <head>
        <title>Iniciar Sesión</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesLogin.body_modificable}>
        <section className={`${stylesLogin.contenedor_general} w-50`}>
          <Link className={stylesLogin.enlace} href="/">
            Página Principal
          </Link>
        </section>
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
              /* pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              }, */
            })}
          />
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
          {(estatusCorreo === true || estatusClave === true) && (
            <section className={stylesLogin.seccionError}>
              <p className={stylesLogin.errorInput}>
                La Contraseña o el Correo Electrónico Son Incorrectos
              </p>
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
        </form>
      </body>
    </>
  );
};

export default Login;
