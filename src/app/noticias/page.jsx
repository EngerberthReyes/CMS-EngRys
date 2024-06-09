"use client";

import Image from "next/image";
import Link from "next/link";
import Post from "@/componentes/post/post.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import stylesNoticias from "../CSS/styles-noticias.module.css";

const Noticias = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [post, setPost] = useState([]);
  const [nombreImagen, setNombreImagen] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [interructor, setInterructor] = useState(true);
  const [imagenesPorExceso, setImagenesPorExceso] = useState();
  const [temaActual, setTemaActual] = useState();
  const mensaje = watch("mensaje");

  console.log(mensaje);

  console.log(nombreImagen, imagen);

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

  const agregarArchivo = (event) => {
    const archivos = event.target.files;
    if (archivos && archivos.length > 0) {
      const archivosRecorridos = Object.values(archivos);
      const nuevasImagenes = [...imagen, ...archivosRecorridos];
      const imagenesRestantes = nuevasImagenes.slice(0, 12);
      setImagenesPorExceso(`${12 - imagenesRestantes.length}`);
      const nombres = imagenesRestantes.map((archivo) => archivo.name);
      setNombreImagen(nombres);
      setImagen(imagenesRestantes);
      setInterructor(false);
      event.target.value = "";
    } else {
      console.log("Se Selecciono Ningun Archivo");
    }
  };

  console.log(post);

  const [usuario, setUsuario] = useState();
  const [perfilCerrado, setPerfilCerrado] = useState(false);

  const obtenerPerfil = async () => {
    if (perfilCerrado) {
      return;
    }

    try {
      const respuesta = await axios.get("../API/perfil");
      console.log(respuesta);
      const usuarioActivo = respuesta.data.sesionUsuario;
      setUsuario(usuarioActivo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerPerfil();
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

  const enviarPost = async (nuevoPost) => {
    const postEnviado = {
      mensaje: nuevoPost.mensaje,
      nombreImagen: nombreImagen,
      imagen: imagen,
    };
    if (postEnviado) {
      setPost([...post, postEnviado]);
      setNombreImagen([]);
      setImagen([]);
      setInterructor(true);
    }

    try {
      const respuesta = await axios.post("/API", { algo });
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  const enviarComentarioTecla = (event) => {
    if (
      event.key === "Enter" &&
      mensaje.replace(/[\n\r]/g, "").trim().length > 0 &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSubmit(enviarPost)();
    }
  };

  return (
    <>
      <head>
        <title>Noticias - EpíComputers</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesNoticias.body}>
        <header className={stylesNoticias.header}>
          <Link className={stylesNoticias.enlaceNormal} href={"/"}>
            <h1 className={stylesNoticias.tituloHeader}>EpíComputers</h1>
          </Link>
          <section
            className={`${stylesNoticias.seccionEnlace} ${stylesNoticias.seccionEnlaceAumentada}`}
          >
            <Link className={stylesNoticias.enlace} href="/noticias">
              Noticias
            </Link>
            <Link className={stylesNoticias.enlace} href="/sobre_nosotros">
              Sobre Nosotros
            </Link>
            <Link className={stylesNoticias.enlace} href="/contactanos">
              Contactanos
            </Link>
          </section>
          <section className={stylesNoticias.seccionEnlace}>
            {usuario ? (
              <>
                <Link
                  className={`${stylesNoticias.enlace} ${stylesNoticias.usuarioPerfil}`}
                  style={{ border: "none" }}
                  href="/perfil"
                >
                  <Image
                    className={stylesNoticias.imagenes}
                    width={35}
                    height={20}
                    src={imagen ? imagen : "/IMG/epigrafe73.png"}
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
              </>
            ) : (
              <>
                <Link className={stylesNoticias.enlace} href="/iniciar_sesion">
                  Iniciar Sesión
                </Link>
                <Link className={stylesNoticias.enlace} href="/registro">
                  Registrarse
                </Link>
              </>
            )}
          </section>
        </header>
        <main>
          <section className={stylesNoticias.main}>
            <section className={stylesNoticias.seccionSecundaria}>
              <section className={stylesNoticias.seccionAjustes}>
                <h1>Lateral</h1>
                <section className={stylesNoticias.seccionFlex}>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                </section>
              </section>
            </section>
            <section className={stylesNoticias.seccionCentral}>
              <section className={stylesNoticias.seccionPrincipal}>
                <section className={stylesNoticias.seccionGrid}>
                  <h1>Pública Algo...</h1>
                  <section className={stylesNoticias.seccionPost}>
                    <form
                      className={stylesNoticias.formulario}
                      encType="multipart/form-data"
                      onSubmit={handleSubmit(enviarPost)}
                    >
                      <textarea
                        className={stylesNoticias.textArea}
                        onKeyDown={enviarComentarioTecla}
                        {...register("mensaje", {
                          required: false,
                        })}
                      ></textarea>
                      <button
                        disabled={
                          (!mensaje ||
                            mensaje.replace(/[\n\r]/g, "").trim().length <=
                              0) &&
                          interructor
                        }
                        className={`${stylesNoticias.enlace} ${stylesNoticias.botonEnviar}`}
                        type="submit"
                      >
                        Enviar
                      </button>
                    </form>
                    {imagen.length > 0 && (
                      <section
                        className={stylesNoticias.lineaPunteada}
                      ></section>
                    )}
                    <section className={stylesNoticias.seccionGridImagenes}>
                      {imagen && (
                        <section className={stylesNoticias.seccionGridImagenes}>
                          {imagen.map((archivo, index) => (
                            <section
                              key={index}
                              className={stylesNoticias.imagen}
                            >
                              {archivo.name.includes(".mp4") ? (
                                <video
                                  className={stylesNoticias.imagen}
                                  alt={`${index + 1}`}
                                  src={URL.createObjectURL(archivo)}
                                  controls
                                ></video>
                              ) : (
                                <img
                                  className={stylesNoticias.imagen}
                                  alt={`${index + 1}`}
                                  src={URL.createObjectURL(archivo)}
                                />
                              )}
                            </section>
                          ))}
                        </section>
                      )}
                    </section>
                    {imagen.length > 0 && (
                      <section
                        className={stylesNoticias.seccionImagenAdvertencia}
                      >
                        <p className={stylesNoticias.parrafoImagen}>
                          Solo Se Puede Agregar 12 Archivos
                        </p>
                        <p
                          className={`${
                            imagenesPorExceso == "0"
                              ? `${stylesNoticias.parrafoAdvertencia}`
                              : `${stylesNoticias.parrafoImagen}`
                          }`}
                        >
                          Puede Agregar:{" "}
                          {imagenesPorExceso < 10
                            ? `0${imagenesPorExceso}`
                            : imagenesPorExceso}{" "}
                          Archivos Más
                        </p>
                      </section>
                    )}
                  </section>
                  <section className={stylesNoticias.lineaPunteada}></section>
                  <section className={stylesNoticias.seccionElementos}>
                    <section className={stylesNoticias.item}>
                      <label
                        className={stylesNoticias.inputFile}
                        htmlFor="imagen"
                      ></label>
                      <input
                        id="imagen"
                        multiple
                        accept=".png, .mp4, .gif, .jpg, .jpeg"
                        onChange={agregarArchivo}
                        type="file"
                      />
                      {temaActual && (
                        <Image
                          width={20}
                          height={20}
                          src={
                            temaActual === "oscuro"
                              ? `/plus-solid-black.svg`
                              : `/plus-solid-white.svg`
                          }
                          alt="Agregar Imagen"
                        />
                      )}
                    </section>
                    <section className={stylesNoticias.item}>Cajas</section>
                    <section className={stylesNoticias.item}>Cajas</section>
                    <section className={stylesNoticias.item}>Cajas</section>
                  </section>
                </section>
              </section>
              {post && <Post post={post} />}
            </section>
            <section className={stylesNoticias.seccionTerciaria}>
              <section className={stylesNoticias.seccionAjustes}>
                <h1>Lateral</h1>
                <section className={stylesNoticias.seccionFlex}>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                  <section>Cajas2</section>
                </section>
              </section>
            </section>
          </section>
        </main>
      </body>
    </>
  );
};

export default Noticias;
