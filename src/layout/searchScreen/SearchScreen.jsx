
export default function SearchScreen() {
  return (
    <>
      <div className="min-h-full grid grid-cols-1 gap-4  p-4 md:p-0 search-page">
        <div className="flex flex-col bg-azul7 p-5 rounded-xl shadow-sm border border-white/5 md:max-h-[50vh] gap-4">
          <div className="presentacion flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl tracking-tight font-bold">
              Asesoramiento financiero
            </h1>
            <p className="leading-relaxedtext-sm md:text-base">
              En esta sección puedes consultar el riesgo de cancelación de
              clientes a partir de su comportamiento y actividad reciente.
            </p>
          </div>
          <div className="w-full h-full flex items-center">
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
          </div>
        </div>
      </div>
    </>
  );
}