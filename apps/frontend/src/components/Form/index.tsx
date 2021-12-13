import "./form.scss";
import { HTMLAttributes, LabelHTMLAttributes } from "react";
import { FormInputProps, FormProps } from "./interfaces";

export default function Form({
  children,
  validate,
  className,
  ...rest
}: FormProps) {
  return (
    <form
      onSubmit={(e) => {
        if (!validate) return;
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data: any = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });

        return validate(data);
      }}
      className={`form${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </form>
  );
}

export function FormField({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`form-field${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

export function FormLabel({
  children,
  className,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`form-label${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </label>
  );
}

export function FormInput({ className, ...rest }: FormInputProps) {
  return (
    <input
      className={`form-input${className ? ` ${className}` : ""}`}
      {...rest}
    />
  );
}
