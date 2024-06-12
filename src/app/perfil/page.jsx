"use client";

import Image from "next/image";
import Link from "next/link";
import Post from "@/componentes/post/post.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import stylesPerfil from "../CSS/styles-perfil.module.css";
import { useRouter } from "next/navigation";
import { compare } from "bcryptjs";

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
  const [elementoActivo, setElementoActivo] = useState(null);
  const [interruptorCambio, setInterruptorCambio] = useState(false);
  const [usuario, setUsuario] = useState();
  const [mostrarClave, setMostrarClave] = useState();
  const [paises, setPaises] = useState();
  console.log(usuario);
  console.log(post);

  console.log(paises)

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
      const obteniendoPaises = paises.data
      const usuarioActivo = respuesta.data;
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
    if (interruptorCambio) {
      try {
        const respuesta = await axios.put("../API/cookiesActualizarUsuario");
        const usuarioActivo = respuesta.data;
        setUsuario(usuarioActivo);
        setImagen(usuarioActivo.fotoPerfil);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    }
  };

  const enviarDatos = async (datos, index) => {
    console.log(datos);
    setElementoActivo(index);
    console.log(elementoActivo);
    setInterruptorCambio(true);
    console.log(index);
    if (interruptorCambio) {
      try {
        const respuesta = await axios.put(
          "../API/cookiesActualizarUsuario",
          datos
        );
        console.log(respuesta)
        const usuarioActivo = respuesta.data;
        const respuestaBaseDeDatos = await axios.put(
          "../API/cookiesHaciaBD",
          usuarioActivo
        )
        console.log(respuestaBaseDeDatos)
        setUsuario(usuarioActivo);
        setImagen(usuarioActivo.fotoPerfil);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    }
  };

  useEffect(() => {
    const intervalo = setInterval(obtenerPerfil, 1973);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

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
                    <section>{usuario.nombreDeUsuario}</section>
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
                      {usuario && <h1>{usuario.nombreDeUsuario}</h1>}
                    </section>
                  </section>
                  <section className={stylesPerfil.seccionPerfilIzquierdo}>
                    <h1>Sobre Mi:</h1>
                    <section className={stylesPerfil.seccionElementos}>
                      <h2 className={stylesPerfil.tituloSeccionFlex}>
                        {"Texto Sobre Mi"}
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
                                  {iterador !== "claveDesencriptada" &&
                                    iterador !== "correoElectronicoDeUsuario" &&
                                    iterador !== "fechaNacimiento" && (
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
                                            defaultValue={usuario[iterador]}
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
                      </>
                    )}
                    <button type="submit">Guardar Cambios</button>
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
