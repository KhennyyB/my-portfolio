import { useEffect, useRef } from "react";

export default function FooterEyes({ reduced }: { reduced: boolean }) {
  const eyes = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reduced) return;
    const pupils = eyes.current?.querySelectorAll<HTMLElement>(".pe-pupil");
    const follow = (event: PointerEvent) => pupils?.forEach(pupil => {
      const rect = pupil.parentElement!.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      const distance = Math.min(Math.hypot(dx, dy) / 10, Math.min(rect.width, rect.height) * .25);
      const angle = Math.atan2(dy, dx);
      pupil.style.translate = `${Math.cos(angle) * distance}px ${Math.sin(angle) * distance}px`;
    });
    const reset = () => pupils?.forEach(pupil => { pupil.style.translate = "0px 0px"; });
    window.addEventListener("pointermove", follow, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => { window.removeEventListener("pointermove", follow); document.documentElement.removeEventListener("pointerleave", reset); reset(); };
  }, [reduced]);
  return <span className="pe-footer-eyes" ref={eyes} aria-hidden="true">{[0, 1].map(eye => <span className="pe-eye" key={eye}><span className="pe-pupil"><i /></span></span>)}</span>;
}
