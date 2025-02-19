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
  for (let i = 1; i <= 4; i++) {
    await prisma.employee.create({
      data: {
        username: `employeeId${i}`,
        name: `EName ${i}`,
        role: i % 2 === 0 ? "admin" : "member",
        companyId: `companyId${Math.ceil(i / 2) % 4 || 4}`,
        email: `employee${i}@example.com`,
      },
    });
  }

  // CUSTOMER
  for (let i = 1; i <= 3; i++) {
    await prisma.customer.create({
      data: {
        firstName: `CFirstName${i}`,
        lastName: `CLastName${i}`,
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
  for (let i = 1; i <= 3; i++) {
    await prisma.appointment.create({
      data: {
        title: `Appointment ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() - 8)),
        endTime: new Date(new Date().setHours(new Date().getHours() - 7)),
        description: `Description${i}`,
      },
    });
  }

  // INVOICE
  // for (let i = 1; i <= 3; i++) {
  //   await prisma.invoice.create({
  //     data: {
  //       customerId: `customer${(i % 3) + 1}`,
  //       appointmentId: (i % 3) + 1,
  //       paymentType: i % 2 === 0 ? PaymentType.Debit : PaymentType.Mastercard,
  //       status: i % 2 === 0 ? Status.Draft : Status.Paid,
  //     },
  //   });
  // }

  // SERVICE
  // for (let i = 1; i <= 5; i++) {
  //   await prisma.service.create({
  //     data: {
  //       serviceType: ServiceType.Windshield,
  //       price: (i % 300) + 1,
  //       quantity: 1,
  //       vehicleType: Vehicle.Suv,
  //       code: `DW${(i % 100) + 1}`,
  //       distributor: Distributor.A,
  //       invoiceId: (i % 5) + 1,
  //       appointmentId: (i % 5) + 1,
  //     },
  //   });
  // }
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
