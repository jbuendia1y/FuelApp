import { SVGProps } from "react";

export default function ShowMoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
      <path d="M24 24H0V0h24v24z" fill="none" opacity={0.87} />
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
    </svg>
  );
}
