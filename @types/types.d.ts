interface Homework {
  id: number;
  color: Color;
  title: string;
  dueDate: Date;
  subject: number;
  priority: Priority;
  important: boolean;
  state: TaskState;
  content: string;
  metaInfo: {
    dateCreated: Date;
  }
}

interface SettingsSchema {
  settings: {
    general: {
      autoStart: boolean;
      hwAcc: boolean;
    },
    customization: {
      perfMode: boolean;
    }
  },
  cache: {
    window: {
      lastWindowX: number;
      lastWindowY: number;
      maximized: boolean;
    }
  },
  metaInfo: {
    lastVersion: string;
    lastLaunch: number;
  }
}

type Priority = "Urgent" | "High" | "Normal" | "Low";

type Color = "red" | "green" | "blue";

type TaskState = "open" | "completed" | "overdue";

interface Subject {
  id: number;
  name: string;
}

type AnnouncementCategory = "announcement" | "update";

type SettingsCategory = "general" | "customization" | "subjects" | "about";
