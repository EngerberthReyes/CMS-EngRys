"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import stylesNosotros from "../CSS/styles-sobreNosotros.module.css";

const SobreNosotros = () => {
  console.log("Nuevo Mensaje");
const enrutadorMaster = useRouter();
  const [usuario, setUsuario] = useState();
  const [imagen, setImagen] = useState();
  const [nombreImagen, setNombreImagen] = useState();
  const [perfilCerrado, setPerfilCerrado] = useState(false);

  const agregarImagen = async (event) => {
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
          setImagen(fotodePerfil);
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
  return (
    <>
      <head>
        <title>Sobre Nosotros - EpíComputers</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesNosotros.body}>
        <header className={stylesNosotros.header}>
          <Link className={stylesNosotros.enlaceNormal} href={"/"}>
            <h1 className={stylesNosotros.tituloHeader}>EpíComputers</h1>
          </Link>
          <section
            className={`${stylesNosotros.seccionEnlace} ${stylesNosotros.seccionEnlaceAumentada}`}
          >
            <Link className={stylesNosotros.enlace} href="/noticias">
              Noticias
            </Link>
            <Link className={stylesNosotros.enlace} href="/sobre_nosotros">
              Sobre Nosotros
            </Link>
            <Link className={stylesNosotros.enlace} href="/contactanos">
              Contactanos
            </Link>
          </section>
          <section className={stylesNosotros.seccionEnlace}>
            {usuario ? (
              <>
                <Link
                  className={`${stylesNosotros.enlace} ${stylesNosotros.usuarioPerfil}`}
                  style={{ border: "none" }}
                  href="/perfil"
                >
                  <Image
                    className={stylesNosotros.imagenes}
                    width={35}
                    height={20}
                    src={usuario?.fotoPerfil ? usuario.fotoPerfil : "/IMG/epigrafe73.png"}
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
                  className={`${stylesNosotros.enlace} ${stylesNosotros.usuarioPerfil}`}
                  onClick={() => cerrarPerfil()}
                >
                  <section>Cerrar Sesión</section>
                </button>
              </>
            ) : (
              <>
                <Link className={stylesNosotros.enlace} href="/iniciar_sesion">
                  Iniciar Sesión
                </Link>
                <Link className={stylesNosotros.enlace} href="/registro">
                  Registrarse
                </Link>
              </>
            )}
          </section>
        </header>
        <main>
          <section
            className={`${stylesNosotros.main} ${stylesNosotros.seccionSecundariaAjuste}`}
          >
            <section
              className={`${stylesNosotros.seccionPrincipal} ${stylesNosotros.seccionSecundariaAjuste}`}
            >
              <section className={stylesNosotros.seccionGrid}>
                <h1>Aqui va algo</h1>
                <section>
                  <h1>Aqui Podria ir otra cosa</h1>
                </section>
              </section>
            </section>
          </section>
          <section className={stylesNosotros.main}>
            <section className={stylesNosotros.seccionSecundaria}>
              <section className={stylesNosotros.seccionAjustes}>
                <h1>Aqui podrias poner Puntos sobre nuestros servicios</h1>
                <section className={stylesNosotros.seccionFlex}>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                  <section>Puntos</section>
                </section>
              </section>
            </section>
            <section className={stylesNosotros.seccionPrincipal}>
              <section className={stylesNosotros.seccionGrid}>
                <h1>Aqui muchas mas cosas</h1>
                <section>
                  <h1>Aqui se podria poner una descripción de esta empresa</h1>
                  <p>Texto</p>
                </section>
              </section>
            </section>
          </section>
        </main>
      </body>
    </>
  );
};

export default SobreNosotros;
