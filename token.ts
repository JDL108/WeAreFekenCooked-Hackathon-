import { getData } from './dataStore';
import { User, Data, tokenObject } from './dataStore';

/**
 * Generates a token using the userId and the sessionId of the user
 * @param {number} userId Id of the user
 * @param {number} sessionId Current sessionId of the user
 * @returns {string}
 */
export function generateToken(userId: number, sessionId: number): string {
  const token = encodeURIComponent(
    JSON.stringify({
      sessionId,
      userId,
    })
  );
  return token;
}

/**
 * Decodes a token from JSON to be valid javascript
 * @param {number} token an encoded JSON string
 * @returns {tokenObject}
 */
export function decodeToken(token: string): tokenObject {
  const decodedToken = JSON.parse(decodeURIComponent(token)) as tokenObject;
  return decodedToken;
}

/**
 * Determines if the token given is a valid token that exists
 * @param {string} token the user's token as a string
 *
*/
export const checkToken = (token: string) => {
  if (token === '') {
    throw new Error('Empty token provided');
  }
  const decodedToken = decodeToken(token);
  if (validateToken(decodedToken) === false) {
    throw new Error('Invalid token provided');
  }
};

/**
 * Determines if the token given is a valid token that exists
 * @param {tokenObject} token the user's decoded token object
 * @returns {boolean}
*/
export function validateToken(token: tokenObject): boolean {
  for (const user of (getData() as Data).users) {
    if (user.userId === token.userId &&
      user.activeSessionIds.includes(token.sessionId) === true) {
      return true;
    }
  }

  return false;
}

/**
 * Find a user given their token
 * @param {number} token
 * @returns {User}
*/
export function findUserWithToken(token: string): User {
  const decodedToken = decodeToken(token);

  const user = (getData() as Data).users.find(
    u => u.activeSessionIds.includes(decodedToken.sessionId) &&
    u.userId === decodedToken.userId
  ) as User;
  return user;
}

/**
 * A function that generates a number that represents a sessionId
 * @returns {number}
 */
export function generateSessionId(): number {
  return Math.floor(10000000 + Math.random() * 90000000);
}
/**
 * a function the generates a number representing a playerId
 * @returns {number}
 */
export function generatePlayerId(): number {
  return Math.floor(10000000 + Math.random() * 90000000);
}
