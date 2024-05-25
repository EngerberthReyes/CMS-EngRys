import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/componentes/email/email-template.jsx";

const resend = new Resend("re_2SbxscnS_DRQWWxSUGUzHdQnKpHZjopUk");

export const POST = async (request) => {
  try {
    const { codigo, correoElectronico } = await request.json();
    const datos = await resend.emails.send({
      from: "EpíComputers <onboarding@resend.dev>",
      to: [correoElectronico],
      subject: "Recuperar Contraseña - EpíComputers",
      react: EmailTemplate({ firstName: "Fzst", codigo: codigo }),
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
