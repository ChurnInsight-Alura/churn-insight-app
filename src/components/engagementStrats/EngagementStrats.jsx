
import EngagementStrat from "../engagementStrat/EngagementStrat";
import useCustomerPredict from "../../hooks/useCustomerPredict";

export default function EngagementStrats({debouncedTerm,customer={}}) {
  const { data, isError } = useCustomerPredict(debouncedTerm,customer);


  if (isError || !data?.aiInsight) return null;

  const { 
    estrategia = {}, 
    analisis_breve = "No info", 
    canal_sugerido = "No info", 
    incentivo_recomendado = "No info" 
  } = data.aiInsight;

  const strategies = Object.values(estrategia);

  return (
    <div className="engagement-container flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800">
        Estrategia sugerida <span className="text-xl font-medium text-slate-600">(LLM Reglas)</span>
      </h1>

      <div className="rules bg-azul5 flex flex-col p-4 md:p-6 lg:p-8 rounded-4xl gap-8 text-white shadow-xl shadow-blue-900/10">
        
        <section className="space-y-2">
          <h2 className="text-slate-200 text-sm md:text-lg uppercase tracking-wider font-bold inline-block bg-primary rounded-lg p-2">Análisis del Cliente</h2>
          <p className="text-base md:text-lg leading-relaxed font-normal opacity-90">{analisis_breve}</p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 font-medium">
          {strategies.map((strat, i) => (
            <EngagementStrat 
              key={`strat-${i}`} 
              strat={strat} 
              week={i + 1} 
            />
          ))}
        </div>

        <footer className="mt-4 p-5 bg-gray-800/20 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col">
            <div className="text-sm sm:text-base uppercase tracking-widest "><span className="block text-center sm:text-left sm:inline-block pb-1  sm:pr-8 sm:pl-4  border-b border-white/20   font-semibold">Incentivo Recomendado</span></div>
            <span className="font-semibold text-blue-50">{incentivo_recomendado}</span>
          </div>
          
          <div className="h-10 w-px bg-white/20 hidden md:block" />

          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="text-sm uppercase tracking-widest font-semibold">Canal Sugerido</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-400/10 text-blue-100 text-sm border border-blue-400/30">
              {canal_sugerido}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
