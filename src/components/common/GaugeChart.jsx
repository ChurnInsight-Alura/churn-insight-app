"use client"

export function GaugeChart({ title, value, threshold }) {
  const normalizedValue = Math.max(-1, Math.min(1, value))
  const angle = normalizedValue * 90

  const needleLength = 70
  const needleX = 100 + needleLength * Math.sin((angle * Math.PI) / 180)
  const needleY = 100 - needleLength * Math.cos((angle * Math.PI) / 180)

  const isInDangerZone = value <= threshold

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 text-center whitespace-pre-line">{title.replace(/\\n/g, "\n")}</h3>

      <div className="flex flex-col items-center">
        <svg viewBox="0 0 200 120" className="w-full max-w-sm">
          {/* Arco base (seguro) */}
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="#007789"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Zona de peligro (roja) si el threshold es negativo */}
          {threshold < 0 && (
            <path
              d={`M 30 100 A 70 70 0 0 1 ${100 + 70 * Math.sin((threshold * 90 * Math.PI) / 180)} ${
                100 - 70 * Math.cos((threshold * 90 * Math.PI) / 180)
              }`}
              fill="none"
              stroke="#7a1c00"
              strokeWidth="20"
              strokeLinecap="round"
            />
          )}

          {/* Marca del threshold */}
          <line
            x1={100 + 65 * Math.sin((threshold * 90 * Math.PI) / 180)}
            y1={100 - 65 * Math.cos((threshold * 90 * Math.PI) / 180)}
            x2={100 + 85 * Math.sin((threshold * 90 * Math.PI) / 180)}
            y2={100 - 85 * Math.cos((threshold * 90 * Math.PI) / 180)}
            stroke="#1f2937"
            strokeWidth="2"
          />

          {/* Aguja */}
          <line x1="100" y1="100" x2={needleX} y2={needleY} stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />

          {/* Centro */}
          <circle cx="100" cy="100" r="5" fill="#1f2937" />

          {/* Etiquetas */}
          <text x="30" y="115" fontSize="10" fill="#6b7280" textAnchor="middle">
            -1.0
          </text>
          <text x="100" y="115" fontSize="10" fill="#6b7280" textAnchor="middle">
            0.0
          </text>
          <text x="170" y="115" fontSize="10" fill="#6b7280" textAnchor="middle">
            1.0
          </text>
        </svg>

        <div className="mt-4 text-center">
          <p className="text-3xl font-bold" style={{ color: isInDangerZone ? "#7a1c00" : "#007789" }}>
            {value.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Umbral: {threshold.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
