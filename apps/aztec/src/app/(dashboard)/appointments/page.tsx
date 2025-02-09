import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FormModal from "@/components/FormModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AppointmentPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
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

          <BigCalendarContainer />
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
