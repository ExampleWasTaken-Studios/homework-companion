import fs from "fs";
import { USER_DATA_PATH } from "../main";

export default abstract class Storage {
  /**
   * The path to the storage location for all user generated data.
   */
  protected STORAGE_DIR: string;

  /**
   * Creates the storage dir if it does not exist already.
   */
  // The reason 'this.createDir()' isn't used here is because 'this.STORAGE_DIR' would throw 'Property 'STORAGE_DIR' has no initializer and is not definitely assigned in the constructor.' otherwise.
  constructor() {
    let pathSeparator: string;
    if (process.platform === "win32") {
      pathSeparator = "\\";
    } else {
      pathSeparator = "/";
    }
    this.STORAGE_DIR = `${USER_DATA_PATH}${pathSeparator}db${pathSeparator}`;
    if (!fs.existsSync(this.STORAGE_DIR)) {
      fs.mkdirSync(this.STORAGE_DIR, { recursive:true });
    }
  }

  /**
   * Creates the storage dir if it does not exist already.
   */
  protected createDir() {
    this.STORAGE_DIR = `${USER_DATA_PATH}/db`;
    if (!fs.existsSync(this.STORAGE_DIR)) {
      fs.mkdirSync(this.STORAGE_DIR, { recursive:true });
    }
  }

  /**
   * Deletes the storage dir.
   */
  protected deleteDir() {
    fs.rmSync(this.STORAGE_DIR, { recursive: true, force: true });
    this.STORAGE_DIR = "null";
  }

  /**
   * Gets the path of the storage dir.
   * @returns The path of the storage dir.
   * @throws An error if the storage dir does not exist.
   */
  protected getDir() {
    if (this.STORAGE_DIR !== "null") {
      return this.STORAGE_DIR;
    } else {
      throw new Error("Storage dir does not exist");
    }
  }

  /**
   * Create the file corresponding to the goal of the subclass.
   */
  abstract createFile(): void;

  /**
   * Update the file corresponding to the goal of the subclass.
   */
  abstract updateFile(newContents: unknown): void;

  /**
   * Reset the file corresponding to the goal of the subclass.
   */
  abstract resetFile(): void;

  /**
   * The the contents of the corresponding file.  
   * This method should be
   */
  abstract get(): unknown;

  /**
   * Get the path to the file corresponding to the goal of the subclass.
   */
  abstract getStoragePath(): string;
}