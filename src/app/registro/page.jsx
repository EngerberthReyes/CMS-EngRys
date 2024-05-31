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
    setNumeroFormulario(numeroFormulario + 1);
    setPasoFormulario(pasoFormulario + 1);
  };

  const formularioPrevio = () => {
    setNumeroFormulario(numeroFormulario - 1);
    setPasoFormulario(pasoFormulario - 1);
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
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesRegistro.body}>
        <section className={`${stylesRegistro.contenedor_general} w-50`}>
          <Link className={stylesRegistro.enlace} href="/">
            Página Principal
          </Link>
        </section>
        <form
          className={stylesRegistro.contenedor_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className={stylesRegistro.seccionTitulo}>
            <h1 className={stylesRegistro.titulo_form}>Registrar Cuenta</h1>
            <h1>0{numeroFormulario}</h1>
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
                  <option value="E">E</option>
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
              <section
                style={{
                  width: "85%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <section
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <label
                    htmlFor="sexo"
                    className={stylesRegistro.label}
                    style={{ margin: "2% 0" }}
                  >
                    Sexo
                  </label>

                  <section
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "2rem",
                    }}
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
                          value="Masculino"
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
                          value="Femenino"
                          {...register("sexo", {
                            required: {
                              value: true,
                              message: "Introduzca su Sexo",
                            },
                          })}
                        />
                      </section>
                    </label>
                    {errors.sexo && (
                      <section className={stylesRegistro.seccionError}>
                        <p className={stylesRegistro.errorInput}>
                          {errors.sexo.message}
                        </p>
                      </section>
                    )}
                  </section>
                </section>
                <section
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    width: "48%",
                  }}
                >
                  <label
                    htmlFor="nacimiento"
                    style={{ margin: "4% 0" }}
                    className={`${stylesRegistro.label}`}
                  >
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
                </section>
              </section>
              <section
                style={{
                  width: "84%",
                  display: "flex",
                  margin: "0",
                  flexDirection: "column",
                }}
              >
                <label
                  htmlFor="direccion"
                  className={stylesRegistro.label}
                  style={{ margin: "2% 0" }}
                >
                  Dirección Completa
                </label>
                <textarea
                  id="direccion"
                  style={{ width: "100%" }}
                  className={`${stylesRegistro.input_texto} ${stylesRegistro.textarea} rounded-2 mb-2`}
                  {...register("direccion", {
                    required: "Ingrese su dirección completa",
                  })}
                ></textarea>
                {errors.direccion && (
                  <section className={stylesRegistro.seccionError}>
                    <p className={stylesRegistro.errorInput}>
                      {errors.direccion.message}
                    </p>
                  </section>
                )}
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
                disabled={!isValid}
                onClick={siguienteFormulario}
              >
                Siguiente
              </button>
            </>
          )}
          {pasoFormulario === 2 && (
            <>
              <label htmlFor="pais" className={stylesRegistro.label}>
                País
              </label>
              <select
                id="pais"
                className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-2 mt-0`}
                {...register("pais", { required: "Seleccione un país" })}
              >
                <option value="">Seleccione un país</option>
                <option value="Venezuela">Venezuela</option>
              </select>
              {errors.pais && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.pais.message}
                  </p>
                </section>
              )}

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
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-2`}
                    {...register("estado", {
                      required: "Seleccione un estado",
                    })}
                  >
                    <option value="">Seleccione un estado</option>
                    <option value="Venezuela">Venezuela</option>
                  </select>
                  {errors.estado && (
                    <p className={stylesRegistro.errorInput}>
                      {errors.estado.message}
                    </p>
                  )}
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
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-2`}
                    {...register("ciudad", {
                      required: "Seleccione una ciudad",
                    })}
                  >
                    <option value="">Seleccione una ciudad</option>
                    <option value="Venezuela">Venezuela</option>
                  </select>
                  {errors.ciudad && (
                    <p className={stylesRegistro.errorInput}>
                      {errors.ciudad.message}
                    </p>
                  )}
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
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-2`}
                    {...register("municipio", {
                      required: "Seleccione un municipio",
                    })}
                  >
                    <option value="">Seleccione un municipio</option>
                    <option value="Venezuela">Venezuela</option>
                  </select>
                  {errors.municipio && (
                    <p className={stylesRegistro.errorInput}>
                      {errors.municipio.message}
                    </p>
                  )}
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
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-2`}
                    {...register("parroquia", {
                      required: "Seleccione una parroquia",
                    })}
                  >
                    <option value="">Seleccione una parroquia</option>
                    <option value="Venezuela">Venezuela</option>
                  </select>
                  {errors.parroquia && (
                    <p className={stylesRegistro.errorInput}>
                      {errors.parroquia.message}
                    </p>
                  )}
                </section>
                <section>
                  <label
                    htmlFor="codigo"
                    className={`${stylesRegistro.label} m-0`}
                  >
                    Código Postal
                  </label>
                  <select
                    id="codigo"
                    className={`${stylesRegistro.input_texto} ${stylesRegistro.seleccionNacionalidad} ${stylesRegistro.seleccionPais} rounded-2 mb-2`}
                    {...register("codigo", {
                      required: "Seleccione un código postal",
                    })}
                  >
                    <option value="">Seleccione un código postal</option>
                    <option value="Venezuela">Venezuela</option>
                  </select>
                  {errors.codigo && (
                    <p className={stylesRegistro.errorInput}>
                      {errors.codigo.message}
                    </p>
                  )}
                </section>
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
              <label htmlFor="facebook" className={stylesRegistro.label}>
                ¿Tienes Facebook? Introduzca la URL hacia su Perfil de Facebook
                [Campo Opcional]
              </label>
              <input
                id="facebook"
                className={`${stylesRegistro.input_texto} rounded-2 mb-2`}
                type="text"
                {...register("facebook", {
                  pattern: {
                    value:
                      /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._\-?&=]+/,
                    message: "Introduzca una URL válida de Facebook",
                  },
                })}
              />
              {errors.facebook && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.facebook.message}
                  </p>
                </section>
              )}

              <label htmlFor="instagram" className={stylesRegistro.label}>
                ¿Tienes Instagram? Introduzca la URL hacia su Perfil de
                Instagram [Campo Opcional]
              </label>
              <input
                id="instagram"
                className={`${stylesRegistro.input_texto} rounded-2 mb-2`}
                type="text"
                {...register("instagram", {
                  pattern: {
                    value:
                      /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._\-?&=]+/,
                    message: "Introduzca una URL válida de Instagram",
                  },
                })}
              />
              {errors.instagram && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.instagram.message}
                  </p>
                </section>
              )}

              <label htmlFor="x" className={stylesRegistro.labelClave}>
                ¿Tienes X (Twitter)? Introduzca la URL hacia su Perfil de X
                [Campo Opcional]
              </label>
              <input
                id="x"
                className={`${stylesRegistro.input_texto} rounded-2 mb-2`}
                type="text"
                {...register("x", {
                  pattern: {
                    value:
                      /^https:\/\/(www\.)?(x\.com|twitter\.com)\/[a-zA-Z0-9._\-?&=]+/,
                    message: "Introduzca una URL válida de X (Twitter)",
                  },
                })}
              />
              {errors.x && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.x.message}
                  </p>
                </section>
              )}

              <label htmlFor="tiktok" className={stylesRegistro.labelClave}>
                ¿Tienes Tiktok? Introduzca la URL hacia su Perfil de Tiktok
                [Campo Opcional]
              </label>
              <input
                id="tiktok"
                className={`${stylesRegistro.input_texto} ${stylesRegistro.input_ultimo} rounded-2 mb-2`}
                type="text"
                {...register("tiktok", {
                  pattern: {
                    value:
                      /^https:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9._\-?&=]+/,
                    message: "Introduzca una URL válida de Tiktok",
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
                  disabled={!isValid}
                  onClick={siguienteFormulario}
                >
                  Siguiente
                </button>
              </section>
            </>
          )}
          {pasoFormulario === 4 && (
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
