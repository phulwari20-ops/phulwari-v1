/**
 * Centralized API & System Logger
 * Single entry point for clean console logging across the application.
 */

type LogLevel = 'info' | 'success' | 'warn' | 'error' | 'request';

export function appLog(level: LogLevel, tag: string, message: string, data?: any) {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = `[${timestamp}] [${tag}]`;

  switch (level) {
    case 'request':
      console.log(`📡 ${prefix} REQUEST: ${message}`, data !== undefined ? data : '');
      break;
    case 'success':
      console.log(`✅ ${prefix} SUCCESS: ${message}`, data !== undefined ? data : '');
      break;
    case 'warn':
      console.warn(`⚠️ ${prefix} WARN: ${message}`, data !== undefined ? data : '');
      break;
    case 'error':
      console.error(`❌ ${prefix} ERROR: ${message}`, data !== undefined ? data : '');
      break;
    default:
      console.log(`ℹ️ ${prefix} ${message}`, data !== undefined ? data : '');
      break;
  }
}
