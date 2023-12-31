export default function List() {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {Array.from({ length: 6 }).map((x, i) => (
        <div key={i} className="w-full h-10 gap-4">
          <div className="w-full h-full rounded-xl loading"></div>
        </div>
      ))}
    </div>
  );
}
