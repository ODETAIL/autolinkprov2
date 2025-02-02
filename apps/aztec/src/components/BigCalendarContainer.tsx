import { getAllAppointments } from "@/lib/queries/get/getQueries";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import { Appointment } from "@/types/schemaTypes";

const BigCalendarContainer = async () => {
  const dataRes = await getAllAppointments();

  const data =
    dataRes?.map((appointment: Appointment) => ({
      title: appointment.title,
      start: new Date(appointment.startTime),
      end: new Date(appointment.endTime),
    })) ?? [];

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
