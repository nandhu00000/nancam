const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");
const fs = require("fs");

const DB_DIR = path.join(process.cwd(), "db");
const MAIN_DB_PATH = path.join(DB_DIR, "maindb.json");
const ATTACKS_DIR = path.join(DB_DIR, "attacks");

function ensureDirs() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  if (!fs.existsSync(ATTACKS_DIR)) fs.mkdirSync(ATTACKS_DIR, { recursive: true });

  if (!fs.existsSync(MAIN_DB_PATH)) {
    fs.writeFileSync(
      MAIN_DB_PATH,
      JSON.stringify({ username: "cappriciosec", password: "b2664f56d05c1fb89ce6df3671841f19", chatid: "", attacks: [] }, null, 2)
    );
  }
}

ensureDirs();

const adapter = new FileSync(MAIN_DB_PATH);
const db = low(adapter);

db.defaults({ username: "", password: "", chatid: "", attacks: [] }).write();

function createAttack({ uuid, datetime, name, template }) {
  db.get("attacks").push({ uuid, datetime, name, template }).write();

  const attackData = {
    uuid,
    name,
    createdAt: datetime,
    lastUsed: datetime,
    template,
    logs: []
  };

  fs.writeFileSync(
    path.join(ATTACKS_DIR, `${uuid}.json`),
    JSON.stringify(attackData, null, 2)
  );
}

function logAttackVisit(uuid, { ip, useragent, filename,ts }) {
   const nowIso = new Date(ts || Date.now()).toISOString();
  const filePath = path.join(ATTACKS_DIR, `${uuid}.json`);
  if (!fs.existsSync(filePath)) return;

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  data.logs = Array.isArray(data.logs) ? data.logs : [];

  

  data.logs.push({
    ip,
    useragent,
    filename,
    timestamp: ts,
    at: new Date(ts).toISOString()
  });

  data.lastUsed = new Date(ts).toISOString();

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


function setUser({ username, password, chatid }) {
  db.set("username", username).write();
  db.set("password", password).write();
  db.set("chatid", chatid).write();
}

function getUser() {
  return {
    username: db.get("username").value(),
    password: db.get("password").value(),
    chatid: db.get("chatid").value()
  };
}

function getAttacks() {
  return db.get("attacks").value();
}

function getAttack(uuid) {
  const filePath = path.join(ATTACKS_DIR, `${uuid}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getChatId() {
  return db.get("chatid").value();
}

function deleteAttack(uuid) {
  const attacks = db.get("attacks").value().filter(a => a.uuid !== uuid);
  db.set("attacks", attacks).write();
  const filePath = path.join(ATTACKS_DIR, `${uuid}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}


module.exports = {
  createAttack,
  logAttackVisit,
  setUser,
  getUser,
  getAttacks,
  getAttack,
  getChatId,
  deleteAttack 
};

