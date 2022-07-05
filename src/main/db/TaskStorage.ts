import fs from "fs";
import { isEqual } from "lodash";
import Storage from "./Storage";

export default class TaskStorage extends Storage {
  
  /**
   * The complete path to the task storage file.
   */
  private readonly STORAGE_PATH: string;
  private readonly FILE_NAME: string;
  private readonly FILE_NOT_FOUND_MESSAGE = "Task storage file does not exist.";

  // Used to prevent re-instantiation of this class
  private static instantiated = false;

  constructor() {
    if (TaskStorage.instantiated) {
      throw Error("Instances of 'Storage' may only exist once");
    }
    super();
    this.FILE_NAME = `taskDB.json`;
    this.STORAGE_PATH = this.STORAGE_DIR + this.FILE_NAME;
    this.createFile();
    TaskStorage.instantiated = true;
  }

  private storageExists() {
    return fs.existsSync(this.STORAGE_PATH);
  }

  createFile() {
    if (this.storageExists()) {
      return;
    }

    fs.writeFileSync(this.STORAGE_PATH, JSON.stringify({ tasks: []}));
  }

  updateFile(tasks: Homework[]) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    fs.writeFileSync(this.STORAGE_PATH, JSON.stringify({ tasks: tasks }));
  }

  resetFile() {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.writeFileSync(this.STORAGE_PATH, JSON.stringify({ tasks: []}));
  }

  getData(): Homework[] {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    let tempTasks: { tasks: Homework[]};
    let tasks: Homework[];
    try {
      tempTasks = JSON.parse(fs.readFileSync(this.STORAGE_PATH, { encoding: "utf-8" }));
      tasks = tempTasks.tasks;
    } catch (err) {
      throw new Error(`An error occured while loading tasks:\n${err}`);
    }
    tasks.forEach(current => {
      current.dueDate = new Date(current.dueDate);
    });
    return tasks;
  }

  getStoragePath() {
    return this.STORAGE_DIR + this.FILE_NAME;
  }

  addTask(newTask: Homework) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    const tasks = this.getData();

    tasks.push(newTask);

    fs.writeFileSync(this.STORAGE_PATH, JSON.stringify({ tasks: tasks }));
  }

  updateTask(task: Homework) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }
    let tasks = this.getData();

    tasks = tasks.map(current => {
      if (current.id === task.id) {
        return task;
      } else {
        return current;
      }
    });

    this.updateFile(tasks);
  }

  completeTask(taskToComplete: Homework) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    const tasks = this.getData();

    tasks.forEach(current => {
      if (current.id === taskToComplete.id) {
        current.state = "completed";
        current.color = "green";
      }
    });

    /* const targetIndex = tasks.findIndex(current => isEqual(current, taskToComplete));
    tasks[targetIndex] = { ...tasks[targetIndex], color: "green", state: "completed" }; */

    this.updateFile(tasks);
  }

  incompleteTask(taskToIncomplete: Homework) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    const tasks = this.getData();

    const targetIndex = tasks.findIndex(current => isEqual(current, taskToIncomplete));
    tasks[targetIndex] = { ...tasks[targetIndex], color: "blue", state: "open" };

    this.updateFile(tasks);
  }

  removeTask(taskToRemove: Homework) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    const tasks = this.getData();

    const targetIndex = tasks.findIndex(current => isEqual(current, taskToRemove));
    tasks.splice(targetIndex, 1);

    this.updateFile(tasks);
  }

  getNextId() {
    let highestId = 0;

    const tasks = this.getData();

    tasks.forEach(current => {
      if (current.id >= highestId) {
        highestId = current.id + 1;
      }
    });

    return highestId;
  }
}