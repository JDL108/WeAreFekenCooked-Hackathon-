import fs from "fs-sync"

export type Data = {
  users: User[]
}

export type User = {
  userId: number,
  name: string,
  email: string,
  password: string,
  numSuccessfulLogins: number,
  numFailedPasswordsSinceLastLogin: number,
  oldPasswords: string[],
  totalSessionNum: number,
  activeSessionIds: number[],
}

export type tokenObject = {
  sessionId: number;
  userId: number;
};

let dataStore: Data | undefined;

const DATABASE_FILE = 'database.json';

const defaultData = () => ({
  users: [] as User[]
});

/* E.g. usage for loadData() and save data:
  let data = loadData();
  saveData(data);
*/

export function getData() {
  if (dataStore) {
    return dataStore;
  }

  if (!fs.existsSync(DATABASE_FILE)) {
    dataStore = defaultData();
    return dataStore;
  }

  const data = String(fs.readFileSync(DATABASE_FILE));
  dataStore = JSON.parse(data);

  return dataStore;
}

export function saveData(data: Data) {
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(data));
  dataStore = data;
}
