import { colors } from "@/constants";
import styled from "@emotion/styled";

const Button = styled.button`
  border: 1px solid transparent;
  border-radius: 5px;

  padding: 7px 15px;
  box-sizing: border-box;

  background-color: ${colors.primary};
  color: inherit;
  box-shadow: 0 0 5px #00000057;

  font-size: 1rem;

  cursor: pointer;

  &:hover {
    transition: filter 0.25s ease;
    filter: brightness(0.8);
  }

  &:active {
    transition: transform 0.3s ease;
    transform: scale(1.08);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.7;
  }

  a {
    text-decoration: none;
  }
`;

export default Button;
