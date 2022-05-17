import fs from "fs";
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
      throw Error ("Instances of 'Storage' may only exist once");
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.writeFile(this.STORAGE_PATH, JSON.stringify([]), _err => null);
  }

  updateFile(newTask: Homework) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    console.log("spreat array:", [...this.getData(), newTask]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.writeFile(this.STORAGE_PATH, JSON.stringify([...this.getData(), newTask]), _err => false);
  }

  resetFile() {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.writeFile(this.STORAGE_PATH, JSON.stringify([]), _err => false);
  }

  getData(): Homework[] {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    let tasks: Homework[];
    try {
      tasks = JSON.parse(fs.readFileSync(this.STORAGE_PATH, { encoding: "utf-8" }));
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
  
}