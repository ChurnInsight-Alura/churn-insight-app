
import { useQuery } from "@tanstack/react-query";
import { fetchCustomerHistoryById } from "../api/client";

export default function useCustomerPredictHistory(id) {
 return useQuery({
    queryKey: ["customerHistory", id],
    queryFn: () => fetchCustomerHistoryById(id),
    enabled: false,
    
  });
}
