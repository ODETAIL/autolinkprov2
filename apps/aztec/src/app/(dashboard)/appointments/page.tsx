import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";

const AppointmentPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-aztecBlack-dark p-4 rounded-md">
          <h1 className="text-xl font-semibold text-white">Appointments</h1>
          <BigCalendarContainer searchParams={searchParams} />
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
