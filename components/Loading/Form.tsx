export default function LoadingForm() {
  return (
    <div className="w-full h-full">
      {Array.from({ length: 6 }).map((x, i) => (
        <div key={i} className="w-full h-32 mb-6 loading" />
      ))}
    </div>
  );
}
