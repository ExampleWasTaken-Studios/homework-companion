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
  priority: "Urgent", // set to urgent to appear at the top
  important: false,
  state: "open",
  content: "If you're seeing this, you found a bug that our little mice didn't find when we sent them out to eat them all.\nPlease report the issue to us!",
  metaInfo: {
    dateCreated: new Date(999999999999999)
  }
};

/**
 * Dummy object to prevent settings {@link Subject} to null.
 */
export const NULL_SUBJECT: Subject = {
  id: -1,
  name: "NULL_SUBJECT"
};