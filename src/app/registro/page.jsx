"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import stylesRegistro from "../CSS/styles-registro.module.css";

const Registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [clave, setClave] = useState();

  const [segundaClave, setSegundaClave] = useState();

  const [claveActiva, setClaveActiva] = useState(true);

  const [segundaClaveActiva, setSegundaClaveActiva] = useState(true);

  const [genero, setGenero] = useState(null);

  const [pasoFormulario, setPasoFormulario] = useState(1);

  const [numeroFormulario, setNumeroFormulario] = useState(1);

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

  const siguienteFormulario = () => {
    /*if (pasoFormulario === 1) {
      Aqui se pueden añadir los datos del primer formulario
    } */
    setNumeroFormulario(numeroFormulario + 1);
    setPasoFormulario(pasoFormulario + 1);
  };

  const formularioPrevio = () => {
    setNumeroFormulario(numeroFormulario - 1);
    setPasoFormulario(pasoFormulario - 1);
  };

  const seleccionGenero = (event) => {
    const valorGenero = event.target.id;
    if (genero === valorGenero) {
      setGenero(null);
    } else {
      setGenero(valorGenero);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

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
        <form
          className={stylesRegistro.contenedor_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className={stylesRegistro.seccionTitulo}>
            <h1 className={stylesRegistro.titulo_form}>Registrar Cuenta</h1>
            <h1>{numeroFormulario}</h1>
          </section>
          {pasoFormulario === 1 && (
            <>
              <label htmlFor="nombre" className={stylesRegistro.label}>
                Nombres
              </label>
              <input
                id="nombre"
                className={`${stylesRegistro.input_texto} rounded-2`}
                type="text"
                {...register("nombres", {
                  required: {
                    value: true, // Indica que el campo es requerido
                    message: "Introduzca sus Nombres",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Solo se Permiten Letras",
                  },
                })}
              />
              {errors.nombres && (
                <section>
                  <p className={stylesRegistro.errorInput}>
                    {errors.nombres.message}
                  </p>
                </section>
              )}
              <label htmlFor="apellido" className={stylesRegistro.label}>
                Apellidos
              </label>
              <input
                id="apellido"
                className={`${stylesRegistro.input_texto} rounded-2`}
                type="text"
              />
              <label htmlFor="cedula" className={stylesRegistro.label}>
                Cédula
              </label>
              <section className={stylesRegistro.seccionNacionalidad}>
                <select
                  className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} rounded-2`}
                >
                  <option>V</option>
                </select>
                <input
                  id="cedula"
                  className={`${stylesRegistro.input_texto} rounded-2`}
                  type="text"
                />
              </section>
              <label htmlFor="sexo" className={stylesRegistro.label}>
                Sexo
              </label>
              <section
                className={`${stylesRegistro.seleccionGenero} rounded-2`}
              >
                <label
                  id="sexo"
                  htmlFor="masculino"
                  className={`${stylesRegistro.label} ${stylesRegistro.labelRadio} rounded-2`}
                >
                  <section className={stylesRegistro.seccionRadio}>
                    Masculino
                    <input
                      id="masculino"
                      checked={genero === "masculino"}
                      onChange={seleccionGenero}
                      type="radio"
                      name="radio"
                    />
                  </section>
                </label>
                <label
                  htmlFor="femenino"
                  className={`${stylesRegistro.label} ${stylesRegistro.labelRadio} rounded-2`}
                >
                  <section className={stylesRegistro.seccionRadio}>
                    Femenino
                    <input
                      id="femenino"
                      checked={genero === "femenino"}
                      onChange={seleccionGenero}
                      type="radio"
                    />
                  </section>
                </label>
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
                type="button"
                onClick={siguienteFormulario}
              >
                Siguiente
              </button>
            </>
          )}
          {pasoFormulario === 2 && (
            <>
              <label htmlFor="correo" className={stylesRegistro.label}>
                Correo Electrónico
              </label>
              <input
                id="correo"
                className={`${stylesRegistro.input_texto} rounded-2 mb-4`}
                type="email"
              />
              <label htmlFor="nacimiento" className={stylesRegistro.label}>
                Fecha de Nacimiento
              </label>
              <input
                id="nacimiento"
                className={`${stylesRegistro.input_texto} ${stylesRegistro.input_fecha} rounded-2 mb-4`}
                type="date"
              />
              <label htmlFor="clave" className={stylesRegistro.labelClave}>
                Contraseña
              </label>
              <section className={stylesRegistro.contenedor_input_password}>
                <input
                  id="clave"
                  className={`${stylesRegistro.input_texto} rounded-2 mb-4`}
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
                    src={`/OjoNegroAbierto.svg`}
                  />
                ) : null}
                {temaActual === "claro" && clave && claveActiva ? (
                  <Image
                    className={stylesRegistro.icono_password}
                    onClick={() => mostrarPassword(clave)}
                    width={20}
                    height={20}
                    src={`/OjoNegroAbiertoOblicuo.svg`}
                  />
                ) : null}
              </section>
              <label
                htmlFor="repetirClave"
                className={stylesRegistro.labelClave}
              >
                Repetir Contraseña
              </label>
              <section className={stylesRegistro.contenedor_input_password}>
                <input
                  id="repetirClave"
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
                {temaActual === "oscuro" &&
                segundaClave &&
                segundaClaveActiva ? (
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
                    src={`/OjoNegroAbierto.svg`}
                  />
                ) : null}
                {temaActual === "claro" &&
                segundaClave &&
                segundaClaveActiva ? (
                  <Image
                    className={`${stylesRegistro.icono_password} ${stylesRegistro.icono_ultimo}`}
                    onClick={() => mostrarPassword(segundaClave)}
                    width={20}
                    height={20}
                    src={`/OjoNegroAbiertoOblicuo.svg`}
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
              <section className={stylesRegistro.seccionBoton}>
                <button
                  type="button"
                  className={`${stylesRegistro.boton} rounded-2`}
                  onClick={formularioPrevio}
                >
                  Atrás
                </button>
                <button
                  className={`${stylesRegistro.boton} rounded-2`}
                  type="button"
                  onClick={siguienteFormulario}
                >
                  Siguiente
                </button>
              </section>
            </>
          )}
          {pasoFormulario === 3 && (
            <>
              <label htmlFor="pais" className={stylesRegistro.label}>
                País
              </label>
              <select
                id="pais"
                className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-4 mt-0`}
              >
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
                <option>Venezuela</option>
              </select>
              <section className={stylesRegistro.seccionInformacionPais}>
                <section>
                  <label
                    htmlFor="estado"
                    className={`${stylesRegistro.label} m-0`}
                  >
                    Estado
                  </label>
                  <select
                    id="estado"
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-4`}
                  >
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                  </select>
                </section>
                <section>
                  <label
                    htmlFor="ciudad"
                    className={`${stylesRegistro.label} m-0`}
                  >
                    Ciudad
                  </label>
                  <select
                    id="ciudad"
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-4`}
                  >
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                  </select>
                </section>
                <section>
                  <label
                    htmlFor="municipio"
                    className={`${stylesRegistro.label} m-0`}
                  >
                    Municipio
                  </label>
                  <select
                    id="municipio"
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-4`}
                  >
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                  </select>
                </section>
                <section>
                  <label
                    htmlFor="parroquia"
                    className={`${stylesRegistro.label} m-0`}
                  >
                    Parroquia
                  </label>
                  <select
                    id="parroquia"
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-4`}
                  >
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                  </select>
                </section>
                <section>
                  <label
                    htmlFor="codigo"
                    className={`${stylesRegistro.label} m-0`}
                  >
                    Codigo Postal
                  </label>
                  <select
                    id="codigo"
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-4`}
                  >
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                    <option>Venezuela</option>
                  </select>
                </section>
              </section>
              <label htmlFor="direccion" className={stylesRegistro.label}>
                Dirección Completa
              </label>
              <textarea
                id="direccion"
                className={`${stylesRegistro.input_texto} ${stylesRegistro.textarea} rounded-2 mb-4`}
              ></textarea>
              <section
                className={`${stylesRegistro.contenedor_passoword_perdida} rounded-2 mt-0`}
              >
                <Link
                  className={stylesRegistro.link_password}
                  href="../iniciar_sesion"
                >
                  ¿Ya tienes una cuenta?
                </Link>
              </section>
              <section className={stylesRegistro.seccionBoton}>
                <button
                  type="button"
                  className={`${stylesRegistro.boton} rounded-2`}
                  onClick={formularioPrevio}
                >
                  Atrás
                </button>
                <button
                  className={`${stylesRegistro.boton} rounded-2`}
                  type="button"
                  onClick={siguienteFormulario}
                >
                  Siguiente
                </button>
              </section>
            </>
          )}
          {pasoFormulario === 4 && (
            <>
              <label htmlFor="facebook" className={stylesRegistro.label}>
                ¿Tienes Facebook? [Campo Opcional]
              </label>
              <input
                id="facebook"
                className={`${stylesRegistro.input_texto} rounded-2 mb-4`}
                type="text"
              />
              <label htmlFor="instagram" className={stylesRegistro.label}>
                ¿Tienes Instagram? [Campo Opcional]
              </label>
              <input
                id="instagram"
                className={`${stylesRegistro.input_texto} ${stylesRegistro.input_fecha} rounded-2 mb-4`}
                type="text"
              />
              <label htmlFor="x" className={stylesRegistro.labelClave}>
                ¿Tienes X [Twitter]? [Campo Opcional]
              </label>
              <input
                id="x"
                className={`${stylesRegistro.input_texto} rounded-2 mb-4`}
                onChange={obtenerClave}
                type="text"
              />
              <label htmlFor="tiktok" className={stylesRegistro.labelClave}>
                ¿Tienes Tiktok?, Introduzca la URL hacia su Perfil [Campo Opcional]
              </label>
              <input
                id="tiktok"
                className={`${stylesRegistro.input_texto} ${stylesRegistro.input_ultimo} rounded-2`}
                type="text"
                {...register("tiktok", {
                  required: {
                    value: false, // Indica si el campo es requerido
                    message: "Introduzca una URL Validad",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Solo se Permiten Letras",
                  },
                })}
              />
              {errors.tiktok && (
                <section className={stylesRegistro.contenedor_errorInput}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.tiktok.message}
                  </p>
                </section>
              )}
              <section className={stylesRegistro.contenedor_passoword_perdida}>
                <Link
                  className={stylesRegistro.link_password}
                  href="../iniciar_sesion"
                >
                  ¿Ya tienes una cuenta?
                </Link>
              </section>
              <section className={stylesRegistro.seccionBoton}>
                <button
                  type="button"
                  className={`${stylesRegistro.boton} rounded-2`}
                  onClick={formularioPrevio}
                >
                  Atrás
                </button>
                <button
                  className={`${stylesRegistro.boton} rounded-2`}
                  type="submit"
                >
                  Registrarse
                </button>
              </section>
            </>
          )}
        </form>
      </body>
    </>
  );
};

export default Registro;
