import { HTMLAttributes, InputHTMLAttributes } from "react";

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  children?: any;
  validate?: (data: any) => void;
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {}
