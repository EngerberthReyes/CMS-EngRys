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
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [fechaActual, setFechaActual] = useState("");
  const [genero, setGenero] = useState(null);
  const [pasoFormulario, setPasoFormulario] = useState(1);
  const [numeroFormulario, setNumeroFormulario] = useState(1);
  const [temaActual, setTemaActual] = useState("oscuro");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [mostrarSegundaClave, setMostrarSegundaClave] = useState(false);

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

  const clave = watch("clave");
  const confirmacionClave = watch("repetirClave");

  const mostrarPassword = (clave) => {
    setMostrarClave(!mostrarClave);
  };

  const confirmarPassword = (confirmacionClave) => {
    setMostrarSegundaClave(!mostrarSegundaClave);
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

  useEffect(() => {
    const fechaHoy = new Date().toISOString().split("T")[0];
    setFechaActual(fechaHoy);
  }, []);

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
                Nombre Completo
              </label>
              <input
                id="nombre"
                className={`${stylesRegistro.input_texto} rounded-2`}
                type="text"
                {...register("nombres", {
                  required: {
                    value: true,
                    message: "Introduzca su Nombre Completo",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Solo se Permiten Letras",
                  },
                })}
              />
              {errors.nombres && (
                <section className={stylesRegistro.seccionError}>
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
                {...register("apellido", {
                  required: {
                    value: true,
                    message: "Introduzca Sus Apellidos",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Solo se Permiten Letras",
                  },
                })}
              />
              {errors.apellido && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.apellido.message}
                  </p>
                </section>
              )}

              <label htmlFor="cedula" className={stylesRegistro.label}>
                Cédula
              </label>
              <section className={stylesRegistro.seccionNacionalidad}>
                <select
                  className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} rounded-2`}
                  id="nacionalidad"
                >
                  <option value="V">V</option>
                </select>
                <input
                  id="cedula"
                  className={`${stylesRegistro.input_texto} rounded-2`}
                  type="number"
                  {...register("cedula", {
                    required: {
                      value: true,
                      message: "Introduzca Su Cédula",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se Permiten Numeros",
                    },
                  })}
                />
              </section>
              {errors.cedula && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.cedula.message}
                  </p>
                </section>
              )}

              <label htmlFor="sexo" className={stylesRegistro.label}>
                Sexo
              </label>
              <section
                className={`${stylesRegistro.seleccionGenero} rounded-2`}
              >
                <label
                  htmlFor="masculino"
                  className={`${stylesRegistro.label} ${stylesRegistro.labelRadio} rounded-2`}
                >
                  <section className={stylesRegistro.seccionRadio}>
                    Masculino
                    <input
                      id="masculino"
                      type="radio"
                      value="masculino"
                      {...register("sexo", {
                        required: {
                          value: true,
                          message: "Introduzca su Sexo",
                        },
                      })}
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
                      type="radio"
                      value="femenino"
                      {...register("sexo", {
                        required: {
                          value: true,
                          message: "Introduzca su Sexo",
                        },
                      })}
                    />
                  </section>
                </label>
              </section>
              {errors.sexo && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.sexo.message}
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

              <button
                className={`${stylesRegistro.boton} rounded-2`}
                type="button"
                disabled={!isValid}
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
                className={`${stylesRegistro.input_texto} rounded-2`}
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
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.correo.message}
                  </p>
                </section>
              )}

              <label htmlFor="nacimiento" className={stylesRegistro.label}>
                Fecha de Nacimiento
              </label>
              <input
                id="nacimiento"
                className={`${stylesRegistro.input_texto} ${stylesRegistro.input_fecha} rounded-2`}
                type="date"
                max={fechaActual}
                {...register("nacimiento", {
                  required: "Introduzca su Fecha de Nacimiento",
                })}
              />
              {errors.nacimiento && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.nacimiento.message}
                  </p>
                </section>
              )}

              <label htmlFor="clave" className={stylesRegistro.labelClave}>
                Contraseña
              </label>
              <section className={stylesRegistro.contenedor_input_password}>
                <input
                  id="clave"
                  className={`${stylesRegistro.input_texto} rounded-2`}
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
                    className={stylesRegistro.icono_password}
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
                    className={stylesRegistro.icono_password}
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
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.clave.message}
                  </p>
                </section>
              )}

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
                  type={mostrarSegundaClave ? "text" : "password"}
                  {...register("repetirClave", {
                    required: "Repita la Contraseña",
                    validate: (value) =>
                      value === clave || "Las Contraseñas no coinciden",
                  })}
                />
                {mostrarSegundaClave ? (
                  <Image
                    className={`${stylesRegistro.icono_password} ${stylesRegistro.icono_ultimo}`}
                    onClick={() => confirmarPassword(confirmacionClave)}
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
                    className={`${stylesRegistro.icono_password} ${stylesRegistro.icono_ultimo}`}
                    onClick={() => confirmarPassword(confirmacionClave)}
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
              {errors.repetirClave && (
                <section
                  className={`${stylesRegistro.seccionError} ${stylesRegistro.seccionError_ultimo}`}
                >
                  <p className={stylesRegistro.errorInput}>
                    {errors.repetirClave.message}
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
                  type="button"
                  disabled={!isValid}
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
                ¿Tienes Facebook?, Introduzca la URL hacia su Perfil de Facebook
                [Campo Opcional]
              </label>
              <input
                id="facebook"
                className={`${stylesRegistro.input_texto} rounded-2 mb-4`}
                type="text"
              />
              <label htmlFor="instagram" className={stylesRegistro.label}>
                ¿Tienes Tiktok?, Introduzca la URL hacia su Perfil de Instagram
                [Campo Opcional]
              </label>
              <input
                id="instagram"
                className={`${stylesRegistro.input_texto} ${stylesRegistro.input_fecha} rounded-2 mb-4`}
                type="text"
              />
              <label htmlFor="x" className={stylesRegistro.labelClave}>
                ¿Tienes X [Twitter]?, Introduzca la URL hacia su Perfil de X
                [Campo Opcional]
              </label>
              <input
                id="x"
                className={`${stylesRegistro.input_texto} rounded-2 mb-4`}
                onChange={obtenerClave}
                type="text"
              />
              <label htmlFor="tiktok" className={stylesRegistro.labelClave}>
                ¿Tienes Tiktok?, Introduzca la URL hacia su Perfil de Tiktok
                [Campo Opcional]
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
                <section className={stylesRegistro.seccionError}>
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
