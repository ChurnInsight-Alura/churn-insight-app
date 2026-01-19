import { useState } from "react";
import useCustomerPredictHistory from "../../hooks/useCustomerPredictHistory";
import CustomerPrediction from "../../components/customerPrediction/CustomerPrediction";
import EngagementStrats from "../../components/engagementStrats/EngagementStrats";


const formatDate = (dateString) => {
  if (!dateString) return "Sin fecha";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    // Si quieres incluir la hora, descomenta la siguiente línea:
    // hour: '2-digit', minute: '2-digit'
  }).format(date);
};

export default function SearchHistoryScreen() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null); // Control de colapso
  const { isLoading, isFetched, data, error, refetch } = useCustomerPredictHistory(search);

  const content = data?.content ?? [];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-full flex flex-col gap-6 p-4 md:p-6 search-page max-w-7xl mx-auto w-full">
      {/* SECCIÓN DE BÚSQUEDA */}
      <div className="flex flex-col bg-azul7 p-6 rounded-2xl shadow-sm border border-white/10 gap-6 transition-all">
        <div className="presentacion flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl tracking-tight font-black text-azul5">
            Asesoramiento financiero
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-medium max-w-2xl">
            Consulta el historial de predicciones de un cliente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <input
              className="text-lg font-semibold bg-white rounded-xl w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              placeholder="Nombre o ID del cliente..."
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && refetch()}
            />
          </div>
          <button
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>

      {/* ESTADO: CARGANDO */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-primary font-bold animate-pulse">Analizando historial...</p>
        </div>
      )}

      {/* ESTADO: SIN RESULTADOS */}
      {isFetched && content.length === 0 && !isLoading && (
        <div className="bg-white/50 border border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <h2 className="text-xl font-bold text-slate-400">No se encontraron clientes con ese criterio</h2>
          <p className="text-slate-500">Intenta con otro nombre o revisa el ID.</p>
        </div>
      )}

      {/* ESTADO: ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center font-bold">
          Hubo un error al recuperar la información. Por favor, intenta de nuevo.
        </div>
      )}

      {/* LISTADO DE RESULTADOS (COLAPSABLES) */}
      <div className="flex flex-col gap-3">
  {content.map((c, index) => {
    // Usamos el índice como ID de expansión si no existe c.id
    const rowId = c.id || `row-${index}`;
    const isExpanded = expandedId === rowId;

    return (
      <div 
        key={rowId} 
        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
          isExpanded ? "border-primary shadow-lg" : "border-slate-200 shadow-sm hover:border-slate-300"
        }`}
      >
        {/* CABECERA */}
        <button
          onClick={() => toggleExpand(rowId)}
          className="w-full flex items-center justify-between p-4 md:px-6 text-left"
        >
          <div className="flex items-center gap-4">
          

            <div>
              <h3 className="font-black text-azul5 text-lg leading-tight">
                {c.predictedAt 
                  ? new Intl.DateTimeFormat('es-ES', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    }).format(new Date(c.predictedAt))
                  : "Predicción sin fecha"
                }
              </h3>
              <p className="text-sm text-primary uppercase tracking-[0.2em] font-black mt-0.5">
                Ver análisis del cliente
              </p>
            </div>
          </div>
          
          <svg 
            className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* CONTENIDO */}
        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-4 md:p-6 bg-slate-50/50 border-t border-slate-100 space-y-6">
            {/* Pasamos rowId o el término de búsqueda según necesites */}
            <CustomerPrediction debouncedTerm={search} customer={c} />
            <div className="h-px bg-slate-200 w-full" />
            <EngagementStrats debouncedTerm={""} customer={c} />
          </div>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
}