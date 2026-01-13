import { useState, useEffect } from "react"
import { mockDashboardData } from "../mocks/dashboard.mock"

export const useDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simular llamada a API con datos mockeados
    const loadData = async () => {
      try {
        setLoading(true)
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 500))
        setData(mockDashboardData)
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
