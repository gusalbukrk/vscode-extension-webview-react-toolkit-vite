# `vscode-webview-ui-toolkit` react + esbuild example

- created by following [getting started guide](https://github.com/microsoft/vscode-webview-ui-toolkit/blob/main/docs/getting-started.md)
- [vscode-webview-ui-toolkit-samples repo](https://github.com/microsoft/vscode-webview-ui-toolkit-samples/) has other samples (e.g. react + vite)

## File structure

- `src/panels`: contains all of the webview-related code that will be executed within the **extension context**, usually individual js/ts files which one containing a class which manages the state and behavior of a given webview panel
  - a `console.log()` inside these files will appear in the debug console
- `src/webview`: contains all of the code that will be executed within the **webview context**, for instance: front-end framework, javascript files, css files, assets
  - a `console.log()` inside these files will appear in the dev tools console (`CTRL + Shift + i`) during extension execution
