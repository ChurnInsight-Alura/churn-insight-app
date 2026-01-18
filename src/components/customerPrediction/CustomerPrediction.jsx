
import PredictionDetail from "../predictionDetail/PredictionDetail";
import useCustomerPredict from "../../hooks/useCustomerPredict";

// async function fetchCustomerById(id) {
//   const response = await fetch(`/integration/${id}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//   });
//   if (!response.ok) throw new Error("No se encontro el Cliente");
//   return response.json;
// }

export default function CustomerPrediction({debouncedTerm}) {
  const {isLoading,isFetched,data,error} = useCustomerPredict(debouncedTerm)
  console.log(data);
  
  return (
    <div className="w-full h-full flex items-center">
      {(debouncedTerm || "").length === 0 && (
        <div className="flex gap-2 items-center justify-center w-full">
          <div className="inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Buscar cliente</h1>
        </div>
      )}

      {isLoading && !error && (
        <div className="flex items-center justify-center w-full">
          <p className="animate-pulse text-2xl font-bold">Cargando...</p>
        </div>
      )}

      {isFetched && !data && !isLoading && (
        <div className="flex items-center justify-center w-full">
          <h1 className="text-red-500 text-2xl font-bold">
            No pudimos encontrar ese cliente
          </h1>
        </div>
      )}

      {data && (
        <div className="flex w-full justify-center">
         <PredictionDetail  data={data} id={debouncedTerm}/>
        </div>
      )}
    </div>
  );
}
