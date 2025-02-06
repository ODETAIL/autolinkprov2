import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/util";

const BigCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const dataRes = await prisma.appointment.findMany();

  const data = dataRes.map((appointment) => ({
    title: appointment.title,
    start: appointment.startTime,
    end: appointment.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="h-full">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
