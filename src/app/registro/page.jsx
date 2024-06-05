"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../CSS/App.css";
import { Notificacion } from "@/componentes/notificaciones/notificaciones.jsx";
import Details from "@/componentes/tiptap/Details";
import { Tiptap } from "@/componentes/tiptap/TipTap";
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
  const [description, setDescription] = useState("");
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(false);
  const [estatusActivo, setEstatusActivo] = useState(true);

  const enrutadorMaster = useRouter();

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

  console.log(description);

  const clave = watch("clave");
  const cedula = Number(watch("cedula"));
  const correo = watch("correo");
  const confirmacionClave = watch("repetirClave");
  const [cedulas, setCedulas] = useState([]);
  const [mensajeCedula, setMensajeCedula] = useState("");
  const [estatusCedula, setEstatusCedula] = useState(false);
  const [correos, setCorreos] = useState([]);
  const [mensajeCorreo, setMensajeCorreo] = useState("");
  const [estatusCorreo, setEstatusCorreo] = useState(false);

  const obtenerInformacionBaseDeDatos = async () => {
    try {
      const datosRepetidos = await axios.get("../API/personas");
      const dataPersona = datosRepetidos.data.personas;
      const cedulasObtenidas = dataPersona.map((itemCedula) => {
        return itemCedula.cedula;
      });
      const correosObtenidos = dataPersona.map((itemCorreo) => {
        return itemCorreo.correo_electronico;
      });
      setCorreos(correosObtenidos);
      setCedulas(cedulasObtenidas);
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

  useEffect(() => {
    console.log("Cédulas obtenidas:", cedulas);
    if (!cedulas.includes(cedula) && cedulas.length === 0) {
      setEstatusCedula(false);
    } else {
      if (cedulas.includes(cedula)) {
        setMensajeCedula("Esta Cédula Ya Esta Registrada");
        setEstatusCedula(true);
      } else {
        setEstatusCedula(false);
      }
    }
  }, [cedula]);

  useEffect(() => {
    console.log("correos obtenidos:", correos);
    if (!correos.includes(correo) && correos.length === 0) {
      setEstatusCorreo(false);
    } else {
      if (correos.includes(correo)) {
        setMensajeCorreo("Este Correo Electrónico Ya Esta Registrado");
        setEstatusCorreo(true);
      } else {
        setEstatusCorreo(false);
      }
    }
  }, [correo]);

  const mostrarPassword = (clave) => {
    setMostrarClave(!mostrarClave);
  };

  const confirmarPassword = (confirmacionClave) => {
    setMostrarSegundaClave(!mostrarSegundaClave);
  };

  const siguienteFormulario = async () => {
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
  const [estado, setEstado] = useState([]);
  const [ciudad, setCiudad] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [parroquia, setParroquia] = useState([]);
  const [cedulaIngresadaUsuario, setCedula] = useState();
  console.log(cedulaIngresadaUsuario);
  const [codigoPostal, setCodigoPostal] = useState([
    "1000 - Distrito Capital",
    "1070 - Miranda",
    "1160 - Vargas",
    "2001 - Carabobo",
    "2052 - Falcón",
    "2101 - Aragua",
    "2201 - Coyedes",
    "2301 - Guárico",
    "3001 - Lara",
    "3101 - Trujillo",
    "3137 - Zulia",
    "3201 - Yaracuy",
    "3301 - Portuguesa",
    "5001 - Táchira",
    "5063 - Apure",
    "5101 - Mérida",
    "5201 - Barinas",
    "6001 - Anzoátegui",
    "6101 - Sucre",
    "6201 - Monagas",
    "6301 - Nueva Esparta",
    "8001 - Bolívar",
  ]);

  const venezuela = async () => {
    try {
      const venezuela = await axios.get("../API/personas");

      const locacionesVenezuela = venezuela.data.paises;

      console.log(locacionesVenezuela);

      const estados = locacionesVenezuela.map((localidades) => {
        return localidades.estado;
      });

      const ciudades = locacionesVenezuela.map((localidades) => {
        return localidades.ciudad;
      });

      const municipios = locacionesVenezuela.map((localidades) => {
        return localidades.municipio;
      });

      const parroquias = locacionesVenezuela.map((localidades) => {
        return localidades.parroquia;
      });

      setEstado(estados);
      setCiudad(ciudades);
      setMunicipio(municipios);
      setParroquia(parroquias);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    venezuela();
  }, []);

  const onSubmit = async (data) => {
    const {
      nombres,
      apellido,
      cedula,
      sexo,
      nacimiento,
      nacionalidad,
      pais,
      estado,
      ciudad,
      municipio,
      parroquia,
      codigo,
      facebook,
      instagram,
      x,
      tiktok,
      sitio_web,
      correo,
      clave,
      repetirClave,
    } = data;

    console.log(data);

    try {
      const respuesta = await axios.post("../API/personas", {
        nombres,
        apellido,
        cedula,
        sexo,
        nacionalidad,
        nacimiento,
        direccionDescripcion: description.replace(/<.*?>/g, ""),
        pais,
        estado,
        ciudad,
        municipio,
        parroquia,
        codigo,
        facebook,
        instagram,
        x,
        tiktok,
        sitio_web,
        correo,
        clave,
        repetirClave,
      });
      if (respuesta) {
        setUsuarioRegistrado(true);
        setEstatusActivo(true);
        setTimeout(() => {
          enrutadorMaster.push("../iniciar_sesion");
        }, 2000);
      }

      console.log(respuesta);
    } catch (error) {
      console.log(error);
    } finally {
      setUsuarioRegistrado(false);
    }
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
                    value: /^[a-zA-ZñÑ\s]+$/,
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
                    value: /^[a-zA-ZñÑ\s]+$/,
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
                  {...register("nacionalidad", {
                    required: "Seleccione Una Nacionalidad",
                  })}
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
              {estatusCedula && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>{mensajeCedula}</p>
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
                disabled={!isValid || estatusCedula}
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
                <option value="">Seleccione un País</option>
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
                    <option value="">Seleccione un Estado</option>
                    {estado.map((itemEstado) => {
                      return <option value={itemEstado}>{itemEstado}</option>;
                    })}
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
                      required: "Seleccione una Ciudad",
                    })}
                  >
                    <option value="">Seleccione una Ciudad</option>
                    {ciudad.map((itemCiudad) => {
                      return <option value={itemCiudad}>{itemCiudad}</option>;
                    })}
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
                    <option value="">Seleccione un Municipio</option>
                    {municipio.map((itemMunicipio) => {
                      return (
                        <option value={itemMunicipio}>{itemMunicipio}</option>
                      );
                    })}
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
                    <option value="">Seleccione una Parroquia</option>
                    {parroquia.map((itemParroquia) => {
                      return (
                        <option value={itemParroquia}>{itemParroquia}</option>
                      );
                    })}
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
                    <option value="">Seleccione un Código Postal</option>
                    {codigoPostal.map((itemPostal) => {
                      return <option value={itemPostal}>{itemPostal}</option>;
                    })}
                  </select>
                  {errors.codigo && (
                    <p className={stylesRegistro.errorInput}>
                      {errors.codigo.message}
                    </p>
                  )}
                </section>
              </section>
              <label
                htmlFor="direccion"
                className={stylesRegistro.label}
                style={{ margin: "0 0 0 8%" }}
              >
                Dirección Completa [Campo Opcional]
              </label>
              <section className="App">
                <Tiptap setDescription={setDescription} />
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
              <label htmlFor="sitio_web" className={stylesRegistro.label}>
                ¿Tienes Un Sitio Web? Introduzca la URL hacia su Sitio Web
                [Campo Opcional]
              </label>
              <input
                id="sitio_web"
                className={`${stylesRegistro.input_texto} rounded-2 mb-2`}
                type="text"
                {...register("sitio_web", {
                  pattern: {
                    value:
                      /^https:\/\/([a-z0-9.-]+\.[a-z]{2,6}\b)(:[0-9]+)?\/?.*$/,
                    message: "Introduzca una URL Veridica y Segura",
                  },
                })}
              />
              {errors.sitio_web && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>
                    {errors.sitio_web.message}
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
              {estatusCorreo && (
                <section className={stylesRegistro.seccionError}>
                  <p className={stylesRegistro.errorInput}>{mensajeCorreo}</p>
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
                  disabled={!isValid || estatusCorreo}
                  type="submit"
                >
                  Registrarse
                </button>
              </section>
            </>
          )}
        </form>
        {usuarioRegistrado && (
          <Notificacion
            usuarioRegistrado={usuarioRegistrado}
            estatusActivo={estatusActivo}
          />
        )}
      </body>
    </>
  );
};

export default Registro;
