import fs from "fs";
import { fileExists } from "../../common/utils/FileUtils";
import { USER_DATA_PATH } from "../main";
import { NULL_TASK } from "../../common/constants";

export class TaskStorage {
  private readonly STORAGE_DIR = `${USER_DATA_PATH}/Task Storage`;
  private readonly STORAGE_FILE_NAME = `taskStorage.json`;
  private readonly STORAGE_PATH = `${this.STORAGE_DIR}/${this.STORAGE_FILE_NAME}`;
  private storageExists: boolean;

  private tasks: Homework[];

  constructor() {
    this.storageExists = fileExists(this.STORAGE_PATH);
    if (this.storageExists) {
      this.tasks = JSON.parse(fs.readFileSync(this.STORAGE_PATH, { encoding: "utf-8" }));
    } else {
      this.tasks = [NULL_TASK];
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

    fs.mkdirSync(this.STORAGE_DIR, { recursive: true });

    fs.writeFile(this.STORAGE_PATH, JSON.stringify(this.tasks), err => {
      console.error("An error occured while creating the task storage. Deleteing the file.",err);
      fs.rmSync(this.STORAGE_PATH, { force: true });
      return false;
    });
    this.storageExists = true;
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
    const tempTasks = fs.readFileSync(this.STORAGE_PATH, { encoding: "utf-8" });
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
    let tempTask: Homework[];
    try {
      tempTask = JSON.parse(fs.readFileSync(this.STORAGE_PATH, { encoding: "utf-8" }));
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
    this.tasks = [NULL_TASK];
    return true;
  }

  /**
   * Get all known tasks. 
   * @returns An array containing all tasks currently stored to disk. If no tasks are either in memory or on disk, null is returned.
   */
  public getTasks(): Homework[] {
    this.load();
    /* return [{
      id: 1,
      color: "red",
      title: "Returned Task",
      dueDate: new Date(),
      subject: {
        id: 1,
        name: "Returned subject"
      },
      priority: "low",
      important: false,
      state: "open",
      content: "This is a task that is returned by the TaskStorage#getTasks() method."
    },
    {
      id: 2,
      color: "blue",
      title: "Returned 2nd Task",
      dueDate: new Date(),
      subject: {
        id: 1,
        name: "Returned 2nd subject"
      },
      priority: "high",
      important: false,
      state: "open",
      content: "This is the 2nd task that is returned by the TaskStorage#getTasks() method."
    }
    ]; */
    return this.tasks;
  }
}