import React from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  name: string;
  leftCurrency?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  onBlur,
  type = "text",
  className = "",
  name,
  leftCurrency,
}) => {
  return (
    <div
      className={`py-1 px-3 rounded-xl flex flex-col border border-gray-300 bg-[rgba(248, 249, 250, 1)] ${className}`}
    >
      <label className="text-[11px] font-medium text-gray-500">{label}</label>
      <div className="flex items-center justify-start w-full">
        {leftCurrency && <p className="font-bold">{leftCurrency}</p>}
        <input
          type={type}
          name={name}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full font-bold border-none outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default Input;
