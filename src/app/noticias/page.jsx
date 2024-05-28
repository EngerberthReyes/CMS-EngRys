"use client";

import Image from "next/image";
import Link from "next/link";
import Post from "@/componentes/post/post.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import stylesNoticias from "../CSS/styles-noticias.module.css";
import { Water_Brush } from "next/font/google";

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
  const [nombreImagen, setNombreImagen] = useState();
  const [imagen, setImagen] = useState();
  const [imagenWidth, setImagenWidth] = useState();
  const [imagenHeight, setImagenHeight] = useState();
  const [temaActual, setTemaActual] = useState();
  const mensaje = watch("mensaje");

  console.log(mensaje);

  console.log(nombreImagen, imagen);

  console.log(imagenHeight);

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

  const agregarImagen = (event) => {
    const archivos = event.target.files;
    if (archivos && archivos.length > 0) {
      const archivosRecorridos = Object.values(archivos);
      const nuevasImagenes = [...imagen, ...archivosRecorridos];
      const nombres = nuevasImagenes.map((archivo) => archivo.name);
      setNombreImagen(nombres);
      setImagen(nuevasImagenes);
      event.target.value = "";
    } else {
      console.log("No Selecciono Ningun Archivo");
    }
  };

  console.log(post);

  const enviarPost = async (nuevoPost) => {
    const postEnviado = {
      mensaje: nuevoPost.mensaje,
      nombreImagen: nombreImagen,
      imagen: imagen,
    };
    if (postEnviado) {
      setPost([...post, postEnviado]);
      setNombreImagen("");
      setImagen(false);
    }

    try {
      const respuesta = await axios.post("/API", { algo });
    } catch (error) {
      console.error(error);
    }
    reset();
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
            <Link className={stylesNoticias.enlace} href="/iniciar_sesion">
              Iniciar Sesión
            </Link>
            <Link className={stylesNoticias.enlace} href="/registro">
              Registrarse
            </Link>
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
                        disabled={!mensaje && !imagen}
                        className={`${stylesNoticias.enlace} ${stylesNoticias.botonEnviar}`}
                        type="submit"
                      >
                        Enviar
                      </button>
                    </form>
                    {imagen && (
                      <section
                        className={stylesNoticias.lineaPunteada}
                      ></section>
                    )}
                    <section className={stylesNoticias.seccionGridImagenes}>
                      {imagen &&
                        imagen.map((archivo, index) => (
                          <section key={index}>
                            <Image
                              className={stylesNoticias.imagen}
                              alt={nombreImagen}
                              src={URL.createObjectURL(archivo)}
                              property
                              fill
                            />
                          </section>
                        ))}
                    </section>
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
                        accept=".png, .jpg, .gif, .jpeg"
                        onChange={agregarImagen}
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
