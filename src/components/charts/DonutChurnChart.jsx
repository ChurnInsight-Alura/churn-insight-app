export function DonutChurnChart({ data = {} }) {
  const { DonutGreen = 0, DonutRed = 0, ChurnersTotalBalance = 0 } = data;
  const total = DonutGreen + DonutRed;
  const greenPercent = total > 0 ? (DonutGreen / total) * 100 : 0;
  const redPercent = total > 0 ? (DonutRed / total) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-8 w-full">Pérdida Potencial Estimada</h3>
      
      {/* Donut Chart */}
      <div className="relative w-56 h-56 mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Green segment */}
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#007789"
            strokeWidth="20"
            strokeDasharray={`${greenPercent * 1.88} 188`}
            strokeLinecap="round"
          />
          {/* Red segment */}
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#ff7b00"
            strokeWidth="20"
            strokeDasharray={`${redPercent * 1.88} 188`}
            strokeDashoffset={`-${greenPercent * 1.88}`}
            strokeLinecap="round"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-700">{greenPercent.toFixed(0)}%</span>
        </div>
      </div>

      {/* Balance con símbolo de euros */}
      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm mb-2">Balance Total</p>
        <p className="text-3xl font-bold text-gray-900">
          €{(ChurnersTotalBalance / 1000).toFixed(1)}K
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#007789' }}></div>
          <span className="text-gray-700">Retienen: €{(DonutGreen / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ff7b00' }}></div>
          <span className="text-gray-700">Churners: €{(DonutRed / 1000).toFixed(1)}K</span>
        </div>
      </div>
    </div>
  );
}
