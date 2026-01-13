export function ActiveMembersChart({ data = {} }) {
  const { active = {}, inactive = {} } = data;
  const activeExit0 = active.exit0 || 0;
  const activeExit1 = active.exit1 || 0;
  const inactiveExit0 = inactive.exit0 || 0;
  const inactiveExit1 = inactive.exit1 || 0;

  const maxValue = Math.max(activeExit0, activeExit1, inactiveExit0, inactiveExit1);
  const scale = maxValue > 0 ? 100 / maxValue : 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-8">Clientes Activos vs No Activos</h3>
      
      <div className="flex justify-around items-end gap-8 h-64">
        {/* Grupo 1: Clientes Activos */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="w-full flex justify-center gap-6">
            {/* Barra 1 - Exit 0 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-400 rounded-t" style={{ height: `${activeExit0 * scale}px` }}></div>
              <span className="text-xs text-center text-gray-700">No salieron</span>
              <span className="text-sm font-bold text-gray-900">{activeExit0}</span>
            </div>
            {/* Barra 2 - Exit 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-orange-500 rounded-t" style={{ height: `${activeExit1 * scale}px` }}></div>
              <span className="text-xs text-center text-gray-700">Salieron</span>
              <span className="text-sm font-bold text-gray-900">{activeExit1}</span>
            </div>
          </div>
          <p className="font-semibold text-gray-800 text-sm mt-2">Clientes Activos</p>
        </div>

        {/* Grupo 2: Clientes NO Activos */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="w-full flex justify-center gap-6">
            {/* Barra 3 - Exit 0 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-blue-400 rounded-t" style={{ height: `${inactiveExit0 * scale}px` }}></div>
              <span className="text-xs text-center text-gray-700">No salieron</span>
              <span className="text-sm font-bold text-gray-900">{inactiveExit0}</span>
            </div>
            {/* Barra 4 - Exit 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 bg-orange-500 rounded-t" style={{ height: `${inactiveExit1 * scale}px` }}></div>
              <span className="text-xs text-center text-gray-700">Salieron</span>
              <span className="text-sm font-bold text-gray-900">{inactiveExit1}</span>
            </div>
          </div>
          <p className="font-semibold text-gray-800 text-sm mt-2">Clientes NO Activos</p>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex gap-6 mt-6 justify-center text-sm border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded"></div>
          <span className="text-gray-700">#007789</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-gray-700">#ff7b00</span>
        </div>
      </div>
    </div>
  );
}
