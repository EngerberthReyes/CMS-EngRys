"use client";

import Image from "next/image";
import Link from "next/link";
import stylesContactanos from "../CSS/styles-contactanos.module.css";

const Contactanos = () => {
  console.log("Nuevo Mensaje");
  return (
    <>
      <head>
        <title>Contáctanos - EpíComputers</title>
        <link rel="icon" href="./IMG/IconoNoLineal.png" />
      </head>
      <body id={stylesContactanos.body}>
        <header className={stylesContactanos.header}>
        <Link className={stylesContactanos.enlaceNormal} href={'/'}><h1 className={stylesContactanos.tituloHeader}>EpíComputers</h1></Link>
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
              Contactanos
            </Link>
          </section>
          <section className={stylesContactanos.seccionEnlace}>
            <Link className={stylesContactanos.enlace} href="/iniciar_sesion">
              Iniciar Sesión
            </Link>
            <Link className={stylesContactanos.enlace} href="/registro">
              Registrarse
            </Link>
          </section>
        </header>
        <main>
          <section
            className={`${stylesContactanos.main} ${stylesContactanos.seccionSecundariaAjuste}`}
          >
            <section
              className={`${stylesContactanos.seccionPrincipal} ${stylesContactanos.seccionSecundariaAjuste}`}
            >
              <section className={stylesContactanos.seccionGrid}>
                <h1>Aqui va algo</h1>
                <section className={stylesContactanos.seccionElementos}>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                </section>
              </section>
            </section>
          </section>
          <section className={stylesContactanos.main}>
            <section className={stylesContactanos.seccionSecundaria}>
              <section className={stylesContactanos.seccionAjustes}>
                <h1>Lateral</h1>
                <section className={stylesContactanos.seccionFlex}>
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
            <section className={stylesContactanos.seccionPrincipal}>
              <section className={stylesContactanos.seccionGrid}>
                <h1>Aqui va algo</h1>
                <section className={stylesContactanos.seccionElementos}>
                  <section>
                    <Image
                      className={stylesContactanos.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>Cajas</section>
                  <section>Cajas</section>
                  <section>Cajas</section>
                  <section>Cajas</section>
                  <section>Cajas</section>
                  <section>Cajas</section>
                  <section>Cajas</section>
                  <section>Cajas</section>
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
