import { conexion } from "@/db/database.js";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { codigo, correoElectronico } = await request.json();

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
