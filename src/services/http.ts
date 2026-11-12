/** In-memory Access JWT only. Refresh JWT remains server-issued HttpOnly cookie. */
const apiRoot = (import.meta.env.VITE_API_BASE_PATH || '/api').replace(/\/$/, '')
let accessToken: string | null = null
let refreshPromise: Promise<string> | null = null

export class HttpError extends Error {
  readonly status: number

  constructor(status: number, message: string) { 
    super(message); 
    this.name = 'HttpError'
    this.status = status 
  }
}
export function setAccessToken(value: string): void { accessToken = value }
export function clearAccessToken(): void { accessToken = null }
export function hasAccessToken(): boolean { return accessToken !== null }

async function readResponse<T>(response: Response): Promise<T> {
  if (!response.ok) throw new HttpError(response.status, `Request failed (${response.status})`)
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
export async function authPost<T>(action: 'login' | 'refresh' | 'logout', body?: unknown): Promise<T> {
  const response = await fetch(`${apiRoot}/auth/${action}`, {
    method: 'POST',
    credentials: 'include',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  })
  return readResponse<T>(response)
}
async function refreshOnce(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const data = await authPost<{ accessToken: string; accessExpiresIn: number }>('refresh')
      setAccessToken(data.accessToken)
      return data.accessToken
    })().catch(error => { clearAccessToken(); throw error }).finally(() => { refreshPromise = null })
  }
  return refreshPromise
}
/** Authenticated API requests retry once on 401. No access or refresh token is persisted. */
export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('..')) {
    throw new Error('API path must be a relative absolute-path without parent traversal')
  }
  const send = (token: string) => fetch(`${apiRoot}${path}`, {
    ...options,
    credentials: 'omit',
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers, Authorization: `Bearer ${token}` },
  })
  let token = accessToken
  if (!token) token = await refreshOnce()
  let response = await send(token)
  if (response.status === 401) {
    clearAccessToken()
    token = await refreshOnce()
    response = await send(token)
  }
  return readResponse<T>(response)
}
