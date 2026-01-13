import { useQuery } from "@tanstack/react-query";
import { fetchCustomerById } from "../api/client";



export default function useCustomerPredict(id) {
 return useQuery({
    queryKey: ["customer", id],
    queryFn: () => fetchCustomerById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5
  });
 
}
