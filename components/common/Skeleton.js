import React from "react";

const Skeleton = ({ count, children }) => {
  const arr = Array(count).fill("_");

  return (
    <>
      {arr.map((item, index) =>
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index });
          }

          return child;
        })
      )}
    </>
  );
};

const Items = ({ index, children, className }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { index });
        }

        return child;
      })}
    </div>
  );
};

export const Item = ({
  index,
  height,
  width,
  animated,
  className,
  children,
}) => (
  <div
    key={index}
    className={` ${height} ${width} ${
      animated === "background"
        ? "animate-pulse bg-red-200"
        : animated === "border"
        ? "animate-pulse border-2 border-red-200"
        : "bg-white"
    } rounded-md  ${className}`}
  >
    {children}
  </div>
);

const _default = Object.assign(Skeleton, {
  Skeleton,
  Items,
  Item,
});

export default _default;
