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
      className="capitalize"
    >
      {selected && <option selected>{selected}</option>}
      {items &&
        items
          .filter((x) => x !== selected)
          .map((item: any, index: number) => (
            <option key={index}>
              {displayLabel ? displayLabel(item) : item}
            </option>
          ))}
    </select>
  );
}

export default Select;
