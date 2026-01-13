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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* LEFT COLUMN: TRANSACCIONES */}
        <div className="space-y-4 sm:space-y-6">
          {/* CUADRADO 5: Velocímetro Transacciones */}
          <GaugeSpeedometer
            value={data?.transactions?.AvgTxRateChange || 0}
            threshold={data?.transactions?.threshold || -0.22}
            title="Promedio Tasa de Cambio Q2 → Q3\nVolumen Transacciones"
          />
          
          {/* CUADRADO 6 y 7: Tarjetas horizontales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <MetricCard
              label="Promedio\nDías sin transacciones"
              value={data?.avgTxDaysSinceLast || 0}
              unit="días"
            />
            <MetricCard
              label="Desviación Estándar\nDías sin transacciones"
              value={data?.stdTxDaysSinceLast || 0}
              unit="días"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: SESIONES */}
        <div className="space-y-4 sm:space-y-6">
          {/* CUADRADO 8: Velocímetro Sesiones */}
          <GaugeSpeedometer
            value={data?.sessions?.AvgSsRateChange || 0}
            threshold={data?.sessions?.threshold || -0.28}
            title="Promedio Tasa de Cambio Q2 → Q3\nVolumen Sesiones"
          />
          
          {/* CUADRADO 9 y 10: Tarjetas horizontales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <MetricCard
              label="Promedio\nDías sin sesiones"
              value={data?.avgSsDaysSinceLast || 0}
              unit="días"
            />
            <MetricCard
              label="Desviación Estándar\nDías sin sesiones"
              value={data?.stdSsDaysSinceLast || 0}
              unit="días"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
