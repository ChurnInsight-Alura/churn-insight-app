// src/mocks/handlers.js
import { http, HttpResponse, delay } from 'msw'
import { customer } from './searchCustomer.mock';
// Datos mockeados para el dashboard
export const mockDashboardData = {
  segments: [
    { id: 1, name: "Segmento 1", visits: 3671, change: -0.03 },
    { id: 2, name: "Segmento 2", visits: 3671, change: -0.03 },
    { id: 3, name: "Segmento 3", visits: 3671, change: -0.03 },
  ],
  interventionPriority: [
    { priority: "Crítica", count: 87 },
    { priority: "Riesgo", count: 87 },
    { priority: "Media", count: 87 },
    { priority: "Media Baja", count: 87 },
    { priority: "Baja", count: 87 },
  ],
  churnBalance: {
    DonutGreen: 15000,
    DonutRed: 8500,
    ChurnersTotalBalance: 23500,
  },
  riskDistribution: [
    { segment: "Muy Alto", value: 45 },
    { segment: "Alto", value: 30 },
    { segment: "Medio", value: 15 },
    { segment: "Bajo", value: 10 },
  ],
  churnEvolution: [
    { country: "Canada", current: 120, previous: 90 },
    { country: "Mexico", current: 180, previous: 160 },
    { country: "China", current: 150, previous: 170 },
    { country: "US", current: 80, previous: 100 },
    { country: "Canada Mexico", current: 60, previous: 70 },
    { country: "China", current: 50, previous: 60 },
    { country: "Japan", current: 40, previous: 45 },
    { country: "Austria", current: 30, previous: 35 },
  ],
  geoChurn: {
    regions: [
      { name: "Norteamérica", intensity: "high" },
      { name: "Europa", intensity: "medium" },
      { name: "Asia", intensity: "low" },
      { name: "Sudamérica", intensity: "medium" },
      { name: "África", intensity: "low" },
      { name: "Oceanía", intensity: "low" },
    ],
  },
  transactions: {
    current: 2456,
    previous: 2800,
    percentage: 88,
  },
  sessions: {
    current: 1234,
    previous: 1500,
    percentage: 82,
  },
  activeSessions: {
    current: 567,
    previous: 650,
    percentage: 87,
  },
  totalRevenue: {
    current: 45678,
    previous: 50000,
    percentage: 91,
  },
}

export const handlers = [
  // Intercepta peticiones para obtener datos del dashboard
  http.get('*/dashboard', async () => {
    await delay(500);
    return HttpResponse.json(mockDashboardData);
  }),
  http.post("*/predict/integration/batch/pro/all", async () => {
    await delay(500);
    // Devolver datos reales del batch
    return HttpResponse.json({
      bucketDate: "2026-01-01",
      batchRunId: 2,
      batchHash: "7e979f2821893caa20cf6459e06f79c155d2d1d6800188bbdf84c570d7bc0f5d",
      stats: {
        QtyLow: 8,
        DonutRed: 4,
        DonutGreen: 8,
        QtyCritical: 0,
        ChurnersSpain: 0,
        ChurnersFrance: 1,
        "QtyMedium-Mail": 0,
        AvgSsRateChange: 0.5,
        AvgTxRateChange: 1.1667,
        ChurnersGermany: 3,
        CustomerChurnProp: 33.33,
        "QtyHigh-Incentive": 2,
        "QtyMedium-Monitor": 2,
        AvgSsDaysSinceLast: 504.17,
        AvgTxDaysSinceLast: 505.17,
        StdSsDaysSinceLast: 516.84,
        StdTxDaysSinceLast: 515.8,
        ChurnersTotalBalance: 490002.0,
        "QtyHigh-Personalized": 0,
        QtyIsActiveMemberExit_0: 5,
        QtyIsActiveMemberExit_1: 4,
        QtyIsNOTActiveMemberExit_0: 3,
        QtyIsNOTActiveMemberExit_1: 0
      },
      predictions: []
    });
  }),
  http.post("*/integration/:id", async ({ params }) => {
    await delay(800);
    // Aquí devuelves tu JSON estructurado
    return HttpResponse.json(customer());
  })
  
  ,

]