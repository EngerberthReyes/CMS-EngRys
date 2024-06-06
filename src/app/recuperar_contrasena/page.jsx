"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Notificacion } from "@/componentes/notificacionRestrablecer/notificaciones.jsx";
import stylesClave from "../CSS/styles-recuperarContrasena.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { hash, compare } from "bcryptjs";
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
  const [tiempoRestante, setTiempoRestante] = useState(600);
  const [codigoEnviado, setCodigoEnviado] = useState();
  const [correoNoValido, setCorreoNoValido] = useState(false);
  const [claveUsuario, setClaveUsuario] = useState();
  const [email, setEmail] = useState();
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(false);
  const [estatusActivo, setEstatusActivo] = useState(false);
  const claveNueva = watch("nuevaClave");
  if (correoNoValido) {
    setTimeout(() => {
      setCorreoNoValido(false);
    }, 4000);
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
    setTiempoRestante(600);
  };

  const iniciarSesion = () => {
    enrutadorMaster.push("/iniciar_sesion");
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
    if (tiempoRestante > 0) {
      const intervaloDeTiempo = setInterval(() => {
        setTiempoRestante((tiempoRestantePrevio) => tiempoRestantePrevio - 1);
      }, 1000);
      return () => clearInterval(intervaloDeTiempo);
    }
    setCodigoEnviado("");
    enrutadorMaster.push("/iniciar_sesion");
  }, [tiempoRestante]);

  const padNumber = (numero) => {
    return numero < 10 ? `0${numero}` : `${numero}`;
  };

  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;

  const minutosFormateados = padNumber(minutos);
  const segundosFormateados = padNumber(segundos);

  let mostrarTexto;
  if (minutos === 0 && segundos === 0) {
    mostrarTexto = "Tiempo agotado";
  } else if (minutos > 0) {
    mostrarTexto = `${minutosFormateados}:${segundosFormateados} Minutos Restantes`;
  } else {
    mostrarTexto = `${segundosFormateados} Segundos Restantes`;
  }
  console.log(email);
  const enviarDatos = async (dato) => {
    const codigo = generarCodigoRandom(11);
    setCodigoEnviado(codigo);
    setTiempoRestante(600);
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
      if (respuesta) {
          setUsuarioRegistrado(true);
          setEstatusActivo(true);
          setMensajeCorreoAceptado(true);
      }
      setEmail(datos.resultadoFiltrado[0].correo_electronico);

      setPasoFormulario(pasoFormulario + 1);
      if (respuesta.status < 200 || respuesta.status >= 300) {
        throw new Error("Error en la solicitud");
      }

      console.log(datos);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setUsuarioRegistrado(false);
        setEstatusActivo(false);
        setMensajeCorreoAceptado(false);
      }, 4000)
    }
  };

  const actualizarClaveFuncion = async (email, nuevaClave) => {
    try {
      console.log(email, nuevaClave);
      const actualizacion = await axios.put("../API/auth", {
        email,
        nuevaClave,
      });
      console.log(actualizacion);
      enrutadorMaster.push("/iniciar_sesion");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <head>
        <title>Restablecer Contraseña</title>
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
              <h1 className={stylesClave.titulo_form}>
                Restablecer Contraseña
              </h1>
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
                    El Introducido Correo Electrónico No Esta Registrado
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
          {mensajeCorreoAceAceptado && (
            <Notificacion
              usuarioRegistrado={usuarioRegistrado}
              estatusActivo={estatusActivo}
            />
          )}
          {pasoFormulario === 2 && (
            <>
              <h1 className={stylesClave.titulo_form}>
                EL Correo Ha Sido Enviado
              </h1>
              <label htmlFor="codigoEnviarInput" className={stylesClave.label}>
                Introduzca el Codigo de su Correo
                {pasoFormulario === 2 && codigoEnviado
                  ? `, El Codigo Expirará en ${mostrarTexto}`
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
                  Aceptar Código
                </button>
              </section>
            </>
          )}
          {pasoFormulario === 3 && (
            <>
              <h1 className={stylesClave.titulo_form}>Recuperar Contraseña</h1>
              <label htmlFor="clave" className={stylesLogin.labelClave}>
                Restablezca su Contraseña
              </label>
              <section className={stylesClave.contenedor_input_password}>
                <input
                  id="clave"
                  className={`${stylesClave.input_texto} rounded-2`}
                  type={mostrarClave ? "text" : "password"}
                  {...register("nuevaClave", {
                    required: "Introduzca una Contraseña",
                  })}
                />
                {mostrarClave ? (
                  <Image
                    className={stylesClave.icono_password}
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
                <section className={stylesClave.seccionError}>
                  <p className={stylesClave.errorInput}>
                    La Contraseña o el Correo Electrónico Son Incorrectos
                  </p>
                </section>
              )}
              <button
                disabled={!isValid}
                className={`${stylesClave.boton} rounded-2`}
                type="button"
                onClick={() => actualizarClaveFuncion(email, claveNueva)}
              >
                Restablecer Contraseña
              </button>
            </>
          )}
        </form>
      </body>
    </>
  );
};

export default recuperarClave;
