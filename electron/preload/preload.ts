import { contextBridge, ipcRenderer, shell } from "electron";
import { isEqual } from "lodash";
import userSettingsKeys from "../settings/userSettingsPath";
import { Channels } from "./Channels";

const app = {
  getVersion: async (): Promise<string> =>  await ipcRenderer.invoke(Channels.GET_APP_VERSION),
  getPlatform: process.platform,
  getAssetsPath: async (): Promise<string> => await ipcRenderer.invoke(Channels.GET_ASSETS_PATH),
  relaunch: (force = false): void => ipcRenderer.send(Channels.RELAUNCH_APP, force),
  openExternal: (url: string, options?: Electron.OpenExternalOptions | undefined) => shell.openExternal(url, options),
  checkForUpdates: async () => await ipcRenderer.invoke(Channels.CHECK_FOR_UPDATES)
};

const util = {
  isEqual: (value: unknown, other: unknown) => isEqual(value, other)
};

const settings = {
  getSettingValue: async (key: string): Promise<unknown> => await ipcRenderer.invoke(Channels.GET_SETTING_VALUE, key),
  setSettingValue: (key: string, value: unknown): void => ipcRenderer.send(Channels.SET_SETTING_VALUE, key, value),
  userSettingsKeys: userSettingsKeys,
};

const tasks = {
  getNextId: async (): Promise<number> => await ipcRenderer.invoke(Channels.GET_NEXT_TASK_ID),
  get: async (): Promise<Homework[]> => await ipcRenderer.invoke(Channels.GET_TASKS),
  addTask: (task: Homework): void => ipcRenderer.send(Channels.ADD_TASK, task),
  updateTask: (task: Homework): void => ipcRenderer.send(Channels.UPDATE_TASK, task),
  deleteTask: (task: Homework): void => ipcRenderer.send(Channels.DELETE_TASK, task),
};

const subjects = {
  getNextId: async (): Promise<number> => await ipcRenderer.invoke(Channels.GET_NEXT_SUBJECT_ID),
  getId: async (subject: Subject): Promise<number> => await ipcRenderer.invoke(Channels.GET_SUBJECT_ID, subject),
  getById: async (id: number): Promise<Subject> => await ipcRenderer.invoke(Channels.GET_SUBJECT_BY_ID, id),
  get: async (): Promise<Subject[]> => await ipcRenderer.invoke(Channels.GET_SUBJECTS),
  set: (subjects: Subject[]): void => ipcRenderer.send(Channels.SET_SUBJECTS, subjects),
  addSubject: (subject: Subject): void => ipcRenderer.send(Channels.ADD_SUBJECT, subject),
  updateSubject: (subject: Subject): void => ipcRenderer.send(Channels.UPDATE_SUBJECT, subject),
  deleteSubject: (subject: Subject): void => ipcRenderer.send(Channels.DELETE_SUBJECT, subject)
};

export const API = {
  app: app,
  util: util,
  settings: settings,
  tasks: tasks,
  subjects: subjects
};

contextBridge.exposeInMainWorld("api", API);
