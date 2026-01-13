// src/mocks/browser.js
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function initMocks() {
  // Solo arranca si estamos en desarrollo
  if (import.meta.env.DEV) {
    return worker.start({
      onUnhandledRequest: 'bypass', 
    })
  }
  return Promise.resolve()
}