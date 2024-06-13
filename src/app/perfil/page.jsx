"use client";

import Image from "next/image";
import Link from "next/link";
import Post from "@/componentes/post/post.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../CSS/App.css";
import stylesPerfil from "../CSS/styles-perfil.module.css";
import { useRouter } from "next/navigation";
import Details from "@/componentes/tiptap/Details";
import { Tiptap } from "@/componentes/tiptap/TipTap";
import { compare } from "bcryptjs";
import parse from "html-react-parser";

const Perfil = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const enrutadorMaster = useRouter();

  const [post, setPost] = useState([]);
  const [temaActual, setTemaActual] = useState();
  const [nombreImagen, setNombreImagen] = useState();
  const [imagen, setImagen] = useState(null);
  const [description, setDescription] = useState();
  const [direccionActualizada, setDireccionActualizada] = useState();
  const [elementoActivo, setElementoActivo] = useState(null);
  const [interruptorCambio, setInterruptorCambio] = useState(false);
  const [usuario, setUsuario] = useState();
  const [mostrarClave, setMostrarClave] = useState();
  const [paises, setPaises] = useState();
  const [nombreDeUsuario, setNombreDeUsuario] = useState();
  const [descripcionPerfil, setDescripcionPerfil] = useState();

  useEffect(() => {
    if (!usuario) return;

    const nombreCompleto = usuario.nombreCompletoUsuario;
    const nombreApellido = nombreCompleto ? nombreCompleto.split(" ") : [];

    const nombreDeUsuario = `${nombreApellido[0] ? nombreApellido[0] : ""} ${
      nombreApellido[2] ? nombreApellido[2] : ""
    }`;
    setNombreDeUsuario(nombreDeUsuario);
  }, [usuario]);
  console.log(nombreDeUsuario);
  console.log(usuario);
  console.log(post);
  console.log(direccionActualizada);
  console.log(paises);

  const agregarImagen = async (event) => {
    const formData = new FormData();
    const archivo = event.target.files[0];
    console.log(archivo);
    if (!archivo) {
      return;
    }
    const nombreArchivo = archivo.name;
    console.log(nombreArchivo);

    try {
      if (archivo) {
        setNombreImagen(nombreArchivo);
        formData.set("archivo", archivo);
        formData.set("correoElectronico", usuario.correoElectronicoDeUsuario);

        const respuesta = await axios.put("../API/perfil", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const correoElectronico = respuesta.data.correoElectronico;
        console.log(correoElectronico);
        const respuestaDos = await axios.post("../API/cookiesActualizar", {
          correoElectronico,
        });
        const respuestaDeModificacion = await axios.post("../API/perfil", {
          fotodePerfil,
        });

        console.log(respuestaDos);

        const usuarioActivo = respuestaDeModificacion.data;
        console.log(usuarioActivo);
        if (usuarioActivo) {
          setUsuario();
        } else {
          console.log("No se recibió una URL de la imagen o imagen valida");
        }

        event.target.value = "";
      } else {
        console.log("No se seleccionó ningún archivo");
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  const enviarPost = async (nuevoPost) => {
    console.log(post);
    setPost([...post, nuevoPost]);
    try {
      const respuesta = await axios.post("/API", { algo });
    } catch (error) {
      console.error(error);
    }
    reset();
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
  const [perfilCerrado, setPerfilCerrado] = useState(false);
  const obtenerPerfil = async () => {
    try {
      const respuesta = await axios.get("../API/cookiesActualizar");
      const paises = await axios.get("../API/personas");
      const obteniendoPaises = paises.data;
      const usuarioActivo = respuesta.data;
      console.log(usuarioActivo);

      setUsuario(usuarioActivo);
      setPaises(obteniendoPaises);
      setImagen(usuarioActivo.fotoPerfil);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  const cambiarElemento = async (index) => {
    setElementoActivo(index);
    console.log(elementoActivo);
    setInterruptorCambio(true);
    console.log(index);
  };

  const [descripcionPerfilModificacion, setDescripcionPerfilModificacion] =
    useState("");
  const [descripcionPerfilPersonal, setDescripcionPerfilPersonal] =
    useState("");
  const [editorDescripcionPerfil, setEditorDescripcionPerfil] = useState(false);
  const obtenerDescripcionPersonal = async () => {
    try {
      if (descripcionPerfilPersonal === "") {
        console.log(setEditorDescripcionPerfil);
        const obtenerDescripcion = await axios.get("../API/descripcionBD");
        setDescripcionPerfilModificacion(obtenerDescripcion.data);
        console.log(obtenerDescripcion);
      }
      console.log(descripcionPerfilModificacion);
      if (descripcionPerfilModificacion) {
        const respuestaDescripcion = await axios.put("../API/descripcionBD", {
          descripcionPerfilModificacion,
        });
        setEditorDescripcionPerfil(false);
        console.log(respuestaDescripcion);
        setDescripcionPerfilModificacion({
          descripcion_personal: respuestaDescripcion.data,
        });
        console.log(respuestaDescripcion.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDescripcionPersonal();
  }, []);

  const enviarDatos = async (datos, index) => {
    try {
      console.log(datos);
      const direccionCompleta = description;

      const elementosAEnviar = {
        datos,
        direccionCompleta,
      };
      setEditorDescripcionPerfil(false);
      console.log(direccionCompleta);

      setElementoActivo(index);
      console.log(elementoActivo);
      setInterruptorCambio(true);
      setDireccionActualizada(direccionCompleta);
      console.log(index);

      const respuesta = await axios.put(
        "../API/cookiesActualizarUsuario",
        elementosAEnviar
      );
      console.log(respuesta);
      const usuarioActivo = respuesta.data;
      const respuestaBaseDeDatos = await axios.put(
        "../API/cookiesHaciaBD",
        usuarioActivo
      );
      console.log(respuestaBaseDeDatos);
      console.log(usuarioActivo);
      setUsuario(usuarioActivo);
      setImagen(usuarioActivo.fotoPerfil);
      setInterruptorCambio(false);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  useEffect(() => {
    obtenerPerfil();
    console.log("xd");
  }, [usuario]);

  const cerrarPerfil = async () => {
    try {
      const respuesta = await axios.get("../API/cerrarPerfil");
      setPerfilCerrado(true);
    } catch (error) {
      console.log(error);
    } finally {
      enrutadorMaster.push("/");
    }
  };

  const mostrarPassword = () => {
    setMostrarClave(!mostrarClave);
  };

  const enviarComentarioTecla = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(enviarPost)();
    }
  };

  const cambiarDescripcionPersonal = () => {
    setEditorDescripcionPerfil(true);
  };

  return (
    <>
      <head>
        <title>Perfil - EpíComputers</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesPerfil.body}>
        <header className={stylesPerfil.header}>
          <Link className={stylesPerfil.enlaceNormal} href={"/"}>
            <h1 className={stylesPerfil.tituloHeader}>EpíComputers</h1>
          </Link>
          <section
            className={`${stylesPerfil.seccionEnlace} ${stylesPerfil.seccionEnlaceAumentada}`}
          >
            <Link className={stylesPerfil.enlace} href="/noticias">
              Noticias
            </Link>
            <Link className={stylesPerfil.enlace} href="/sobre_nosotros">
              Sobre Nosotros
            </Link>
            <Link className={stylesPerfil.enlace} href="/contactanos">
              Contactanos
            </Link>
          </section>
          <section className={stylesPerfil.seccionEnlace}>
            {usuario ? (
              <>
                <Link
                  className={`${stylesPerfil.enlace} ${stylesPerfil.usuarioPerfil}`}
                  style={{ border: "none" }}
                  href="/perfil"
                >
                  <Image
                    className={stylesPerfil.imagenes}
                    width={35}
                    height={20}
                    src={
                      usuario?.fotoPerfil
                        ? usuario?.fotoPerfil
                        : "/IMG/epigrafe73.png"
                    }
                    alt={
                      nombreImagen
                        ? nombreImagen
                        : "Imagen de Perfil Por Defecto"
                    }
                  />
                  <section>
                    <section>{nombreDeUsuario}</section>
                    <section>{usuario.correoElectronicoDeUsuario}</section>
                  </section>
                </Link>
                <button
                  className={`${stylesPerfil.enlace} ${stylesPerfil.usuarioPerfil}`}
                  onClick={() => cerrarPerfil()}
                >
                  <section>Cerrar Sesión</section>
                </button>
              </>
            ) : (
              <>
                <Link className={stylesPerfil.enlace} href="/iniciar_sesion">
                  Iniciar Sesión
                </Link>
                <Link className={stylesPerfil.enlace} href="/registro">
                  Registrarse
                </Link>
              </>
            )}
          </section>
        </header>
        <main>
          <section className={stylesPerfil.main}>
            <section className={stylesPerfil.seccionSecundaria}>
              <section className={stylesPerfil.seccionAjustes}>
                <h1 className={stylesPerfil.titulo}>Perfil</h1>
                <section className={stylesPerfil.seccionFlex}>
                  <section className={stylesPerfil.seccionImagen}>
                    {temaActual === "oscuro" ? (
                      <>
                        <label
                          className={stylesPerfil.label}
                          htmlFor="cambiarImagen"
                          title="Cambiar Foto de Perfil"
                        >
                          <Image
                            className={stylesPerfil.imagenes}
                            width={200}
                            height={200}
                            src={
                              usuario?.fotoPerfil
                                ? usuario.fotoPerfil
                                : "/IMG/epigrafe73.png"
                            }
                            alt={
                              nombreImagen
                                ? nombreImagen
                                : "Imagen de Perfil Por Defecto"
                            }
                          />
                          <section className={stylesPerfil.seccionOscura}>
                            <Image
                              className={stylesPerfil.icono_edit}
                              onClick={() => cambiarImagen}
                              width={20}
                              height={20}
                              src={`/editar-theme-white.svg`}
                              alt="Cambiar Foto de Perfil"
                            />
                            <input
                              id="cambiarImagen"
                              onChange={agregarImagen}
                              accept=".gif, .png, ,.apng, .jpg, .jpeg"
                              type="file"
                            />
                          </section>
                        </label>
                      </>
                    ) : (
                      <>
                        <label
                          className={stylesPerfil.label}
                          htmlFor="cambiarImagen"
                          title="Cambiar Foto de Perfil"
                        >
                          <Image
                            className={stylesPerfil.imagenes}
                            width={200}
                            height={200}
                            src={
                              usuario?.fotoPerfil
                                ? usuario.fotoPerfil
                                : "/IMG/epigrafe73.png"
                            }
                            alt={
                              nombreImagen
                                ? nombreImagen
                                : "Imagen de Perfil Por Defecto"
                            }
                          />
                          <section className={stylesPerfil.seccionBlanco}>
                            <Image
                              className={stylesPerfil.icono_edit}
                              onClick={() => cambiarElemento()}
                              width={20}
                              height={20}
                              src={`/editar-theme-black.svg`}
                              alt="Cambiar Foto de Perfil"
                            />
                            <input
                              id="cambiarImagen"
                              onChange={agregarImagen}
                              accept=".gif, .png, ,.apng, .jpg, .jpeg"
                              type="file"
                            />
                          </section>
                        </label>
                      </>
                    )}
                  </section>
                  <section className={stylesPerfil.seccionPerfilIzquierdo}>
                    <h1>Tu Usuario:</h1>
                    <section className={stylesPerfil.seccionElementos}>
                      {usuario && <h1>{nombreDeUsuario}</h1>}
                    </section>
                  </section>
                  <section className={stylesPerfil.seccionPerfilIzquierdo}>
                    <h1>Sobre Mi:</h1>
                    <section className={stylesPerfil.seccionElementos}>
                      <h2 className={stylesPerfil.tituloSeccionFlex}>
                        {editorDescripcionPerfil ? (
                          <>
                            <section className="App">
                              <Tiptap
                                setDescription={
                                  setDescripcionPerfilModificacion
                                }
                              />
                            </section>
                            <button
                              className={stylesPerfil.seccionElemento}
                              onClick={() => obtenerDescripcionPersonal()}
                            >
                              Guardar Cambios
                            </button>
                          </>
                        ) : (
                          <>
                            <Details
                              description={
                                descripcionPerfilModificacion
                                  ? descripcionPerfilModificacion.descripcion_personal
                                  : "Descripción Personal"
                              }
                            />
                          </>
                        )}
                        {!editorDescripcionPerfil && (
                          <label
                            style={{
                              position: "relative",
                              height: "0",
                              top: "0",
                              left: "0",
                              cursor: "pointer",
                            }}
                          >
                            <section
                              className={stylesPerfil.seccionBlanco}
                              style={{
                                position: "relative",
                                height: "0",
                                top: "0",
                                left: "0",
                                cursor: "pointer",
                              }}
                            >
                              <Image
                                className={stylesPerfil.icono_edit}
                                onClick={() => cambiarDescripcionPersonal()}
                                width={20}
                                height={20}
                                src={`/editar-theme-black.svg`}
                                alt="Cambiar Foto de Perfil"
                              />
                            </section>
                          </label>
                        )}
                      </h2>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <section className={stylesPerfil.seccionTerciaria}>
              <section className={stylesPerfil.seccionAjustes}>
                <h1 className={stylesPerfil.tituloSeccionFlexEnterno}>
                  Información Personal
                </h1>
                <section className={stylesPerfil.seccionFlex}>
                  <form
                    onSubmit={handleSubmit(enviarDatos)}
                    className={stylesPerfil.seccionFlexInterna}
                  >
                    {usuario && (
                      <>
                        {Object.entries({
                          nombreCompletoUsuario: "Nombre Completo",
                          cedula: "Cédula",
                          correoElectronicoDeUsuario: "Correo Electrónico",
                          fechaNacimiento: "Fecha de Nacimiento",
                          claveDesencriptada: "Contraseña",
                          nacional: "Nacionalidad",
                          genero: "Sexo",
                          nombrePais: "País",
                          nombreEstado: "Estado",
                          nombreCiudad: "Ciudad",
                          nombreMunicipio: "Municipio",
                          nombreParroquia: "Parroquia",
                          numeroCodigoPostal: "Codigo Postal",
                          direccionCompleta: "Dirección Completa",
                          sitioWeb: "Su Sitio Web",
                          facebook: "Perfil de Facebook",
                          instagram: "Perfil de Instagram",
                          x: "Perfil de X",
                          tiktok: "Perfil de TikTok",
                        }).map(([iterador, titulo], index) => {
                          if (usuario[iterador]) {
                            return (
                              <section
                                key={iterador}
                                className={stylesPerfil.seccionElemento}
                              >
                                <h2 className={stylesPerfil.tituloSeccionFlex}>
                                  {titulo}:
                                </h2>
                                <>
                                  {iterador === "claveDesencriptada" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <input
                                            defaultValue={
                                              usuario.claveDesencriptada
                                            }
                                            {...register(iterador, {
                                              required:
                                                "Introduzca una Contraseña",
                                            })}
                                            className={stylesPerfil.inputClave}
                                            type={
                                              mostrarClave ? "text" : "password"
                                            }
                                          />
                                          {mostrarClave ? (
                                            <Image
                                              className={
                                                stylesPerfil.icono_password
                                              }
                                              onClick={() =>
                                                mostrarPassword(
                                                  usuario.claveDesencriptada
                                                )
                                              }
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
                                              className={
                                                stylesPerfil.icono_password
                                              }
                                              onClick={() =>
                                                mostrarPassword(
                                                  usuario.claveDesencriptada
                                                )
                                              }
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
                                        </>
                                      ) : (
                                        <>
                                          <input
                                            value={usuario.claveDesencriptada}
                                            {...register(iterador, {
                                              required:
                                                "Introduzca una Contraseña",
                                            })}
                                            readOnly
                                            className={stylesPerfil.inputClave}
                                            type={
                                              mostrarClave ? "text" : "password"
                                            }
                                          />
                                          {mostrarClave ? (
                                            <Image
                                              className={
                                                stylesPerfil.icono_password
                                              }
                                              onClick={() =>
                                                mostrarPassword(
                                                  usuario.claveDesencriptada
                                                )
                                              }
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
                                              className={
                                                stylesPerfil.icono_password
                                              }
                                              onClick={() =>
                                                mostrarPassword(
                                                  usuario.claveDesencriptada
                                                )
                                              }
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
                                        </>
                                      )}
                                    </>
                                  )}
                                  {iterador ===
                                    "correoElectronicoDeUsuario" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <input
                                          defaultValue={
                                            usuario.correoElectronicoDeUsuario
                                          }
                                          {...register(iterador)}
                                          className={stylesPerfil.inputClave}
                                          type="email"
                                        />
                                      ) : (
                                        <input
                                          defaultValue={
                                            usuario.correoElectronicoDeUsuario
                                          }
                                          className={stylesPerfil.inputClave}
                                          type="email"
                                          readOnly
                                        />
                                      )}
                                    </>
                                  )}
                                  {iterador === "numeroCodigoPostal" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <input
                                          defaultValue={
                                            usuario.numeroCodigoPostal
                                          }
                                          {...register(iterador)}
                                          className={stylesPerfil.inputClave}
                                          type="number"
                                        />
                                      ) : (
                                        <input
                                          value={
                                            usuario.numeroCodigoPostal
                                              ? usuario.numeroCodigoPostal
                                              : usuario.numero_codigo_postal
                                          }
                                          className={stylesPerfil.inputClave}
                                          type="text"
                                        />
                                      )}
                                    </>
                                  )}
                                  {iterador === "fechaNacimiento" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <input
                                            defaultValue={
                                              usuario.fechaNacimiento
                                            }
                                            {...register(iterador)}
                                            className={stylesPerfil.inputClave}
                                            type="date"
                                          />
                                        </>
                                      ) : (
                                        <input
                                          defaultValue={usuario.fechaNacimiento}
                                          className={stylesPerfil.inputClave}
                                          type="date"
                                          readOnly
                                        />
                                      )}
                                    </>
                                  )}
                                  {iterador === "cedula" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <input
                                            defaultValue={usuario.cedula}
                                            {...register(iterador)}
                                            className={stylesPerfil.inputClave}
                                            type="number"
                                          />
                                        </>
                                      ) : (
                                        <input
                                          defaultValue={usuario.cedula}
                                          className={stylesPerfil.inputClave}
                                          type="number"
                                          readOnly
                                        />
                                      )}
                                    </>
                                  )}
                                  {iterador === "x" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <input
                                            defaultValue={usuario.x}
                                            {...register(iterador)}
                                            className={stylesPerfil.inputClave}
                                            type="text"
                                          />
                                        </>
                                      ) : (
                                        <Link
                                          href={usuario?.x}
                                          className={stylesPerfil.inputClave}
                                          target="_blank"
                                        >
                                          Su Perfil de X
                                        </Link>
                                      )}
                                    </>
                                  )}
                                  {iterador === "instagram" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <input
                                            defaultValue={usuario.instagram}
                                            {...register(iterador)}
                                            className={stylesPerfil.inputClave}
                                            type="text"
                                          />
                                        </>
                                      ) : (
                                        <Link
                                          href={usuario?.instagram}
                                          className={stylesPerfil.inputClave}
                                          target="_blank"
                                        >
                                          Su Perfil de Instagram
                                        </Link>
                                      )}
                                    </>
                                  )}
                                  {iterador === "facebook" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <input
                                            defaultValue={usuario.facebook}
                                            {...register(iterador)}
                                            className={stylesPerfil.inputClave}
                                            type="text"
                                          />
                                        </>
                                      ) : (
                                        <Link
                                          href={usuario?.facebook}
                                          className={stylesPerfil.inputClave}
                                          target="_blank"
                                        >
                                          Su Perfil de Facebook
                                        </Link>
                                      )}
                                    </>
                                  )}
                                  {iterador === "sitioWeb" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <input
                                            defaultValue={usuario.sitio_web}
                                            {...register(iterador)}
                                            className={stylesPerfil.inputClave}
                                            type="text"
                                          />
                                        </>
                                      ) : (
                                        <Link
                                          href={
                                            usuario?.sitio_web
                                              ? usuario?.sitio_web
                                              : usuario.sitioWeb
                                          }
                                          className={stylesPerfil.inputClave}
                                          target="_blank"
                                        >
                                          Su Sitio Web
                                        </Link>
                                      )}
                                    </>
                                  )}
                                  {iterador === "tiktok" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <input
                                            defaultValue={usuario.tiktok}
                                            {...register(iterador)}
                                            className={stylesPerfil.inputClave}
                                            type="text"
                                          />
                                        </>
                                      ) : (
                                        <Link
                                          href={usuario?.tiktok}
                                          className={stylesPerfil.inputClave}
                                          target="_blank"
                                        >
                                          Su Perfil de Tiktok
                                        </Link>
                                      )}
                                    </>
                                  )}
                                  {iterador === "direccionCompleta" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <section className="App">
                                            <Tiptap
                                              setDescription={setDescription}
                                            />
                                          </section>
                                        </>
                                      ) : (
                                        <>
                                          <Details
                                            description={
                                              usuario?.direccion_completa
                                                ? usuario.direccion_completa
                                                : usuario.direccionCompleta
                                            }
                                          />
                                        </>
                                      )}
                                    </>
                                  )}
                                  {iterador === "nacional" && (
                                    <>
                                      {interruptorCambio &&
                                      elementoActivo === index ? (
                                        <>
                                          <select
                                            className={`${stylesPerfil.input_texto} ${stylesPerfil.seleccionNacionalidad} rounded-2`}
                                            id="nacionalidad"
                                            {...register(iterador, {
                                              required:
                                                "Seleccione Una Nacionalidad",
                                            })}
                                          >
                                            <option value="Venezolano">
                                              Venezolana
                                            </option>
                                            <option value="Extranjero">
                                              Extranjero
                                            </option>
                                          </select>
                                        </>
                                      ) : (
                                        <input
                                          defaultValue={usuario.nacional}
                                          className={stylesPerfil.inputClave}
                                          type="text"
                                          readOnly
                                        />
                                      )}
                                    </>
                                  )}
                                  {iterador !== "claveDesencriptada" &&
                                    iterador !== "correoElectronicoDeUsuario" &&
                                    iterador !== "fechaNacimiento" &&
                                    iterador !== "cedula" &&
                                    iterador !== "nacional" &&
                                    iterador !== "direccionCompleta" &&
                                    iterador !== "x" &&
                                    iterador !== "instagram" &&
                                    iterador !== "facebook" &&
                                    iterador !== "tiktok" &&
                                    iterador !== "numeroCodigoPostal" &&
                                    iterador !== "sitioWeb" && (
                                      <>
                                        {interruptorCambio &&
                                        elementoActivo === index ? (
                                          <input
                                            {...register(iterador)}
                                            defaultValue={usuario[iterador]}
                                            className={stylesPerfil.inputClave}
                                            type="text"
                                          />
                                        ) : (
                                          <input
                                            value={usuario[iterador]}
                                            className={stylesPerfil.inputClave}
                                            type="text"
                                            readOnly
                                          />
                                        )}
                                      </>
                                    )}
                                </>
                                <label
                                  style={{
                                    position: "relative",
                                    height: "0",
                                    top: "0",
                                    left: "0",
                                    cursor: "pointer",
                                  }}
                                >
                                  <section
                                    className={stylesPerfil.seccionBlanco}
                                    style={{
                                      position: "relative",
                                      height: "0",
                                      top: "0",
                                      left: "0",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Image
                                      className={stylesPerfil.icono_edit}
                                      onClick={() => cambiarElemento(index)}
                                      width={20}
                                      height={20}
                                      src={`/editar-theme-black.svg`}
                                      alt="Cambiar Foto de Perfil"
                                    />
                                  </section>
                                </label>
                              </section>
                            );
                          }
                        })}
                        <button
                          className={stylesPerfil.seccionElemento}
                          type="submit"
                        >
                          Guardar Cambios
                        </button>
                      </>
                    )}
                  </form>
                </section>
              </section>
            </section>
          </section>
        </main>
      </body>
    </>
  );
};

export default Perfil;
