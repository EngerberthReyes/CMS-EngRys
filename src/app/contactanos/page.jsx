"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import stylesContactanos from "../CSS/styles-contactanos.module.css";

const Contactanos = () => {
  const [contactInfo, setContactInfo] = useState({
    correo: "epicomputers@gmail.epic.com",
    telefono: "+58 2024202420242024",
    instagram: "https://instagram.com/@epicoputers",
    facebook: "https://facebook.com/perfil/epicomputers",
    x: "https://x.com/perfil/epicoputers",
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [usuario, setUsuario] = useState();
  const [imagen, setImagen] = useState();
  const [nombreImagen, setNombreImagen] = useState();
  const [perfilCerrado, setPerfilCerrado] = useState(false);
  const [description, setDescription] = useState("");
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [descriptions, setDescriptions] = useState([]);
  const [nombreDeUsuario, setNombreDeUsuario] = useState("");

  useEffect(() => {
    const obtenerPerfil = async () => {
      if (perfilCerrado) return;
      try {
        const respuesta = await axios.get("../API/perfil");
        const usuarioActivo = respuesta.data.sesionUsuario;
        setUsuario(usuarioActivo);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPerfil();
  }, [perfilCerrado]);
  useEffect(() => {
    obtenerContactInfo();
  }, []);

  useEffect(() => {
    if (usuario) {
      const nombreCompleto = usuario.nombreCompletoUsuario || "";
      const nombreApellido = nombreCompleto.split(" ");
      setNombreDeUsuario(
        `${nombreApellido[0] || ""} ${nombreApellido[2] || ""}`
      );
    }
  }, [usuario]);

  const cerrarPerfil = async () => {
    try {
      await axios.get("../API/cerrarPerfil");
      setPerfilCerrado(true);
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/");
    }
  };

  const obtenerContactInfo = async () => {
    try {
      const response = await axios.get("../API/contacto");
      setContactInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/contacto", contactInfo);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <head>
        <title>Contáctanos - EpíComputers</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesContactanos.body}>
        <header className={stylesContactanos.header}>
          <Link href="/" className={stylesContactanos.enlaceNormal}>
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
                  href="/perfil"
                  className={`${stylesContactanos.enlace} ${stylesContactanos.usuarioPerfil}`}
                  style={{ border: "none" }}
                >
                  <Image
                    className={stylesContactanos.imagenes}
                    width={35}
                    height={20}
                    src={usuario?.fotoPerfil || "/IMG/epigrafe73.png"}
                    alt={nombreImagen || "Imagen de Perfil Por Defecto"}
                  />
                  <section style={{ wordBreak: "keep-all" }}>
                    <section>{nombreDeUsuario}</section>
                    <section>{usuario.correoElectronicoDeUsuario}</section>
                  </section>
                </Link>
                <button
                  className={`${stylesContactanos.enlace} ${stylesContactanos.usuarioPerfil}`}
                  onClick={cerrarPerfil}
                >
                  Cerrar Sesión
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
                  {isEditing ? (
                    <>
                      <h3 style={{ marginBottom: "4%" }}>
                        Correo Electrónico:{" "}
                        <input
                          type="text"
                          name="correo"
                          value={contactInfo.correo}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3 style={{ marginBottom: "4%" }}>
                        Teléfono:{" "}
                        <input
                          type="text"
                          name="telefono"
                          value={contactInfo.telefono}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3 style={{ marginBottom: "4%" }}>
                        Instagram:{" "}
                        <input
                          type="text"
                          name="instagram"
                          value={contactInfo.instagram}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3 style={{ marginBottom: "4%" }}>
                        Facebook:{" "}
                        <input
                          type="text"
                          name="facebook"
                          value={contactInfo.facebook}
                          onChange={handleChange}
                        />
                      </h3>
                      <h3>
                        X [Former Twitter]:{" "}
                        <input
                          type="text"
                          name="x"
                          value={contactInfo.x}
                          onChange={handleChange}
                        />
                      </h3>
                      <button
                        onClick={handleSave}
                        style={{ marginTop: "10px" }}
                      >
                        Guardar Cambios
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 style={{ marginBottom: "4%" }}>
                        Correo Electrónico: <span>{contactInfo.correo}</span>
                      </h3>
                      <h3 style={{ marginBottom: "4%" }}>
                        Teléfono: <span>{contactInfo.telefono}</span>
                      </h3>
                      <h3 style={{ marginBottom: "4%" }}>
                        Instagram: <span>{contactInfo.instagram}</span>
                      </h3>
                      <h3 style={{ marginBottom: "4%" }}>
                        Facebook: <span>{contactInfo.facebook}</span>
                      </h3>
                      <h3>
                        X [Former Twitter]: <span>{contactInfo.x}</span>
                      </h3>
                      <button
                        onClick={() => setIsEditing(true)}
                        style={{ marginTop: "10px" }}
                      >
                        Editar
                      </button>
                    </>
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

export default Contactanos;
