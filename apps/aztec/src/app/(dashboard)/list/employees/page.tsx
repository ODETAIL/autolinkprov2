import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { eq, ilike, and, sql } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { companiesTable, employeesTable } from "@/db/schema";

const EmployeeListPage = async ({
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
      header: "Employee ID",
      accessor: "id",
      className: "hidden md:table-cell",
    },
    {
      header: "Role",
      accessor: "role",
      className: "hidden md:table-cell",
    },
    {
      header: "Company",
      accessor: "company",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: any) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.role}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.role}</td>
      <td className="hidden md:table-cell">{item.companyName}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/employees/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormContainer table="employee" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // Construct Drizzle query filter
  let query = and();

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query = and(query, ilike(employeesTable.name, `%${value}%`));
            break;
          case "companyId":
            query = and(query, eq(employeesTable.companyId, parseInt(value)));
            break;
          default:
            break;
        }
      }
    }
  }

  // Fetch employees with pagination
  const employees = await db
    .select({
      id: employeesTable.id,
      name: employeesTable.name,
      role: employeesTable.role,
      companyId: employeesTable.companyId,
      companyName: companiesTable.name,
    })
    .from(employeesTable)
    .leftJoin(companiesTable, eq(employeesTable.companyId, companiesTable.id))
    .where(query)
    .limit(ITEM_PER_PAGE)
    .offset(ITEM_PER_PAGE * (p - 1));

  // Get total count for pagination
  const [{ count }] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(employeesTable)
    .where(query);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Employees</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormContainer table="employee" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={employees} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default EmployeeListPage;
