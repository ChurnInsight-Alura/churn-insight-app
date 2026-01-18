export default function Home() {
  return (
    <>
     <div className="min-h-full flex justify-center items-center p-6 home-page">
  <div className="flex flex-col justify-center items-center bg-azul7 p-10 md:p-16 rounded-3xl shadow-2xl border border-white/10 w-full max-w-6xl min-h-[50dvh] gap-12 ">
    <div className="presentacion flex flex-col lg:flex-row justify-between items-center gap-6 w-full">
      
      <div className="flex flex-col items-center lg:items-start">
        <h1 className="text-4xl md:text-6xl tracking-tight font-black text-azul5 leading-tight text-center lg:text-left">
          Bienvenido a <span className="text-primary ">CusTech</span>
        </h1>
        <p className="text-primary/70 text-base md:text-lg mt-4 font-medium text-center lg:text-left border-l-2 border-primary/30 pl-4 ml-2 lg:ml-0">
          Gestión inteligente de clientes
        </p>
      </div>
      <div className="flex flex-col w-full lg:max-w-2xl bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 p-6 gap-5 shadow-inner home-right-box">
        
        <div className="space-y-3">
          <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-black opacity-80">Objetivo</h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Reducir la pérdida de cartera vigente y aumentar el <span className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">Lifetime Value</span>
          </p>
        </div>

        {/* <div className="h-px bg-linear-tor from-transparent via-white/10 to-transparent"></div> */}

         <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-[0.4em] text-primary font-black opacity-80">Cómo lo hace</h3>
          <ul className="space-y-3">
            {[
              "Predicción de churn por cliente",
              "Priorización automática de intervención",
              "Estrategias sugeridas por IA / reglas",
              "Monitoreo gerencial en tiempo real"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-500 text-sm group ">
                <span className="h-1.5 w-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform shadow-[0_0_8px_#var(--primary)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-azul5 font-bold">Impacto</h3>
            <p className="text-slate-600 text-xs leading-tight font-semibold">Insight accionable antes del abandono.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-azul5 font-bold">Agradecimientos</h3>
            <p className="text-slate-600 text-xs leading-tight italic">Oracle, Alura, NoCountry & ONE.</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>
    </>
  );
}
