import { BarChart } from "../barChart/BarChart";

function normalizeKeys(obj) {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.charAt(0).toLowerCase() + key.slice(1),
      value
    ])
  );
}

export default function PredictionDetail({ data,id }) {
  const labels = {
    1: "Si",
    0: "No",
  };

  const normalizedData = normalizeKeys(data);

  const capitalize = (str) => {
    if (!str) return "No info";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const CustomerId = id;
  const PredictedProba =
    normalizedData?.predictedProba != null
      ? Math.trunc(normalizedData.predictedProba * 10) / 10 + "%"
      : "No info";
  const PredictedLabel = labels[normalizedData?.predictedLabel] ?? "No info";
  const CustomerSegment = normalizedData?.customerSegment
    ? normalizedData.customerSegment.toUpperCase()
    : "No info";
  const InterventionPriority = capitalize(normalizedData?.interventionPriority);

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
        <h1 className="text-xl md:text-2xl lg:text-3xl flex gap-2 flex-wrap"><span>Customer Id:</span><span className="break-all">{CustomerId}</span></h1>
      </div>

      <div className="stats-container grid grid-cols-1 md:grid-cols-2 bg-white shadow rounded-lg divide-y md:divide-y-0 md:divide-x divide-gray-300 ">
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
