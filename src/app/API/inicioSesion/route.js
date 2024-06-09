import { cmsConexion, informacionPais as venezuela } from "@/db/database.js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import axios from "axios";
import { hash, compare } from "bcryptjs";

export const GET = async () => {
  try {
    const datosUsuario = `
    SELECT id_persona, cedula, correo_electronico, clave from personas;
    `;

    const consultarPais = `
    SELECT DISTINCT est.estado, cd.capital, cd.ciudad, muni.municipio, parr.parroquia
    FROM ciudades as cd, estados as est, municipios as muni, parroquias as parr
    WHERE est.id_estado = cd.id_estado
    AND muni.id_municipio = parr.id_municipio
    ORDER BY RAND()
    LIMIT 23;
    `;

    const [respuestaPersona, respuestaPais] = await Promise.all([
      cmsConexion.query(datosUsuario),
      venezuela.query(consultarPais),
    ]);

    console.log(respuestaPersona);
    console.log(respuestaPais);

    return NextResponse.json({
      personas: respuestaPersona,
      paises: respuestaPais,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      error: "Ocurrió un error al procesar la solicitud.",
    });
  }
};

export const POST = async (request, res) => {
  try {
    const { correo, clave, fotodePerfil } = await request.json();
    console.log(correo, clave, fotodePerfil);

    const datosUsuario = `
SELECT 
    p.id_persona, 
    p.nombre, 
    p.apellido,
    p.cedula, 
    p.correo_electronico, 
    p.clave,
    p.fotoPerfil,
    CASE 
        WHEN p.id_nacionalidad = 1 THEN 'Venezolano'
        ELSE 'Extranjero'
    END AS nacionalidad, 
    CASE 
        WHEN gen.id_genero = 1 THEN 'Masculino'
        ELSE 'Femenino'
    END AS id_genero, 
    p.clave, 
    dirr.direccion_completa, 
    p.fecha_nacimiento, 
    p.facebook, 
    p.instagram, 
    p.tiktok, 
    p.x, 
    p.sitio_web,
    dirr.direccion_completa,
    cod.numero_codigo_postal,
    parr.nombre_parroquia,
    muni.nombre_municipio,
    ciu.nombre_ciudad,
    est.nombre_estado,
    pais.nombre_pais
FROM 
    personas AS p 
JOIN
    generos AS gen ON p.id_genero = gen.id_genero
JOIN
    direcciones AS dirr ON p.id_direccion = dirr.id_direccion 
JOIN 
    codigos_postales AS cod ON cod.id_codigo_postal = dirr.id_codigo_postal
JOIN
    parroquias AS parr ON parr.id_parroquia = cod.id_parroquia
JOIN
    municipios AS muni ON muni.id_municipio = parr.id_municipio
JOIN
    ciudades AS ciu ON ciu.id_ciudad = muni.id_ciudad
JOIN
    estados AS est ON est.id_estado = ciu.id_estado
JOIN
    paises AS pais ON est.id_pais = pais.id_pais
WHERE
    p.correo_electronico = ?
    ;
    `;

    const respuestaUsuario = await cmsConexion.query(datosUsuario, [
      correo,
      clave,
    ]);
    const claveEncriptada = respuestaUsuario[0].clave;

    const verificacionDeClave = await compare(clave, claveEncriptada);
    if (verificacionDeClave) {
      console.log("Acceso concedido");
    } else {
      console.log("Contraseña incorrecta");
    }
    console.log(verificacionDeClave);
    console.log(respuestaUsuario);

    const resultadoFiltrado = respuestaUsuario.filter(
      async (itemsUsuarioBd) => {
        return (
          itemsUsuarioBd.correo_electronico === correo &&
          (await compare(clave, itemsUsuarioBd.clave))
        );
      }
    );

    console.log(resultadoFiltrado);

    if (respuestaUsuario.length === 0) {
      return NextResponse.json({ respuestaUsuario });
    }

    console.log(respuestaUsuario);
    const nombreUsuario = resultadoFiltrado[0].nombre;
    const correoElectronico = resultadoFiltrado[0].correo_electronico;

    const {
      id_persona,
      nombre,
      apellido,
      cedula,
      correo_electronico,
      fotoPerfil,
      nacionalidad,
      id_genero,
      direccion_completa,
      fecha_nacimiento,
      facebook,
      instagram,
      tiktok,
      x,
      sitio_web,
      numero_codigo_postal,
      nombre_parroquia,
      nombre_municipio,
      nombre_ciudad,
      nombre_estado,
      nombre_pais,
    } = resultadoFiltrado[0];

    console.log(fotoPerfil)
    if (fotoPerfil === null) {
      return
    }
    const claveUsuario = resultadoFiltrado[0].clave;

    const modificacionNombre = nombre + " " + apellido;

    const nombreApellido = modificacionNombre.split(" ");

    const nombreDeUsuario = `${nombreApellido[0]} ${nombreApellido[2]}`;

    console.log(nombreUsuario, correoElectronico);

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 31,
        idPersona: id_persona,
        nombreDeUsuario: nombreDeUsuario,
        nombreCompletoUsuario: nombre + " " + apellido,
        correoElectronicoDeUsuario: correo_electronico,
        cedula: cedula,
        fotoPerfil: fotoPerfil,
        clave: claveUsuario,
        claveDesencriptada: clave,
        nacional: nacionalidad,
        genero: id_genero,
        direccionCompleta: direccion_completa,
        fechaNacimiento: fecha_nacimiento.toISOString(),
        facebook: facebook,
        instagram: instagram,
        tiktok: tiktok,
        x: x,
        sitioWeb: sitio_web,
        numeroCodigoPostal: numero_codigo_postal,
        nombreParroquia: nombre_parroquia,
        nombreMunicipio: nombre_municipio,
        nombreCiudad: nombre_ciudad,
        nombreEstado: nombre_estado,
        nombrePais: nombre_pais,
      },
      "secret"
    );

    const serialized = serialize("cookieInformacion", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 24 * 30,
      path: "/",
    });

    const response = new NextResponse(JSON.stringify({ verificacionDeClave }), {
      headers: new Headers({
        "Set-Cookie": serialized,
        "Content-Type": "application/json",
      }),
    });

    return response;
    console.log(correo, clave);
    console.log(respuestaUsuario);
  } catch (error) {
    console.error("Error al registrar la persona:", error);
    return NextResponse.json({
      error: "Error interno del servidor",
    });
  }
};
