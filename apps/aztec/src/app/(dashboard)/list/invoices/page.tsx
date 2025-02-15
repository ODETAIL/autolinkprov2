import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { calculateTotalPrice, formatPhoneNumber } from "@/lib/util";
import { auth } from "@clerk/nextjs/server";
import {
  faEye,
  faFilter,
  faPlus,
  faSort,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Appointment,
  Customer,
  Invoice,
  Prisma,
  Service,
} from "@prisma/client";
import Link from "next/link";

type InvoiceList = Invoice & { customer: Customer } & {
  appointment: Appointment;
} & { services: Service[] };

const InvoiceListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Status",
      accessor: "status",
      className: "hidden lg:table-cell",
    },
    {
      header: "Codes",
      accessor: "codes",
      className: "hidden lg:table-cell",
    },
    {
      header: "Amount",
      accessor: "amount",
      className: "hidden lg:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: InvoiceList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-aztecBlack-light text-sm hover:bg-aztecBlue text-white"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {item.customer.firstName} {item.customer.lastName}
          </h3>
          <p className="text-xs text-gray-300">#{item.id}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {formatPhoneNumber(item.customer.phone)}
      </td>
      <td className="hidden md:table-cell">{item.status}</td>
      <td className="hidden md:table-cell">
        {item.services.map((service) => service.code).join(",")}
      </td>
      <td className="hidden md:table-cell text-lg font-semibold ">
        {calculateTotalPrice(item.services)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/invoices/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-aztecGreen">
              <FontAwesomeIcon icon={faEye} className="text-white w-5" />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal
              table="invoice"
              type={{ label: "delete", icon: faTrashCan }}
              id={item.id}
            />
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.InvoiceWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "customerId":
            query.customerId = value;
            break;
          case "search":
            query.id = { equals: Number(value) };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.invoice.findMany({
      where: query,
      include: {
        customer: true,
        services: true,
        appointment: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.invoice.count({ where: query }),
  ]);

  return (
    <div className="bg-aztecBlack-dark p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between text-white">
        <h1 className="hidden md:block text-lg font-semibold">All Invoices</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-aztecBlue">
              <FontAwesomeIcon icon={faFilter} className="text-white w-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-aztecBlue">
              <FontAwesomeIcon icon={faSort} className="text-white w-5" />
            </button>
            {role === "admin" && (
              <FormModal
                table="invoice"
                type={{ label: "create", icon: faPlus }}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default InvoiceListPage;
