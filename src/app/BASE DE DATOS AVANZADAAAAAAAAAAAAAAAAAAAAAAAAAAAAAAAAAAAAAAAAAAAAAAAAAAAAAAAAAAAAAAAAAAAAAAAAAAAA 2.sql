-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2024 a las 21:27:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


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

CREATE TABLE `asignaciones_roles_permisos` (
  `id_asignacion_rol_permiso` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_permiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos_postales`
--

CREATE TABLE `codigos_postales` (
  `id_codigo_postal` int(11) NOT NULL,
  `id_parroquia` int(11) NOT NULL,
  `numero_codigo_postal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `codigos_postales`
--

INSERT INTO `codigos_postales` (`id_codigo_postal`, `id_parroquia`, `numero_codigo_postal`) VALUES
(1, 1, 5001),
(2, 2, 5001),
(3, 3, 5001),
(4, 4, 5001),
(5, 5, 5001),
(6, 6, 5001),
(7, 7, 5001),
(8, 8, 5001),
(9, 9, 5001),
(10, 10, 5001),
(11, 11, 5001),
(12, 12, 5001),
(13, 13, 5001),
(14, 14, 3201),
(15, 15, 3201),
(16, 16, 3201),
(17, 17, 3201),
(18, 18, 3201),
(19, 19, 3201),
(20, 20, 3201),
(21, 21, 3201),
(22, 22, 3201),
(23, 23, 3201),
(24, 24, 3101),
(25, 25, 3101),
(26, 26, 3101),
(27, 27, 3301),
(28, 28, 3301),
(29, 29, 3301),
(30, 30, 3301),
(31, 31, 5063),
(32, 32, 5063),
(33, 33, 5063),
(34, 34, 5063),
(35, 35, 5063),
(36, 36, 5063),
(37, 37, 5063),
(38, 38, 5063),
(39, 39, 5063),
(40, 40, 5101),
(41, 41, 5101),
(42, 42, 5101),
(43, 43, 5101),
(44, 44, 5101),
(45, 45, 5101),
(46, 46, 5101),
(47, 47, 5101),
(48, 48, 5101),
(49, 49, 5101),
(50, 50, 5101),
(51, 51, 5101),
(52, 52, 5101),
(53, 53, 5101),
(54, 54, 5101),
(55, 55, 5101),
(56, 56, 5101),
(57, 57, 5101),
(58, 58, 5001),
(59, 59, 3301),
(60, 60, 3301),
(61, 61, 3301),
(62, 62, 3301),
(63, 63, 3301),
(64, 64, 3301),
(65, 65, 3101),
(66, 66, 3101),
(67, 67, 5063);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciones`
--

CREATE TABLE `direcciones` (
  `id_direccion` int(11) NOT NULL,
  `id_codigo_postal` int(11) NOT NULL,
  `direccion_completa` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `direcciones`
--

INSERT INTO `direcciones` (`id_direccion`, `id_codigo_postal`, `direccion_completa`) VALUES
(1, 2, '334'),
(2, 3, '334'),
(3, 4, '334'),
(4, 5, '334'),
(5, 6, '334'),
(6, 7, '334'),
(7, 8, '334'),
(8, 9, '334'),
(9, 10, '334'),
(10, 11, '334'),
(11, 12, '334'),
(12, 13, '334'),
(13, 14, '5656'),
(14, 15, '5656'),
(15, 16, '5656'),
(16, 17, '5656'),
(17, 18, '5656'),
(18, 19, '5656'),
(19, 20, '5656'),
(20, 21, '5656'),
(21, 22, '5656'),
(22, 23, '5656'),
(23, 24, '554545'),
(24, 25, '554545'),
(25, 26, '554545'),
(26, 27, '232323'),
(27, 28, '232323'),
(28, 29, '232323'),
(29, 30, '232323'),
(30, 31, 'AAAAAAAAAAA'),
(31, 32, 'AAAAAAAAAAA'),
(32, 33, 'AAAAAAAAAAA'),
(33, 34, 'AAAAAAAAAAA'),
(34, 35, 'AAAAAAAAAAA'),
(35, 36, 'AAAAAAAAAAA'),
(36, 37, 'AAAAAAAAAAA'),
(37, 38, 'AAAAAAAAAAA'),
(38, 39, 'AAAAAAAAAAA'),
(39, 40, '56656456'),
(40, 41, '56656456'),
(41, 42, '56656456'),
(42, 43, '56656456'),
(43, 44, '56656456'),
(44, 45, '56656456'),
(45, 46, '56656456'),
(46, 47, '56656456'),
(47, 48, '56656456'),
(48, 49, '56656456'),
(49, 50, '56656456'),
(50, 51, '56656456'),
(51, 52, 'sadads'),
(52, 53, 'sadads'),
(53, 54, 'sadads'),
(54, 55, 'sadads'),
(55, 56, '343'),
(56, 57, '343'),
(57, 58, 'fdgsfgsg'),
(58, 59, 'COSAS XD'),
(59, 60, 'COSAS XD'),
(60, 61, 'COSAS XD'),
(61, 62, 'COSAS XD'),
(62, 63, 'COSAS XD'),
(63, 64, 'COSAS XD'),
(64, 65, '343434'),
(65, 66, '343434'),
(66, 67, '3435345345');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id_estado` int(11) NOT NULL,
  `id_pais` int(11) NOT NULL,
  `nombre_estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id_estado`, `id_pais`, `nombre_estado`) VALUES
