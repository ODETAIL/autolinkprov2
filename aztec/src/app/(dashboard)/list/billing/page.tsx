import FormModal from "@/components/FormModal";
// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { auth } from "@clerk/nextjs/server";
import { faFilter, faPlus, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;

// const columns = [
//   {
//     header: "Title",
//     accessor: "title",
//   },
//   {
//     header: "Class",
//     accessor: "class",
//   },
//   {
//     header: "Date",
//     accessor: "date",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Start Time",
//     accessor: "startTime",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "End Time",
//     accessor: "endTime",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Actions",
//     accessor: "action",
//   },
// ];

const BillingListPage = () => {
  // const renderRow = (item: Event) => (
  //   <tr
  //     key={item.id}
  //     className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  //   >
  //     <td className="flex items-center gap-4 p-4">{item.title}</td>
  //     <td>{item.class}</td>
  //     <td className="hidden md:table-cell">{item.date}</td>
  //     <td className="hidden md:table-cell">{item.startTime}</td>
  //     <td className="hidden md:table-cell">{item.endTime}</td>
  //     <td>
  //       <div className="flex items-center gap-2">
  //         {role === "admin" && (
  //           <>
  //             <FormModal table="event" type="update" data={item} />
  //             <FormModal table="event" type="delete" id={item.id} />
  //           </>
  //         )}
  //       </div>
  //     </td>
  //   </tr>
  // );

  return (
    <div className="bg-aztecBlack-dark p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-white">
          All Billings
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
                table="billing"
                type={{ label: "create", icon: faPlus }}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      {/* <Table columns={columns} renderRow={renderRow} data={data} /> */}
      {/* PAGINATION */}
      {/* <Pagination page={p} count={count} /> */}
    </div>
  );
};

export default BillingListPage;
