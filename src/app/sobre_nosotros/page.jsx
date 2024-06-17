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
              Contáctanos
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
              <section
                className={stylesNosotros.seccionGrid}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h1 style={{ textAlign: "center", margin: "0" }}>
                  Sobre EpíComputers
                </h1>
              </section>
            </section>
          </section>
          <section className={stylesNosotros.main}>
            <section className={stylesNosotros.seccionSecundaria}>
              <section className={stylesNosotros.seccionAjustes}>
                <h1 style={{ textAlign: "center", marginBottom: "4%" }}>
                  Servicios de Nuestra Empresa
                </h1>
                <section className={stylesNosotros.seccionFlex}>
                  <ol>
                    <li
                      style={{
                        margin: "0 0 1rem 0",
                        fontSize: "18px",
                      }}
                    >
                      <strong>Innovación:</strong> Nos comprometemos a estar
                      siempre a la vanguardia de las últimas avances
                      tecnológicos, buscando constantemente formas de mejorar y
                      expandir nuestras ofertas.
                    </li>
                    <li
                      style={{
                        margin: "0 0 1rem 0",
                        fontSize: "18px",
                      }}
                    >
                      <strong>Calidad:</strong> Nos esforzamos por ofrecer
                      productos y servicios de la más alta calidad, garantizando
                      la satisfacción de nuestros clientes.
                    </li>
                    <li
                      style={{
                        margin: "0 0 1rem 0",
                        fontSize: "18px",
                      }}
                    >
                      <strong>Servicio al Cliente:</strong> Priorizamos el trato
                      personalizado y la atención detallada a nuestros clientes,
                      entendiendo que cada proyecto es único y requiere un
                      enfoque individualizado.
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      <strong>Responsabilidad Social:</strong> Reconocemos
                      nuestro papel en la comunidad y nos comprometemos a
                      contribuir positivamente a través de iniciativas sociales
                      y educativas.
                    </li>
                  </ol>
                </section>
              </section>
            </section>
            <section className={stylesNosotros.seccionPrincipal}>
              <section className={stylesNosotros.seccionGrid}>
                <h1 style={{ textAlign: "center" }}>EpicComputers...</h1>
                <section style={{ marginTop: "2%" }}>
                  <article>
                    <h2>Historia</h2>
                    <p
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      EpicComputers nació de la pasión por la tecnología y la
                      necesidad de ofrecer soluciones informáticas superiores a
                      nuestros clientes. Fundada en 2024, nuestra empresa ha
                      evolucionado constantemente para adaptarse a las
                      cambiantes necesidades del mercado, siempre manteniendo un
                      enfoque en la calidad y el servicio excepcional.
                    </p>
                  </article>

                  <article>
                    <h2>Misión</h2>
                    <p
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      Nuestra misión es ser el socio preferido de nuestros
                      clientes en el mundo de las computadoras, proporcionando
                      equipos de alta calidad y servicios personalizados que les
                      permitan alcanzar sus objetivos profesionales y
                      personales. Creemos firmemente en la importancia de la
                      tecnología como motor de cambio y desarrollo.
                    </p>
                  </article>

                  <article>
                    <h2>Visión</h2>
                    <p
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      Aspiramos a liderar el mercado de computadoras mediante la
                      innovación constante, la excelencia en el servicio y la
                      construcción de relaciones duraderas basadas en la
                      confianza y el respeto mutuo. Queremos ser reconocidos no
                      solo por nuestras soluciones tecnológicas avanzadas, sino
                      también por nuestra contribución a la sociedad a través de
                      la promoción de la educación y el acceso a la tecnología.
                    </p>
                  </article>
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
