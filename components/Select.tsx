import React from 'react';

type SelectProps<T> = {
  items: T[] | null | undefined;
  onChange: (selected: T) => void;
  displayLabel: (item: any) => string;
};

function Select<T>({ items, onChange, displayLabel }: SelectProps<T>) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!items) return;
    const selectedIndex = e.target.selectedIndex;
    const selected = items[selectedIndex - 1]; // subtract 1 to account for the default option
    onChange(selected);
  };

  return (
    <select onChange={handleSelectChange}>
      <option disabled selected hidden>
        Select an option
      </option>
      {items &&
        items.map((item: any, index: number) => (
          <option key={index}>{displayLabel(item)}</option>
        ))}
    </select>
  );
}

export default Select;
