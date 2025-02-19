import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./features/calendar/calendarSlice";
import customerReducer from "./features/customer/customerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      customers: customerReducer,
      calendar: calendarReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
