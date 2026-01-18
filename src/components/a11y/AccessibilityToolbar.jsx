import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./a11y.css";
import useAccessibility from "../../hooks/useAccessibility.jsx";

export default function AccessibilityToolbar() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const {
    fontScale,
    bold,
    contrast,
    fontFamily,
    increase,
    decrease,
    reset,
    toggleBold,
    toggleContrast,
    changeFontFamily,
  } = useAccessibility();
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isDashboard && contrast) {
      toggleContrast();
    }
  }, [isDashboard, contrast, toggleContrast]);

  return (
    // Solo un contenedor principal
    <div className={`a11y-toolbar ${isOpen ? 'is-open' : 'is-closed'}`} role="group" aria-label="Controles de accesibilidad">
      
      {/* Botón para abrir/cerrar en móvil */}
      <button 
        type="button"
        className="a11y-toggle-mobile"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar menú" : "Abrir accesibilidad"}
      >
        {isOpen ? "✕" : "⚙️"}
      </button>

      {/* Contenedor de botones (Se oculta/muestra en móvil) */}
      <div className="a11y-content">
        <button type="button" className="a11y-btn" aria-label="Reducir texto" onClick={decrease}>
          A−
        </button>

        <button type="button" className="a11y-btn" aria-label="Aumentar texto" onClick={increase}>
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
        >
          <option value="default">Default</option>
          <option value="dyslexia">Dislexia</option>
          <option value="roboto">Roboto</option>
          <option value="georgia">Georgia</option>
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

        <button type="button" className="a11y-btn" aria-label="Restablecer" onClick={reset}>
          ↺
        </button>

        <span className="a11y-indicator" aria-hidden="true">
          {Math.round(fontScale * 100)}%
        </span>
      </div>
    </div>
  );
}
