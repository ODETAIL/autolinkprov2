"use client";

import {
  Calendar,
  EventProps,
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
import { updateAppointment } from "@/lib/actions/appointment";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormModal from "./FormModal";
import { EventType } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { updateEvent } from "@/lib/features/calendar/calendarSlice";
import { convertDatesToISO, convertRawToDates } from "@/lib/util";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [availableViews, setAvailableViews] = useState<View[]>([
    "day",
    "agenda",
    "work_week",
  ]);

  const [currentDate, setCurrentDate] = useState(moment().toDate());
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [openEventModal, setOpenEventModal] = useState(false);
  const router = useRouter();
  const [updated, setUpdated] = useState({
    success: false,
    error: false,
  });

  const rawEvents = useAppSelector((state: RootState) => state.calendar.events);
  const dispatch = useAppDispatch();
  const events = convertRawToDates(rawEvents);

  // Checks and resizes calendar for mobile
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

  // Re-renders page for calendar updates
  useEffect(() => {
    if (updated.success) {
      toast(`Appointment has been updated!`);
      router.refresh();
    }
  }, [router, updated.success]);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const handleOnEventDrop = async (
    droppedEvent: EventInteractionArgs<object>
  ) => {
    const { event, start, end } = droppedEvent;
    const appointment = event as EventType;
    const newStart = new Date(start as stringOrDate);
    const newEnd = new Date(end as stringOrDate);

    if (appointment.resource.customer) {
      const updatedEvent = {
        id: appointment.id,
        firstName: appointment.resource.customer.firstName,
        lastName: appointment.resource.customer.lastName,
        email: appointment.resource.customer.email,
        title: appointment.title,
        startTime: newStart,
        endTime: newEnd,
        phone: appointment.resource.customer.phone,
        streetAddress1: appointment.resource.customer.streetAddress1,
        description: appointment.description,
        services: appointment.resource.services,
      };

      try {
        const updatedState = await updateAppointment(
          updated,
          updatedEvent as any
        );
        setUpdated(updatedState);
        const convertedDatesToISO = convertDatesToISO(event);
        dispatch(updateEvent(convertedDatesToISO));
      } catch (error) {
        setUpdated({ success: false, error: true });
        console.error("Failed to update event:", error);
      }
    }
  };

  const handleOnSelect = async (
    event: object,
    e: SyntheticEvent<HTMLElement, Event>
  ) => {
    const appointment = event as EventType;
    setSelectedEvent(appointment);
    setOpenEventModal(true);
  };

  const handleOnNavigate = (
    newDate: Date,
    view: View,
    action: NavigateAction
  ) => {
    setCurrentDate(newDate);
  };

  return (
    <>
      <DnDCalendar
        localizer={localizer}
        events={events}
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
        components={{
          agenda: {
            event: ({ event }: EventProps<object>) => {
              const typedEvent = event as EventType;
              return (
                <span className="space-y-2 cursor-pointer">
                  <h3 className="text-aztecBlue font-bold text-lg">
                    {typedEvent.title}
                  </h3>
                  {typedEvent.description && (
                    <p className="text-xs">{typedEvent.description}</p>
                  )}
                </span>
              );
            },
          },
        }}
      />
      {openEventModal && selectedEvent && (
        <FormModal
          table="appointment"
          type={{ label: "update", icon: null }}
          data={selectedEvent}
          id={selectedEvent.id}
          openEventModal={openEventModal}
          setOpenEventModal={setOpenEventModal}
        />
      )}
    </>
  );
};

export default BigCalendar;
