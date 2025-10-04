import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Simple audit context shared in-memory (set from Auth once on login)
type AuditContext = {
  actorId?: string | number
  ip?: string
}

let auditContext: AuditContext = {}

export function setAuditContext(context: Partial<AuditContext>) {
  auditContext = { ...auditContext, ...context }
}

export function clearAuditContext() {
  auditContext = {}
}

function generateRequestId(): string {
  // Lightweight unique id per request; backend may replace with server-side id
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Propagate audit headers so backend can set DB session variables
    const reqId = generateRequestId()
    ;(config.headers as any)['X-Audit-Request-Id'] = reqId
    if (auditContext.actorId != null) {
      ;(config.headers as any)['X-Audit-Actor-Id'] = String(auditContext.actorId)
    }
    if (auditContext.ip) {
      ;(config.headers as any)['X-Client-IP'] = auditContext.ip
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
