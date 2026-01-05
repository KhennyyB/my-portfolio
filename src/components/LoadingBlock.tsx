const LoadingBlock = ({ label = "Loading…" }: { label?: string }) => (
  <div className="py-8 flex items-center justify-center text-muted-foreground">{label}</div>
);

export default LoadingBlock;