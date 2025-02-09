import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/util";

const BigCalendarContainer = async () => {
  const dataRes = await prisma.appointment.findMany({
    include: {
      customer: true,
    },
  });

  const data = dataRes.map((appointment) => ({
    id: appointment.id,
    title: appointment.title,
    start: appointment.startTime,
    end: appointment.endTime,
    resource: appointment.customer,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="h-full">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
