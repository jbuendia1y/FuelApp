import { FormProps } from "./interfaces";
import styled from "@emotion/styled";

export const FormField = styled.div((props) => {
  return `
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input,
  select {
    display: block;
    width: 100%;

    outline: none;
    background-color: white;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    font-size: 1em;

    padding: 5px;
    box-sizing: border-box;

    &:focus {
      border: 1px solid #dfdfdf;
      outline: 1.5px solid #dfdfdf;
    }
  }
`;
});

export const SymbolPrice = styled.span`
  position: relative;
  input {
    padding-left: 30px;
  }

  &::before {
    position: absolute;
    display: block;
    content: "S/";
    top: 5px;
    left: 10px;
    width: 20px;
    height: 20px;
    z-index: 10;
    font-size: 1em;
  }
`;

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
      {...rest}
    >
      {children}
    </form>
  );
}
