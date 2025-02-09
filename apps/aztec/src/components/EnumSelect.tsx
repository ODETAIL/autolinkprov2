import React from "react";

interface EnumSelectProps<T extends Record<string, string>> {
  label: string;
  enumObject: T;
  register: any;
  name: string;
  errors?: any;
  defaultValue?: string;
}

const EnumSelect = <T extends Record<string, string>>({
  label,
  enumObject,
  register,
  name,
  errors,
  defaultValue,
}: EnumSelectProps<T>) => {
  const options = Object.values(enumObject);

  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-400">{label}</label>
      <select
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-aztecBlack-dark cursor-pointer"
        {...register(name)}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors?.[name]?.message && (
        <p className="text-xs text-red-400">
          {errors[name].message.toString()}
        </p>
      )}
    </div>
  );
};

export default EnumSelect;
