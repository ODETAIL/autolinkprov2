import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { adjustScheduleToCurrentWeek } from "@/lib/util";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AppointmentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const dataRes = await prisma.appointment.findMany({
    include: {
      customer: true,
      services: true,
    },
  });

  const data = dataRes.map((appointment) => ({
    id: appointment.id,
    title: appointment.title,
    start: appointment.startTime,
    end: appointment.endTime,
    description: appointment.description,
    resource: {
      customer: appointment.customer,
      services: appointment.services,
    },
  }));
  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full">
        <div className="h-full bg-aztecBlack-dark px-4 pt-4 pb-8 rounded-md">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-semibold text-white">Appointments</h1>
            <FormModal
              table="appointment"
              type={{ label: "create", icon: faPlus }}
            />
          </div>

          <BigCalendarContainer data={schedule} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
      </div>
    </div>
  );
};

export default AppointmentPage;
