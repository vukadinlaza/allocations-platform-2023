type SelectProps<T> = {
  items: T[] | null | undefined;
  onChange: (selected: string) => any;
  displayLabel?: (item: any) => string;
  selected?: any;
};

function Select<T>({
  items,
  onChange,
  displayLabel,
  selected
}: SelectProps<T>) {
  const handleSelectChange = (e: any) => {
    if (!items) return;
    onChange(e.target.value);
  };

  return (
    <select
      value={selected}
      onChange={handleSelectChange}
      className="capitalize bg-white"
    >
      {!selected && <option>Select an option</option>}
      {items &&
        items.map((item: any, index: number) => (
          <option key={index} value={item}>
            {displayLabel ? displayLabel(item) : item}
          </option>
        ))}
    </select>
  );
}

export default Select;
