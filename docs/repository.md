# Repository
This repository contains all files needed to generate a production build of the application.

# Structure
As this project uses [create-react-app](https://github.com/facebook/create-react-app) it uses the same file structure as every other CRA project with the addition of the [electorn](../electron/), [assets](../assets/) and [@types](../%40types/) folders. Their usage is documented below.

## [src](../src)
The source folder contains all files needed to render the application, including images, etc. 

As this folder will run in the renderer process of electron, it will not have access to NodeJS APIs such as `require()`. This means that we cannot use things like `ipcRenderer` inside it. In order to use NodeJS APIs in the renderer process we have to expose them in our [preload.ts](../electron/preload/preload.ts) using the `contextBridge` module provided by electron.

## [public](../public)
At the moment this folder only contains the `index.html` needed by CRA.

## [electron](../electron/)
Contains all files that run in the main process of electron. This folder has full access to NodeJS APIs.

## [docs](.)
Contains all files that help document the project.

## [assets](../assets/)
At the moment this folder only contains build assets, such as license, icons, etc.

## [@types](../%40types/)
All custom types should live inside this folder as TS might ignore them otherwise.

---
All config/settings files should only be edited after consultation with the maintainers of this repository.