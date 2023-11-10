import Database from "better-sqlite3";
import { app } from "electron";
import path from "path";

const userDataPath = app.getPath("userData");

const db = new Database(path.resolve(userDataPath, "brainbase.db"), {
  verbose: console.log,
});
db.pragma("journal_mode = WAL");

export const initDB = () => {
  const createTable = db.prepare(
    "CREATE TABLE IF NOT EXISTS thoughts (id INTEGER PRIMARY KEY, text TEXT)"
  );
  createTable.run();
};

export const saveToDB = (text: string) => {
  const insert = db.prepare("INSERT INTO thoughts (text) VALUES (?)");
  insert.run(text);
};
