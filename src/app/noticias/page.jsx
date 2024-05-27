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
  const [temaActual, setTemaActual] = useState();

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

  console.log(post);

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
                      onSubmit={handleSubmit(enviarPost)}
                    >
                      <textarea
                        className={stylesNoticias.textArea}
                        onKeyDown={enviarComentarioTecla}
                        {...register("mensaje", {
                          required: "Introduzca Algún Mensaje",
                        })}
                      ></textarea>
                      <button
                        disabled={!isValid}
                        className={`${stylesNoticias.enlace} ${stylesNoticias.botonEnviar}`}
                        type="submit"
                      >
                        Enviar
                      </button>
                    </form>
                  </section>
                  <section className={stylesNoticias.lineaPunteada}></section>
                  <section className={stylesNoticias.seccionElementos}>
                    <section className={stylesNoticias.item}>
                      {" "}
                      {temaActual && (
                        <Image
                          className={stylesNoticias.icono_password}
                          onClick={() => agregarImagen}
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
