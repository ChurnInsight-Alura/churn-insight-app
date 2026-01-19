import { useQuery } from "@tanstack/react-query";
import { fetchCustomerById } from "../api/client";



export default function useCustomerPredict(id, customer = null) {
  // 1. Calculamos fuera del objeto si tenemos datos externos
  const hasExternalData = !!customer && Object.keys(customer).length > 0;

  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => fetchCustomerById(id),
    enabled: !!id && !hasExternalData,
    initialData: hasExternalData ? customer : undefined,
    
    // 2. En lugar de Date.now(), usamos un valor calculado una sola vez
    // o simplemente omitimos si no hay data.
    initialDataUpdatedAt: hasExternalData ? 1 : undefined, 
    
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
