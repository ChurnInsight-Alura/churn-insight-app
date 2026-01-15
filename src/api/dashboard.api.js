import apiClient from './client.js'

// API para obtener datos del dashboard
export const fetchDashboardData = async () => {
  try {
    const { data } = await apiClient.post('/predict/integration/batch/pro/all', {})
    return data
  } catch (error) {
    throw error
  }
}
