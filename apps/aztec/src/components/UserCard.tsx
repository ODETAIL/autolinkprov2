import prisma from "@/lib/prisma";
import { getCurrentMonthRange } from "@/lib/util";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const UserCard = async ({
  type,
}: {
  type: "employee" | "customer" | "appointment" | "revenue";
}) => {
  const { startDate, endDate } = getCurrentMonthRange(); // Use helper
  const modelMap: Record<typeof type, any> = {
    employee: prisma.employee,
    customer: prisma.customer,
    appointment: prisma.appointment,
    revenue: prisma.revenue,
  };

  // Handle revenue aggregation separately
  let count;
  if (type === "revenue") {
    const data = await modelMap[type]?.aggregate({
      _sum: { total: true },
      where: { createdAt: { gte: startDate, lte: endDate } },
    });
    count = data._sum.total || 0; // Extract value safely
  } else {
    count = await modelMap[type]?.count({
      where: { createdAt: { gte: startDate, lte: endDate } },
    });
  }
  return (
    <div className="rounded-2xl bg-aztecBlack-dark p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-aztecBlue">
          {moment().format("YYYY/MM")}
        </span>
        <FontAwesomeIcon icon={faEllipsis} className="text-white w-5" />
      </div>
      <h1
        className={`text-2xl font-semibold my-4 ${type === "revenue" ? "text-aztecGreen" : "text-white"}`}
      >
        {type === "revenue" ? `$ ${count}` : count}
      </h1>
      <h2 className="capitalize text-sm font-medium text-gray-200">
        {type === "revenue" ? `${type}` : `${type}s`}
      </h2>
    </div>
  );
};

export default UserCard;
