import fs from "fs"
import path from "path"
import { hash, compare } from "bcryptjs"

// Path to our JSON "database" file
const dbPath = path.join(process.cwd(), "data")
const usersFilePath = path.join(dbPath, "users.json")

// Ensure the data directory exists
const ensureDbExists = () => {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true })
  }

  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2))
  }
}

// Get all users
export const getUsers = () => {
  ensureDbExists()
  const fileContents = fs.readFileSync(usersFilePath, "utf8")
  return JSON.parse(fileContents)
}

// Save users to JSON file
export const saveUsers = (users) => {
  ensureDbExists()
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}

// Find a user by email
export const findUserByEmail = (email) => {
  const users = getUsers()
  return users.find((user) => user.email === email)
}

// Create a new user
export const createUser = async (userData) => {
  const users = getUsers()

  // Check if user already exists
  if (findUserByEmail(userData.email)) {
    throw new Error("User with this email already exists")
  }

  // Hash the password
  const hashedPassword = await hash(userData.password, 10)

  // Create a new user object with a unique ID
  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  }

  // Add the user to our "database"
  users.push(newUser)
  saveUsers(users)

  // Return the user without the password
  const { password, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

// Verify user credentials
export const verifyCredentials = async (email, password) => {
  const user = findUserByEmail(email)

  if (!user) {
    return null
  }

  const passwordMatch = await compare(password, user.password)

  if (!passwordMatch) {
    return null
  }

  // Return the user without the password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

