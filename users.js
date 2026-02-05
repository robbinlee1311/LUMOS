import fs from "fs";

const DB_FILE = "./db.json";

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export function createUser(username, profile, mainDomain) {
  const db = readDB();

  if (db.users.find(u => u.username === username)) {
    throw new Error("User exists");
  }

  const user = {
    username,
    profile,
    subdomain: `${username}.${mainDomain}`,
    created_at: new Date().toISOString()
  };

  db.users.push(user);
  writeDB(db);

  return user;
}

export function getUser(username) {
  const db = readDB();
  return db.users.find(u => u.username === username) || null;
}

