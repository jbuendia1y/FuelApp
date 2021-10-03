import { HTMLAttributes, InputHTMLAttributes } from "react";

export interface FormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children?: any;
  validate?: (data: any) => void;
}

export interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  validate?: (value: any) => void;
}
