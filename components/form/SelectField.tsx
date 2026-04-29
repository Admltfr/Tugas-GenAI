"use client";

import type { SelectFieldProps } from "@/types";

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-no-repeat bg-right ${
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 bg-white hover:border-gray-400"
        } ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundPosition: "right 8px center",
          backgroundSize: "20px",
          paddingRight: "36px",
        }}
      >
        <option value="">-- Pilih {label.toLowerCase()} --</option>
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
