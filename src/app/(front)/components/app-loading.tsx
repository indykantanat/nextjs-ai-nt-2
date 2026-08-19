export default function AppLoading() {
  return (
    <div
      role="status"
      aria-label="กำลังโหลด"
      className="flex items-center gap-3 border-3 border-foreground bg-sunken px-sp3 py-3"
    >
      <span className="size-3 animate-pulse bg-foreground" />
      <span className="rb-meta">LOADING&hellip;</span>
    </div>
  );
}
