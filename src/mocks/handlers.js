// src/mocks/handlers.js
import { http, HttpResponse, delay } from 'msw'

export const handlers = [
  // Intercepta peticiones GET a /api/customer/:id
  http.post('*/integration/:id', async ({ params }) => {
    const { id } = params;
    
    await delay(800);

    // Aquí devuelves tu JSON estructurado
    return HttpResponse.json({
      CustomerId: id,
      PredictedProba: Math.random(),
      PredictedLabel: 1,
      CustomerSegment: "VIP",
      InterventionPriority:id % 2 === 0 ? "LOW" : "HIGH"
    })
  }),
]