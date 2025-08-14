import React from 'react';

const Select = ({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || Math.random().toString(36).substring(2, 9);

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`
          block w-full
          rounded-md
          border border-gray-300
          focus:border-blue-500
          focus:ring focus:ring-blue-100
          px-3 py-2
          text-gray-900
          shadow-sm
          sm:text-sm
          ${error ? 'border-red-500' : ''}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
