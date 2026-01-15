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
    
    const { data } = await apiClient.post(`/integration/${id}`,{});
    return data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;