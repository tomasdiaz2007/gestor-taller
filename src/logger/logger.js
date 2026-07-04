/**
 * Abstracción sobre console para logging.
 * Reemplazar la implementación aquí cuando se requiera
 * un servicio de logging externo (ej: Sentry, LogRocket).
 */
const isDev = import.meta.env.DEV

export const logger = {
  /**
   * @param {string} message
   * @param {...any} args
   */
  info(message, ...args) {
    if (isDev) console.info(`[INFO] ${message}`, ...args)
  },

  /**
   * @param {string} message
   * @param {...any} args
   */
  warn(message, ...args) {
    console.warn(`[WARN] ${message}`, ...args)
  },

  /**
   * @param {string} message
   * @param {Error|unknown} [error]
   * @param {...any} args
   */
  error(message, error, ...args) {
    console.error(`[ERROR] ${message}`, error, ...args)
  },

  /**
   * Solo visible en desarrollo
   * @param {string} message
   * @param {...any} args
   */
  debug(message, ...args) {
    if (isDev) console.debug(`[DEBUG] ${message}`, ...args)
  },
}
