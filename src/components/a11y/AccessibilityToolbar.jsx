import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./a11y.css";
import useAccessibility from "../../hooks/useAccessibility.jsx";

export default function AccessibilityToolbar() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const { fontScale, bold, contrast, fontFamily, increase, decrease, reset, toggleBold, toggleContrast, changeFontFamily } = useAccessibility();

  // Desactivar contraste cuando se sale del dashboard
  useEffect(() => {
    if (!isDashboard && contrast) {
      toggleContrast();
    }
  }, [isDashboard, contrast, toggleContrast]);

  return (
    <div className="a11y-toolbar" role="group" aria-label="Controles de accesibilidad">
      <button
        type="button"
        className="a11y-btn"
        aria-label="Reducir tamaño de texto"
        onClick={decrease}
      >
        A−
      </button>

      <button
        type="button"
        className="a11y-btn"
        aria-label="Aumentar tamaño de texto"
        onClick={increase}
      >
        A+
      </button>

      <button
        type="button"
        className={`a11y-btn ${bold ? "a11y-active" : ""}`}
        aria-label="Texto más grueso"
        aria-pressed={bold}
        onClick={toggleBold}
      >
        <span style={{ fontWeight: 800 }}>A</span>
      </button>

      <select
        className="a11y-select"
        aria-label="Cambiar tipografía"
        value={fontFamily}
        onChange={(e) => changeFontFamily(e.target.value)}
        title="Seleccionar tipografía"
      >
        <option value="default" title="Tipografía por defecto">Tf</option>
        <option value="dyslexia" title="OpenDyslexic (dislexia)">Dy</option>
        <option value="roboto" title="Roboto (sans-serif)">Rb</option>
        <option value="georgia" title="Georgia (serif)">Gg</option>
      </select>

      {isDashboard && (
        <button
          type="button"
          className={`a11y-btn ${contrast ? "a11y-active" : ""}`}
          aria-label="Contraste alto"
          aria-pressed={contrast}
          onClick={toggleContrast}
        >
          ◑
        </button>
      )}

      <button
        type="button"
        className="a11y-btn"
        aria-label="Restablecer tamaño de texto"
        onClick={reset}
      >
        ↺
      </button>

      <span className="a11y-indicator" aria-hidden="true" title="Escala actual">
        {Math.round(fontScale * 100)}%
      </span>
    </div>
  );
}
