import { cms, informacionPais as venezuela } from "@/db/database.js";
import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async () => {
  try {
    const consulta = `
    SELECT * from personas;
    `;
    const respuesta = await cms.query(consulta);

    const consultarPais = `
    SELECT DISTINCT est.estado, cd.capital, cd.ciudad, muni.municipio, parr.parroquia
FROM ciudades as cd, estados as est, municipios as muni, parroquias as parr
WHERE est.id_estado = cd.id_estado
AND muni.id_estado = parr.id_municipio
ORDER BY RAND()
LIMIT 12;
    `;
    const respuestaPais = await venezuela.query(consultarPais);

    return NextResponse.json(respuestaPais);
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      error: "Ocurrió un error al procesar la solicitud.",
    });
  }
};

export const POST = async (request) => {
  try {
    const {
      nombres,
      apellido,
      cedula,
      sexo,
      nacimiento,
      direccion,
      pais,
      estado,
      ciudad,
      municipio,
      parroquia,
      codigo,
      facebook,
      instagram,
      x,
      tiktok,
      sitio_web,
      correo,
      clave,
      repetirClave,
    } = await request.json();

    console.log(
      nombres,
      apellido,
      cedula,
      sexo,
      nacimiento,
      direccion,
      pais,
      estado,
      ciudad,
      municipio,
      parroquia,
      codigo,
      facebook,
      instagram,
      x,
      tiktok,
      sitio_web,
      correo,
      clave,
      repetirClave
    );

    const foto = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://duckduckgo.com/"
        );
        console.log(response.data); // Asegúrate de imprimir response.data
      } catch (error) {
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          console.log("Error:", error.response.status);
          console.log("Datos:", error.response.data);
        } else if (error.request) {
          // La solicitud se hizo pero no se recibió respuesta
          console.log("No se recibió respuesta:", error.request);
        } else {
          // Otro tipo de error
          console.log("Error:", error.message);
        }
      }
    };

    foto();

    const consultaGrabar = `INSERT INTO direcciones (id_direccion, id_codigo_postal, direccion_completa) values ($1, $2, $3);`;

    const grabador = cms.query(consultaGrabar, [null, 1, direccion]);

    return NextResponse.json(
      { mensaje: "Todo salió bien", grabado: grabador },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
};
