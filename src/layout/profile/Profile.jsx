import React from 'react'
import { useAuth } from '../../auth/auth';

export default function Profile() {
  const { user } = useAuth();
  const {name,role} = user;
  return (
  <div className="min-h-full flex justify-center items-center p-6 animate-in fade-in zoom-in duration-500">
  <div className="flex flex-col justify-center items-center bg-azul7 p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-white/10 w-full max-w-4xl min-h-[50dvh] relative overflow-hidden">
    <div className="flex flex-col items-center gap-8 w-full z-10">
      
 
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-linear-to-br from-primary to-azul5 flex items-center justify-center text-azul7 text-4xl font-black shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] border-4 border-white/10">
          {name?.charAt(0).toUpperCase()}
        </div>
        <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 border-4 border-azul7 rounded-full" title="Online"></div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-azul5 tracking-tight">Perfil de Usuario</h1>
        <p className="text-primary/60 text-sm uppercase tracking-[0.3em] font-bold">Detalles de acceso</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-4">
        
     
        <div className="group bg-white/3 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300">
          <p className="text-sm uppercase tracking-widest text-primary/80 font-bold mb-1">Nombre de Usuario</p>
          <h2 className="text-xl text-slate-400 font-semibold group-hover:text-azul5 transition-colors">
            {name}
          </h2>
        </div>

      
        <div className="group bg-white/3 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300">
          <p className="text-sm uppercase tracking-widest text-primary/80 font-bold mb-1">Rol Asignado</p>
          <div className="flex items-center gap-2">
             <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
             <h2 className="text-xl text-slate-400 font-semibold capitalize group-hover:text-azul5 transition-colors">
                {role}
             </h2>
          </div>
        </div>

      </div>

     

    </div>
  </div>
</div>
  )
}