(1, 1, 'Bolívar'),
(2, 2, 'Bolívar'),
(3, 3, 'Bolívar'),
(4, 4, 'Bolívar'),
(5, 5, 'Bolívar'),
(6, 6, 'Bolívar'),
(7, 7, 'Bolívar'),
(8, 8, 'Bolívar'),
(9, 9, 'Bolívar'),
(10, 10, 'Bolívar'),
(11, 11, 'Bolívar'),
(12, 12, 'Bolívar'),
(13, 13, 'Bolívar'),
(14, 14, 'Portuguesa'),
(15, 15, 'Portuguesa'),
(16, 16, 'Portuguesa'),
(17, 17, 'Portuguesa'),
(18, 18, 'Portuguesa'),
(19, 19, 'Portuguesa'),
(20, 20, 'Portuguesa'),
(21, 21, 'Portuguesa'),
(22, 22, 'Portuguesa'),
(23, 23, 'Portuguesa'),
(24, 24, 'Táchira'),
(25, 25, 'Táchira'),
(26, 26, 'Táchira'),
(27, 27, 'Zulia'),
(28, 28, 'Zulia'),
(29, 29, 'Zulia'),
(30, 30, 'Zulia'),
(31, 31, 'Táchira'),
(32, 32, 'Táchira'),
(33, 33, 'Táchira'),
(34, 34, 'Táchira'),
(35, 35, 'Táchira'),
(36, 36, 'Táchira'),
(37, 37, 'Táchira'),
(38, 38, 'Táchira'),
(39, 39, 'Táchira'),
(40, 40, 'Carabobo'),
(41, 41, 'Carabobo'),
(42, 42, 'Carabobo'),
(43, 43, 'Carabobo'),
(44, 44, 'Carabobo'),
(45, 45, 'Carabobo'),
(46, 46, 'Carabobo'),
(47, 47, 'Carabobo'),
(48, 48, 'Carabobo'),
(49, 49, 'Carabobo'),
(50, 50, 'Carabobo'),
(51, 51, 'Carabobo'),
(52, 52, 'Zulia'),
(53, 53, 'Zulia'),
(54, 54, 'Zulia'),
(55, 55, 'Zulia'),
(56, 56, 'Zulia'),
(57, 57, 'Zulia'),
(58, 58, 'Táchira'),
(59, 59, 'Táchira'),
(60, 60, 'Táchira'),
(61, 61, 'Táchira'),
(62, 62, 'Táchira'),
(63, 63, 'Táchira'),
(64, 64, 'Táchira'),
(65, 65, 'Dependencias Federales'),
(66, 66, 'Dependencias Federales'),
(67, 67, 'Lara');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id_genero` int(11) NOT NULL,
  `tipo_genero` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id_genero`, `tipo_genero`) VALUES
