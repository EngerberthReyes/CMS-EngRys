"use client";

import Image from "next/image";
import Link from "next/link";
import Post from "@/componentes/post/post.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import stylesPerfil from "../CSS/styles-perfil.module.css";
import { useRouter } from "next/navigation";

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
  const [imagen, setImagen] = useState();
  const [usuario, setUsuario] = useState();
  console.log(usuario);
  console.log(post);

  const agregarImagen = (event) => {
    const archivo = event.target.files[0];

    const nombreArchivo = archivo.name;

    console.log(nombreArchivo);

    if (archivo) {
      setNombreImagen(nombreArchivo);
      setImagen(URL.createObjectURL(archivo));
      event.target.value = "";
    } else {
      console.log("Se Selecciono Ningun Archivo");
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
      setPerfilCerrado(true); // Indicar que el perfil ha sido cerrado
    } catch (error) {
      console.log(error);
    } finally {
      enrutadorMaster.push("/");
    }
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
                  href="/perfil"
                >
                  <section>{usuario.nombreDeUsuario}</section>
                  <section>{usuario.correoElectronicoDeUsuario}</section>
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
                    <Image
                      className={stylesPerfil.imagenes}
                      width={200}
                      height={200}
                      src={imagen ? imagen : "/IMG/epigrafe73.png"}
                      alt={
                        nombreImagen
                          ? nombreImagen
                          : "Imagen de Perfil Por Defecto"
                      }
                    />
                    {temaActual === "oscuro" ? (
                      <>
                        <label
                          className={stylesPerfil.label}
                          htmlFor="cambiarImagen"
                          title="Cambiar Foto de Perfil"
                        >
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
                          <section className={stylesPerfil.seccionBlanco}>
                            <Image
                              className={stylesPerfil.icono_edit}
                              onClick={() => cambiarImagen}
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
                    <h1>Tu Nombre:</h1>
                    <section>
                      {usuario && <h1>{usuario.nombreDeUsuario}</h1>}
                    </section>
                  </section>
                  <section className={stylesPerfil.seccionPerfilIzquierdo}>
                    <h1>Sobre Mi:</h1>
                    <section>
                      <h2>{"Texto Sobre Mi"}</h2>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <section className={stylesPerfil.seccionTerciaria}>
              <section className={stylesPerfil.seccionAjustes}>
                <h1>Informacion Personal</h1>
                <section className={stylesPerfil.seccionFlex}>
                  <section>
                    {usuario && <h1>{usuario.correoElectronicoDeUsuario}</h1>}
                  </section>
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
