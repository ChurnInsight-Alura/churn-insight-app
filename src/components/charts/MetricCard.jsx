export function MetricCard({ label = "", value = 0, unit = "" }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col items-center justify-center text-center">
      <p className="text-sm text-gray-600 mb-3 whitespace-pre-wrap">{label}</p>
      <p className="text-4xl text-gray-900 metric-value">{value.toFixed(1)}</p>
      {unit && <p className="text-xs text-gray-500 mt-2">{unit}</p>}
    </div>
  );
}
