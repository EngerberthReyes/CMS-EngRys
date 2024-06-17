"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/App.css";
import Details from "@/componentes/tiptap/Details";
import { Tiptap } from "@/componentes/tiptap/TipTap";
import { useRouter } from "next/navigation";
import stylesInicio from "./CSS/styles-inicio.module.css";

const Inicio = () => {
  console.log("Nuevo Mensaje");
  const [usuario, setUsuario] = useState();
  const [perfilCerrado, setPerfilCerrado] = useState(false);
  const [imagen, setImagen] = useState();
  const [interruptorCambio, setInterruptorCambio] = useState(false);
  const [nombreImagen, setNombreImagen] = useState();
  const enrutadorMaster = useRouter();

  const obtenerPerfil = async () => {
    if (perfilCerrado) {
      return;
    }

    try {
      const respuesta = await axios.get("./API/perfil");
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
      const respuesta = await axios.get("./API/cerrarPerfil");
      setPerfilCerrado(true);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
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

  return (
    <>
      <head>
        <title>EpíComputers</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" type="Image/png" />
      </head>
      <body id={stylesInicio.body}>
        <header className={stylesInicio.header}>
          <Link className={stylesInicio.enlaceNormal} href={"/"}>
            <h1 className={stylesInicio.tituloHeader}>EpíComputers</h1>
          </Link>
          <section
            className={`${stylesInicio.seccionEnlace} ${stylesInicio.seccionEnlaceAumentada}`}
          >
            <Link className={stylesInicio.enlace} href="/noticias">
              Noticias
            </Link>
            <Link className={stylesInicio.enlace} href="/sobre_nosotros">
              Sobre Nosotros
            </Link>
            <Link className={stylesInicio.enlace} href="/contactanos">
              Contáctanos
            </Link>
          </section>
          <section className={stylesInicio.seccionEnlace}>
            {usuario ? (
              <>
                <Link
                  className={`${stylesInicio.enlace} ${stylesInicio.usuarioPerfil}`}
                  style={{ border: "none" }}
                  href="/perfil"
                >
                  <Image
                    className={stylesInicio.imagenes}
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
                  <section>
                    <section>{nombreDeUsuario}</section>
                    <section>{usuario.correoElectronicoDeUsuario}</section>
                  </section>
                </Link>
                <button
                  className={`${stylesInicio.enlace} ${stylesInicio.usuarioPerfil}`}
                  onClick={() => cerrarPerfil()}
                >
                  <section>Cerrar Sesión</section>
                </button>
              </>
            ) : (
              <>
                <Link className={stylesInicio.enlace} href="/iniciar_sesion">
                  Iniciar Sesión
                </Link>
                <Link className={stylesInicio.enlace} href="/registro">
                  Registrarse
                </Link>
              </>
            )}
          </section>
        </header>
        <main
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "85vh",
          }}
        >
          <section
            className={`${stylesInicio.main} ${stylesInicio.seccionSecundariaAjuste}`}
          >
            <section
              className={`${stylesInicio.seccionPrincipal} ${stylesInicio.seccionSecundariaAjuste}`}
            >
              <section
                className={stylesInicio.seccionFlexPrincipal}
                style={{ columnGap: "2rem" }}
              >
                <section
                  className={stylesInicio.secctionInformacion}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    rowGap: "5%",
                  }}
                >
                  <h1
                    className={stylesInicio.tituloSeccion}
                    style={{ textAlign: "center" }}
                  >
                    La PC Gamer de Tus Sueños - EpíComputers
                  </h1>

                  {interruptorCambio ? (
                    <section className="App">
                      <Tiptap setDescription={setDescription} />
                    </section>
                  ) : (
                    <Details
                      description={
                        descripcionPerfilPersonal
                          ? descripcionPerfilPersonal
                          : "Texto de Ejemplo"
                      }
                    />
                  )}

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
                      className={stylesInicio.seccionBlanco}
                      style={{
                        position: "relative",
                        height: "0",
                        top: "0",
                        left: "0",
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        className={stylesInicio.icono_edit}
                        onClick={() => cambiarElemento()}
                        width={20}
                        height={20}
                        src={`/editar-theme-black.svg`}
                        alt="Cambiar Foto de Perfil"
                      />
                    </section>
                  </label>

                  {interruptorCambio && (
                    <button
                      style={{
                        position: "fixed",
                        left: "2rem",
                        bottom: "1rem",
                        background: "#0f0f0fbf",
                      }}
                      className={stylesInicio.seccionElemento}
                      type="submit"
                    >
                      Guardar Cambios
                    </button>
                  )}

                  <p
                    className={stylesInicio.tituloSeccion}
                    style={{ fontSize: "19px", textAlign: "center" }}
                  >
                    Bienvenido a EpíComputers, tu destino definitivo en el mundo
                    de las computadoras. En nuestro sitio web, te sumergirás en
                    una experiencia única donde la tecnología se encuentra con
                    la innovación. Desde procesadores de última generación hasta
                    sistemas completos personalizados, ofrecemos soluciones que
                    van más allá de tus expectativas. Nuestra misión es
                    transformar tu relación con la tecnología, proporcionando
                    equipos de alta calidad que se adapten a tus necesidades
                    específicas. Con un diseño limpio y fácil de navegar,
                    descubrirás productos seleccionados cuidadosamente por
                    nuestros expertos, asegurándote de obtener el mejor valor
                    por tu inversión.
                  </p>
                </section>
                <section className={stylesInicio.seccionElementos}>
                  <section>
                    <Image
                      className={stylesInicio.elemento}
                      src={"/IMG/PCGamer.png"}
                      width={900}
                      height={720}
                      alt={"Imagen"}
                    />
                  </section>
                </section>
              </section>
            </section>
          </section>
        </main>
      </body>
    </>
  );
};

export default Inicio;
