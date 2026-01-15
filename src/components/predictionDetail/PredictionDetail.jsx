import { BarChart } from "../barChart/BarChart";

export default function PredictionDetail({ data,id }) {
  const labels = {
    1: "Si",
    0: "No",
  };
  const capitalize = (str) => {
    if (!str) return "No info";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const CustomerId = id;
  const PredictedProba =
    data?.predictedProba != null
      ? Math.trunc(data.predictedProba * 1000) / 10 + "%"
      : "No info";
  const PredictedLabel = labels[data?.predictedLabel] ?? "No info";
  const CustomerSegment = data?.customerSegment
    ? data.customerSegment.toUpperCase()
    : "No info";
  const InterventionPriority = capitalize(data?.interventionPriority);

  const probaF = parseFloat(PredictedProba);

  const chartData = !Number.isNaN(probaF) ? [
  {
    id: "risk",
    alcanzado: probaF,
    restante: Math.max(0, 100 - probaF),
  },
] : null;
  
  return (
    <div className="w-full flex flex-col font-medium gap-5">

      <div className="customer-id">
        <h1 className="text-2xl flex gap-2"><span>Customer Id:</span><span>{CustomerId}</span></h1>
      </div>

      <div className="stats-container grid sm:grid-cols-2 grid-cols-1 bg-white shadow rounded-lg  divide-x divide-gray-300 ">
        <div className="customer-info flex flex-col  p-6">
          <div className="feature flex gap-1">
            <span className="">Churn Probability:</span>
            <span className="">{PredictedProba}</span>
          </div>
          <div className="feature flex gap-1">
            <span className="">Churn Prediction:</span>
            <span className="">{PredictedLabel}</span>
          </div>
          <div className="feature flex gap-1">
            <span className="">Customer Segment:</span>
            <span className="">{CustomerSegment}</span>
          </div>
          <div className="feature flex gap-1">
            <span className="">Intervention Priority:</span>
            <span className="">{InterventionPriority}</span>
          </div>
        </div>
        <div className="chart-container flex flex-col gap-3 p-6">
          <h1 className=" text-lg ">Nivel de riesgo de Churn</h1>
          <div className="h-10 w-full">
            {chartData  ? <BarChart data={chartData} />: "No info"}
          </div>
        </div>
      </div>
    </div>
  );
}
