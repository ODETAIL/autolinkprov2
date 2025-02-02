import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  companiesTable,
  employeesTable,
  customersTable,
  servicesTable,
  appointmentsTable,
  invoicesTable,
} from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  console.log("🌱 Seeding database...");

  const companies = await db
    .insert(companiesTable)
    .values([{ name: "Aztec Auto Glass" }, { name: "O Detail" }])
    .returning({ id: companiesTable.id });

  await db.insert(employeesTable).values([
    { name: "John Doe", role: "Admin", companyId: companies[0].id },
    { name: "Jane Smith", role: "Member", companyId: companies[1].id },
  ]);

  const customers = await db
    .insert(customersTable)
    .values([
      {
        name: "Michael Johnson",
        city: "Toronto",
        email: "michael@example.com",
        phone: "555-1234",
        postalCode: "M5V 3L9",
        streetAddress1: "123 Queen St",
        streetAddress2: "Apt 101",
        subscriptionWarranty: true,
        returnCounter: 0,
        companyId: companies[0].id,
      },
      {
        name: "Sara Parker",
        city: "Vancouver",
        email: "sara@example.com",
        phone: "555-5678",
        postalCode: "V6B 1G1",
        streetAddress1: "456 Granville St",
        streetAddress2: "Suite 202",
        subscriptionWarranty: false,
        returnCounter: 1,
        companyId: companies[1].id,
      },
    ])
    .returning({ id: customersTable.id });

  const services = await db
    .insert(servicesTable)
    .values([
      {
        name: "Windshield Replacement",
        price: "299.99",
        quantity: 10,
        vehicleType: "Sedan",
        code: "DW2354",
        distributorCode: "A",
      },
      {
        name: "Backglass Replacement",
        price: "149.99",
        quantity: 5,
        vehicleType: "SUV",
        code: "DW2007",
        distributorCode: "M",
      },
    ])
    .returning({ id: servicesTable.id });

  const appointments = await db
    .insert(appointmentsTable)
    .values([
      {
        date: new Date("2025-02-01").toISOString().split("T")[0],
        startTime: "10:00:00+00",
        endTime: "11:30:00+00",
        serviceId: services[0].id,
        title: "Windshield Repair for Michael",
        description: "Replacing cracked windshield",
        customerId: customers[0].id,
      },
      {
        date: new Date("2025-02-02").toISOString().split("T")[0],
        startTime: "14:30:00+00",
        endTime: "16:00:00+00",
        serviceId: services[1].id,
        title: "Car Detailing for Sara",
        description: "Full interior and exterior detailing",
        customerId: customers[1].id,
      },
    ])
    .returning({ id: appointmentsTable.id });

  await db.insert(invoicesTable).values([
    {
      appointmentId: appointments[0].id,
      paymentType: "Credit Card",
      status: "Paid",
      customerId: customers[0].id,
    },
    {
      appointmentId: appointments[1].id,
      paymentType: "Cash",
      status: "Pending",
      customerId: customers[1].id,
    },
  ]);

  console.log("✅ Seeding completed!");
}

// Run the seed function
seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

seed();
