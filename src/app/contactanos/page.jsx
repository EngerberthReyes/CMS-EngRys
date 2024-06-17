"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import stylesContactanos from "../CSS/styles-contactanos.module.css";

const Contactanos = () => {
  console.log("Nuevo Mensaje");
  const [usuario, setUsuario] = useState();
  const [imagen, setImagen] = useState();
  const [nombreImagen, setNombreImagen] = useState();
  const [perfilCerrado, setPerfilCerrado] = useState(false);
  const enrutadorMaster = useRouter();
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

  return (
    <>
      <head>
        <title>Contáctanos - EpíComputers</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesContactanos.body}>
        <header className={stylesContactanos.header}>
          <Link className={stylesContactanos.enlaceNormal} href={"/"}>
            <h1 className={stylesContactanos.tituloHeader}>EpíComputers</h1>
          </Link>
          <section
            className={`${stylesContactanos.seccionEnlace} ${stylesContactanos.seccionEnlaceAumentada}`}
          >
            <Link className={stylesContactanos.enlace} href="/noticias">
              Noticias
            </Link>
            <Link className={stylesContactanos.enlace} href="/sobre_nosotros">
              Sobre Nosotros
            </Link>
            <Link className={stylesContactanos.enlace} href="/contactanos">
              Contáctanos
            </Link>
          </section>
          <section className={stylesContactanos.seccionEnlace}>
            {usuario ? (
              <>
                <Link
                  className={`${stylesContactanos.enlace} ${stylesContactanos.usuarioPerfil}`}
                  style={{ border: "none" }}
                  href="/perfil"
                >
                  <Image
                    className={stylesContactanos.imagenes}
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
                  className={`${stylesContactanos.enlace} ${stylesContactanos.usuarioPerfil}`}
                  onClick={() => cerrarPerfil()}
                >
                  <section>Cerrar Sesión</section>
                </button>
              </>
            ) : (
              <>
                <Link
                  className={stylesContactanos.enlace}
                  href="/iniciar_sesion"
                >
                  Iniciar Sesión
                </Link>
                <Link className={stylesContactanos.enlace} href="/registro">
                  Registrarse
                </Link>
              </>
            )}
          </section>
        </header>
        <main className={stylesContactanos.mainPrincipal}>
          <section className={stylesContactanos.main}>
            <section className={stylesContactanos.seccionSecundaria}>
              <section className={stylesContactanos.seccionAjustes}>
                <h1 style={{ textAlign: "center", marginBottom: "4%" }}>
                  Contáctanos
                </h1>
                <section>
                  <h3>
                    Correo Electrónico:{" "}
                    <span>epiccomputers@gmail.epic.com</span>
                  </h3>
                  <h3>
                    Teléfono: <span>+58 2024202420242024</span>
                  </h3>
                </section>

                <section>
                  <h2>Intereses</h2>
                  <h3>
                    Intereses: <span>Interés 1, Interés 2, etc.</span>
                  </h3>
                </section>

                <section>
                  <h2>Presupuesto</h2>
                  <h3>
                    Presupuesto: <span>$5000</span>
                  </h3>
                </section>

                <section>
                  <h2>Hora de Contacto Preferida</h2>
                  <h3>
                    Hora de contacto preferida: <span>10:00 AM</span>
                  </h3>
                </section>
              </section>
            </section>
          </section>
        </main>
      </body>
    </>
  );
};

export default Contactanos;
