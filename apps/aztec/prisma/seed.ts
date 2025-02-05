import {
  Distributor,
  PaymentType,
  PrismaClient,
  ServiceType,
  Status,
  Vehicle,
} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // COMPANY
  await prisma.company.create({
    data: {
      id: `companyId1`,
      name: "odetail",
    },
  });
  await prisma.company.create({
    data: {
      id: "companyId2",
      name: "aztec",
    },
  });

  //EMPLOYEE
  for (let i = 1; i <= 25; i++) {
    await prisma.employee.create({
      data: {
        id: `employeeId${i}`,
        username: `employeeId${i}`,
        name: `EName ${i}`,
        role: i % 2 === 0 ? "admin" : "member",
        companyId: `companyId${Math.ceil(i / 2) % 25 || 25}`,
        email: `employee${i}@example.com`,
      },
    });
  }

  // CUSTOMER
  for (let i = 1; i <= 15; i++) {
    await prisma.customer.create({
      data: {
        id: `customer${i}`, // Unique ID
        name: `CName${i}`,
        city: `CCity${i}`,
        email: `customer${i}@example.com`,
        phone: `123-456-789${i}`,
        postalCode: `CPostalCode${i}`,
        streetAddress1: `CStreetAddress${i}`,
        streetAddress2: `CStreetAddress2${i}`,
        subscription: false,
        returnCounter: i,
      },
    });
  }

  // APPOINTMENT
  for (let i = 1; i <= 15; i++) {
    await prisma.appointment.create({
      data: {
        title: `Appointment ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        description: `Description${i}`,
      },
    });
  }

  // INVOICE
  for (let i = 1; i <= 15; i++) {
    await prisma.invoice.create({
      data: {
        customerId: `customer${(i % 15) + 1}`,
        appointmentId: (i % 15) + 1,
        paymentType: i % 2 === 0 ? PaymentType.Debit : PaymentType.Mastercard,
        status: i % 2 === 0 ? Status.Draft : Status.Paid,
      },
    });
  }

  // SERVICE
  for (let i = 1; i <= 15; i++) {
    await prisma.service.create({
      data: {
        serviceType: ServiceType.Windshield,
        price: (i % 300) + 1,
        quantity: 1,
        vehicleType: Vehicle.Suv,
        code: `DW${(i % 100) + 1}`,
        distributor: Distributor.A,
        invoiceId: (i % 15) + 1,
        appointmentId: (i % 15) + 1,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
