import { getData, Data, User, saveData } from './dataStore';
import {
  findUserWithEmail,
  checkNameIsValidInput,
  checkValidPassword,
  hashPassword
} from './helperFunctions';
import {
  generateToken,
  generateSessionId,
  decodeToken,
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

/**
 * @param {String} email
 * @param {String} password
 */
export function userLogin(
  email: string,
  password: string
) {
  const data = getData() as Data;
  const user = data.users.find(u => u.email === email);
  if (user === undefined) {
    throw new Error('Password or email address does not exist or is incorrect');
  }

  if (user.password !== hashPassword(password)) {
    user.numFailedPasswordsSinceLastLogin++;
    saveData(data);
    throw new Error('Password or email address does not exist or is incorrect');
  }

  user.numSuccessfulLogins++;
  user.numFailedPasswordsSinceLastLogin = 0;
  user.totalSessionNum++;
  const newSessionId = generateSessionId();
  user.activeSessionIds.push(newSessionId);
  const encodedToken = generateToken(user.userId, newSessionId);
  saveData(data);

  return { token: encodedToken };
}

/**
 * @param {String} token
 */
export function userLogout(
  token: string
) {
  const data = getData() as Data;
  const decodedToken = decodeToken(token);
  const user = data.users.find(u => u.userId === decodedToken.userId) as User;
  user.activeSessionIds = user.activeSessionIds.filter(id => id !== decodedToken.sessionId);

  saveData(data);
  return {};
}
