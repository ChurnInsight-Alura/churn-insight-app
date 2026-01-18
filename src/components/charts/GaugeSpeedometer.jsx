export function GaugeSpeedometer({ value = 0, threshold = 0, title = "Métrica" }) {
  // Normalizar valor entre -1 y 1 para el velocímetro
  const normalizedValue = Math.max(-1, Math.min(1, value));
  // Convertir a grados (180 grados de arco: -90 a 90)
  const angle = normalizedValue * 90;

  // Determinar color de la aguja
  const needleColor = value < threshold ? '#7a1c00' : '#007789';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">{title}</h3>
      
      <div className="relative w-48 h-32 mb-4">
        {/* SVG Speedometer */}
        <svg viewBox="0 0 200 140" className="w-full h-full">
          {/* Arco de fondo */}
          <path
            d="M 50 120 A 70 70 0 0 1 150 120"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Arco de zona crítica (rojo) - izquierda */}
          <path
            d="M 50 120 A 70 70 0 0 1 75 65"
            stroke="#7a1c00"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Arco de zona normal (azul) - derecha */}
          <path
            d="M 125 65 A 70 70 0 0 1 150 120"
            stroke="#007789"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Línea central */}
          <line x1="100" y1="120" x2="100" y2="60" stroke="#d1d5db" strokeWidth="1" />

          {/* Marcas de escala */}
          {[-1, -0.5, 0, 0.5, 1].map((mark, idx) => {
            const markAngle = mark * 90;
            const rad = (markAngle * Math.PI) / 180;
            const x1 = 100 + 65 * Math.cos(rad + Math.PI / 2);
            const y1 = 120 + 65 * Math.sin(rad + Math.PI / 2);
            const x2 = 100 + 72 * Math.cos(rad + Math.PI / 2);
            const y2 = 120 + 72 * Math.sin(rad + Math.PI / 2);

            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#9ca3af"
                strokeWidth="1"
              />
            );
          })}

          {/* Aguja */}
          <g transform={`rotate(${angle} 100 120)`}>
            <line
              x1="100"
              y1="120"
              x2="100"
              y2="50"
              stroke={needleColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="120" r="4" fill={needleColor} />
          </g>

          {/* Centro */}
          <circle cx="100" cy="120" r="6" fill="#374151" />
        </svg>
      </div>

      {/* Valor y umbral */}
      <div className="text-center mt-2">
        <p className="text-3xl text-gray-900 speedometer-value">{value.toFixed(3)}</p>
        <p className="text-sm text-gray-600 mt-1 speedometer-label">Umbral: <span className="speedometer-threshold">{threshold.toFixed(3)}</span></p>
        <p className={`text-xs font-semibold mt-2 ${value < threshold ? 'text-red-600' : 'text-green-600'}`}>
          {value < threshold ? '⚠️ Crítico' : '✓ Normal'}
        </p>
      </div>
    </div>
  );
}
