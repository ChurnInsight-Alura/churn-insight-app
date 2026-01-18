import { useCallback, useEffect, useState } from "react";

const KEY_SCALE = "a11y:fontScale";
const KEY_BOLD = "a11y:bold";
const KEY_CONTRAST = "a11y:contrast";
const KEY_FONT_FAMILY = "a11y:fontFamily";

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
  const [fontFamily, setFontFamily] = useState(() => read(KEY_FONT_FAMILY, "default"));

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

  useEffect(() => {
    document.documentElement.style.setProperty("--font-family", 
      fontFamily === "default" ? "system-ui, -apple-system, sans-serif" :
      fontFamily === "dyslexia" ? "'OpenDyslexic', system-ui, sans-serif" :
      fontFamily === "roboto" ? "'Roboto', system-ui, sans-serif" :
      fontFamily === "georgia" ? "'Georgia', serif" :
      "system-ui, -apple-system, sans-serif"
    );
    try { localStorage.setItem(KEY_FONT_FAMILY, JSON.stringify(fontFamily)); } catch {}
  }, [fontFamily]);

  const increase = useCallback(() => {
    setFontScale((s) => Math.min(1.6, Math.round((s + 0.1) * 10) / 10));
  }, []);

  const decrease = useCallback(() => {
    setFontScale((s) => Math.max(0.8, Math.round((s - 0.1) * 10) / 10));
  }, []);

  const reset = useCallback(() => setFontScale(1), []);

  const toggleBold = useCallback(() => setBold((b) => !b), []);
  const toggleContrast = useCallback(() => setContrast((c) => !c), []);
  const changeFontFamily = useCallback((newFamily) => setFontFamily(newFamily), []);

  return { fontScale, bold, contrast, fontFamily, increase, decrease, reset, toggleBold, toggleContrast, changeFontFamily };
}
