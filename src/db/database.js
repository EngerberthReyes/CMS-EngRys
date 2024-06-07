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

export const venezuela = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "venezuela",
  },
});

export const paisesMundo = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "world",
  },
});
