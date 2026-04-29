"use client";

import type { FormFieldProps } from "@/types";

export const InputField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-slate-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? "border-red-500 bg-red-50 dark:bg-red-950/30"
            : "border-gray-300 bg-white hover:border-gray-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500"
        } ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500" : ""}`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
