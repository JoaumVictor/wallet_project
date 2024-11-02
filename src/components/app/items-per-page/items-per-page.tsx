interface SelectProps {
  value: number;
  onChange: (value: number) => void;
}

export function ItemsPerPageSelect({ value, onChange }: SelectProps) {
  const options = [5, 10, 15, 20];

  return (
    <div className="flex items-center gap-2">
      <select
        id="itemsPerPage"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="p-2 text-sm border rounded-lg outline-none bg-slate-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
