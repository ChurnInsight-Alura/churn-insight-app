export function ActiveMembersChart({ data = {} }) {
  const { active = {}, inactive = {} } = data;
  const activeExit0 = active.QtyIsActiveMemberExit_0 || 0;
  const activeExit1 = active.QtyIsActiveMemberExit_1 || 0;
  const inactiveExit0 = inactive.QtyIsNOTActiveMemberExit_0 || 0;
  const inactiveExit1 = inactive.QtyIsNOTActiveMemberExit_1 || 0;

  const maxValue = Math.max(activeExit0, activeExit1, inactiveExit0, inactiveExit1);
  const scale = maxValue > 0 ? 180 / maxValue : 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Clientes Activos vs No Activos</h3>
      
      <div className="flex-1 flex justify-center items-end gap-12 pb-4">
        {/* Grupo 1: Clientes Activos */}
        <div className="flex flex-col items-center">
          <div className="flex items-end justify-center gap-4 mb-3">
            {/* Barra 1 - No salieron */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 rounded-t-lg" 
                style={{ 
                  height: `${activeExit0 * scale}px`,
                  backgroundColor: '#007789'
                }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">No salieron</span>
              <span className="text-xl font-bold text-gray-900 mt-1">{activeExit0}</span>
            </div>
            
            {/* Barra 2 - Salieron */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 rounded-t-lg" 
                style={{ 
                  height: `${activeExit1 * scale}px`,
                  backgroundColor: '#ff7b00'
                }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">Salieron</span>
              <span className="text-xl font-bold text-gray-900 mt-1">{activeExit1}</span>
            </div>
          </div>
          <p className="text-sm font-bold text-gray-800 mt-2 pt-2 border-t-2 border-gray-300">Clientes Activos</p>
        </div>

        {/* Grupo 2: Clientes NO Activos */}
        <div className="flex flex-col items-center">
          <div className="flex items-end justify-center gap-4 mb-3">
            {/* Barra 3 - No salieron */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 rounded-t-lg" 
                style={{ 
                  height: `${inactiveExit0 * scale}px`,
                  backgroundColor: '#007789'
                }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">No salieron</span>
              <span className="text-xl font-bold text-gray-900 mt-1">{inactiveExit0}</span>
            </div>
            
            {/* Barra 4 - Salieron */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 rounded-t-lg" 
                style={{ 
                  height: `${inactiveExit1 * scale}px`,
                  backgroundColor: '#ff7b00'
                }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">Salieron</span>
              <span className="text-xl font-bold text-gray-900 mt-1">{inactiveExit1}</span>
            </div>
          </div>
          <p className="text-sm font-bold text-gray-800 mt-2 pt-2 border-t-2 border-gray-300">Clientes NO Activos</p>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex gap-8 justify-center text-xs border-t pt-4 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#007789' }}></div>
          <span className="text-gray-700 font-medium">#007789</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ff7b00' }}></div>
          <span className="text-gray-700 font-medium">#ff7b00</span>
        </div>
      </div>
    </div>
  );
}
