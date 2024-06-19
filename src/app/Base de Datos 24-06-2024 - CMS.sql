-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2024 a las 00:17:16
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
-- Estructura de tabla para la tabla `ciudades`
--
CREATE TABLE
  `ciudades` (
    `id_ciudad` int (11) NOT NULL,
    `id_estado` int (11) NOT NULL,
    `nombre_ciudad` varchar(100) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `ciudades`
--
INSERT INTO
  `ciudades` (`id_ciudad`, `id_estado`, `nombre_ciudad`)
VALUES
  (1, 1, 'Abu Qir'),
  (2, 2, '2'),
  (3, 3, 'Falmouth'),
  (4, 4, 'Caála'),
  (5, 5, 'La que tu quieras xd'),
  (6, 6, 'Caconda');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `codigos_postales`
--
CREATE TABLE
  `codigos_postales` (
    `id_codigo_postal` int (11) NOT NULL,
    `id_parroquia` int (11) DEFAULT NULL,
    `numero_codigo_postal` int (11) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `codigos_postales`
--
INSERT INTO
  `codigos_postales` (
    `id_codigo_postal`,
    `id_parroquia`,
    `numero_codigo_postal`
  )
VALUES
  (1, 1, NULL),
  (2, 2, NULL),
  (3, 3, NULL),
  (4, 4, NULL),
  (5, 5, 2222),
  (6, 6, NULL);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `direcciones`
--
CREATE TABLE
  `direcciones` (
    `id_direccion` int (11) NOT NULL,
    `id_codigo_postal` int (11) DEFAULT NULL,
    `direccion_completa` varchar(200) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `direcciones`
--
INSERT INTO
  `direcciones` (
    `id_direccion`,
    `id_codigo_postal`,
    `direccion_completa`
  )
VALUES
  (1, 1, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),
  (2, 2, '34534534535345haushdasd'),
  (3, 3, '32423423423423'),
  (4, 4, 'a'),
  (5, 5, 'Dirección Cualquiera'),
  (6, 6, 'XD');

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

--
-- Volcado de datos para la tabla `estados`
--
INSERT INTO
  `estados` (`id_estado`, `id_pais`, `nombre_estado`)
VALUES
  (1, 1, 'algo'),
  (2, 2, 'Saint asdasdA'),
  (3, 3, 'Saint John Parish'),
  (4, 4, 'Cuanza Sul'),
  (5, 5, 'XD'),
  (6, 6, 'Bié Province');

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

--
-- Volcado de datos para la tabla `interfaces`
--
INSERT INTO
  `interfaces` (`id_interfaz`, `nombre_interfaz`)
VALUES
  (1, 'Noticias'),
  (2, 'Inicio'),
  (3, 'Sobre Nosotros'),
  (4, 'Contactanos');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `municipios`
--
CREATE TABLE
  `municipios` (
    `id_municipio` int (11) NOT NULL,
    `id_ciudad` int (11) DEFAULT NULL,
    `nombre_municipio` varchar(100) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `municipios`
--
INSERT INTO
  `municipios` (`id_municipio`, `id_ciudad`, `nombre_municipio`)
VALUES
  (1, 1, NULL),
  (2, 2, NULL),
  (3, 3, NULL),
  (4, 4, NULL),
  (5, 5, 'Algo mas que hacer'),
  (6, 6, NULL);

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
  (1, 'Venezolano'),
  (2, 'Extranjero');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `noticias`
--
CREATE TABLE
  `noticias` (
    `id_noticia` int (11) NOT NULL,
    `id_persona` int (11) DEFAULT NULL,
    `descripcion_noticia` text DEFAULT NULL,
    `fecha` date DEFAULT NULL,
    `enlace` varchar(2000) DEFAULT NULL,
    `imagen` varchar(2000) DEFAULT NULL,
    `urlVideo` varchar(2000) DEFAULT NULL,
    `video` varchar(2000) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `noticias`
--
INSERT INTO
  `noticias` (
    `id_noticia`,
    `id_persona`,
    `descripcion_noticia`,
    `fecha`,
    `enlace`,
    `imagen`,
    `urlVideo`,
    `video`
  )
VALUES
  (
    33,
    5,
    '<p>sdfsdf</p>',
    '2024-06-16',
    '[]',
    '[]',
    '[]',
    NULL
  ),
  (
    36,
    5,
    '<p>sd</p>',
    '2024-06-16',
    '[]',
    '[]',
    '[]',
    NULL
  ),
  (
    37,
    5,
    '',
    '2024-06-16',
    '[]',
    '[\"/FotosenNoticias/Barranca Abajo Cassette.jpg\"]',
    '[]',
    NULL
  ),
  (
    40,
    4,
    '<p>xd</p>',
    '2024-06-16',
    '[]',
    '[]',
    '[]',
    NULL
  ),
  (
    41,
    4,
    '<p>sdsd</p>',
    '2024-06-16',
    '[]',
    '[]',
    '[]',
    NULL
  );

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `options`
--
CREATE TABLE
  `options` (
    `id_option` int (11) NOT NULL,
    `id_interfaz` int (11) NOT NULL,
    `id_persona` int (11) NOT NULL,
    `titulo` varchar(20) NOT NULL,
    `contenido` text NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `options`
--
INSERT INTO
  `options` (
    `id_option`,
    `id_interfaz`,
    `id_persona`,
    `titulo`,
    `contenido`
  )
VALUES
  (
    1,
    2,
    1,
    'La PC Gamer de Tus Sueños',
    '<p>En Epicomputers, nos dedicamos a ofrecer soluciones tecnológicas de vanguardia, adaptadas a las necesidades de cada uno de nuestros clientes. Con un compromiso firme hacia la calidad, la innovación y el servicio excepcional, nos hemos establecido como un referente en el mercado de computadoras y tecnología.</p>'
  ),
  (
    2,
    3,
    1,
    'Innovación',
    'Innovación: En Epicomputers, la innovación es el núcleo de todo lo que hacemos. Entendemos que el mundo de la tecnología avanza rápidamente y que para mantenernos a la vanguardia, debemos adoptar continuamente nuevas ideas y métodos. Por eso, nos dedicamos a explorar y desarrollar las tecnologías más avanzadas para ofrecerte soluciones de última generación.'
  ),
  (
    3,
    3,
    1,
    'Calidad',
    'Calidad: Nos esforzamos por ofrecer productos y servicios de la más alta calidad, garantizando la satisfacción de nuestros clientes.'
  ),
  (
    4,
    3,
    1,
    'Servicio al Cliente',
    'Servicio al Cliente: Priorizamos el trato personalizado y la atención detallada a nuestros clientes, entendiendo que cada proyecto es único y requiere un enfoque individualizado.'
  ),
  (
    5,
    3,
    1,
    'Responsabilidad Social',
    'Responsabilidad Social: Reconocemos nuestro papel en la comunidad y nos comprometemos a contribuir positivamente a través de iniciativas sociales y educativas.'
  ),
  (
    6,
    3,
    1,
    'Historia',
    '<p>EpíComputers es una empresa que ha estado involucrada en el desarrollo y ventas de computadoras desde 2024. A lo largo de su historia, han producido una variedad de sistemas informáticos, incluyendo microcomputadoras personales (PCs), servidores y dispositivos de almacenamiento. La compañía se destacó por sus innovaciones en hardware y software, especialmente en el ámbito de las computadoras para uso profesional y empresarial.</p>'
  ),
  (
    7,
    3,
    1,
    'Misión',
    'Ofrecer una amplia gama de computadoras y productos tecnológicos de alta calidad a precios asequibles, con el objetivo de mejorar la vida cotidiana de nuestros clientes y facilitar su acceso a la tecnología. Nos comprometemos a brindar un excelente servicio al cliente, innovar constantemente en nuestros productos y procesos, y operar de manera sostenible para contribuir positivamente a nuestras comunidades.'
  ),
  (
    8,
    3,
    1,
    'Visión',
    'Aspiramos a liderar el mercado de computadoras mediante la innovación constante, la excelencia en el servicio y la construcción de relaciones duraderas basadas en la confianza y el respeto mutuo. Queremos ser reconocidos no solo por nuestras soluciones tecnológicas avanzadas, sino también por nuestra contribución a la sociedad a través de la promoción de la educación y el acceso a la tecnología.'
  );

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `paises`
--
CREATE TABLE
  `paises` (
    `id_pais` int (11) NOT NULL,
    `nombre_pais` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `paises`
--
INSERT INTO
  `paises` (`id_pais`, `nombre_pais`)
VALUES
  (1, 'Egypt'),
  (2, 'sdasdasdasdad'),
  (3, 'Antigua and Barbuda'),
  (4, 'HONO'),
  (5, 'Nose '),
  (6, 'Angola');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `parroquias`
--
CREATE TABLE
  `parroquias` (
    `id_parroquia` int (11) NOT NULL,
    `id_municipio` int (11) DEFAULT NULL,
    `nombre_parroquia` varchar(100) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `parroquias`
--
INSERT INTO
  `parroquias` (
    `id_parroquia`,
    `id_municipio`,
    `nombre_parroquia`
  )
VALUES
  (1, 1, NULL),
  (2, 2, NULL),
  (3, 3, NULL),
  (4, 4, NULL),
  (5, 5, 'Agua XD'),
  (6, 6, NULL);

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
    `id_genero` int (11) NOT NULL,
    `id_rol` int (11) NOT NULL,
    `id_nacionalidad` int (11) NOT NULL,
    `id_direccion` int (11) NOT NULL,
    `nombre` varchar(100) NOT NULL,
    `apellido` varchar(100) NOT NULL,
    `cedula` int (11) NOT NULL,
    `fotoPerfil` varchar(500) DEFAULT NULL,
    `fecha_nacimiento` date NOT NULL,
    `correo_electronico` varchar(150) NOT NULL,
    `clave` varchar(150) NOT NULL,
    `descripcion_personal` varchar(2000) DEFAULT NULL,
    `facebook` varchar(100) DEFAULT NULL,
    `instagram` varchar(100) DEFAULT NULL,
    `x` varchar(100) DEFAULT NULL,
    `tiktok` varchar(100) DEFAULT NULL,
    `sitio_web` varchar(150) DEFAULT NULL,
    `url_imagen_pagina` blob DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `personas`
--
INSERT INTO
  `personas` (
    `id_persona`,
    `id_genero`,
    `id_rol`,
    `id_nacionalidad`,
    `id_direccion`,
    `nombre`,
    `apellido`,
    `cedula`,
    `fotoPerfil`,
    `fecha_nacimiento`,
    `correo_electronico`,
    `clave`,
    `descripcion_personal`,
    `facebook`,
    `instagram`,
    `x`,
    `tiktok`,
    `sitio_web`,
    `url_imagen_pagina`
  )
VALUES
  (
    1,
    1,
    2,
    1,
    1,
    'Engerberth Reyes',
    'A A',
    30434485,
    '/FotosDePerfil/Barranca Abajo.jpg',
    '2020-05-10',
    'reyes.epete14@gmail.com',
    '$2a$11$A6HssXomUUrFx/MSGC5fYeD.Wn0TQtCepCdWWddy6fVxK4UJRtbTy',
    NULL,
    '',
    'https://instagram.com/login',
    '',
    '',
    'https://www.youtube.com',
    0x626c6f623a687474703a2f2f6c6f63616c686f73743a333030302f32316562373965342d353838352d343561392d396230342d346639323939356335323261
  ),
  (
    2,
    1,
    2,
    2,
    2,
    'Engerberth Reyes Javier Boxil',
    'sdfsdfsdfBoxil undefined',
    30434485,
    '/FotosDePerfil/Base de Datos - CMS.png',
    '2024-08-27',
    'engerberthr73@gmail.com',
    '$2a$11$a5DsrHu3emM8fnDoTCeFqOPeANA7nTWM8VP1G8AC9ydWtzX4GUkH.',
    NULL,
    '',
    '',
    '',
    '',
    '',
    NULL
  ),
  (
    3,
    1,
    2,
    1,
    3,
    'asdasd',
    'asdasdasd',
    323423,
    '/FotosDePerfil/Barranca Abajo.jpg',
    '2024-06-04',
    'engerberthr373@gmail.com',
    '$2a$11$f8/IR4YzU7BSscSFdELjHujoUkj24nOYe8D9VvojENpV79bEfszAi',
    NULL,
    '',
    '',
    '',
    '',
    '',
    NULL
  ),
  (
    4,
    1,
    2,
    1,
    4,
    'Javier Reyes Boxil',
    'Reyes Boxil',
    30434485,
    '/FotosDePerfil/PCGamer.png',
    '2024-06-11',
    'a@gmail.com',
    '$2a$11$pzx3fJ9BTVz7V9nxQvGTC.NE9sffJqQKlJ32DsDNRbZcwMncYxffy',
    NULL,
    'https://facebook.com/FACEBOOK',
    'https://instagram.com/instagram',
    'https://x.com/x',
    'https://tiktok.xdxd/@tiktok',
    'https://YOUTUBE.com',
    0x626c6f623a687474703a2f2f6c6f63616c686f73743a333030302f65333263383864642d303133312d343366662d623236662d366565326335643532343964
  ),
  (
    5,
    1,
    2,
    2,
    5,
    'Engerberth Javier Reyes Boxil',
    'Reyes Boxil',
    30434487,
    '/FotosDePerfil/Base de Datos - CMS.png',
    '2024-06-04',
    'engerberthreyes@gmail.com',
    '$2a$11$LfqpFCCO1EjDZ8vwjaJBwOefKgU6yM0TpQrgZvWvVzTOHNspX0qNS',
    '4654654646',
    'https://facebook.com/Pablo',
    'https://instagram.com/c',
    'https://x.com/c',
    'https://tiktok.com/@a',
    'esto es un sitio web',
    0x626c6f623a687474703a2f2f6c6f63616c686f73743a333030302f31663563396235362d383362302d346661332d616639322d353531646666363034623436
  ),
  (
    6,
    2,
    2,
    1,
    6,
    'a',
    'XD',
    30434485,
    '/FotosDePerfil/Barranca Abajo.jpg',
    '2024-05-28',
    'i@gmail.com',
    '$2a$11$f8AZ6mXW26XYtIMXhlc.yeB5rINTbQ5vRDdi84qO.sNxq/nTMzWX2',
    'xd',
    '',
    '',
    '',
    '',
    '',
    NULL
  );

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `publicaciones`
--
CREATE TABLE
  `publicaciones` (
    `id_publicacion` int (11) NOT NULL,
    `id_persona` int (11) NOT NULL,
    `descripcion_publicacion` text NOT NULL,
    `fecha` date DEFAULT NULL,
    `enlace` varchar(700) DEFAULT NULL,
    `imagen` mediumtext DEFAULT NULL,
    `video` varchar(255) DEFAULT NULL,
    `urlVideo` varchar(500) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--
INSERT INTO
  `publicaciones` (
    `id_publicacion`,
    `id_persona`,
    `descripcion_publicacion`,
    `fecha`,
    `enlace`,
    `imagen`,
    `video`,
    `urlVideo`
  )
VALUES
  (
    93,
    5,
    '<p>d</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    94,
    5,
    '<p>sdfsdf</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    95,
    5,
    '<p>xdxdxd</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    96,
    5,
    '<p>xdxdxdxd</p>',
    '2024-06-16',
    '[]',
    '[\"/FotosEnPublicaciones/Barranca Abajo  CD.jpg\"]',
    NULL,
    '[]'
  ),
  (
    97,
    5,
    '<p>asdad</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    98,
    5,
    '<p>sd</p>',
    '2024-06-16',
    '[]',
    '[\"/FotosEnPublicaciones/Barranca Abajo Cassette.jpg\"]',
    NULL,
    '[]'
  ),
  (
    99,
    5,
    '',
    '2024-06-16',
    '[]',
    '[\"/FotosEnPublicaciones/Barranca Abajo  CD.jpg\",\"/FotosEnPublicaciones/Barranca Abajo Cassette.jpg\",\"/FotosEnPublicaciones/Barranca Abajo.jpg\",\"/FotosEnPublicaciones/epigrafe73.png\",\"/FotosEnPublicaciones/IconoNoLineal.png\",\"/FotosEnPublicaciones/Listado Barranca Abajo.jpg\",\"/FotosEnPublicaciones/Patron Lineal.png\",\"/FotosEnPublicaciones/Patron LinealX.png\",\"/FotosEnPublicaciones/Patron LinealY.png\"]',
    NULL,
    '[]'
  ),
  (
    100,
    5,
    '',
    '2024-06-16',
    '[]',
    '[\"/FotosEnPublicaciones/Barranca Abajo Cassette.jpg\",\"/FotosEnPublicaciones/Barranca Abajo.jpg\",\"/FotosEnPublicaciones/IconoNoLineal.png\",\"/FotosEnPublicaciones/Listado Barranca Abajo.jpg\"]',
    NULL,
    '[]'
  ),
  (
    102,
    5,
    '',
    '2024-06-16',
    '[]',
    '{\"rutasImagenes\":[\"/FotosEnPublicaciones/Anarcocapitalismo.png\",\"/FotosEnPublicaciones/Barranca Abajo  CD.jpg\",\"/FotosEnPublicaciones/Barranca Abajo Cassette.jpg\",\"/FotosEnPublicaciones/Base de Datos - CMS.png\",\"/FotosEnPublicaciones/epigrafe73.png\",\"/FotosEnPublicaciones/IconoNoLineal.png\"],\"rutasImagenesNoticias\":[]}',
    NULL,
    '[]'
  ),
  (
    103,
    5,
    '',
    '2024-06-16',
    '[]',
    '[\"/FotosEnPublicaciones/Barranca Abajo  CD.jpg\",\"/FotosEnPublicaciones/Barranca Abajo Cassette.jpg\",\"/FotosEnPublicaciones/epigrafe73.png\",\"/FotosEnPublicaciones/IconoNoLineal.png\"]',
    NULL,
    '[]'
  ),
  (
    104,
    5,
    '<p>que lugar ocupas</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    105,
    5,
    '<p>que lugar ocupas in mi mint</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    106,
    5,
    '<p></p>',
    '2024-06-16',
    '[]',
    '[\"/FotosEnPublicaciones/Barranca Abajo  CD.jpg\"]',
    NULL,
    '[]'
  ),
  (
    107,
    5,
    '<p>fdgdfgd fg</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    108,
    5,
    '<p>sdfsdfdfsf</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    109,
    5,
    '<p>asdad</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    110,
    5,
    '<p>dasdas da </p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    111,
    5,
    '<p>asdasd</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    112,
    5,
    '<p>a sdas da s</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    124,
    5,
    '<p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[\"https://www.youtube.com/watch?v=cbzfjuq9w2A\"]'
  ),
  (
    125,
    4,
    '<p>que dijo su hijo detras del barbijo</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    126,
    4,
    '<p>que dijo su hijo detrás del barbijo</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    127,
    4,
    '<p>fg</p>',
    '2024-06-16',
    '[]',
    '[]',
    NULL,
    '[]'
  ),
  (
    133,
    5,
    '<p><strong><em>dg</em></strong></p>',
    '2024-06-17',
    '[]',
    '[\"/FotosEnPublicaciones/Barranca Abajo  CD.jpg\"]',
    NULL,
    '[]'
  ),
  (
    134,
    5,
    '',
    '2024-06-17',
    '[]',
    '[\"/FotosEnPublicaciones/2024-05-27 23-54-23.mp4\"]',
    NULL,
    '[]'
  );

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
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades` ADD PRIMARY KEY (`id_ciudad`),
ADD KEY `fk_ciudades_estados1_idx` (`id_estado`);

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
ADD KEY `fk_municipios_ciudades1_idx` (`id_ciudad`);

--
-- Indices de la tabla `nacionalidades`
--
ALTER TABLE `nacionalidades` ADD PRIMARY KEY (`id_nacionalidad`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias` ADD PRIMARY KEY (`id_noticia`),
ADD KEY `id_persona` (`id_persona`);

--
-- Indices de la tabla `options`
--
ALTER TABLE `options` ADD PRIMARY KEY (`id_option`),
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
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades` MODIFY `id_ciudad` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT de la tabla `codigos_postales`
--
ALTER TABLE `codigos_postales` MODIFY `id_codigo_postal` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones` MODIFY `id_direccion` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados` MODIFY `id_estado` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos` MODIFY `id_genero` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 3;

--
-- AUTO_INCREMENT de la tabla `interfaces`
--
ALTER TABLE `interfaces` MODIFY `id_interfaz` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 5;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios` MODIFY `id_municipio` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT de la tabla `nacionalidades`
--
ALTER TABLE `nacionalidades` MODIFY `id_nacionalidad` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 3;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias` MODIFY `id_noticia` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 42;

--
-- AUTO_INCREMENT de la tabla `options`
--
ALTER TABLE `options` MODIFY `id_option` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 9;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises` MODIFY `id_pais` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT de la tabla `parroquias`
--
ALTER TABLE `parroquias` MODIFY `id_parroquia` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos` MODIFY `id_permiso` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas` MODIFY `id_persona` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones` MODIFY `id_publicacion` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 135;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles` MODIFY `id_rol` int (11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `asignaciones_roles_permisos`
--
ALTER TABLE `asignaciones_roles_permisos` ADD CONSTRAINT `fk_asignaciones_roles_permisos_permisos1` FOREIGN KEY (`id_permiso`) REFERENCES `permisos` (`id_permiso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_asignaciones_roles_permisos_roles1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades` ADD CONSTRAINT `fk_ciudades_estados1` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE `municipios` ADD CONSTRAINT `fk_municipios_ciudades1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `noticias`
--
ALTER TABLE `noticias` ADD CONSTRAINT `noticias_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`);

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