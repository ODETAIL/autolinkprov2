import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = searchParams;
  return (
    <div className="bg-aztecBlack-dark p-4 rounded-md">
      <EventCalendar />
      <div className="flex items-center justify-between text-white">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <FontAwesomeIcon icon={faEllipsis} className="w-5" />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
