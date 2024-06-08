-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2024 a las 10:19:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cms`
--
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `asignaciones_roles_permisos`
--
CREATE TABLE
  `asignaciones_roles_permisos` (
    `id_asignacion_rol_permiso` int (11) NOT NULL,
    `id_rol` int (11) NOT NULL,
    `id_permiso` int (11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `codigos_postales`
--
CREATE TABLE
  `codigos_postales` (
    `id_codigo_postal` int (11) NOT NULL,
    `id_parroquia` int (11) NOT NULL,
    `numero_codigo_postal` int (11) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `direcciones`
--
CREATE TABLE
  `direcciones` (
    `id_direccion` int (11) NOT NULL,
    `id_codigo_postal` int (11) NOT NULL,
    `direccion_completa` varchar(200) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `estados`
--
CREATE TABLE
  `estados` (
    `id_estado` int (11) NOT NULL,
    `id_pais` int (11) NOT NULL,
    `nombre_estado` varchar(100) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `generos`
--
CREATE TABLE
  `generos` (
    `id_genero` int (11) NOT NULL,
    `tipo_genero` varchar(20) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `generos`
--
INSERT INTO
  `generos` (`id_genero`, `tipo_genero`)
VALUES
  (1, 'Masculino'),
  (2, 'Femenino');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `interfaces`
--
CREATE TABLE
  `interfaces` (
    `id_interfaz` int (11) NOT NULL,
    `nombre_interfaz` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `municipios`
--
CREATE TABLE
  `municipios` (
    `id_municipio` int (11) NOT NULL,
    `id_estado` int (11) NOT NULL,
    `nombre_municipio` varchar(100) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `nacionalidades`
--
CREATE TABLE
  `nacionalidades` (
    `id_nacionalidad` int (11) NOT NULL,
    `nacionalidad` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `nacionalidades`
--
INSERT INTO
  `nacionalidades` (`id_nacionalidad`, `nacionalidad`)
VALUES
  (1, 'Venezuela'),
  (2, 'Extranjero');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `options`
--
CREATE TABLE
  `options` (
    `id_obtions` int (11) NOT NULL,
    `id_interfaz` int (11) NOT NULL,
    `id_persona` int (11) NOT NULL,
    `titulo` varchar(20) NOT NULL,
    `contenido` varchar(200) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `paises`
--
CREATE TABLE
  `paises` (
    `id_pais` int (11) NOT NULL,
    `nombre_pais` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `parroquias`
--
CREATE TABLE
  `parroquias` (
    `id_parroquia` int (11) NOT NULL,
    `id_municipio` int (11) NOT NULL,
    `nombre_parroquia` varchar(100) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `permisos`
--
CREATE TABLE
  `permisos` (
    `id_permiso` int (11) NOT NULL,
    `nombre_permiso` varchar(50) NOT NULL,
    `descripcion_permiso` varchar(200) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `personas`
--
CREATE TABLE
  `personas` (
    `id_persona` int (11) NOT NULL,
    `id_genero` int (20) NOT NULL,
    `id_rol` int (20) NOT NULL,
    `id_nacionalidad` int (20) NOT NULL,
    `id_direccion` int (20) NOT NULL,
    `nombre` varchar(200) NOT NULL,
    `apellido` varchar(200) NOT NULL,
    `cedula` int (20) NOT NULL,
    `fecha_nacimiento` date NOT NULL,
    `correo_electronico` varchar(100) NOT NULL,
    `clave` varchar(200) NOT NULL,
    `facebook` varchar(200) DEFAULT NULL,
    `instagram` varchar(200) DEFAULT NULL,
    `x` varchar(200) DEFAULT NULL,
    `tiktok` varchar(200) DEFAULT NULL,
    `sitio_web` varchar(200) DEFAULT NULL,
    `url_imagen_pagina` blob DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `publicaciones`
--
CREATE TABLE
  `publicaciones` (
    `id_publicacion` int (11) NOT NULL,
    `id_persona` int (11) NOT NULL,
    `descripcion_publicacion` varchar(200) NOT NULL,
    `fecha` date NOT NULL,
    `imagen` varchar(200) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `roles`
--
CREATE TABLE
  `roles` (
    `id_rol` int (11) NOT NULL,
    `nombre_rol` varchar(50) NOT NULL,
    `estatus` tinyint (1) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `roles`
--
INSERT INTO
  `roles` (`id_rol`, `nombre_rol`, `estatus`)
VALUES
  (1, 'Administrador', 1),
  (2, 'Usuario', 1),
  (3, 'Invitado', 1);

--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `asignaciones_roles_permisos`
--
ALTER TABLE `asignaciones_roles_permisos` ADD PRIMARY KEY (`id_asignacion_rol_permiso`),
ADD KEY `fk_asignaciones_roles_permisos_roles1_idx` (`id_rol`),
ADD KEY `fk_asignaciones_roles_permisos_permisos1_idx` (`id_permiso`);

--
-- Indices de la tabla `codigos_postales`
--
ALTER TABLE `codigos_postales` ADD PRIMARY KEY (`id_codigo_postal`),
ADD KEY `fk_codigos_postales_parroquias1_idx` (`id_parroquia`);

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones` ADD PRIMARY KEY (`id_direccion`),
ADD KEY `fk_direcciones_codigos_postales1_idx` (`id_codigo_postal`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados` ADD PRIMARY KEY (`id_estado`),
ADD KEY `fk_estados_paises1_idx` (`id_pais`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos` ADD PRIMARY KEY (`id_genero`);

--
-- Indices de la tabla `interfaces`
--
ALTER TABLE `interfaces` ADD PRIMARY KEY (`id_interfaz`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios` ADD PRIMARY KEY (`id_municipio`),
ADD KEY `fk_municipios_estados1_idx` (`id_estado`);

--
-- Indices de la tabla `nacionalidades`
--
ALTER TABLE `nacionalidades` ADD PRIMARY KEY (`id_nacionalidad`);

--
-- Indices de la tabla `options`
--
ALTER TABLE `options` ADD PRIMARY KEY (`id_obtions`),
ADD KEY `fk_contenidos_interfaces1_idx` (`id_interfaz`),
ADD KEY `fk_options_personas1_idx` (`id_persona`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises` ADD PRIMARY KEY (`id_pais`);

--
-- Indices de la tabla `parroquias`
--
ALTER TABLE `parroquias` ADD PRIMARY KEY (`id_parroquia`),
ADD KEY `fk_parroquias_municipios1_idx` (`id_municipio`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos` ADD PRIMARY KEY (`id_permiso`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas` ADD PRIMARY KEY (`id_persona`),
ADD UNIQUE KEY `correo_electronico` (`correo_electronico`),
ADD KEY `fk_personas_generos_idx` (`id_genero`),
ADD KEY `fk_personas_roles1_idx` (`id_rol`),
ADD KEY `fk_personas_nacionalidades1_idx` (`id_nacionalidad`),
ADD KEY `fk_personas_direcciones1_idx` (`id_direccion`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones` ADD PRIMARY KEY (`id_publicacion`),
ADD KEY `fk_publicaciones_personas1_idx` (`id_persona`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles` ADD PRIMARY KEY (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `asignaciones_roles_permisos`
--
ALTER TABLE `asignaciones_roles_permisos` MODIFY `id_asignacion_rol_permiso` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `codigos_postales`
--
ALTER TABLE `codigos_postales` MODIFY `id_codigo_postal` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones` MODIFY `id_direccion` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados` MODIFY `id_estado` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos` MODIFY `id_genero` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `interfaces`
--
ALTER TABLE `interfaces` MODIFY `id_interfaz` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios` MODIFY `id_municipio` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nacionalidades`
--
ALTER TABLE `nacionalidades` MODIFY `id_nacionalidad` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `options`
--
ALTER TABLE `options` MODIFY `id_obtions` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises` MODIFY `id_pais` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `parroquias`
--
ALTER TABLE `parroquias` MODIFY `id_parroquia` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos` MODIFY `id_permiso` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas` MODIFY `id_persona` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones` MODIFY `id_publicacion` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles` MODIFY `id_rol` int (11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `asignaciones_roles_permisos`
--
ALTER TABLE `asignaciones_roles_permisos` ADD CONSTRAINT `fk_asignaciones_roles_permisos_permisos1` FOREIGN KEY (`id_permiso`) REFERENCES `permisos` (`id_permiso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_asignaciones_roles_permisos_roles1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `codigos_postales`
--
ALTER TABLE `codigos_postales` ADD CONSTRAINT `fk_codigos_postales_parroquias1` FOREIGN KEY (`id_parroquia`) REFERENCES `parroquias` (`id_parroquia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `direcciones`
--
ALTER TABLE `direcciones` ADD CONSTRAINT `fk_direcciones_codigos_postales1` FOREIGN KEY (`id_codigo_postal`) REFERENCES `codigos_postales` (`id_codigo_postal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `estados`
--
ALTER TABLE `estados` ADD CONSTRAINT `fk_estados_paises1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `municipios`
--
ALTER TABLE `municipios` ADD CONSTRAINT `fk_municipios_estados1` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `options`
--
ALTER TABLE `options` ADD CONSTRAINT `fk_contenidos_interfaces1` FOREIGN KEY (`id_interfaz`) REFERENCES `interfaces` (`id_interfaz`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_options_personas1` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `parroquias`
--
ALTER TABLE `parroquias` ADD CONSTRAINT `fk_parroquias_municipios1` FOREIGN KEY (`id_municipio`) REFERENCES `municipios` (`id_municipio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas` ADD CONSTRAINT `fk_personas_direcciones1` FOREIGN KEY (`id_direccion`) REFERENCES `direcciones` (`id_direccion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_personas_generos` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id_genero`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_personas_nacionalidades1` FOREIGN KEY (`id_nacionalidad`) REFERENCES `nacionalidades` (`id_nacionalidad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_personas_roles1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones` ADD CONSTRAINT `fk_publicaciones_personas1` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;