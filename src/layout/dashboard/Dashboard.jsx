import { useDashboard } from "../../hooks/useDashboard"
import { InterventionPriorityChart } from "../../components/charts/InterventionPriorityChart"
import { DonutChurnChart } from "../../components/charts/DonutChurnChart"
import { ActiveMembersChart } from "../../components/charts/ActiveMembersChart"
import { GeoChurnHeatmap } from "../../components/charts/GeoChurnHeatmap"
import { GaugeSpeedometer } from "../../components/charts/GaugeSpeedometer"
import { MetricCard } from "../../components/charts/MetricCard"

export default function Dashboard() {
  const { data, loading, error } = useDashboard()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Cargando dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error al cargar datos</div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">Dashboard de Churn</h1>

      {/* ROW 1: CUADRADO 1 | CUADRADO 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* CUADRADO 1: Intervención por Prioridad */}
        <InterventionPriorityChart data={data?.interventionPriority} />
        
        {/* CUADRADO 2: Dona de Churn */}
        <DonutChurnChart data={data?.churnBalance} />
      </div>

      {/* ROW 2: CUADRADO 3 | CUADRADO 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* CUADRADO 3: Clientes Activos */}
        <ActiveMembersChart data={data?.activeMembers} />
        
        {/* CUADRADO 4: Mapa de Calor */}
        <GeoChurnHeatmap data={data?.geoChurn} />
      </div>

      {/* ROW 3: CUADRADO 5, 6, 7 | CUADRADO 8, 9, 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* LEFT COLUMN: TRANSACCIONES */}
        <div className="space-y-4 sm:space-y-6">
          {/* CUADRADO 5: Velocímetro Transacciones */}
          <GaugeSpeedometer
            value={data?.transactions?.AvgTxRateChange || 0}
            threshold={data?.transactions?.threshold || -0.22}
            title="Promedio Tasa de Cambio Q2 → Q3 <br/> Volumen Transacciones"
          />
        </div>

        {/* RIGHT COLUMN: SESIONES */}
        <div className="space-y-4 sm:space-y-6">
          {/* CUADRADO 8: Velocímetro Sesiones */}
          <GaugeSpeedometer
            value={data?.sessions?.AvgSsRateChange || 0}
            threshold={data?.sessions?.threshold || -0.28}
            title="Promedio Tasa de Cambio Q2 → Q3 <br />Volumen Sesiones"
          />
        </div>
      </div>

      {/* ROW 4: CUADRADOS 6, 7, 9, 10 - MÉTRICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-5 h-40 flex flex-col items-center justify-center text-center border-l-4 border-blue-500">
          <p className="text-xs text-gray-600 font-medium mb-2 whitespace-pre-wrap">Promedio<br/>Días sin transacciones</p>
          <span className="text-3xl font-bold text-gray-900">{(data?.AvgTxDaysSinceLast || 0).toFixed(1)}</span>
          <span className="text-xs text-gray-600 mt-1">días</span>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-md p-5 h-40 flex flex-col items-center justify-center text-center border-l-4 border-orange-500">
          <p className="text-xs text-gray-600 font-medium mb-2 whitespace-pre-wrap">Desviación Estándar <br/> Días sin transacciones</p>
          <span className="text-3xl font-bold text-gray-900">{(data?.StdTxDaysSinceLast || 0).toFixed(1)}</span>
          <span className="text-xs text-gray-600 mt-1">días</span>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-5 h-40 flex flex-col items-center justify-center text-center border-l-4 border-green-500">
          <p className="text-xs text-gray-600 font-medium mb-2 whitespace-pre-wrap">Promedio <br />Días sin sesiones</p>
          <span className="text-3xl font-bold text-gray-900">{(data?.AvgSsDaysSinceLast || 0).toFixed(1)}</span>
          <span className="text-xs text-gray-600 mt-1">días</span>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-5 h-40 flex flex-col items-center justify-center text-center border-l-4 border-purple-500">
          <p className="text-xs text-gray-600 font-medium mb-2 whitespace-pre-wrap">Desviación Estándar <br /> Días sin sesiones</p>
          <span className="text-3xl font-bold text-gray-900">{(data?.StdSsDaysSinceLast || 0).toFixed(1)}</span>
          <span className="text-xs text-gray-600 mt-1">días</span>
        </div>
      </div>
    </div>
  )
}
