"use client";

import Image from "next/image";
import Link from "next/link";
import stylesNosotros from "../CSS/styles-sobreNosotros.module.css";

const SobreNosotros = () => {
  console.log("Nuevo Mensaje");
  return (
    <>
      <head>
        <title>Sobre Nosotros - EpíComputers</title>
        <link rel="icon" href="/IMG/Icono No Lineal.png" type="Image/png" />
      </head>
      <body id={stylesNosotros.body}>
        <header className={stylesNosotros.header}>
        <Link className={stylesNosotros.enlaceNormal} href={'/'}><h1 className={stylesNosotros.tituloHeader}>EpíComputers</h1></Link>
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
            <Link className={stylesNosotros.enlace} href="/iniciar_sesion">
              Iniciar Sesión
            </Link>
            <Link className={stylesNosotros.enlace} href="/registro">
              Registrarse
            </Link>
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
                <section className={stylesNosotros.seccionElementos}>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
                      src={"/IMG/epigrafe73.png"}
                      width={200}
                      height={200}
                      alt={"Imagen"}
                    />
                  </section>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
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
          <section className={stylesNosotros.main}>
            <section className={stylesNosotros.seccionSecundaria}>
              <section className={stylesNosotros.seccionAjustes}>
                <h1>Lateral</h1>
                <section className={stylesNosotros.seccionFlex}>
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
            <section className={stylesNosotros.seccionPrincipal}>
              <section className={stylesNosotros.seccionGrid}>
                <h1>Aqui va algo</h1>
                <section className={stylesNosotros.seccionElementos}>
                  <section>
                    <Image
                      className={stylesNosotros.elemento}
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

export default SobreNosotros;
