"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const handleOnEventDrop = (droppedEvent: EventInteractionArgs<object>) => {
    console.log(droppedEvent);
  };

  return (
    <DnDCalendar
      localizer={localizer}
      events={calendarEvents}
      defaultView="day"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      onEventDrop={handleOnEventDrop}
      min={new Date(2025, 1, 0, 9, 0, 0)}
      max={new Date(2025, 1, 0, 18, 0, 0)}
    />
  );
};

export default BigCalendar;
