import stylesNotificacion from "../CSSComponentes/notificaciones.module.css";
import "../../app/animate.min.css";

export const Notificacion = ({ usuarioRegistrado, estatusActivo }) => {
  return (
    <>
      {usuarioRegistrado ? (
        <>
          <section
            style={{
              width: "auto",
              background: "#008000",
              color: "#eeeeee",
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
                  Ha Sido Registrado Correctamente.
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
              background: "#008000",
              color: "#eeeeee",
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
                  Ha Sido Registrado Correctamente.
                </h2>
              </section>
            </section>
          </section>
        </>
      )}
    </>
  );
};
