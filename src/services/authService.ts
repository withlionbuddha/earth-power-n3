import { authPost, clearAccessToken, setAccessToken } from './http'

export type AccessResponse = {
  accessToken: string
  accessExpiresIn: number
}
export type Credentials = {
  username: string
  password: string
}
export async function login(credentials: Credentials): Promise<void> {
  const data = await authPost<AccessResponse>('login', credentials)
  setAccessToken(data.accessToken)
}
export async function refreshAccess(): Promise<string> {
  const data = await authPost<AccessResponse>('refresh')
  setAccessToken(data.accessToken)
  return data.accessToken
}
export async function logout(): Promise<void> {
  try {
    await authPost<void>('logout')
  } finally {
    clearAccessToken()
  }
}
