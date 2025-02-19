import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventType } from "@/lib/types";

interface CalendarState {
  events: EventType[];
}

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EventType[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<EventType>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<EventType>) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) state.events[index] = action.payload;
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, updateEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
