import { ResponsiveBar } from "@nivo/bar";

// 2. Función para determinar el color según el riesgo
  const getBarColor = (val) => {
    if (val >= 80) return '#ef4444'; // Rojo (Riesgo Crítico)
    if (val >= 50) return '#f97316'; // Naranja (Riesgo Medio)
    return '#22c55e';                // Verde (Riesgo Bajo)
  };

export function BarChart({ data }) {
  return (
    <ResponsiveBar
      data={data}
          keys={['alcanzado', 'restante']}
          indexBy="id"
          layout="horizontal"
          maxValue={100}
          padding={0} // Esto la hace delgada
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          
          // Lógica de color: Condicional para la parte alcanzada, Gris para el resto
          colors={({ id, data }) => 
            id === 'alcanzado' ? getBarColor(data.alcanzado) : '#f3f4f6'
          }
          
          borderRadius={6}
          enableGridX={false}
          enableGridY={false}
          axisLeft={null}
          axisBottom={null}
          axisTop={null}
          enableLabel={false} // Quitamos etiquetas internas para máxima limpieza
          isInteractive={true}
          
          // Tooltip elegante
          tooltip={({ id, value }) => (
            id === 'alcanzado' ? (
              <div className="bg-white px-3 py-1 shadow-md rounded border border-gray-100 text-xs font-semibold">
                Riesgo Actual: {value}%
              </div>
            ) : null
          )}
          
          theme={{
            tooltip: {
              container: {
                background: 'transparent',
                boxShadow: 'none',
                padding: 0,
              },
            },
          }}
    />
  );
}
