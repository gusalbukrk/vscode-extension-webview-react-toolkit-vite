import React from 'react';
import { createRoot } from 'react-dom/client';
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeButton());

const App = () => {
  return (
      <div>
          <h2>Hello, world!</h2>
          <vscode-button id="howdy" onClick={handleButtonClick}>Howdy!</vscode-button>
      </div>
  );
};

const vscode = acquireVsCodeApi();
console.log(vscode);

function handleButtonClick() {
  vscode.postMessage({
      command: 'howdy',
      text: 'Hey there partner! 👋',
  });
}

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

