import CustomerPrediction from "../../components/customerPrediction/CustomerPrediction";

export default function Home() {
  return (
    <>
      <div className="min-h-full grid grid-rows-2 gap-4">
        <div className="flex flex-col bg-azul7 p-5 rounded-xl">
          <div className="presentacion flex flex-col gap-3">
            <h1 className="text-3xl font-bold">Asesoramiento financiero</h1>
            <p className="leading-relaxed">
              En esta sección puedes consultar el riesgo de cancelación de clientes a partir de su comportamiento y actividad reciente.
            </p>
          </div>
          <CustomerPrediction />
        </div>
        <div className="feedback">
            <h1>Feedback asombroso</h1>
        </div>
      </div>
    </>
  );
}
