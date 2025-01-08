import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Jatin Vashisht",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "jatinvashisht11@gmail.com" }],
      template_uuid: "787ae692-3265-4594-a158-016431345e2e",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "InvoiceMailer",
        company_info_address: "Chad street 124",
        company_info_city: "Gurgaon",
        company_info_zip_code: "122001",
        company_info_country: "India",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}