import { Spin } from "antd";
import React, { ComponentType, Suspense } from "react";

const Loadable = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Spin />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
