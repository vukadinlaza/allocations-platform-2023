'use client';
import { useEffect, useRef, useState } from 'react';
import Checkbox from './Checkbox';

type MultiSelectProps = {
  items: [] | any;
  onChange: (selected: string[]) => any;
  displayLabel?: (item: any) => string;
  selected?: string[];
};

export default function MultiSelect({
  items,
  onChange,
  selected
}: MultiSelectProps) {
  const componentRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState<Array<any>>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        // @ts-ignore
        !componentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

useEffect(() => {
  if (selected && selectedItems.length === 0) {
    let parsedSelected: any[];

    try {
      parsedSelected = Array.isArray(selected)
        ? selected
        : JSON.parse(selected);
      setSelectedItems(parsedSelected);
    } catch (error) {
      console.error('Error parsing selected:', error);
      return;
    }
  }
}, [selected, selectedItems]);

  useEffect(() => {
    if (selected !== selectedItems) {
      onChange(selectedItems);
    }
  }, [selectedItems]);

  return (
    <div className="relative w-full multiselect" ref={componentRef}>
      <div className="h-10 cursor-pointer input" onClick={() => setOpen(!open)}>
        <span className="capitalize">
          {!selectedItems.length && <>Select options</>}
          {selectedItems.length > 0 && (
            <span className="mr-1">{selectedItems[0]}</span>
          )}
          {selectedItems.length > 1 && (
            <span className="text-sm font-bold chip chip--small chip--info">
              +{selectedItems.length}
            </span>
          )}
        </span>
      </div>
      {open && (
        <div className="absolute z-50 flex flex-col bg-white border border-t-0 rounded input">
          {items &&
            items.map((item: any, index: number) => (
              <span className="capitalize" key={index}>
                <Checkbox
                  selected={selectedItems.includes(item)}
                  label={item}
                  onChange={() => {
                    if (selectedItems.includes(item)) {
                      // Item is already selected, remove it from the array
                      setSelectedItems(
                        selectedItems.filter(
                          (selectedItem) => selectedItem !== item
                        )
                      );
                    } else {
                      // Item is not selected, add it to the array
                      setSelectedItems([...selectedItems, item]);
                    }
                  }}
                />
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
