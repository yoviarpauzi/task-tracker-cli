import { v4 as uuidv4 } from "uuid";
import { green, red, yellow, purple } from "./chalk.js";
import { table } from "table";
import { type Task, TaskStatus } from "../types/task.types.js";
import { loadDatabase, saveTask } from "./database.js";

const { log } = console;

/**
 * Adds a new task to the database.
 * @param description - task description
 */
const addTask = (description: string): void => {
  try {
    const tasks: Task[] = loadDatabase();
    const now: number = Date.now();
    const newTask: Task = {
      id: uuidv4(),
      description: description,
      status: TaskStatus.TODO,
      created_at: now,
      updated_at: null,
    };
    tasks.push(newTask);
    saveTask(tasks);
    log(green.bold(`✅ Task added (ID: ${newTask.id})`));
  } catch (error) {
    log(red.bold(`❌ Failed to add task`));
    throw error;
  }
};

/**
 * Updates an existing task's description.
 * @param id
 * @param description
 */
const updateTask = (id: string, description: string): void => {
  try {
    const tasks: Task[] = loadDatabase();
    const taskIndex: number = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      log(red.bold(`❌ Task with ID ${id} not found.`));
      return;
    }
    tasks[taskIndex]!.description = description;
    tasks[taskIndex]!.updated_at = Date.now();
    saveTask(tasks);
    log(green.bold(`✅ Task updated (ID: ${id})`));
  } catch (error) {
    log(red.bold("❌ Failed to update task"));
    throw error;
  }
};

/**
 * Deletes a task from the database.
 * @param id
 */
const deleteTask = (id: string): void => {
  try {
    const tasks: Task[] = loadDatabase();
    const taskIndex: number = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      log(red.bold(`❌ Task with ID ${id} not found.`));
      return;
    }
    tasks.splice(taskIndex, 1);
    saveTask(tasks);
    log(green.bold(`✅ Task deleted (ID: ${id})`));
  } catch (error) {
    log(red.bold("❌ Failed to delete task"));
    throw error;
  }
};

/**
 * Marks a task as in-progress.
 * @param id
 */
const markTaskAsInProgress = (id: string): void => {
  try {
    const tasks: Task[] = loadDatabase();
    const taskIndex: number = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      log(red.bold(`❌ Task with ID ${id} not found.`));
      return;
    }
    tasks[taskIndex]!.status = TaskStatus.IN_PROGRESS;
    tasks[taskIndex]!.updated_at = Date.now();
    saveTask(tasks);
    log(green.bold(`✅ Task marked as in-progress (ID: ${id})`));
  } catch (error) {
    log(red.bold("❌ Failed to mark task as in-progress"));
    throw error;
  }
};

/**
 * Marks a task as done.
 * @param id
 */
const markTaskAsDone = (id: string): void => {
  try {
    const tasks: Task[] = loadDatabase();
    const taskIndex: number = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      log(red.bold(`❌ Task with ID ${id} not found.`));
      return;
    }
    tasks[taskIndex]!.status = TaskStatus.DONE;
    tasks[taskIndex]!.updated_at = Date.now();
    saveTask(tasks);
    log(green.bold(`✅ Task marked as done (ID: ${id})`));
  } catch (error) {
    log(red.bold("❌ Failed to mark task as done"));
    throw error;
  }
};

/**
 * Prints tasks in a formatted table.
 * @param tasks
 * @param status
 */
const printTask = (tasks: Task[], status: string): void => {
  const data = tasks.map((task) => {
    let statusColored: string;

    switch (task.status) {
      case TaskStatus.TODO:
        statusColored = yellow(task.status);
        break;
      case TaskStatus.IN_PROGRESS:
        statusColored = purple(task.status);
        break;
      case TaskStatus.DONE:
        statusColored = green(task.status);
        break;
    }

    return [
      task.id,
      task.description,
      statusColored,
      new Date(task.created_at).toLocaleString(),
      task.updated_at ? new Date(task.updated_at).toLocaleString() : "-",
    ];
  });

  const tableData = [
    ["ID", "Description", "Status", "Created At", "Updated At"],
    ...data,
  ];

  log(purple.bold(`📋 Task List ${status}`));
  log(table(tableData));
};

/**
 * Lists tasks based on their status.
 * @param status
 * @returns
 */
const listTasks = (status: TaskStatus | string): void => {
  try {
    const tasks: Task[] = loadDatabase();

    let filteredTasks =
      status !== "all" ? tasks.filter((t) => t.status === status) : tasks;

    if (filteredTasks.length === 0) {
      log(yellow.bold("⚠️ No tasks found."));
      return;
    }

    printTask(filteredTasks, status);
  } catch (error) {
    log(red.bold("❌ Failed to list tasks"));
    throw error;
  }
};

export {
  loadDatabase,
  addTask,
  updateTask,
  deleteTask,
  markTaskAsInProgress,
  markTaskAsDone,
  listTasks,
  TaskStatus,
};
