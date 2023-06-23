'use client';
function Select({
  items,
  onChange,
  displayLabel,
  selected,
  disabled = false,
  placeholder = 'Select an option'
}: {
  items: any[];
  onChange: (selected: string) => any;
  displayLabel?: (item: any) => any;
  selected?: any;
  disabled?: boolean;
  placeholder?: string;
}) {
  const handleSelectChange = (e: any) => {
    if (!items) return;
    onChange(e.target.value);
  };

  return (
    <select
      value={selected}
      onChange={handleSelectChange}
      className={`bg-white ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
    >
      {!selected && <option value="">{placeholder}</option>}
      {items &&
        items.map((item: any, index: number) => (
          <option key={index}>
            {displayLabel ? displayLabel(item) : item}
          </option>
        ))}
    </select>
  );
}

export default Select;
