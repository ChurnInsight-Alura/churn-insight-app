

export default function SearchCustomer({term,setTerm}) {

  return (
    <>
      <div className="relative w-full max-w-xs">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
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

        <input
          value={term}
          type="text"
          className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl
               text-sm text-gray-900 transition-all
               focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
          placeholder="Buscar cliente por id..."
          onChange={(e)=>{setTerm(e.target.value)}}/>
      </div>
    </>
  );
}
