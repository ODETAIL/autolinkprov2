import { employeesTable, customersTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const UserCard = async ({ type }: { type: "employee" | "customer" }) => {
  // ✅ Correct model mapping for Drizzle ORM
  const modelMap: Record<typeof type, any> = {
    employee: employeesTable,
    customer: customersTable,
  };

  // ✅ Get count using Drizzle ORM (SQL COUNT)
  const [{ count }] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(modelMap[type]);

  return (
    <div className="rounded-2xl p-4 flex-1 min-w-[130px] bg-aztecBlack-dark">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-aztecBlue">
          2024/25
        </span>
        <FontAwesomeIcon icon={faEllipsis} className="text-white w-5" />
      </div>
      <h1 className="text-2xl font-semibold my-4 text-white">{count}</h1>
      <h2 className="capitalize text-sm font-medium text-white">{type}s</h2>
    </div>
  );
};

export default UserCard;
