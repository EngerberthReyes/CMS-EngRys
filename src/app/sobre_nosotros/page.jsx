"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Details from "@/componentes/tiptap/DetailsTres";
import { Tiptap } from "@/componentes/tiptap/TipTap";
import { useRouter } from "next/navigation";
import "../CSS/App.css";
import stylesNosotros from "../CSS/styles-sobreNosotros.module.css";

const SobreNosotros = () => {
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
    if (usuario) {
      const nombreCompleto = usuario.nombreCompletoUsuario || "";
      const nombreApellido = nombreCompleto.split(" ");
      setNombreDeUsuario(
        `${nombreApellido[0] || ""} ${nombreApellido[2] || ""}`
      );
    }
  }, [usuario]);

  const listItemsData = [
    { label: "Innovación", apiUrl: "/API/descripcionInicial/2" },
    { label: "Calidad", apiUrl: "/API/descripcionInicial/3" },
    { label: "Servicio al Cliente", apiUrl: "/API/descripcionInicial/4" },
    { label: "Responsabilidad Social", apiUrl: "/API/descripcionInicial/5" },
  ];

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const responses = await Promise.all(
          listItemsData.map((item) => axios.get(item.apiUrl))
        );
        const data = responses.map((response) => response.data);
        console.log(data.flat(1));
        setDescriptions(data.flat(1));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDescriptions();
  }, []);

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

  const cambiarElemento = (index) => {
    setCurrentEditIndex(index);
    setDescription(descriptions[index]?.contenido || "");
  };

  const guardarCambios = async () => {
    try {
      const item = listItemsData[currentEditIndex];
      const response = await axios.put(item.apiUrl, { description });
      const newDescriptions = [...descriptions];
      newDescriptions[currentEditIndex] = response.data;
      setDescriptions(newDescriptions);
      setCurrentEditIndex(null);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarImagen = async (event) => {
    const formData = new FormData();
    const archivo = event.target.files[0];
    if (archivo) {
      setNombreImagen(archivo.name);
      formData.append("archivo", archivo);
      try {
        const respuesta = await axios.post("../API/perfil", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const fotodePerfil = respuesta.data.fotoPerfil;
        if (fotodePerfil) setImagen(fotodePerfil);
      } catch (error) {
        console.log(error.response ? error.response.data : error);
      }
    }
  };
  const [descriptionA, setDescriptionA] = useState("");
  const [currentEditIndexA, setCurrentEditIndexA] = useState(null);
  const [descriptionsA, setDescriptionsA] = useState([
    {
      id: 6,
      title: "Historia",
      urlApi: "/API/descripcionInicial/6",
      contenido: "",
    },
    {
      id: 7,
      title: "Misión",
      urlApi: "/API/descripcionInicial/7",
      contenido: "",
    },
    {
      id: 8,
      title: "Visión",
      urlApi: "/API/descripcionInicial/8",
      contenido: "",
    },
  ]);

  const guardarCambiosA = async (index) => {
    try {
      const item = descriptionsA[index];
      console.log(item);
      console.log(descriptionA);
      const response = await axios.put(
        `/API/descripcionInicial/${item.id_option}`,
        {
          descriptionA,
        }
      );
      console.log(response);
      const newDescriptions = [...descriptionsA];
      newDescriptions[currentEditIndexA].contenido = descriptionA;
      setDescriptionsA(newDescriptions);
      setCurrentEditIndexA(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDescriptionsA = async () => {
      try {
        const responses = await Promise.all(
          descriptionsA.map((item) => axios.get(item.urlApi))
        );
        const data = responses.map((response) => response.data);

        console.log(data);
        setDescriptionsA(data.flat(1));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDescriptionsA();
  }, []);

  const cambiarElementoA = (index) => {
    setCurrentEditIndexA(index);
    console.log(index);
    setDescriptionA(descriptionsA[index].contenido || "");
  };
  return (
    <>
      <head>
        <title>Sobre Nosotros - EpíComputers</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesNosotros.body}>
        <header className={stylesNosotros.header}>
          <Link href="/" className={stylesNosotros.enlaceNormal}>
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
                  href="/perfil"
                  className={`${stylesNosotros.enlace} ${stylesNosotros.usuarioPerfil}`}
                  style={{ border: "none" }}
                >
                  <Image
                    className={stylesNosotros.imagenes}
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
                  className={`${stylesNosotros.enlace} ${stylesNosotros.usuarioPerfil}`}
                  onClick={cerrarPerfil}
                >
                  Cerrar Sesión
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
                  <section>
                    <ul>
                      {descriptions.map((item, index) => (
                        <section key={index}>
                          {currentEditIndex === index ? (
                            <section className="App">
                              <Tiptap setDescription={setDescription} />
                              <button
                                style={{
                                  position: "fixed",
                                  bottom: "2rem",
                                  right: "3rem",
                                  borderRadius: "5px",
                                  padding: "1%",
                                  background: "#eeeeeebf",
                                  color: "#0f0f0f",
                                  zIndex: "1000",
                                  fontSize: "16px",
                                }}
                                className={stylesNosotros.seccionElemento}
                                onClick={guardarCambios}
                              >
                                Guardar Cambios
                              </button>
                            </section>
                          ) : (
                            <section>
                              <Details
                                description={
                                  item?.contenido || "Descripción no disponible"
                                }
                              />
                              {currentEditIndex !== index && usuario?.idRol !== 2 && usuario?.idRol !== 3 && (
                                <label
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  <Image
                                    className={stylesNosotros.icono_edit}
                                    onClick={() => cambiarElemento(index)}
                                    width={50}
                                    height={50}
                                    style={{ width: "2rem" }}
                                    src={`/editar-theme-black.svg`}
                                    alt="Cambiar Descripción Inicial"
                                  />
                                </label>
                              )}
                            </section>
                          )}
                        </section>
                      ))}
                    </ul>
                  </section>
                </section>
              </section>
            </section>
            <section className={stylesNosotros.main}>
              <section
                className={stylesNosotros.seccionPrincipal}
                style={{ width: "97%" }}
              >
                <section className={stylesNosotros.seccionGrid}>
                  <h1 style={{ textAlign: "center" }}>EpíComputers...</h1>
                  <section style={{ marginTop: "2%" }}>
                    {descriptionsA.map((item, index) => (
                      <section key={index}>
                        {currentEditIndexA === index ? (
                          <section className="App">
                            <Tiptap setDescription={setDescriptionA} />
                            <button
                              style={{
                                position: "fixed",
                                bottom: "2rem",
                                right: "3rem",
                                borderRadius: "5px",
                                padding: "1%",
                                background: "#eeeeeebf",
                                color: "#0f0f0f",
                                zIndex: "1000",
                                fontSize: "16px",
                              }}
                              className={stylesNosotros.seccionElemento}
                              onClick={() => guardarCambiosA(index)}
                            >
                              Guardar Cambios
                            </button>
                          </section>
                        ) : (
                          <section>
                            <h1>{item.titulo}</h1>
                            <Details
                              description={
                                item?.contenido || "Descripción no disponible"
                              }
                            />
                            {currentEditIndexA !== index && usuario?.idRol !== 2 && usuario?.idRol !== 3 && (
                              <label
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <Image
                                  className={stylesNosotros.icono_edit}
                                  onClick={() => cambiarElementoA(index)}
                                  width={50}
                                  height={50}
                                  style={{ width: "2rem" }}
                                  src={`/editar-theme-black.svg`}
                                  alt="Cambiar Descripción Inicial"
                                />
                              </label>
                            )}
                          </section>
                        )}
                      </section>
                    ))}
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

export default SobreNosotros;
