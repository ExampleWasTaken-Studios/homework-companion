enum Channels {
  GET_SETTING_VALUE = "settings/value/get",
  SET_SETTING_VALUE = "settings/value/set",

  RELAUNCH_APP = "app/relaunch",

  GET_USER_DATA_PATH = "app/userDataPath",

  GET_NEXT_TASK_ID = "tasks/get/next-id",
  GET_NEXT_TASK_ID_RESPONSE = "tasks/get/next-id/response",
  GET_TASKS = "tasks/get",
  GET_TASKS_RESPONSE = "tasks/get/response",
  ADD_TASK = "tasks/add",
  ADD_TASK_SUCCESS = "tasks/add/success",
  ADD_TASK_FAIL = "tasks/add/fail",
  UPDATE_TASK = "tasks/update",
  UPDATE_TASK_SUCCESS = "tasks/update/success",
  UPDATE_TASK_FAIL = "tasks/update/fail",
  DELETE_TASK = "tasks/delete",
  DELETE_TASK_SUCCESS = "tasks/delete/success",
  DELETE_TASK_FAIL = "tasks/delete/fail",

  GET_NEXT_SUBJECT_ID = "subjects/get/next-id",
  GET_NEXT_SUBJECT_ID_RESPONSE = "subjects/get/next-id/response",
  GET_SUBJECT_ID = "subjects/get/id",
  GET_SUBJECT_ID_RESPONSE = "subjects/get/id/response",
  GET_SUBJECT_BY_ID = "subjects/get/by-id",
  GET_SUBJECT_BY_ID_RESPONSE = "subject/get/by-id/response",
  GET_SUBJECTS = "subjects/get",
  GET_SUBJECTS_RESPONSE = "subjects/get/response",
  SET_SUBJECTS = "subjects/set",
  SET_SUBJECTS_SUCCESS = "subjects/set/success",
  SET_SUBJECTS_FAIL = "subjects/set/fail",
  ADD_SUBJECT = "subjects/add",
  ADD_SUBJECT_SUCCESS = "subjects/add/success",
  ADD_SUBJECT_FAIL = "subjects/add/fail",
  UPDATE_SUBJECT = "subjects/update",
  UPDATE_SUBJECT_SUCCESS = "subjects/update/success",
  UPDATE_SUBJECT_FAIL = "subjects/update/fail",
  DELETE_SUBJECT = "subjects/delete",
  DELETE_SUBJECT_SUCCESS = "subjects/delete/success",
  DELETE_SUBJECT_FAIL = "subjects/delete/fail"
}

export default Channels;
