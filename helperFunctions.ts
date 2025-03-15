import User from "dataStore";

/**
 *
 * Helper function that finds a user that matches the email.
 *
 * @param {string} email
 * @returns {User | null}
 */
export function findUserWithEmail(email: string): User | undefined {
  return (getData() as Data).users.find(u => u.email === email);
}

/**
 *
 * Helper function that checks if a name is valid input given from the spec.
 *
 * @param {string} name
 * @returns {boolean}
 */
export function checkNameIsValidInput(name: string): boolean {
  if (/^[a-zA-Z'\- ]+$/.test(name) === false || name.length < 2 || name.length > 20) {
    return false;
  }
  return true;
}

/**
 *
 * Helper function that checks if a password is valid
 *
 * @param {string} password
 * @returns {boolean}
 */
export function checkValidPassword(password: string): boolean {
  if (/[A-Za-z]/.test(password) === false || /\d/.test(password) === false || password.length < 8) {
    return false;
  }
  return true;
}

/**
 * Helper function to check if there are duplicate strings within array
 * @param {object} answerOptions
 * @returns {boolean}
 */
export function hasDuplicateStrings(answerOptions: answerOption[]): boolean {
  const answers = answerOptions.map(option => option.answer);
  return new Set(answers).size < answerOptions.length;
}

/**
 * Helper function to check if there are no correct answers within answer options array
 * @param {object} answerOptions
 * @returns {boolean}
 */
export function hasCorrect(answerOptions: answerOption[]): boolean {
  if (answerOptions.find(a => a.correct)) {
    return true;
  }
  return false;
}