import fs from "fs";
import { red } from "./chalk.js";
import { type Task } from "../types/task.types.js";

const DATABASE_DIR = "database";

const DATABASE_PATH = `${DATABASE_DIR}/task.json`;

const { log } = console;

/**
 * Loads tasks from the JSON database file. If the file or directory doesn't exist, it creates them.
 * @returns An array of tasks.
 */
const loadDatabase = (): Task[] => {
  try {
    if (!fs.existsSync(DATABASE_DIR)) {
      fs.mkdirSync(DATABASE_DIR);
    }

    if (!fs.existsSync(DATABASE_PATH)) {
      fs.writeFileSync(DATABASE_PATH, JSON.stringify([]));
    }

    const data = fs.readFileSync(DATABASE_PATH, "utf-8");
    return JSON.parse(data) as Task[];
  } catch (error) {
    log(red.bold("❌ Failed to load tasks"));
    throw error;
  }
};

/**
 * Saves tasks to the JSON database file.
 * @param tasks - array of tasks to be saved
 */
const saveTask = (tasks: Task[]): void => {
  try {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(tasks, null, 2));
  } catch (error) {
    log(red.bold("❌ Failed to save tasks"));
    throw error;
  }
};

export { loadDatabase, saveTask };
