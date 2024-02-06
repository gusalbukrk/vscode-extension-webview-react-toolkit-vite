// ambient module declaration file

// https://github.com/microsoft/vscode-webview-ui-toolkit/issues/296
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vscode-button": any;
    }
  }
}

export {} // https://stackoverflow.com/a/59499895