import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-400">{label}</label>
      {type === "textarea" ? (
        <textarea
          {...register(name)}
          defaultValue={defaultValue}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-aztecBlack-dark h-10 lg:h-24 resize-none"
          {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          type={type}
          {...register(name)}
          defaultValue={defaultValue}
          className={`${type !== "checkbox" && "ring-[1.5px]"} ring-gray-300 p-2 rounded-md text-sm w-full bg-aztecBlack-dark`}
          {...inputProps}
        />
      )}

      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
