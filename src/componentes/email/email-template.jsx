import * as React from "react";

export const EmailTemplate = ({ firstName }) => (
  <section
    style={{
      height: "30rem",
      margin: "1%",
      padding: "2%",
      color: "#eeeeee",
      backgroundColor: "#0f0f0f",
      borderRadius: "4px",
    }}
  >
    <h1
      style={{
        margin: "1% 0",
        fontSize: "40px",
        color: "#eeeeee",
        fontFamily: "Arial",
      }}
    >
      Hola { firstName }, Este es Tu Codigo Para Recuperar Tu Contraseña
    </h1>
    <section
      style={{
        width: "46%",
      }}
    >
      <p
        style={{
          fontSize: "30px",
          margin: "4% 0",
          color: "#eeeeee",
          fontFamily: "Arial",
        }}
      >
        Tu Codigo es: { codigo }
      </p>
    </section>
  </section>
);
