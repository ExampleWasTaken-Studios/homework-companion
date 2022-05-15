/**
 * Dummy object to prevent setting{@link Homework} to null.
 */
export const NULL_TASK: Homework = {
  id: -1,
  color: "red",
  title: "NULL_TASK",
  dueDate: new Date(999999999999999),
  subject: {
    id: -1,
    name: "NULL_SUBJECT"
  },
  priority: "urgent", // set to urgent to appear at the top
  important: false,
  state: "open",
  content: "NULL_CONTENT",
  metaInfo: {
    dateCreated: new Date(999999999999999)
  }
};