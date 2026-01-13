export const customer = {
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
    }