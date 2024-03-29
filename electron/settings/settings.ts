import { BrowserWindow } from "electron";
import Store, { Schema } from "electron-store";

const schema: Schema<SettingsSchema> = {
  settings: {
    type: "object",
    // Empty defaults are required when using type: "object" (https://github.com/sindresorhus/conf/issues/85#issuecomment-531651424)
    default: {},
    properties: {
      general: {
        type: "object",
        default: {},
        properties: {
          autoStartEnabled: {
            type: "boolean",
            default: false
          },
          hwAccEnabled: {
            type: "boolean",
            default: true
          }
        }
      }
    }
  },
  cache: {
    type: "object",
    default: {},
    properties: {
      window: {
        type: "object",
        default: {},
        properties: {
          lastWindowX: {
            type: "integer"
          },
          lastWindowY: {
            type: "integer"
          },
          maximized: {
            type: "boolean",
            default: true
          }
        }
      }
    },
  },
  metaInfo: {
    type: "object",
    default: {},
    properties: {
      lastChangelogViewed: {
        type: "string",
        default: "0.0.0"
      },
      lastLaunch: {
        type: "integer",
        default: 0
      }
    }
  }
};

const store = new Store({
  schema,
  clearInvalidConfig: true,
});

export const persistWindowSettings = (win: BrowserWindow): void => {

  console.log("persisting window settings");
  console.log("Dimensions to be stored", win.getSize());
  console.log("Maximized:", win.isMaximized());

  store.set("cache.window.maximized", win.isMaximized());

  const winSize = win.getSize();
  store.set("cache.window.lastWindowX", winSize[0]);
  store.set("cache.window.lastWindowY", winSize[1]);
  return;
};

store.set("metaInfo.lastLaunch", Date.now());

export default store;
