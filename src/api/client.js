
import axios from 'axios';

// Creamos la instancia
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', 
  headers: {
    'Content-Type': 'application/json'
  },
});

/**
 * Función para obtener un cliente por ID
 * @param {string|number} id 
 */
export const fetchCustomerById = async (id) => {
  try {
    
    const { data } = await apiClient.post(`/predict/integration/${id}`,{});
    return data;
  } catch (error) {
     console.error(`Error fetching customer ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
export const fetchCustomerHistoryById = async (id) => {
  try {
    const { data } = await apiClient.get(`/predict/${id}`, {
      params: {
        size: 20,              // Traer 20 registros
        page: 0,               // Primera página
        sort: 'predictedAt,desc' // De más reciente a más antiguo
      }
    });
    return data;
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const fetchDashboardData = async () => {
  try {
    const { data } = await apiClient.post('/predict/integration/batch/pro/all', {},{timeout: 1000*60*10,})
    return data
  } catch (error) {
    console.error(`Error fetching Dashboard:`, error.response?.data || error.message);
    throw error
  }
}

export default apiClient;