import { useCallback, useEffect, useState } from "react";

const KEY_SCALE = "a11y:fontScale";
const KEY_BOLD = "a11y:bold";
const KEY_CONTRAST = "a11y:contrast";

function read(key, def) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : def;
  } catch {
    return def;
  }
}

export default function useAccessibility() {
  const [fontScale, setFontScale] = useState(() => read(KEY_SCALE, 1));
  const [bold, setBold] = useState(() => read(KEY_BOLD, false));
  const [contrast, setContrast] = useState(() => read(KEY_CONTRAST, false));

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
    try { localStorage.setItem(KEY_SCALE, JSON.stringify(fontScale)); } catch {}
  }, [fontScale]);

  useEffect(() => {
    document.body.classList.toggle("a11y-bold", !!bold);
    try { localStorage.setItem(KEY_BOLD, JSON.stringify(bold)); } catch {}
  }, [bold]);

  useEffect(() => {
    document.body.classList.toggle("a11y-contrast", !!contrast);
    try { localStorage.setItem(KEY_CONTRAST, JSON.stringify(contrast)); } catch {}
  }, [contrast]);

  const increase = useCallback(() => {
    setFontScale((s) => Math.min(1.6, Math.round((s + 0.1) * 10) / 10));
  }, []);

  const decrease = useCallback(() => {
    setFontScale((s) => Math.max(0.8, Math.round((s - 0.1) * 10) / 10));
  }, []);

  const reset = useCallback(() => setFontScale(1), []);

  const toggleBold = useCallback(() => setBold((b) => !b), []);
  const toggleContrast = useCallback(() => setContrast((c) => !c), []);

  return { fontScale, bold, contrast, increase, decrease, reset, toggleBold, toggleContrast };
}
