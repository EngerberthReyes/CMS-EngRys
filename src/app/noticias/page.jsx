"use client";

import Image from "next/image";
import Link from "next/link";
import Post from "@/componentes/post/post.jsx";
import NoticiasPublicadas from "@/componentes/noticias/noticias.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../CSS/App.css";
import { Tiptap } from "@/componentes/tiptap/TipTap";
import { useRouter } from "next/navigation";
import stylesNoticias from "../CSS/styles-noticias.module.css";
import useSWR from "swr";

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
  const enrutadorMaster = useRouter();
  const [post, setPost] = useState([]);
  const [noticia, setNoticia] = useState([]);
  const [nombreImagen, setNombreImagen] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [interructor, setInterructor] = useState(true);
  const [imagenesPorExceso, setImagenesPorExceso] = useState();
  const [imagenesRuta, setImagenesRuta] = useState();
  const [temaActual, setTemaActual] = useState();
  const [mensaje, setMensaje] = useState();
  const [mensajeNoticia, setMensajeNoticia] = useState();

  console.log(imagenesRuta);

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

  const agregarImagenPerfil = async (event) => {
    const formData = new FormData();
    const archivo = event.target.files[0];
    console.log(archivo);
    const nombreArchivo = archivo.name;
    console.log(nombreArchivo);

    try {
      if (archivo) {
        setNombreImagen(nombreArchivo);
        formData.set("archivo", archivo);

        const respuesta = await axios.post("../API/perfil", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const fotodePerfil = respuesta.data.fotoPerfil;

        if (fotodePerfil) {
          setImagenPerfil(fotodePerfil);
          console.log(fotodePerfil);
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

  const [imagenNoticia, setImagenNoticia] = useState([]);
  const [nombreImagenNoticia, setNombreImagenNoticia] = useState([]);
  const [imagenRutaNoticia, setImagenRutaNoticia] = useState([]);
  const [interructorNoticia, setInterructorNoticia] = useState([]);
  const [imagenesPorExcesoNoticias, setImagenesPorExcesoNoticias] = useState();

  const agregarImagenNoticia = async (event) => {
    const archivos = event.target.files;
    if (archivos && archivos.length > 0) {
      console.log(archivos);
      try {
        const archivosRecorridos = Object.values(archivos);
        const nuevasImagenes = [...imagenNoticia, ...archivosRecorridos];
        const imagenesRestantes = nuevasImagenes.slice(0, 12);
        setImagenesPorExcesoNoticias(`${12 - imagenesRestantes.length}`);

        const nombres = imagenesRestantes.map((archivo) => archivo.name);
        console.log(imagenesRestantes);

        const formData = new FormData();
        imagenesRestantes.forEach((file) => {
          formData.append("imagenesNoticias", file);
        });

        const respuesta = await axios.post("/API/ImagenYVideo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { rutasImagenesNoticias } = respuesta.data;

        console.log(rutasImagenesNoticias);

        setNombreImagenNoticia(nombres.join(", "));
        setImagenNoticia(imagenesRestantes);
        setImagenRutaNoticia(rutasImagenesNoticias);
        setInterructorNoticia(false);

        event.target.value = "";
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No se seleccionó ningún archivo");
    }
  };

  const agregarArchivo = async (event) => {
    const archivos = event.target.files;
    if (archivos && archivos.length > 0) {
      try {
        const archivosRecorridos = Object.values(archivos);
        const nuevasImagenes = [...imagen, ...archivosRecorridos];
        const imagenesRestantes = nuevasImagenes.slice(0, 12);
        setImagenesPorExceso(`${12 - imagenesRestantes.length}`);

        const nombres = imagenesRestantes.map((archivo) => archivo.name);
        console.log(imagenesRestantes);

        const formData = new FormData();
        imagenesRestantes.forEach((file) => {
          formData.append("imagenes", file);
        });

        const respuesta = await axios.post("/API/ImagenYVideo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { rutasImagenes } = respuesta.data;

        console.log(rutasImagenes);

        setNombreImagen(nombres.join(", "));
        setImagen(imagenesRestantes);
        setImagenesRuta(rutasImagenes);
        setInterructor(false);

        event.target.value = "";
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No se seleccionó ningún archivo");
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

  const enviarNoticia = async (mensajeNoticia) => {
    const regexUrl = /(https?:\/\/[^\s]+)/g;
    const urlExtensions = /\.(jpeg|jpg|gif|png|bmp|webp)(\?.*)?$/i;
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (typeof mensajeNoticia === "object") {
      return;
    }

    console.log("Mensaje original:", mensajeNoticia);
    const mensajeNoticiaInicial = mensajeNoticia;
    const mensajeNoticiaNormal =
      typeof mensajeNoticia === "string"
        ? mensajeNoticia.replace(/<.*?>/g, "")
        : "";

    console.log("Mensaje normal:", mensajeNoticia);

    const urls = mensajeNoticiaNormal.match(regexUrl) || [];
    const imagenUrl = [];
    const enlaces = [];
    const youtubeUrl = [];

    urls.forEach((url) => {
      if (urlExtensions.test(url)) {
        imagenUrl.push(url);
      } else if (youtubeRegex.test(url)) {
        youtubeUrl.push(url);
      } else {
        enlaces.push(url);
      }
    });

    console.log("URLs:", urls);

    const combinedRegex = new RegExp(
      `${regexUrl.source}|${urlExtensions.source}|${youtubeRegex.source}`,
      "gi"
    );

    if (!mensajeNoticia || typeof mensajeNoticia === "object") {
      mensajeNoticia = " ";
    }

    const texto = mensajeNoticia.replace(combinedRegex, "").trim();

    console.log("Texto:", texto);
    console.log("Imágenes:", imagenUrl);
    console.log("Enlaces:", enlaces);
    console.log("YouTube:", youtubeUrl);

    console.log("ImagenesRuta:", imagenRutaNoticia);
    console.log("Imagen:", imagenNoticia);

    try {
      const formData = new FormData();
      formData.append("mensaje", texto);
      formData.append("nombreImagen", nombreImagen);
      formData.append("imagenUrl", JSON.stringify(imagenUrl));
      formData.append("enlaces", JSON.stringify(enlaces));
      formData.append("youtubeUrl", JSON.stringify(youtubeUrl));
      formData.append("imagenesRuta", JSON.stringify(imagenRutaNoticia));

      imagenNoticia.forEach((archivo, index) => {
        formData.append("imagenes", archivo);
      });

      const respuestaNoticiaEnviada = await axios.post(
        "../API/noticias",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(respuestaNoticiaEnviada);

      const respuesta = respuestaNoticiaEnviada.data;

      setNoticia((prevNoticia) => {
        const nuevasNoticias = respuesta;
        console.log(nuevasNoticias);
        return nuevasNoticias.sort((a, b) => b.id_noticia - a.id_noticia);
      });
    } catch (error) {
      console.error("Error al enviar la publicación:", error);
    } finally {
      setNombreImagenNoticia([]);
      setImagenNoticia([]);
      setMensajeNoticia("");
      setImagenRutaNoticia([]);
      setInterructorNoticia(true);
    }
  };

  const enviarPost = async (mensaje) => {
    const regexUrl = /(https?:\/\/[^\s]+)/g;
    const urlExtensions = /\.(jpeg|jpg|gif|png|bmp|webp)(\?.*)?$/i;
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (typeof mensaje === "object") {
      return;
    }

    console.log("Mensaje original:", mensaje);
    const mensajePost = mensaje;
    const mensajePostNormal =
      typeof mensaje === "string" ? mensaje.replace(/<.*?>/g, "") : "";

    console.log("Mensaje normal:", mensajePostNormal);

    const urls = mensajePostNormal.match(regexUrl) || [];
    const imagenUrl = [];
    const enlaces = [];
    const youtubeUrl = [];

    urls.forEach((url) => {
      if (urlExtensions.test(url)) {
        imagenUrl.push(url);
      } else if (youtubeRegex.test(url)) {
        youtubeUrl.push(url);
      } else {
        enlaces.push(url);
      }
    });

    console.log("URLs:", urls);

    const combinedRegex = new RegExp(
      `${regexUrl.source}|${urlExtensions.source}|${youtubeRegex.source}`,
      "gi"
    );

    if (!mensaje || typeof mensaje === "object") {
      mensaje = " ";
    }

    const texto = mensaje.replace(combinedRegex, "").trim();

    console.log("Texto:", texto);
    console.log("Imágenes:", imagenUrl);
    console.log("Enlaces:", enlaces);
    console.log("YouTube:", youtubeUrl);

    console.log("ImagenesRuta:", imagenesRuta);
    console.log("Imagen:", imagen);

    try {
      const formData = new FormData();
      formData.append("mensaje", texto);
      formData.append("nombreImagen", nombreImagen);
      formData.append("imagenUrl", JSON.stringify(imagenUrl));
      formData.append("enlaces", JSON.stringify(enlaces));
      formData.append("youtubeUrl", JSON.stringify(youtubeUrl));
      formData.append("imagenesRuta", JSON.stringify(imagenesRuta));

      imagen.forEach((archivo, index) => {
        formData.append("imagenes", archivo);
      });

      const respuestaPostEnviado = await axios.post(
        "../API/publicaciones",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(respuestaPostEnviado);

      const respuesta = respuestaPostEnviado.data;

      setPost((prevPosts) => {
        const postNuevos = respuesta;
        console.log(postNuevos);
        return postNuevos.sort((a, b) => b.id_publicacion - a.id_publicacion);
      });
    } catch (error) {
      console.error("Error al enviar la publicación:", error);
    } finally {
      setNombreImagen([]);
      setImagen([]);
      setMensaje("");
      setImagenesRuta([]);
      setInterructor(true);
    }
  };

  useEffect(() => {
    enviarPost();
  }, []);

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

  const [nombreDeUsuario, setNombreDeUsuario] = useState();
  useEffect(() => {
    if (!usuario) return;

    const nombreCompleto = usuario.nombreCompletoUsuario;
    const nombreApellido = nombreCompleto ? nombreCompleto.split(" ") : [];

    const nombreDeUsuario = `${nombreApellido[0] ? nombreApellido[0] : ""} ${
      nombreApellido[2] ? nombreApellido[2] : ""
    }`;
    setNombreDeUsuario(nombreDeUsuario);
  }, [usuario]);

  const [publicacionBorrada, setPublicacionBorrada] = useState();

  const actualizadorPublicacion = (enviandoBorrado) => {
    setPublicacionBorrada(enviandoBorrado);
  };

  const publicaciones = async () => {
    try {
      const respuestaPost = await axios.get("../API/publicaciones");
      const respuestaPrimera = respuestaPost.data;
      setPost((prevPosts) => {
        const postNuevos = respuestaPrimera;
        console.log(postNuevos);
        return postNuevos.sort((a, b) => b.id_publicacion - a.id_publicacion);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const theFetcher = (url) =>
    fetch(`http://localhost:3000/API/publicaciones`).then((res) => res.json());

  const { data: posters } = useSWR(
    `http://localhost:3000/API/publicaciones`,
    theFetcher
  );

  useEffect(() => {
    publicaciones();
  }, [publicacionBorrada, posters]);

  const [noticiaBorrada, setNoticiaBorrada] = useState();

  const actualizadorNoticia = (enviandoBorrado) => {
    setNoticiaBorrada(enviandoBorrado);
  };

  const noticias = async () => {
    try {
      const respuestaPost = await axios.get("../API/noticias");
      const respuestaPrimera = respuestaPost.data;
      setNoticia((prevPosts) => {
        const postNuevos = respuestaPrimera;
        console.log(postNuevos);
        return postNuevos.sort((a, b) => b.id_noticia - a.id_noticia);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setImagenesPorExcesoNoticias(0);
    }
  };

  const theFetcherNoticia = (url) =>
    fetch(`http://localhost:3000/API/noticias`).then((res) => res.json());

  const { data: noticiasActual } = useSWR(
    `http://localhost:3000/API/noticias`,
    theFetcherNoticia
  );

  useEffect(() => {
    noticias();
  }, [noticiaBorrada, noticiasActual]);

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
          <section className={stylesNoticias.seccionEnlace}>
            {usuario ? (
              <>
                <Link
                  className={`${stylesNoticias.enlace} ${stylesNoticias.usuarioPerfil} ${stylesNoticias.enlacePersonalizado}`}
                  href="/perfil"
                  style={{ border: "none" }}
                >
                  <Image
                    className={stylesNoticias.imagenes}
                    width={35}
                    height={20}
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
                  <section style={{ wordBreak: "keep-all" }}>
                    <section>{nombreDeUsuario}</section>
                    <section>{usuario.correoElectronicoDeUsuario}</section>
                  </section>
                </Link>
                <button
                  className={`${stylesNoticias.enlace} ${stylesNoticias.usuarioPerfil} ${stylesNoticias.enlacePersonalizado}`}
                  onClick={() => cerrarPerfil()}
                >
                  <section>Cerrar Sesión</section>
                </button>
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
            <section
              style={{
                width: "34rem",
                position: "sticky",
                top: "1%",
                left: "1%",
              }}
            >
              <section
                className={stylesNoticias.seccionSecundaria}
                style={{ width: "100%" }}
              >
                <section
                  className={stylesNoticias.seccionAjustes}
                  style={{ width: "100%", margin: "0" }}
                >
                  <h1 style={{ textAlign: "center", padding: "1rem" }}>
                    Índice
                  </h1>
                </section>
              </section>
              <section
                className={stylesNoticias.seccionSecundaria}
                style={{ width: "100%", padding: "2%" }}
              >
                <section className={stylesNoticias.seccionAjustes}>
                  <section className={stylesNoticias.seccionFlex}>
                    <section
                      className={`${stylesNoticias.seccionEnlace} ${stylesNoticias.seccionEnlaceAumentada}`}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1rem",
                      }}
                    >
                      <Link className={stylesNoticias.enlace} href="/">
                        Inicio
                      </Link>
                      <Link className={stylesNoticias.enlace} href="/noticias">
                        Noticias
                      </Link>
                      <Link
                        className={stylesNoticias.enlace}
                        href="/sobre_nosotros"
                      >
                        Sobre Nosotros
                      </Link>
                      <Link
                        className={stylesNoticias.enlace}
                        href="/contactanos"
                      >
                        Contactanos
                      </Link>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <section className={stylesNoticias.seccionCentral}>
              <section className={stylesNoticias.seccionPrincipal}>
                {usuario ? (
                  <section className={stylesNoticias.seccionGrid}>
                    <h1>Pública Algo...</h1>
                    <section className={stylesNoticias.seccionPost}>
                      <form
                        className={stylesNoticias.formulario}
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(enviarPost)}
                      >
                        <section className="App">
                          <Tiptap setDescription={setMensaje} />
                        </section>
                        <button
                          onClick={() => enviarPost(mensaje)}
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
                          <section
                            className={stylesNoticias.seccionGridImagenes}
                          >
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
                                    style={{ height: "100%" }}
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
                      <section
                        className={stylesNoticias.item}
                        style={{ padding: "1%", columnGap: "1rem" }}
                      >
                        <label
                          className={stylesNoticias.inputFile}
                          htmlFor="imagen"
                        ></label>
                        <input
                          id="imagen"
                          multiple
                          accept=".png, .mp4, .gif, .apng, .jpg, .jpeg"
                          onChange={agregarArchivo}
                          type="file"
                        />
                        {temaActual && (
                          <Image
                            width={30}
                            height={30}
                            src={
                              temaActual === "oscuro"
                                ? `/plus-solid-black.svg`
                                : `/plus-solid-white.svg`
                            }
                            alt="Agregar Imagen"
                          />
                        )}
                        <h1 style={{ margin: "0" }}>Agregar Archivo</h1>
                      </section>
                      {/*<section className={stylesNoticias.item}>Cajas</section>
                      <section className={stylesNoticias.item}>Cajas</section>
                      <section className={stylesNoticias.item}>Cajas</section>
                         */}
                    </section>
                  </section>
                ) : (
                  <section className={stylesNoticias.seccionGrid}>
                    <h1
                      style={{
                        textAlign: "center",
                        fontSize: "28px",
                        margin: "0",
                      }}
                    >
                      Inicie Sesión o Regístrese Para Hacer Publicaciones
                    </h1>
                  </section>
                )}
              </section>

              {post && (
                <Post
                  post={post}
                  nombreDeUsuario={nombreDeUsuario}
                  usuario={usuario}
                  enviandoBorrado={actualizadorPublicacion}
                />
              )}
            </section>
            <section
              style={{
                width: "34rem",
                right: "0.8%",
                top: "1%",
                position: "sticky",
              }}
            >
              <section
                className={stylesNoticias.seccionSecundaria}
                style={{ width: "100%" }}
              >
                <section
                  className={stylesNoticias.seccionAjustes}
                  style={{ width: "100%", margin: "0" }}
                >
                  <h1 style={{ textAlign: "center", padding: "1rem 0" }}>
                    Noticias
                  </h1>
                </section>
              </section>
              <section
                className={stylesNoticias.seccionSecundaria}
                style={{
                  width: "100%",
                  padding: "2%",
                  padding: "2%",
                  height: `${imagenesPorExcesoNoticias >= 2 ? "91vh" : "auto"}`,
                  overflowY: "auto",
                }}
              >
                <section className={stylesNoticias.seccionAjustes}>
                  <section className={stylesNoticias.seccionFlex}>
                    {usuario ? (
                      <section
                        className={stylesNoticias.seccionGrid}
                        style={{ width: "auto" }}
                      >
                        <h1 style={{ textAlign: "center" }}>
                          Publicar Noticias
                        </h1>
                        <section className={stylesNoticias.seccionPost}>
                          <form
                            className={stylesNoticias.formulario}
                            encType="multipart/form-data"
                            onSubmit={handleSubmit(enviarNoticia)}
                            style={{ flexFlow: "column wrap", rowGap: "1rem" }}
                          >
                            <section className="App" style={{ width: "100%" }}>
                              <Tiptap setDescription={setMensajeNoticia} />
                            </section>
                            <button
                              onClick={() => enviarNoticia(mensajeNoticia)}
                              disabled={
                                (!mensajeNoticia ||
                                  mensajeNoticia.replace(/[\n\r]/g, "").trim()
                                    .length <= 0) &&
                                interructorNoticia
                              }
                              className={`${stylesNoticias.enlace} ${stylesNoticias.botonEnviar}`}
                              style={{ width: "100%" }}
                              type="submit"
                            >
                              Publicar Noticia
                            </button>
                          </form>
                          {imagenNoticia.length > 0 && (
                            <section
                              className={stylesNoticias.lineaPunteada}
                            ></section>
                          )}
                          <section
                            className={stylesNoticias.seccionGridImagenes}
                            style={{ overflowY: "auto" }}
                          >
                            {imagenNoticia && (
                              <section
                                className={stylesNoticias.seccionGridImagenes}
                              >
                                {imagenNoticia.map((archivo, index) => (
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
                          {imagenNoticia.length > 0 && (
                            <section
                              className={
                                stylesNoticias.seccionImagenAdvertencia
                              }
                            >
                              <p className={stylesNoticias.parrafoImagen}>
                                Solo Se Puede Agregar 12 Archivos
                              </p>
                              <p
                                className={`${
                                  imagenesPorExcesoNoticias == "0"
                                    ? `${stylesNoticias.parrafoAdvertencia}`
                                    : `${stylesNoticias.parrafoImagen}`
                                }`}
                              >
                                Puede Agregar:{" "}
                                {imagenesPorExcesoNoticias < 10
                                  ? `0${imagenesPorExcesoNoticias}`
                                  : imagenesPorExcesoNoticias}{" "}
                                Archivos Más
                              </p>
                            </section>
                          )}
                        </section>
                        <section
                          className={stylesNoticias.lineaPunteada}
                        ></section>
                        <section className={stylesNoticias.seccionElementos}>
                          <section className={stylesNoticias.item}>
                            <label
                              className={stylesNoticias.inputFile}
                              htmlFor="imagenNoticia"
                            ></label>
                            <input
                              id="imagenNoticia"
                              multiple
                              accept=".png, .mp4, .gif, .apng, .jpg, .jpeg"
                              onChange={agregarImagenNoticia}
                              type="file"
                            />
                            {temaActual && (
                              <section
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
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
                                <h1 style={{ fontSize: "27px", margin: "0" }}>
                                  Agregar Archivo
                                </h1>
                              </section>
                            )}
                          </section>
                        </section>
                      </section>
                    ) : null}
                  </section>
                </section>
                <section
                  style={{
                    display: `${noticia.length === 0 ? "none" : ""}`,
                    overflowY: "auto",
                    height: `${usuario ? "40vh" : "76vh"}`,
                    position: "relative",
                    marginTop: "2%",
                    overflowX: "hidden",
                  }}
                >
                  {noticia && (
                    <NoticiasPublicadas
                      noticia={noticia}
                      nombreDeUsuario={nombreDeUsuario}
                      usuario={usuario}
                      enviandoBorrado={actualizadorNoticia}
                    />
                  )}
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
