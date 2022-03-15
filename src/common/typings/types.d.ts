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

type Priority = "urgent" | "high" | "normal" | "low";

type Color = "red" | "green" | "blue";

type TaskState = "open" | "completed" | "overdue";

type TimeframeSelection = "all" | "tomorrow";

type AnnouncementCategory = "announcement" | "update";

type SettingsCategory = "general" | "customization" | "about";