import { Suspense } from "react";

export default function LazyComponent({
  children,
  ...rest
}: {
  children?: JSX.Element;
  key?: any;
}) {
  return (
    <Suspense fallback={() => <div>Loading ....</div>} {...rest}>
      {children}
    </Suspense>
  );
}
