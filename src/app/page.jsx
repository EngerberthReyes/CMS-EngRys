"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/App.css";
import Details from "@/componentes/tiptap/DetailsDos";
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
  const [description, setDescription] = useState("");
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

  const cambiarElemento = () => {
    setInterruptorCambio(true);
  };

  const [descripcionInicialModificacion, setDescripcionInicialModificacion] =
    useState("");
  const [descripcionInicialPersonal, setDescripcionInicialPersonal] =
    useState("");
  const [editorDescripcionInicial, setEditorDescripcionInicial] =
    useState(false);

  const obtenerDescripcionInicialPersonal = async () => {
    try {
      if (descripcionInicialPersonal === "") {
        console.log(setEditorDescripcionInicial);
        const obtenerDescripcionInicial = await axios.get(
          "/API/descripcionInicial/1"
        );
        setDescripcionInicialModificacion(
          obtenerDescripcionInicial.data[0].contenido
        );
        console.log(obtenerDescripcionInicial);
      }
      console.log(description);
      if (descripcionInicialModificacion) {
        const respuestaDescripcionInicial = await axios.put(
          "/API/descripcionInicial/1",
          {
            description,
          }
        );

        console.log(respuestaDescripcionInicial.data[0].contenido);
        setDescripcionInicialModificacion(respuestaDescripcionInicial.data);
        console.log(respuestaDescripcionInicial.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInterruptorCambio(false);
    }
  };

  useEffect(() => {
    obtenerDescripcionInicialPersonal();
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
                        descripcionInicialModificacion
                          ? descripcionInicialModificacion
                          : descripcionInicialModificacion
                      }
                    />
                  )}
                  {interruptorCambio &&
                    usuario?.idRol !== 2 &&
                    usuario?.idRol !== 3 &&
                    usuario !== undefined && (
                      <>
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
                              alt="Cambiar Descripción Inicial"
                            />
                          </section>
                        </label>

                        <button
                          style={{
                            position: "fixed",
                            left: "2rem",
                            bottom: "1rem",
                            zIndex: "1000",
                            background: "#0f0f0fbf",
                          }}
                          className={stylesInicio.seccionElemento}
                          onClick={() => obtenerDescripcionInicialPersonal()}
                        >
                          Guardar Cambios
                        </button>
                      </>
                    )}
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
