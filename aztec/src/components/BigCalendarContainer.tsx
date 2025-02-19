"use client";

import { EventType } from "@/lib/types";
import BigCalendar from "./BigCalender";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { setEvents } from "@/lib/features/calendar/calendarSlice";
import { convertDatesToISO } from "@/lib/util";

const BigCalendarContainer = ({ data }: { data: EventType[] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data.length > 0) {
      const formattedData = convertDatesToISO(data);
      dispatch(setEvents(formattedData));
    }
  }, [dispatch, data]);

  return (
    <div className="h-full">
      <BigCalendar />
    </div>
  );
};

export default BigCalendarContainer;
