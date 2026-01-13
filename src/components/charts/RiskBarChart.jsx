"use client"

export function RiskBarChart({ data }) {
  if (!data || !data.DonutGreen || !data.DonutRed || !data.ChurnersTotalBalance) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Balance de churners</h3>
        <p className="text-gray-500 text-sm">No hay datos disponibles</p>
      </div>
    )
  }

  const total = data.DonutGreen + data.DonutRed
  const greenPercent = (data.DonutGreen / total) * 100
  const redPercent = (data.DonutRed / total) * 100

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Balance de churners</h3>

      <div className="flex flex-col items-center">
        {/* Gráfico de dona con SVG */}
        <svg viewBox="0 0 200 200" className="w-64 h-64">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="40" />
          {/* Segmento verde */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#007789"
            strokeWidth="40"
            strokeDasharray={`${(greenPercent / 100) * 502.65} 502.65`}
            transform="rotate(-90 100 100)"
          />
          {/* Segmento rojo */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#ff7b00"
            strokeWidth="40"
            strokeDasharray={`${(redPercent / 100) * 502.65} 502.65`}
            strokeDashoffset={`-${(greenPercent / 100) * 502.65}`}
            transform="rotate(-90 100 100)"
          />
        </svg>

        {/* Leyenda */}
        <div className="mt-6 space-y-2 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#007789" }} />
              <span className="text-sm">Balance Seguro</span>
            </div>
            <span className="text-sm font-semibold">{data.DonutGreen.toLocaleString("es-ES")}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ff7b00" }} />
              <span className="text-sm">Balance en Riesgo</span>
            </div>
            <span className="text-sm font-semibold">{data.DonutRed.toLocaleString("es-ES")}</span>
          </div>
        </div>

        {/* Total */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Balance Total de Churners</p>
          <p className="text-3xl font-bold text-gray-900">€{data.ChurnersTotalBalance.toLocaleString("es-ES")}</p>
        </div>
      </div>
    </div>
  )
}
