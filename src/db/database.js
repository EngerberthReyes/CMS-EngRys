import mysql from "serverless-mysql";

export const cmsConexion = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "cms",
  },
});

export const informacionPais = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "venezuela",
  },
});
