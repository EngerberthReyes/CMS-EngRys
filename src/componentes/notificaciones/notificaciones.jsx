import stylesNotificacion from "../CSSComponentes/notificaciones.module.css";

export const Notificacion = ({ weaActivaCreacion, estatusActivo }) => {
  return (
    <>
      {weaActivaCreacion ? (
        <>
          <section
            style={{
              width: "auto",
              background: "green",
              color: "white",
            }}
            className={`animate__animated ${stylesNotificacion.sectionEliminar} animate__fadeInUp`}
          >
            <section
              className={`${
                estatusActivo
                  ? `${stylesNotificacion.sectionInformacionEliminar} ${stylesNotificacion.especialMente}`
                  : stylesNotificacion.sectionInformacionEliminar
              }`}
            >
              <section
                className={`${stylesNotificacion.contenedor} animate__animated`}
              >
                <h2 className={stylesNotificacion.tituloSection}>
                  El Contrato se Ha Creado Exitosamente.
                </h2>
              </section>
            </section>
          </section>
        </>
      ) : (
        <>
          <section
            style={{
              width: "auto",
              background: "green",
              color: "white",
            }}
            className={`animate__animated ${stylesNotificacion.sectionEliminar} animate__fadeOutDown`}
          >
            <section
              className={`${
                estatusActivo
                  ? `${stylesNotificacion.sectionInformacionEliminar} ${stylesNotificacion.especialMente}`
                  : stylesNotificacion.sectionInformacionEliminar
              }`}
            >
              <section
                className={`${stylesNotificacion.contenedor} animate__animated`}
              >
                <h2 className={stylesNotificacion.tituloSection}>
                  El Contrato se Ha Creado Exitosamente.
                </h2>
              </section>
            </section>
          </section>
        </>
      )}
    </>
  );
};
