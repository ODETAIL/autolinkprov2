"use client";

import {
  Calendar,
  momentLocalizer,
  NavigateAction,
  stringOrDate,
  View,
  Views,
} from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { Customer } from "@prisma/client";

type EventType = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: Customer | null;
};

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const BigCalendar = ({ data }: { data: EventType[] }) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [availableViews, setAvailableViews] = useState<View[]>([
    "day",
    "agenda",
    "work_week",
  ]);
  const [currentDate, setCurrentDate] = useState(moment().toDate());
  const [events, setEvents] = useState<EventType[]>(data);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setView(Views.AGENDA);
        setAvailableViews([Views.AGENDA]);
      } else {
        setAvailableViews(["day", "agenda", "work_week"]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const handleOnEventDrop = async (
    droppedEvent: EventInteractionArgs<object>
  ) => {
    const { event, start, end } = droppedEvent;
    const newStart = new Date(start as stringOrDate);
    const newEnd = new Date(end as stringOrDate);

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === (event as any).id ? { ...e, start: newStart, end: newEnd } : e
      )
    );
  };

  const handleOnSelect = async (
    event: object,
    e: SyntheticEvent<HTMLElement, Event>
  ) => {
    console.log(event);
  };

  const handleOnNavigate = (
    newDate: Date,
    view: View,
    action: NavigateAction
  ) => {
    setCurrentDate(newDate);
  };

  return (
    <DnDCalendar
      localizer={localizer}
      events={data}
      date={currentDate}
      defaultView="day"
      defaultDate={moment().toDate()}
      views={availableViews}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      onEventDrop={handleOnEventDrop}
      onSelectEvent={handleOnSelect}
      onNavigate={handleOnNavigate}
      min={new Date(2025, 1, 0, 9, 0, 0)}
      max={new Date(2025, 1, 0, 18, 0, 0)}
    />
  );
};

export default BigCalendar;
