import nodemailer from "nodemailer";

// Configuración del transporte de Nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
  },
});

console.log(process.env.MAIL_USERNAME);

export default async function POST(req, res) {
  if (req.method === "POST") {
    console.log(req.body);

    if (req.body) {
      let optionsEmail = {
        from: process.env.MAIL_USERNAME,
        to: req.body.to || "engerberthr73@gmail.com",
        subject: req.body.subject || "Asunto del correo",
        text: req.body.text || "Contenido del correo",
      };

      try {
        await transporter.sendMail(optionsEmail);
        console.log("Email enviado");
        res.status(200).json({ message: "Correo enviado exitosamente" });
      } catch (error) {
        console.error("Error enviando email", error.message);
        res
          .status(500)
          .json({ message: "Error al enviar el correo", error: error.message });
      }
    } else {
      res.status(400).json({ message: "Falta el contenido del correo" });
    }
  } else {
    // Método no permitido
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
