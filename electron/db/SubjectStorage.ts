import fs from "fs";
import { isEqual } from "lodash";
import Storage from "./Storage";

export default class SubjectStorage extends Storage {


  /**
   * The complete path to the subject storage file.
   */
  private readonly STORAGE_PATH: string;
  private readonly FILE_NAME: string;
  private readonly FILE_NOT_FOUND_MESSAGE = "Subject storage file does not exist.";

  // Used to prevent re-instantiation of this class
  private static instantiated = false;

  /**
   *
   */
  constructor() {
    if (SubjectStorage.instantiated) {
      throw Error("Instances of 'Storage' may only exist once");
    }
    super();
    this.FILE_NAME = "subjectDB.json";
    this.STORAGE_PATH = this.STORAGE_DIR + this.FILE_NAME;
    this.createFile();
    SubjectStorage.instantiated = true;
  }

  private storageExists()  {
    return fs.existsSync(this.STORAGE_PATH);
  }

  createFile(): void {
    if (this.storageExists()) {
      return;
    }

    fs.writeFileSync(this.STORAGE_PATH, JSON.stringify({ subjects: []}));
  }

  updateFile(subjects: Subject[]): void {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    fs.writeFileSync(this.STORAGE_PATH, JSON.stringify({ subjects: subjects }));
  }

  resetFile(): void {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    fs.writeFileSync(this.STORAGE_PATH, JSON.stringify({ subjects: []}));
  }


  getData(): Subject[] {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    let tempSubjects: { subjects: Subject[]};
    let subjects: Subject[];
    try {
      tempSubjects = JSON.parse(fs.readFileSync(this.STORAGE_PATH, { encoding: "utf-8" }));
      subjects = tempSubjects.subjects;
    } catch (err) {
      throw new Error(`An error occurred while loading subjects:\n${err}`);
    }
    return subjects;
  }

  getStoragePath(): string {
    return this.STORAGE_DIR + this.FILE_NAME;
  }

  addSubject(newSubject: Subject) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    const subjects = this.getData();

    subjects.push(newSubject);

    fs.writeFileSync(this.STORAGE_PATH, JSON.stringify({ subjects: subjects }));
  }

  updateSubject(subject: Subject) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    let subjects = this.getData();

    subjects = subjects.map(current => {
      if (current.id === subject.id) {
        return subject;
      } else {
        return current;
      }
    });

    this.updateFile(subjects);
  }

  removeSubject(subjectToRemove: Subject) {
    if (!this.storageExists()) {
      throw new Error(this.FILE_NOT_FOUND_MESSAGE);
    }

    const subjects = this.getData();

    const targetIndex = subjects.findIndex(current => isEqual(current, subjectToRemove));
    subjects.splice(targetIndex, 1);

    this.updateFile(subjects);
  }

  getNextId() {
    let highestId = 0;

    const subjects = this.getData();

    subjects.forEach(current => {
      if (current.id >= highestId) {
        highestId = current.id + 1;
      }
    });

    return highestId;
  }

  getSubjectId(subject: Subject): number {
    const subjects = this.getData();

    for (const current of subjects) {
      if (isEqual(subject, current)) {
        return current.id;
      }
    }

    return -2;
  }

  getSubjectById(id: number): Subject {
    const subjects = this.getData();

    for (const current of subjects) {
      if (isEqual(current.id, id)) {
        return current;
      }
    }

    return { id: -2, name: "Deleted Subject" };
  }

}