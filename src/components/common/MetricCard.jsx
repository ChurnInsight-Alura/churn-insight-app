"use client"

export function MetricCard({ title, value, decimals = 0 }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-600 text-center whitespace-pre-line mb-3">
        {title.replace(/\\n/g, "\n")}
      </h3>
      <div className="text-center">
        <p className="text-3xl font-bold text-[#007789]">
          {typeof value === "number" ? value.toFixed(decimals) : value}
        </p>
      </div>
    </div>
  )
}
