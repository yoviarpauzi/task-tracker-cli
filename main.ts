#!/usr/bin/env node
import { green, purple, red } from "./utils/chalk.js";
import {
  addTask,
  updateTask,
  deleteTask,
  markTaskAsDone,
  markTaskAsInProgress,
  listTasks,
  TaskStatus,
} from "./utils/taskManager.js";
const { log } = console;
const [, , command, ...args] = process.argv;

/**
 * Checks if the provided ID is valid.
 * @param id
 */
const checkId = (id: string | undefined): void => {
  if (!id) {
    log(red.bold("❌ Please provide a task ID"));
    process.exit(1);
  }
};

switch (command) {
  case "add":
    addTask(args.join(" "));
    break;
  case "update":
    checkId(args[0]);
    updateTask(args[0]!, args.slice(1).join(" "));
    break;
  case "delete":
    checkId(args[0]);
    deleteTask(args[0]!);
    break;
  case "mark-in-progress":
    checkId(args[0]);
    markTaskAsInProgress(args[0]!);
    break;
  case "mark-done":
    checkId(args[0]);
    markTaskAsDone(args[0]!);
    break;
  case "list":
    const status = args[0] ?? "all";
    if (
      status !== "all" &&
      !Object.values(TaskStatus).includes(status as TaskStatus)
    ) {
      log(red.bold(`❌ Invalid status: ${status}`));
      log(
        purple.bold(
          `Valid statuses are: all, ${Object.values(TaskStatus).join(", ")}`
        )
      );
      process.exit(1);
    }
    listTasks(status);
    break;
  default:
    log(red.bold(`❌ Unknown command: ${command}`));
    log(purple.bold(`Usage: node index.js <command> [args]`));
    log(green.bold(`Commands:`));
    log(green.bold(`  add <description>`));
    log(green.bold(`  update <id> <new description>`));
    log(green.bold(`  delete <id>`));
    log(green.bold(`  mark-in-progress <id>`));
    log(green.bold(`  mark-done <id>`));
    log(green.bold(`  list [status]`));
    break;
}
