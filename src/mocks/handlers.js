// src/mocks/handlers.js
import { http, HttpResponse, delay } from 'msw'

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
  http.post("*/integration/:id", async ({ params }) => {
    await delay(800);

    // Aquí devuelves tu JSON estructurado
    return HttpResponse.json({
      predictedProba: Math.random(),
      predictedLabel: 1,
      customerSegment: "VIP",
      interventionPriority:
        (Math.floor(Math.random() * 10) + 1) % 2 === 0 ? "LOW" : "HIGH",
      aiInsight: {
        analisis_breve:
          "Cliente joven, inactivo, con poco tiempo de antiguedad (Tenure: 0) y con un balance en cuenta, pero sin productos contratados. Probablemente no percibe valor en el banco digital. ",
        estrategia: {
          semana_1:
            "Email personalizado presentando los beneficios de la cuenta digital y ofreciendo asistencia para contratar un primer producto (ej. tarjeta de crédito o inversión). Enfatizar la conveniencia y las funcionalidades de la app móvil.",
          semana_2:
            "Seguimiento telefónico para evaluar su experiencia con el banco y ofrecer asesoramiento personalizado basado en sus necesidades financieras identificadas en la semana 1. Si no hay respuesta, un segundo email con un bono de bienvenida para la contratación del primer producto.",
          semana_3:
            "Recordatorio de los beneficios de la cuenta y los productos del banco a través de notificaciones push en la app (si la tiene instalada) o WhatsApp. Destacar la seguridad y facilidad de uso.",
          semana_4:
            "Encuesta de satisfacción por correo electrónico con una pregunta abierta sobre cómo podríamos mejorar su experiencia. Ofrecer un pequeño incentivo (ej. sorteo de un premio) por completar la encuesta.",
        },
        canal_sugerido: "Email | Teléfono | WhatsApp",
        incentivo_recomendado:
          "Bonificación por contratación del primer producto (ej. exención de comisión en la tarjeta de crédito por un año) o asesoramiento financiero personalizado gratuito.",
      },
      aiInsightStatus: "OK",
    });
  })
  
  ,

]