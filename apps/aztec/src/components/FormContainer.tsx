import FormModal from "./FormModal";
import { db } from "@/lib/drizzle";
import {
  appointmentsTable,
  companiesTable,
  customersTable,
  servicesTable,
} from "@/db/schema";

export type FormContainerProps = {
  table: "employee" | "customer" | "invoice" | "appointment";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData: Record<string, any> = {};

  if (type !== "delete") {
    switch (table) {
      case "employee":
        // Fetch companies for assigning employees
        const companies = await db
          .select({ id: companiesTable.id, name: companiesTable.name })
          .from(companiesTable);
        relatedData = { companies };
        break;

      case "customer":
        // Fetch companies for linking customers
        const customerCompanies = await db
          .select({ id: companiesTable.id, name: companiesTable.name })
          .from(companiesTable);
        relatedData = { companies: customerCompanies };
        break;

      case "invoice":
        // Fetch customers and appointments for invoice selection
        const invoiceCustomers = await db
          .select({ id: customersTable.id, name: customersTable.name })
          .from(customersTable);

        const invoiceAppointments = await db
          .select({
            id: appointmentsTable.id,
            title: appointmentsTable.title,
          })
          .from(appointmentsTable);

        relatedData = {
          customers: invoiceCustomers,
          appointments: invoiceAppointments,
        };
        break;

      case "appointment":
        // Fetch services and customers for appointment selection
        const availableServices = await db
          .select({ id: servicesTable.id, name: servicesTable.name })
          .from(servicesTable);

        const availableCustomers = await db
          .select({ id: customersTable.id, name: customersTable.name })
          .from(customersTable);

        relatedData = {
          services: availableServices,
          customers: availableCustomers,
        };
        break;

      default:
        break;
    }
  }

  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
