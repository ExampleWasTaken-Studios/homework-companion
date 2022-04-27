import fs from "fs";

export const fileExists = (path: string): boolean => {
  let flag = true;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fs.access(path, err => null);
  } catch (e) {
    flag = false;
  }
  return flag;
};