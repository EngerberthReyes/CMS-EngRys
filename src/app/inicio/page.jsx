"use client";

import Image from "next/image";
import Link from "next/link";
import stylesInicio from "./CSS/styles-inicio.module.css";

const Inicio = () => {
  console.log("Nuevo Mensaje");
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
            <Link className={stylesInicio.enlace} href="/iniciar_sesion">
              Iniciar Sesión
            </Link>
            <Link className={stylesInicio.enlace} href="/registro">
              Registrarse
            </Link>
          </section>
        </header>
        <main>
          <section
            className={`${stylesInicio.main} ${stylesInicio.seccionSecundariaAjuste}`}
          >
            <section
              className={`${stylesInicio.seccionPrincipal} ${stylesInicio.seccionSecundariaAjuste}`}
            >
              <section className={stylesInicio.seccionFlexPrincipal}>
                <section className={stylesInicio.secctionInformacion}>
                  <h1 className={stylesInicio.tituloSeccion}>
                    La PC Gamer de Tus Sueños
                  </h1>
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
          <section className={stylesInicio.main}>
            {/*} <section className={stylesInicio.seccionSecundaria}>
              <section className={stylesInicio.seccionAjustes}>
                <h1>Lateral</h1>
                <section className={stylesInicio.seccionFlex}>
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
            </section> */}
            <section className={stylesInicio.seccionPrincipal}>
              <h1>Aqui va algo</h1>
              <section className={stylesInicio.seccionFlex}>
                <section className={stylesInicio.seccionSecundaria}>
                  <section className={stylesInicio.seccionAjustes}>
                    <h1>
                      Aqui Van Más Cosas, como como funciona nuestra pagina,
                      nuestros servicios
                    </h1>
                  </section>
                </section>
                <section className={stylesInicio.seccionElementos}>
                  <h1>Aqui Van Más Cosas</h1>
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