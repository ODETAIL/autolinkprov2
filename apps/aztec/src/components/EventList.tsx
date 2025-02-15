import prisma from "@/lib/prisma";
import { createDateAsUTC } from "@/lib/util";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.appointment.findMany({
    where: {
      startTime: {
        gte: createDateAsUTC(new Date(date.setHours(0, 0, 0, 0))),
        lte: createDateAsUTC(new Date(date.setHours(23, 59, 59, 999))),
      },
    },
  });

  return data.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-400 border-t-4 border-t-aztecBlue cursor-pointer"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-white">{event.title}</h1>
        <span className="text-gray-200 text-xs">
          {event.startTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-300 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;
