"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Notificacion } from "@/componentes/notificaciones/notificaciones.jsx";
import stylesClave from "../CSS/styles-recuperarContrasena.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const recuperarClave = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const enrutadorMaster = useRouter();

  const [temaActual, setTemaActual] = useState();
  const [mensajeCorreoAceAceptado, setMensajeCorreoAceptado] = useState(false);
  const [pasoFormulario, setPasoFormulario] = useState(1);
  const [timeLeft, setTimeLeft] = useState(120);
  const [codigoEnviado, setCodigoEnviado] = useState();
  const [correoNoValido, setCorreoNoValido] = useState(false);

  console.log(correoNoValido);

  if (correoNoValido) {
    setTimeout(() => {
      setCorreoNoValido(false);
    }, 2000);
  }

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

  const retroceder = () => {
    setPasoFormulario(pasoFormulario - 1);
    setCodigoEnviado("");
    setTimeLeft(120);
  };

  const generarCodigoRandom = (longitud) => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indiceAleatorio];
    }
    return codigo;
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    setCodigoEnviado("");
    enrutadorMaster.push("/iniciar_sesion");
  }, [timeLeft]);

  const padNumber = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedMinutes = padNumber(minutes);
  const formattedSeconds = padNumber(seconds);

  let displayText;
  if (minutes === 0 && seconds === 0) {
    displayText = "Tiempo agotado";
  } else if (minutes > 0) {
    displayText = `${formattedMinutes}:${formattedSeconds} Minutos Restantes`;
  } else {
    displayText = `${formattedSeconds} Segundos Restantes`;
  }

  const enviarDatos = async (dato) => {
    const codigo = generarCodigoRandom(11);
    setCodigoEnviado(codigo);
    setTimeLeft(120);
    try {
      const correoElectronico = dato.correo;
      console.log(correoElectronico);
      const respuesta = await axios.post("../API/auth", {
        codigo,
        correoElectronico,
      });
      console.log(respuesta);

      const datos = respuesta.data;

      if (!datos) {
        return;
      }
      if (datos.resultadoFiltrado.length === 0) {
        return setCorreoNoValido(true);
      }

      setPasoFormulario(pasoFormulario + 1);
      setMensajeCorreoAceptado(true);
      if (respuesta.status < 200 || respuesta.status >= 300) {
        throw new Error("Error en la solicitud");
      }

      console.log(datos);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <head>
        <title>Recuperar Contraseña</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesClave.body_modificable}>
        <section className={`${stylesClave.contenedor_general} w-50`}>
          <Link className={stylesClave.enlace} href="/">
            Página Principal
          </Link>
        </section>
        <form
          className={stylesClave.contenedor_form}
          onSubmit={handleSubmit(enviarDatos)}
        >
          {pasoFormulario === 1 && (
            <>
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
                  <p className={stylesClave.errorInput}>
                    {errors.correo.message}
                  </p>
                </section>
              )}
              {correoNoValido && (
                <section className={stylesClave.seccionError}>
                  <p className={stylesClave.errorInput}>
                    El Correo No Esta Registrado
                  </p>
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
            </>
          )}
          {mensajeCorreoAceAceptado && <Notificacion />}
          {pasoFormulario === 2 && (
            <>
              <h1 className={stylesClave.titulo_form}>
                EL Correo Ha Sido Enviado
              </h1>
              <label htmlFor="codigoEnviarInput" className={stylesClave.label}>
                Introduzca el Codigo de su Correo
                {pasoFormulario === 2 && codigoEnviado
                  ? `, El Codigo Expirará en ${displayText}`
                  : null}
              </label>
              <input
                id="codigoEnviarInput"
                className={`${stylesClave.input_texto} rounded-2`}
                type="text"
                {...register("codigoEnviado", {
                  required:
                    "Introduzca el Codigo Enviado a Su Correo Electrónico",
                  validate: (value) =>
                    value === codigoEnviado ||
                    "El Código Introducido Es Incorrecto",
                })}
              />
              {errors.codigoEnviado && (
                <section className={stylesClave.seccionError}>
                  <p className={stylesClave.errorInput}>
                    {errors.codigoEnviado.message}
                  </p>
                </section>
              )}
              <section
                style={{
                  display: "flex",
                  width: "85%",
                  gap: "1rem",
                }}
              >
                <button
                  className={`${stylesClave.boton} rounded-2`}
                  type="button"
                  onClick={() => retroceder()}
                >
                  Volver Atras
                </button>
                <button className={`${stylesClave.boton} rounded-2`}>
                  Enviar Codigo de Verificación
                </button>
              </section>
            </>
          )}
        </form>
      </body>
    </>
  );
};

export default recuperarClave;
