import { useEffect, useRef, useState } from "react";

export default function CountUp({ value, reduced }: { value: string; reduced: boolean }) {
  const element = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  useEffect(() => {
    if (reduced || !element.current) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (!entry.isIntersecting) { setCount(0); return; }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.max(0, Math.min(1, (now - start) / 1800));
        setCount(Math.floor(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .5 });
    observer.observe(element.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [target, reduced]);
  return <strong ref={element} aria-label={value} data-counter={value}>{reduced ? target : count}{suffix}</strong>;
}
