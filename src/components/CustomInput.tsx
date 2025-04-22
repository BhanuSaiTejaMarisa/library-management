import React from "react";

const CustomInput = ({ ...props }) => {
  return (
    <input
      className="mb-4 border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      {...props}
    />
  );
};

export default CustomInput;
