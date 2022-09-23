import { API } from "../electron/preload/preload";

declare global {
  interface Window {
    api: typeof API;
  }
}
