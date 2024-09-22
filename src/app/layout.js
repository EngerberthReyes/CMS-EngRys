import { Inter } from "next/font/google";
import "./globals.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Iniciar Sesión",
  description: "Hecho en Next.Js 14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>CMS</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
