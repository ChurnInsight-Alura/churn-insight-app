export default function EngagementStrat({ strat, week }) {
  const text = strat;
  const lineas = text.split("\n");
  
  return (
    <div className="strat-container flex flex-col bg-white  p-4 rounded-2xl gap-2 min-h-60 max-h-60 ">
      <h1 className="week-title text-2xl text-black">Semana {week}</h1>

      <div className="space-y-2 overflow-y-auto pr-2">
        {lineas.map((linea, index) => {
          if (!linea.trim()) return <br key={index} />; // Respetamos líneas vacías

          return (
            <p key={index} className="text-sm text-gray-600 leading-snug">
              {linea}
            </p>
          );
        })}
      </div>
    </div>
  );
}
