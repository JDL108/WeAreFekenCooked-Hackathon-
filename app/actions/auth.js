"use server"

import { cookies } from "next/headers"
import { createUser, verifyCredentials } from "@/lib/db"
import { redirect } from "next/navigation"

// Sign up a new user
export async function signup(formData) {
  try {
    // Extract form data
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirm-password")

    // Validate form data
    if (!name || !email || !password) {
      return { error: "All fields are required" }
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" }
    }

    // Create the user
    const user = await createUser({ name, email, password })

    // Set a session cookie
    const cookieStore = cookies()
    cookieStore.set("session", JSON.stringify({ userId: user.id, email: user.email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Redirect to dashboard or home page
    redirect("/dashboard")
  } catch (error) {
    return { error: error.message }
  }
}

// Log in an existing user
export async function login(formData) {
  try {
    // Extract form data
    const email = formData.get("email")
    const password = formData.get("password")

    // Validate form data
    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    // Verify credentials
    const user = await verifyCredentials(email, password)

    if (!user) {
      return { error: "Invalid email or password" }
    }

    // Set a session cookie
    const cookieStore = cookies()
    cookieStore.set("session", JSON.stringify({ userId: user.id, email: user.email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Redirect to dashboard or home page
    redirect("/dashboard")
  } catch (error) {
    return { error: error.message }
  }
}

// Log out the current user
export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete("session")
  redirect("/login")
}

// Get the current user from the session
export async function getCurrentUser() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}

