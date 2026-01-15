"use client"

export function InterventionBarChart({ data }) {
  const chartData = [
    { label: "Crítica", value: data.QtyCritical, color: "#7a1c00" },
    { label: "Alta - Personalizado", value: data["QtyHighPersonalized"], color: "#ff7b00" },
    { label: "Alta - Incentivo", value: data["QtyHighIncentive"], color: "#007789" },
    { label: "Media - Email", value: data["QtyMediumMail"], color: "#66c2a5" },
    { label: "Media - Monitorear", value: data["QtyMediumMonitor"], color: "#3288bd" },
    { label: "Baja", value: data.QtyLow, color: "#5e4fa2" },
  ]

  const maxValue = Math.max(...chartData.map((d) => d.value))

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Clientes por prioridad de intervención</h3>
      <div className="space-y-3">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-40 text-sm text-gray-700 shrink-0">{item.label}</div>
            <div className="flex-1 h-8 bg-gray-100 rounded-md overflow-hidden relative">
              <div
                className="h-full flex items-center justify-end pr-2 text-white text-sm font-semibold transition-all duration-300"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color,
                  minWidth: "30px",
                }}
              >
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
