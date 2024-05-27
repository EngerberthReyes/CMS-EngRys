"use client";

import Image from "next/image";
import Link from "next/link";
import Post from "@/componentes/post/post.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import stylesPerfil from "../CSS/styles-perfil.module.css";

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

  const [post, setPost] = useState([]);

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
            <Link className={stylesPerfil.enlace} href="/iniciar_sesion">
              Iniciar Sesión
            </Link>
            <Link className={stylesPerfil.enlace} href="/registro">
              Registrarse
            </Link>
          </section>
        </header>
        <main>
          <section className={stylesPerfil.main}>
            <section className={stylesPerfil.seccionSecundaria}>
              <section className={stylesPerfil.seccionAjustes}>
                <h1>Perfil</h1>
                <section className={stylesPerfil.seccionFlex}>
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
            <section className={stylesPerfil.seccionCentral}>
              <section className={stylesPerfil.seccionPrincipal}>
                <section className={stylesPerfil.seccionGrid}>
                  <h1>Perfil</h1>
                  <section className={stylesPerfil.seccionPost}>
                    <form
                      className={stylesPerfil.formulario}
                      onSubmit={handleSubmit(enviarPost)}
                    >
                      <textarea
                        className={stylesPerfil.textArea}
                        onKeyDown={enviarComentarioTecla}
                        {...register("mensaje", {
                          required: "Introduzca Algún Mensaje",
                        })}
                      ></textarea>
                      <button
                        disabled={!isValid}
                        className={`${stylesPerfil.enlace} ${stylesPerfil.botonEnviar}`}
                        type="submit"
                      >
                        Enviar
                      </button>
                    </form>
                  </section>
                  <section className={stylesPerfil.seccionElementos}>
                    <section>Cajas</section>
                    <section>Cajas</section>
                    <section>Cajas</section>
                    <section>Cajas</section>
                  </section>
                </section>
              </section>
              {post && <Post post={post} />}
            </section>
            <section className={stylesPerfil.seccionTerciaria}>
              <section className={stylesPerfil.seccionAjustes}>
                <h1>Perfil</h1>
                <section className={stylesPerfil.seccionFlex}>
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

export default Perfil;
