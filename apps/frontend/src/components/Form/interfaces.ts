import { HTMLAttributes } from "react";

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  children?: any;
  validate?: (data: any) => void;
}