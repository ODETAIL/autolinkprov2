"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  title: z.string().min(3, { message: "Appointment title is required!" }),
  startTime: z.date({ message: "Start time is required!" }),
  endTime: z.date({ message: "End time is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  streetAddress1: z.string().min(1, { message: "Street Address is required!" }),
  notes: z.string(),
});

type Inputs = z.infer<typeof schema>;

const AppointmentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8 text-white" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new appointment</h1>
      <span className="text-xs text-gray-300 font-medium">
        Customer Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.streetAddress1}
          register={register}
          error={errors.streetAddress1}
        />
      </div>
      <span className="text-xs text-gray-300 font-medium">
        Appointment Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />
        <InputField
          label="Notes"
          name="notes"
          defaultValue={data?.notes}
          register={register}
          error={errors.notes}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-300">Start Time</label>
          <InputField
            label="Start Time"
            name="startTime"
            defaultValue={data?.startTime}
            register={register}
            error={errors.startTime}
            type="date"
          />
          <InputField
            label="End Time"
            name="endTime"
            defaultValue={data?.endTime}
            register={register}
            error={errors.endTime}
            type="date"
          />
          {errors.startTime?.message && errors.endTime?.message && (
            <p className="text-xs text-red-400">
              {errors.startTime.message.toString()}
              {errors.endTime.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-aztecBlue text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AppointmentForm;
