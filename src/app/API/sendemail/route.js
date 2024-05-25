import { Resend } from "resend";
import { EmailTemplate } from "@/componentes/email/email-template.jsx";

const resend = new Resend("re_2SbxscnS_DRQWWxSUGUzHdQnKpHZjopUk");

export const POST = async () => {
  try {
    const datos = await resend.emails.send({
      from: "EpíComputers <onboarding@resend.dev>",
      to: ["engerberthr73@gmail.com"],
      subject: "Recuperar Contraseña - EpíComputers",
      react: EmailTemplate({ firstName: "Fzst", codigo: "codigo" }),
      text: "",
    });

    console.log(datos);

    return NextResponse.json(
      { mensaje: "Todo salió bien" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
