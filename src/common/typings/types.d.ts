interface Subject {
  id: number;
  name: string;
}

interface Homework {
  id: number;
  color: Color;
  title: string;
  dueDate: Date;
  subject: Subject;
  priority: Priority;
  important: boolean;
  state: TaskState;
  content: string;
}

interface ModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

type Priority = "urgent" | "high" | "normal" | "low";

type Color = "red" | "green" | "blue";

type TaskState = "open" | "completed" | "overdue";

type TimeframeSelection = "all" | "tomorrow";

type AnnouncementCategory = "announcement" | "update";

type SettingsCategory = "general" | "customization" | "about";