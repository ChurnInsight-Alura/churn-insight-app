import axios from 'axios';

// Creamos la instancia
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', 
  headers: {
    'Content-Type': 'application/json',
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

export const fetchDashboardData = async () => {
  try {
    const { data } = await apiClient.post('/predict/integration/batch/pro/all', {})
    return data
  } catch (error) {
    console.error(`Error fetching Dashboard:`, error.response?.data || error.message);
    throw error
  }
}

export default apiClient;