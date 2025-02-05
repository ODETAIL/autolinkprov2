import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import {
  faEye,
  faFilter,
  faPlus,
  faSort,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Employee = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  role: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Name",
    accessor: "name",
    className: "hidden md:table-cell",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Role",
    accessor: "role",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const EmployeeListPage = () => {
  const renderRow = (item: Employee) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-aztecBlack-light text-sm hover:bg-aztecBlue"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold text-white">{item.name}</h3>
          <p className="text-xs text-gray-400">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell text-white">{item.name}</td>
      <td className="hidden md:table-cell text-white">{item.email}</td>
      <td className="hidden md:table-cell text-white">{item.phone}</td>
      <td className="hidden md:table-cell text-white">{item.role}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/employees/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-aztecBlue">
              <FontAwesomeIcon icon={faEye} className="text-white w-5" />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal
              table="employee"
              type={{ label: "delete", icon: faTrashCan }}
              id={item.id}
            />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-aztecBlack-dark p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-white">
          All Employees
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
                table="employee"
                type={{ label: "create", icon: faPlus }}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default EmployeeListPage;
