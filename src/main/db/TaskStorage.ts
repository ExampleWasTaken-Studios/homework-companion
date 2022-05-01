import fs from "fs";
import Storage from "./Storage";

export default class TaskStorage extends Storage {
  
  /**
   * The complete path to the task storage file.
   */
  private readonly STORAGE_PATH: string;
  private readonly FILE_NAME: string;

  private static instantiated = false;

  constructor() {
    if (TaskStorage.instantiated) {
      throw Error ("Instances of 'Storage' may only exist once");
    }
    super();
    this.FILE_NAME = `taskDB.json`;
    this.STORAGE_PATH = this.STORAGE_DIR + this.FILE_NAME;
    console.log(this.STORAGE_PATH);
    this.createFile();
    TaskStorage.instantiated = true;
  }

  private storageExists() {
    return fs.existsSync(this.STORAGE_PATH);
  }

  createFile(): void {
    if (this.storageExists()) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.writeFile(this.STORAGE_PATH, JSON.stringify([]), _err => null);
  }

  updateFile(newTasks: Homework[]): void {
    if (!this.storageExists()) {
      console.warn("File does not exist");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.writeFile(this.STORAGE_PATH, JSON.stringify(newTasks), _err => false);
  }

  resetFile(): void {
    if (!this.storageExists()) {
      console.warn("File does not exist");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.writeFile(this.STORAGE_PATH, JSON.stringify([]), _err => false);
  }

  get(): Homework[] {
    if (!this.storageExists()) {
      throw new Error("File does not exists");
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

  getStoragePath(): string {
    return this.STORAGE_DIR + this.FILE_NAME;
  }
  
}