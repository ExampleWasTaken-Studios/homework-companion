enum CHANNELS {
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
  DELETE_TASK_FAIL = "tasks/delete/fail"
}

export default CHANNELS;
