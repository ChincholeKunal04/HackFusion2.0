import React from "react";

const Input = ({
  label,
  error,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || Math.random().toString(36).substring(2, 9);

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          block w-full
          rounded-md
          border border-gray-300
          focus:border-blue-500
          focus:ring focus:ring-blue-100
          px-3 py-2
          text-gray-900 placeholder-gray-400
          shadow-sm
          ${error ? "border-red-500" : ""}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
