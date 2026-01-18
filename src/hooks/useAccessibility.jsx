import { useCallback, useEffect, useState } from "react";

const KEYS = {
  SCALE: "a11y:fontScale",
  BOLD: "a11y:bold",
  CONTRAST: "a11y:contrast",
  FONT: "a11y:fontFamily",
};

const FONTS = {
  default: "system-ui, -apple-system, sans-serif",
  dyslexia: "'OpenDyslexic', system-ui, sans-serif",
  roboto: "'Roboto', system-ui, sans-serif",
  georgia: "Georgia, serif",
};

function read(key, def) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : def;
  } catch { return def; }
}

export default function useAccessibility() {
  const [fontScale, setFontScale] = useState(() => read(KEYS.SCALE, 1));
  const [bold, setBold] = useState(() => read(KEYS.BOLD, false));
  const [contrast, setContrast] = useState(() => read(KEYS.CONTRAST, false));
  const [fontFamily, setFontFamily] = useState(() => read(KEYS.FONT, "default"));

  // Sincronizar cambios entre pestañas
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === KEYS.SCALE) setFontScale(JSON.parse(e.newValue));
      if (e.key === KEYS.BOLD) setBold(JSON.parse(e.newValue));
      if (e.key === KEYS.CONTRAST) setContrast(JSON.parse(e.newValue));
      if (e.key === KEYS.FONT) setFontFamily(JSON.parse(e.newValue));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Efecto Maestro: Aplica cambios al DOM y guarda en Storage
 useEffect(() => {
    const root = document.documentElement;
    const body = document.body; // <--- Referencia al body
    
   
    root.style.setProperty("--font-scale", String(fontScale));
    root.style.setProperty("--font-family", FONTS[fontFamily] || FONTS.default);
    
    // CLASES (Vuelven al body para que tu CSS funcione)
    body.classList.toggle("a11y-bold", bold);
    body.classList.toggle("a11y-contrast", contrast);

    // Persistencia
    localStorage.setItem(KEYS.SCALE, JSON.stringify(fontScale));
    localStorage.setItem(KEYS.BOLD, JSON.stringify(bold));
    localStorage.setItem(KEYS.CONTRAST, JSON.stringify(contrast));
    localStorage.setItem(KEYS.FONT, JSON.stringify(fontFamily));
  }, [fontScale, bold, contrast, fontFamily]);

  const increase = useCallback(() => setFontScale(s => Math.min(1.6, +(s + 0.1).toFixed(1))), []);
  const decrease = useCallback(() => setFontScale(s => Math.max(0.8, +(s - 0.1).toFixed(1))), []);
  const reset = useCallback(() => {
      setFontScale(1);
      setBold(false);
      setContrast(false);
      setFontFamily("default");
  }, []);

  return { 
    fontScale, bold, contrast, fontFamily, 
    increase, decrease, reset, 
    toggleBold: useCallback(() => setBold(b => !b), []),
    toggleContrast: useCallback(() => setContrast(c => !c), []),
    changeFontFamily: useCallback((val) => setFontFamily(val), [])
  };
}