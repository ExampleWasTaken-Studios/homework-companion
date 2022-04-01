import { app } from "electron";
import fs from "fs";

export class TaskStorage {
  private readonly STORAGE_PATH = `${app.getPath("userData")}/taskStorage/taskStorage.json`;
  private storageExists: boolean;

  private tasks: TaskSchema;

  constructor() {
    this.storageExists = fs.existsSync(this.STORAGE_PATH);
    if (this.storageExists) {
      this.tasks = JSON.parse(fs.readFileSync(this.STORAGE_PATH, {encoding: "utf-8"}));
    } else {
      this.tasks = [null];
    }
  }

  /**
   * Create a new task storage file.  
   * This method will only succeed if no taskStorage file exists.
   * @returns true if operation succeeded, false otherwise.
   */
  public create(): boolean {
    if (this.storageExists) {
      return false;
    }

    fs.writeFile(this.STORAGE_PATH, JSON.stringify(this.tasks), err => {
      console.error("An error occured while creating the task storage. Deleteing the file.",err);
      fs.rmSync(this.STORAGE_PATH, {force: true});
      return false;
    });
    return true;
  }

  /**
   * Update the task storage file.
   * @returns true if the operation succeeded, false otherwise.
   */
  public update(): boolean {
    if (!this.storageExists) {
      console.warn("File does not exist");
      return false;
    }
    const tempTasks = fs.readFileSync(this.STORAGE_PATH, {encoding: "utf-8"});
    fs.writeFile(this.STORAGE_PATH, JSON.stringify(this.tasks), err => {
      console.error("An error occured while trying to update the task storage. Reverting back to previous version.", err);
      fs.writeFile(this.STORAGE_PATH, JSON.stringify(tempTasks), err => {
        console.error("An error occured while reverting back to previous version.", err);
        return false;
      });
      return false;
    });
    return true;
  }

  /**
   * Loads tasks from disk.
   * @returns true if the operation succeeded, false otherwise.
   */
  public load(): boolean {
    if (!this.storageExists) {
      console.warn("File does not exist");
      return false;
    }
    let tempTask: TaskSchema;
    try {
      tempTask = JSON.parse(fs.readFileSync(this.STORAGE_PATH, {encoding: "utf-8"}));
    } catch (error) {
      console.error("An error occurred while loading tasks.", error);
      return false;
    }
    this.tasks = tempTask;
    return true;
  }

  /**
   * Resets the task state.
   * @returns true if the operation succeeded, false otherwise.
   */
  public reset(): boolean {
    if (!this.storageExists) {
      console.warn("File does not exist. Nothing to reset.");
      return false;
    }
    this.tasks = [null];
    return true;
  }
}