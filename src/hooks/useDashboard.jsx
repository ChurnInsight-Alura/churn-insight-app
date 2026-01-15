import { useState, useEffect } from "react"
import { fetchDashboardData } from "../api/dashboard.api"

export const useDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetchDashboardData()
        // Destructurar los datos del endpoint
        const {
          bucketDate,
          batchRunId,
          batchHash,
          stats,
          predictions
        } = response

        // Transformar los datos manteniendo los nombres del JSON original
        const transformedData = {
          bucketDate,
          batchRunId,
          batchHash,
          predictions,
          stats,
          
          // Datos para InterventionPriorityChart
          interventionPriority: [
            { label: "Alta - Personalizada", value: stats["QtyHigh-Personalized"] || 0 },
            { label: "Alta - Incentivo", value: stats["QtyHigh-Incentive"] || 0 },
            { label: "Media - Monitoreo", value: stats["QtyMedium-Monitor"] || 0 },
            { label: "Media - Correo", value: stats["QtyMedium-Mail"] || 0 },
            { label: "Baja", value: stats.QtyLow || 0 },
            { label: "Crítico", value: stats.QtyCritical || 0 }
          ],
          
          // Datos para DonutChurnChart
          churnBalance: {
            DonutGreen: stats.DonutGreen || 0,
            DonutRed: stats.DonutRed || 0,
            ChurnersTotalBalance: stats.ChurnersTotalBalance || 0
          },
          
          // Datos para ActiveMembersChart
          activeMembers: {
            active: {
              QtyIsActiveMemberExit_0: stats.QtyIsActiveMemberExit_0 || 0,
              QtyIsActiveMemberExit_1: stats.QtyIsActiveMemberExit_1 || 0
            },
            inactive: {
              QtyIsNOTActiveMemberExit_0: stats.QtyIsNOTActiveMemberExit_0 || 0,
              QtyIsNOTActiveMemberExit_1: stats.QtyIsNOTActiveMemberExit_1 || 0
            }
          },
          
          // Datos para GeoChurnHeatmap
          geoChurn: {
            ChurnersGermany: stats.ChurnersGermany || 0,
            ChurnersSpain: stats.ChurnersSpain || 0,
            ChurnersFrance: stats.ChurnersFrance || 0
          },
          
          // Datos para GaugeSpeedometer - Transacciones
          transactions: {
            AvgTxRateChange: stats.AvgTxRateChange || 0,
            threshold: -0.22
          },
          
          // Datos para GaugeSpeedometer - Sesiones
          sessions: {
            AvgSsRateChange: stats.AvgSsRateChange || 0,
            threshold: -0.28
          },
          
          // Métricas adicionales
          AvgTxDaysSinceLast: stats.AvgTxDaysSinceLast || 0,
          StdTxDaysSinceLast: stats.StdTxDaysSinceLast || 0,
          AvgSsDaysSinceLast: stats.AvgSsDaysSinceLast || 0,
          StdSsDaysSinceLast: stats.StdSsDaysSinceLast || 0
        }

        setData(transformedData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { data, loading, error }
}
