import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { formatDate } from "@/lib/util";
import { auth } from "@clerk/nextjs/server";
import {
  faEye,
  faFilter,
  faPlus,
  faSort,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Customer, Prisma } from "@prisma/client";
import Link from "next/link";

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
    className: "hidden md:table-cell",
  },
  {
    header: "Last Visit",
    accessor: "lastVisit",
    className: "hidden lg:table-cell",
  },
  {
    header: "Total Visits",
    accessor: "returnCounter",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: Customer) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-aztecBlack-light text-sm text-white hover:bg-aztecBlue"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">
          {item.firstName} {item.lastName}
        </h3>
        <p className="text-xs text-gray-400">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{formatDate(item.lastVisit)}</td>
    <td className="hidden md:table-cell">{item.returnCounter}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/customers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-aztecGreen">
            <FontAwesomeIcon icon={faEye} className="text-white w-5" />
          </button>
        </Link>
        {role === "admin" && (
          <FormModal
            table="customer"
            type={{ label: "delete", icon: faTrashCan }}
            id={item.id}
          />
        )}
      </div>
    </td>
  </tr>
);

const CustomerListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.CustomerWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.firstName = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.customer.findMany({
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.customer.count({ where: query }),
  ]);

  return (
    <div className="bg-aztecBlack-dark p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-white">
          All Customers
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-aztecBlack-light">
              <FontAwesomeIcon icon={faFilter} className="text-white w-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-aztecBlack-light">
              <FontAwesomeIcon icon={faSort} className="text-white w-5" />
            </button>
            {role === "admin" && (
              <FormModal
                table="customer"
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

export default CustomerListPage;
