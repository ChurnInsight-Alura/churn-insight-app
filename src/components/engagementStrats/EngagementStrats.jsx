
import EngagementStrat from "../engagementStrat/EngagementStrat";
import { useOutletContext } from "react-router-dom";
import useCustomerPredict from "../../hooks/useCustomerPredict";

export default function EngagementStrats() {
  const { debouncedTerm } = useOutletContext();
  const { data, isError } = useCustomerPredict(debouncedTerm);


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
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
        Estrategia sugerida <span className="text-base font-medium text-slate-400">(LLM Reglas)</span>
      </h1>

      <div className="rules bg-azul5 flex flex-col p-4 rounded-4xl gap-8 text-white shadow-xl shadow-blue-900/10">
        
        <section className="space-y-2">
          <h2 className="text-blue-100 text-sm uppercase tracking-wider font-bold">Análisis del Cliente</h2>
          <p className="text-base leading-relaxed font-normal opacity-90">{analisis_breve}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-medium">
          {strategies.map((strat, i) => (
            <EngagementStrat 
              key={`strat-${i}`} 
              strat={strat} 
              week={i + 1} 
            />
          ))}
        </div>

        <footer className="mt-4 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-60">Incentivo Recomendado</span>
            <span className="font-semibold text-blue-50">{incentivo_recomendado}</span>
          </div>
          
          <div className="h-10 w-px bg-white/20 hidden md:block" />

          <div className="flex flex-col md:items-end">
            <span className="text-[10px] uppercase tracking-widest opacity-60">Canal Sugerido</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-400/20 text-blue-100 text-sm border border-blue-400/30">
              {canal_sugerido}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
