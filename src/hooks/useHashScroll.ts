import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useHashScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // If no hash, scroll to top of page
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const id = location.hash.replace("#", "");
    let tries = 0;
    const maxTries = 20;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        // Small delay to ensure layout is done
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else if (tries < maxTries) {
        tries += 1;
        setTimeout(tryScroll, 100);
      }
    };

    // Give router time to render
    setTimeout(tryScroll, 0);
  }, [location]);
};
