import { convertDatesToISO } from "@/lib/util";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldError } from "react-hook-form";

type DatePickerFieldProps = {
  label: string;
  name: string;
  control: any;
  defaultValue?: Date | null;
  error?: FieldError;
};

const DatePickerField = ({
  label,
  name,
  control,
  defaultValue,
  error,
}: DatePickerFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-400">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? new Date(defaultValue).toISOString() : ""}
        render={({ field }) => (
          <DatePicker
            name={name}
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              field.onChange(date ? date.toISOString() : "");
            }}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-aztecBlack-dark"
            showTimeSelect
            dateFormat="Pp"
            timeIntervals={30}
            placeholderText={`Select ${label}`}
            minTime={new Date(2025, 1, 0, 9, 0, 0)}
            maxTime={new Date(2025, 1, 0, 18, 0, 0)}
          />
        )}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default DatePickerField;
