import { getData, Data, saveData } from './dataStore';
import {
  findUserWithEmail,
  checkNameIsValidInput,
  checkValidPassword,
  hashPassword
} from './helperFunctions';
import {
  generateToken,
  generateSessionId
} from './token';
import {
  isEmail
} from 'is-email';

/**
 * Register a user with an email, password, and name.
 * @param {String} email
 * @param {String} password
 * @param {String} nameFirst
 * @param {String} nameLast
 * @returns {Object}
 */
export function userRegister(
  email: string,
  password: string,
  nameFirst: string,
  nameLast: string
): { token: string } {
  const data = getData() as Data;

  if (findUserWithEmail(email) !== undefined) {
    throw new Error('Email is already in use');
  }

  // checking format for email
  if (isEmail(email) === false) {
    throw new Error('Email is not a valid email');
  }

  // checking first name and last name are of valid inputs
  if (!checkNameIsValidInput(nameFirst)) {
    throw new Error('First name is invalid');
  }

  if (!checkNameIsValidInput(nameLast)) {
    throw new Error('Last name is invalid');
  }

  // Password does not contain at least one letter or number
  if (checkValidPassword(password) === false) {
    throw new Error('Password is not strong enough');
  }

  const user = {
    userId: data.users.length,
    name: `${nameFirst} ${nameLast}`,
    email,
    password: hashPassword(password),
    numSuccessfulLogins: 1,
    numFailedPasswordsSinceLastLogin: 0,
    oldPasswords: [] as string[],
    totalSessionNum: 1,
    activeSessionIds: [] as number[]
  };
  const newSessionId = generateSessionId();
  user.activeSessionIds.push(newSessionId);

  const encodedToken = generateToken(user.userId, newSessionId);
  data.users.push(user);

  saveData(data);

  return { token: encodedToken };
}