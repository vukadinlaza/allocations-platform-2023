export default function Nav({
  items,
  active,
  setActive
}: {
  items?: any;
  active?: any;
  setActive: (v: any) => any;
}) {
  return (
    <div className="flex items-center justify-start overflow-auto">
      {items &&
        items.map((item: any, index: number) => (
          <div
            key={index}
            className={`header--menu--item whitespace-nowrap ${
              active === item ? 'active' : 'inactive'
            }`}
            onClick={() => setActive(item)}
          >
            <span>{item}</span>
          </div>
        ))}
    </div>
  );
}
