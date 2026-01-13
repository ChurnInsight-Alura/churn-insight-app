// Datos mockeados para el dashboard
export const mockDashboardData = {
  // CUADRADO 1: Intervención por Prioridad
  interventionPriority: [
    { label: "CRÍTICO - Llamar Inmediatamente", value: 145, key: "QtyCritical" },
    { label: "Alta - Chequeo Personalizado", value: 238, key: "QtyHighPersonalized" },
    { label: "Alta - Ofrecer Incentivo", value: 192, key: "QtyHighIncentive" },
    { label: "Media - Correo Automático", value: 356, key: "QtyMediumMail" },
    { label: "Media - Monitorear", value: 412, key: "QtyMediumMonitor" },
    { label: "Baja - Mantener Contento", value: 587, key: "QtyLow" },
  ],

  // CUADRADO 2: Dona de Churn
  churnBalance: {
    DonutGreen: 15000,
    DonutRed: 8500,
    ChurnersTotalBalance: 23500,
  },

  // CUADRADO 3: Clientes Activos vs No Activos
  activeMembers: {
    active: {
      label: "Clientes Activos",
      exit0: 1200, // QtyIsActiveMemberExit_0
      exit1: 450,  // QtyIsActiveMemberExit_1
    },
    inactive: {
      label: "Clientes NO Activos",
      exit0: 800,  // QtyIsNOTActiveMemberExit_0
      exit1: 320,  // QtyIsNOTActiveMemberExit_1
    },
  },

  // CUADRADO 4: Mapa de Calor
  geoChurn: {
    ChurnersGermany: 450,
    ChurnersSpain: 380,
    ChurnersFrance: 290,
  },

  // CUADRADO 5: Velocímetro Transacciones
  transactions: {
    AvgTxRateChange: -0.28, // Aguja del velocímetro
    threshold: -0.22,
  },

  // CUADRADO 6: Promedio días sin transacciones
  avgTxDaysSinceLast: 12.5,

  // CUADRADO 7: Desviación estándar días sin transacciones
  stdTxDaysSinceLast: 4.2,

  // CUADRADO 8: Velocímetro Sesiones
  sessions: {
    AvgSsRateChange: -0.32, // Aguja del velocímetro
    threshold: -0.28,
  },

  // CUADRADO 9: Promedio días sin sesiones
  avgSsDaysSinceLast: 8.7,

  // CUADRADO 10: Desviación estándar días sin sesiones
  stdSsDaysSinceLast: 3.1,
}
