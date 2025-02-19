import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import prisma from "@/lib/prisma";
import { calculateTotalPrice, formatPhoneNumber } from "@/lib/util";
import {
  faCheckCircle,
  faClockRotateLeft,
  faEnvelope,
  faEye,
  faFilter,
  faLocationDot,
  faPencil,
  faPersonWalkingArrowLoopLeft,
  faPhone,
  faPlus,
  faSort,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Customer, Invoice, Prisma, Service } from "@prisma/client";
import moment from "moment";
import Link from "next/link";
import { notFound } from "next/navigation";

type SingleCustomer =
  | (Customer & { invoices: Invoice[] } & { _count: { invoices: number } })
  | null;

type InvoiceList = Invoice & { customer: Customer } & {} & {
  services: Service[];
};

const columns = [
  {
    header: "Info",
    accessor: "info",
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
        <h3 className="font-semibold">#{item.id}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.status}</td>
    <td className="hidden md:table-cell">
      {item.services.map((service) => service.code).join(",")}
    </td>
    <td className="hidden md:table-cell text-lg font-semibold">
      {calculateTotalPrice(item.services)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/invoices/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-aztecGreen">
            <FontAwesomeIcon icon={faEye} className="text-white w-5" />
          </button>
        </Link>

        <FormModal
          table="invoice"
          type={{ label: "delete", icon: faTrashCan }}
          id={item.id}
        />
      </div>
    </td>
  </tr>
);

const SingleCustomerPage = async ({
  params,
}: {
  params: { [key: string]: string | undefined };
}) => {
  const { page, id } = params;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.InvoiceWhereInput = {};

  if (params) {
    for (const [key, value] of Object.entries(params)) {
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

  const customer: SingleCustomer = await prisma.customer.findUnique({
    where: { id },
    include: {
      invoices: {
        include: {
          services: true,
        },
      },
      _count: {
        select: { invoices: true },
      },
    },
  });

  if (!customer) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-aztecBlack-dark py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-white">
                  {customer.firstName} {customer.lastName}
                </h1>
                <FormModal
                  table="customer"
                  type={{ label: "update", icon: faPencil }}
                  data={customer}
                  id={id}
                />
              </div>

              <p className="text-sm text-gray-400">{customer.notes}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-sm font-medium text-white">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-aztecBlue w-5"
                  />
                  <div className="">
                    <span>{customer.streetAddress1}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-aztecBlue w-5"
                  />
                  <span>{customer.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-aztecBlue w-5"
                  />
                  <span>{formatPhoneNumber(customer.phone)}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    className="text-aztecBlue w-5"
                  />
                  <span>
                    {moment.utc(customer.lastVisit).format("MMMM DD, YYYY")}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faPersonWalkingArrowLoopLeft}
                    className="text-aztecBlue w-5"
                  />
                  <span>{customer.returnCounter}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-aztecBlue w-5"
                  />
                  <span>
                    {customer.subscription ? "Has Warranty" : "No Warranty"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-aztecBlack-dark rounded-md p-4 h-[800px]">
          {/* CUSTOMER INVOICES */}
          <div className="flex items-center justify-between">
            <h1 className="hidden md:block text-xl font-semibold text-white">
              {customer.firstName} &apos;s Invoices
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-4 self-end">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-aztecBlue">
                  <FontAwesomeIcon icon={faFilter} className="text-white w-5" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-aztecBlue">
                  <FontAwesomeIcon icon={faSort} className="text-white w-5" />
                </button>

                <FormModal
                  table="invoice"
                  type={{ label: "create", icon: faPlus }}
                  data={customer}
                />
              </div>
            </div>
          </div>
          {/* LIST */}
          <Table
            columns={columns}
            renderRow={renderRow}
            data={customer.invoices}
          />
          {/* PAGINATION */}
          <Pagination page={p} count={customer._count.invoices} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-aztecBlack-dark p-4 rounded-md text-white">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-white">
            <Link className="p-3 rounded-md bg-aztecBlue" href="/">
              Customer&apos;s Appointments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCustomerPage;
