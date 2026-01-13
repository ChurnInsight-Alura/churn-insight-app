import CustomerPrediction from "../customerPrediction/CustomerPrediction";
import EngagementStrats from "../engagementStrats/EngagementStrats";

export default function SearchCustomer({debouncedTerm}) {
  return (
    <>
      <div className="min-h-full grid grid-cols-1 gap-4  p-4 md:p-0">
        <div className="flex flex-col bg-azul7 p-5 rounded-xl shadow-sm border border-white/5 md:max-h-[50vh] gap-4">
          <div className="presentacion flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl tracking-tight font-bold">Asesoramiento financiero</h1>
            <p className="leading-relaxedtext-sm md:text-base">
              En esta sección puedes consultar el riesgo de cancelación de clientes a partir de su comportamiento y actividad reciente.
            </p>
          </div>
          <CustomerPrediction debouncedTerm={debouncedTerm}/>
        </div>
        <EngagementStrats debouncedTerm={debouncedTerm}/>
      </div>
    </>
  );
}
