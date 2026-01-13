// API para obtener datos del dashboard
export const fetchDashboardData = async () => {
  try {
    const response = await fetch("/api/dashboard")
    if (!response.ok) throw new Error("Error fetching dashboard data")
    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
