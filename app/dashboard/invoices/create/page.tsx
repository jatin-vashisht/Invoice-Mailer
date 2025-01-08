import { getUserData } from "@/app/actions";
import { CreateInvoice } from "@/app/components/CreateInvoice";
import { requireUser } from "@/app/utils/hooks";

export default async function InvoiceCreationRoute() {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);
  return (
    <CreateInvoice
      lastName={data?.lastName as string}
      address={data?.address as string}
      email={data?.email as string}
      firstName={data?.firstName as string}
    />
  );
}