(1, 'Masculino'),
(2, 'Femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interfaces`
--

CREATE TABLE `interfaces` (
  `id_interfaz` int(11) NOT NULL,
  `nombre_interfaz` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

CREATE TABLE `municipios` (
  `id_municipio` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `nombre_municipio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`id_municipio`, `id_estado`, `nombre_municipio`) VALUES
(1, 1, 'Uribante'),
(2, 2, 'Uribante'),
(3, 3, 'Uribante'),
(4, 4, 'Uribante'),
(5, 5, 'Uribante'),
(6, 6, 'Uribante'),
(7, 7, 'Uribante'),
(8, 8, 'Uribante'),
(9, 9, 'Uribante'),
(10, 10, 'Uribante'),
(11, 11, 'Uribante'),
(12, 12, 'Uribante'),
(13, 13, 'Uribante'),
(14, 14, 'Campo Elías'),
(15, 15, 'Campo Elías'),
(16, 16, 'Campo Elías'),
(17, 17, 'Campo Elías'),
(18, 18, 'Campo Elías'),
(19, 19, 'Campo Elías'),
(20, 20, 'Campo Elías'),
(21, 21, 'Campo Elías'),
(22, 22, 'Campo Elías'),
(23, 23, 'Campo Elías'),
(24, 24, 'Boconó'),
(25, 25, 'Boconó'),
(26, 26, 'Boconó'),
(27, 27, 'Valencia'),
(28, 28, 'Valencia'),
(29, 29, 'Valencia'),
(30, 30, 'Valencia'),
(31, 31, 'Pampán'),
(32, 32, 'Pampán'),
(33, 33, 'Pampán'),
(34, 34, 'Pampán'),
(35, 35, 'Pampán'),
(36, 36, 'Pampán'),
(37, 37, 'Pampán'),
(38, 38, 'Pampán'),
(39, 39, 'Pampán'),
(40, 40, 'Sucre'),
(41, 41, 'Sucre'),
(42, 42, 'Sucre'),
(43, 43, 'Sucre'),
(44, 44, 'Sucre'),
(45, 45, 'Sucre'),
(46, 46, 'Sucre'),
(47, 47, 'Sucre'),
(48, 48, 'Sucre'),
(49, 49, 'Sucre'),
(50, 50, 'Sucre'),
(51, 51, 'Sucre'),
(52, 52, 'Colón'),
(53, 53, 'Colón'),
(54, 54, 'Colón'),
(55, 55, 'Colón'),
(56, 56, 'Juan Manuel Cajigal'),
(57, 57, 'Juan Manuel Cajigal'),
(58, 58, 'Antonio Rómulo Costa'),
(59, 59, 'Puerto Cabello'),
(60, 60, 'Puerto Cabello'),
(61, 61, 'Puerto Cabello'),
(62, 62, 'Puerto Cabello'),
(63, 63, 'Puerto Cabello'),
(64, 64, 'Puerto Cabello'),
(65, 65, 'San Fernando'),
(66, 66, 'San Fernando'),
(67, 67, 'Mario Briceño Iragorry');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nacionalidades`
--

CREATE TABLE `nacionalidades` (
  `id_nacionalidad` int(11) NOT NULL,
  `nacionalidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `nacionalidades`
--

INSERT INTO `nacionalidades` (`id_nacionalidad`, `nacionalidad`) VALUES
(1, 'Venezuela'),
(2, 'Extranjero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `options`
--

CREATE TABLE `options` (
  `id_obtions` int(11) NOT NULL,
  `id_interfaz` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `titulo` varchar(20) NOT NULL,
  `contenido` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id_pais` int(11) NOT NULL,
  `nombre_pais` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id_pais`, `nombre_pais`) VALUES
(1, 'Venezuela'),
(2, 'Venezuela'),
(3, 'Venezuela'),
(4, 'Venezuela'),
(5, 'Venezuela'),
(6, 'Venezuela'),
(7, 'Venezuela'),
(8, 'Venezuela'),
(9, 'Venezuela'),
(10, 'Venezuela'),
(11, 'Venezuela'),
(12, 'Venezuela'),
(13, 'Venezuela'),
(14, 'Venezuela'),
(15, 'Venezuela'),
(16, 'Venezuela'),
(17, 'Venezuela'),
(18, 'Venezuela'),
(19, 'Venezuela'),
(20, 'Venezuela'),
(21, 'Venezuela'),
(22, 'Venezuela'),
(23, 'Venezuela'),
(24, 'Venezuela'),
(25, 'Venezuela'),
(26, 'Venezuela'),
(27, 'Venezuela'),
(28, 'Venezuela'),
(29, 'Venezuela'),
(30, 'Venezuela'),
(31, 'Venezuela'),
(32, 'Venezuela'),
(33, 'Venezuela'),
(34, 'Venezuela'),
(35, 'Venezuela'),
(36, 'Venezuela'),
(37, 'Venezuela'),
(38, 'Venezuela'),
(39, 'Venezuela'),
(40, 'Venezuela'),
(41, 'Venezuela'),
(42, 'Venezuela'),
(43, 'Venezuela'),
(44, 'Venezuela'),
(45, 'Venezuela'),
(46, 'Venezuela'),
(47, 'Venezuela'),
(48, 'Venezuela'),
(49, 'Venezuela'),
(50, 'Venezuela'),
(51, 'Venezuela'),
(52, 'Venezuela'),
(53, 'Venezuela'),
(54, 'Venezuela'),
(55, 'Venezuela'),
(56, 'Venezuela'),
(57, 'Venezuela'),
(58, 'Venezuela'),
(59, 'Venezuela'),
(60, 'Venezuela'),
(61, 'Venezuela'),
(62, 'Venezuela'),
(63, 'Venezuela'),
(64, 'Venezuela'),
(65, 'Venezuela'),
(66, 'Venezuela'),
(67, 'Venezuela');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parroquias`
--

CREATE TABLE `parroquias` (
  `id_parroquia` int(11) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  `nombre_parroquia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `parroquias`
--

INSERT INTO `parroquias` (`id_parroquia`, `id_municipio`, `nombre_parroquia`) VALUES
(1, 1, 'Victorino'),
(2, 2, 'Victorino'),
(3, 3, 'Victorino'),
(4, 4, 'Victorino'),
(5, 5, 'Victorino'),
(6, 6, 'Victorino'),
(7, 7, 'Victorino'),
(8, 8, 'Victorino'),
(9, 9, 'Victorino'),
(10, 10, 'Victorino'),
(11, 11, 'Victorino'),
(12, 12, 'Victorino'),
(13, 13, 'Victorino'),
(14, 14, 'Medio Ventuari'),
(15, 15, 'Medio Ventuari'),
(16, 16, 'Medio Ventuari'),
(17, 17, 'Medio Ventuari'),
(18, 18, 'Medio Ventuari'),
(19, 19, 'Medio Ventuari'),
(20, 20, 'Medio Ventuari'),
(21, 21, 'Medio Ventuari'),
(22, 22, 'Medio Ventuari'),
(23, 23, 'Medio Ventuari'),
(24, 24, 'Samariapo'),
(25, 25, 'Samariapo'),
(26, 26, 'Samariapo'),
(27, 27, 'Píritu'),
(28, 28, 'Píritu'),
(29, 29, 'Píritu'),
(30, 30, 'Píritu'),
(31, 31, 'Solano'),
(32, 32, 'Solano'),
(33, 33, 'Solano'),
(34, 34, 'Solano'),
(35, 35, 'Solano'),
(36, 36, 'Solano'),
(37, 37, 'Solano'),
(38, 38, 'Solano'),
(39, 39, 'Solano'),
(40, 40, 'Pecaya'),
(41, 41, 'Pecaya'),
(42, 42, 'Pecaya'),
(43, 43, 'Pecaya'),
(44, 44, 'Pecaya'),
(45, 45, 'Pecaya'),
(46, 46, 'Pecaya'),
(47, 47, 'Pecaya'),
(48, 48, 'Pecaya'),
(49, 49, 'Pecaya'),
(50, 50, 'Pecaya'),
(51, 51, 'Pecaya'),
(52, 52, 'Gibraltar'),
(53, 53, 'Gibraltar'),
(54, 54, 'Gibraltar'),
(55, 55, 'Gibraltar'),
(56, 56, 'San Blas'),
(57, 57, 'San Blas'),
(58, 58, 'Antonio Rómulo Costa'),
(59, 59, 'Fernández Peña'),
(60, 60, 'Fernández Peña'),
(61, 61, 'Fernández Peña'),
(62, 62, 'Fernández Peña'),
(63, 63, 'Fernández Peña'),
(64, 64, 'Fernández Peña'),
(65, 65, 'Panamericana'),
(66, 66, 'Panamericana'),
(67, 67, 'Rendón');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id_permiso` int(11) NOT NULL,
  `nombre_permiso` varchar(50) NOT NULL,
  `descripcion_permiso` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id_persona` int(11) NOT NULL,
  `id_genero` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_nacionalidad` int(11) NOT NULL,
  `id_direccion` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) NOT NULL,
  `cedula` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `x` varchar(100) DEFAULT NULL,
  `tiktok` varchar(100) DEFAULT NULL,
  `sitio_web` varchar(200) DEFAULT NULL,
  `url_pagina` varchar(45) DEFAULT NULL,
  `img_pagina` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id_persona`, `id_genero`, `id_rol`, `id_nacionalidad`, `id_direccion`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `correo_electronico`, `clave`, `facebook`, `instagram`, `x`, `tiktok`, `sitio_web`, `url_pagina`, `img_pagina`) VALUES
(1, 1, 1, 1, 15, 'adasd', 'sdasd', 30434485, '0000-00-00', '3434@gmail.com', '4535353535', NULL, NULL, NULL, NULL, NULL, 'A', 'A'),
(9, 1, 1, 1, 23, 'HOLA', 'ADIOS', 234234234, '0000-00-00', '234234', '3rthr73@gmail.com3rthr73@gmail.com', NULL, NULL, NULL, NULL, NULL, 'A', 'A'),
(11, 1, 1, 1, 29, 'asdasd', 'sdasd', 2323, '2024-05-27', '23423asdadsasdasd', 'http://localhost:3000/registro', NULL, NULL, NULL, NULL, NULL, 'A', 'A'),
(17, 2, 1, 1, 35, 'dasdddddddddddddd', 'sdasdadd', 2147483647, '2024-04-30', '23424234', 'engerberthr73@gmail.comengerberthr73@gmail.com', NULL, NULL, NULL, NULL, NULL, 'A', 'A'),
(20, 2, 1, 1, 38, 'dasdddddddddddddd', 'sdasdadd', 333, '2024-04-30', 'engerberthr73@gmail.com2342342323', 'engerberthr73@gmail.comengerberthr73@gmail.com', NULL, NULL, NULL, NULL, NULL, 'A', 'A'),
(21, 2, 1, 1, 39, 'sfgsfg', 'sdasd', 323232, '2024-05-27', 'asdasdasd', '453453043448530434485', NULL, NULL, NULL, NULL, NULL, 'A', 'A'),
(33, 1, 1, 1, 51, 'Engerberth Javier', 'Reyes Boxil', 30434486, '2024-06-01', 'reyes.35345345@gmail.com', 'reyes.epete14@gmail.com', NULL, NULL, NULL, NULL, NULL, 'A', 'A'),
(37, 1, 1, 1, 55, 'A', 'B', 1, '2024-05-28', 'reyes.epete12@gmail.com', 'asdasdasd', 'ssdfsf', 'asdasd', 'asdasd', 'sasdasd', 'sfsfsf', 'A', 'A'),
(39, 2, 1, 1, 57, 'Engerberth Reyes XD', 'Engerberth Reyes XD', 232, '2021-01-04', '34344@gmail.com', '56456456', NULL, NULL, NULL, NULL, NULL, 'A', 'A'),
(46, 1, 2, 1, 64, 'adasd', 'sdasd', 453545, '2024-05-29', 'sdsd73@gmail.com', 'sdsdsdsdsd', NULL, NULL, NULL, NULL, NULL, 'A', 'A'),
(48, 1, 2, 1, 66, 'YO', 'YU', 35253245, '2024-05-29', 'engerbeasdadasdasdasdasdasdrthr73@gmail.com', 'engerbeasdadasdasdasdasdasdrthr73@gmail.comengerbeasdadasdasdasdasdasdrthr73@gmail.comengerbeasdadas', 'https://www.facebook.com/x', 'https://www.instagram.com/xdasdasd', 'https://www.twitter.com/xdasdasd', 'https://www.tiktok.com/@xdasdasd', 'https://www.tiktok.com/@xdasdasd', 'A', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id_publicacion` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `descripcion_publicacion` varchar(200) NOT NULL,
  `fecha` date NOT NULL,
  `imagen` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `estatus`) VALUES
(1, 'Administrador', 1),
(2, 'Usuario', 1),
(3, 'Invitado', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaciones_roles_permisos`
--
ALTER TABLE `asignaciones_roles_permisos`
  ADD PRIMARY KEY (`id_asignacion_rol_permiso`),
  ADD KEY `fk_asignaciones_roles_permisos_roles1_idx` (`id_rol`),
  ADD KEY `fk_asignaciones_roles_permisos_permisos1_idx` (`id_permiso`);

--
-- Indices de la tabla `codigos_postales`
--
ALTER TABLE `codigos_postales`
  ADD PRIMARY KEY (`id_codigo_postal`),
  ADD KEY `fk_codigos_postales_parroquias1_idx` (`id_parroquia`);

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`id_direccion`),
  ADD KEY `fk_direcciones_codigos_postales1_idx` (`id_codigo_postal`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estado`),
  ADD KEY `fk_estados_paises1_idx` (`id_pais`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id_genero`);

--
-- Indices de la tabla `interfaces`
--
ALTER TABLE `interfaces`
  ADD PRIMARY KEY (`id_interfaz`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`id_municipio`),
  ADD KEY `fk_municipios_estados1_idx` (`id_estado`);

--
-- Indices de la tabla `nacionalidades`
--
ALTER TABLE `nacionalidades`
  ADD PRIMARY KEY (`id_nacionalidad`);

--
-- Indices de la tabla `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id_obtions`),
  ADD KEY `fk_contenidos_interfaces1_idx` (`id_interfaz`),
  ADD KEY `fk_options_personas1_idx` (`id_persona`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_pais`);

--
-- Indices de la tabla `parroquias`
--
ALTER TABLE `parroquias`
  ADD PRIMARY KEY (`id_parroquia`),
  ADD KEY `fk_parroquias_municipios1_idx` (`id_municipio`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id_permiso`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id_persona`),
  ADD UNIQUE KEY `cedula_UNIQUE` (`cedula`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`),
  ADD KEY `fk_personas_generos_idx` (`id_genero`),
  ADD KEY `fk_personas_roles1_idx` (`id_rol`),
  ADD KEY `fk_personas_nacionalidades1_idx` (`id_nacionalidad`),
  ADD KEY `fk_personas_direcciones1_idx` (`id_direccion`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `fk_publicaciones_personas1_idx` (`id_persona`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaciones_roles_permisos`
--
ALTER TABLE `asignaciones_roles_permisos`
  MODIFY `id_asignacion_rol_permiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `codigos_postales`
--
ALTER TABLE `codigos_postales`
  MODIFY `id_codigo_postal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `id_direccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id_genero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `interfaces`
--
ALTER TABLE `interfaces`
  MODIFY `id_interfaz` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `id_municipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `nacionalidades`
--
ALTER TABLE `nacionalidades`
  MODIFY `id_nacionalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `options`
--
ALTER TABLE `options`
  MODIFY `id_obtions` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id_pais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `parroquias`
--
ALTER TABLE `parroquias`
  MODIFY `id_parroquia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id_permiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones_roles_permisos`
--
ALTER TABLE `asignaciones_roles_permisos`
  ADD CONSTRAINT `fk_asignaciones_roles_permisos_permisos1` FOREIGN KEY (`id_permiso`) REFERENCES `permisos` (`id_permiso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_asignaciones_roles_permisos_roles1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `codigos_postales`
--
ALTER TABLE `codigos_postales`
  ADD CONSTRAINT `fk_codigos_postales_parroquias1` FOREIGN KEY (`id_parroquia`) REFERENCES `parroquias` (`id_parroquia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD CONSTRAINT `fk_direcciones_codigos_postales1` FOREIGN KEY (`id_codigo_postal`) REFERENCES `codigos_postales` (`id_codigo_postal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `estados`
--
ALTER TABLE `estados`
  ADD CONSTRAINT `fk_estados_paises1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD CONSTRAINT `fk_municipios_estados1` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `fk_contenidos_interfaces1` FOREIGN KEY (`id_interfaz`) REFERENCES `interfaces` (`id_interfaz`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_options_personas1` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `parroquias`
--
ALTER TABLE `parroquias`
  ADD CONSTRAINT `fk_parroquias_municipios1` FOREIGN KEY (`id_municipio`) REFERENCES `municipios` (`id_municipio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `fk_personas_direcciones1` FOREIGN KEY (`id_direccion`) REFERENCES `direcciones` (`id_direccion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_personas_generos` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id_genero`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_personas_nacionalidades1` FOREIGN KEY (`id_nacionalidad`) REFERENCES `nacionalidades` (`id_nacionalidad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_personas_roles1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `fk_publicaciones_personas1` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
