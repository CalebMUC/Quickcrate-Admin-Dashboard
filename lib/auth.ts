import type { Admin } from "./types"

// Mock authentication for demo purposes
const MOCK_ADMIN: Admin = {
  id: "ADM001",
  email: "admin@quickcrate.com",
  name: "Admin User",
  role: "super_admin",
  createdAt: "2024-01-01",
}

export async function login(email: string, password: string): Promise<{ admin: Admin; token: string } | null> {
  // Mock login - in production, this would call your .NET API
  if (email === "admin@quickcrate.com" && password === "admin123") {
    const token = "mock-jwt-token-" + Date.now()
    return {
      admin: MOCK_ADMIN,
      token,
    }
  }
  return null
}

export function getStoredAdmin(): Admin | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("admin_user")
  return stored ? JSON.parse(stored) : null
}

export function setStoredAdmin(admin: Admin) {
  if (typeof window === "undefined") return
  localStorage.setItem("admin_user", JSON.stringify(admin))
  // Also set a cookie for middleware
  document.cookie = `admin_token=mock-jwt-token-${Date.now()}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
}

export function clearStoredAdmin() {
  if (typeof window === "undefined") return
  localStorage.removeItem("admin_user")
  localStorage.removeItem("admin_token")
  // Clear cookie
  document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

export function logout() {
  clearStoredAdmin()
  window.location.href = "/login"
}
