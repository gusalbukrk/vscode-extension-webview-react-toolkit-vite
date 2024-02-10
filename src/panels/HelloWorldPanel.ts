import * as fs from 'node:fs';
import * as vscode from 'vscode';

import { getUri } from '../utilities/getUri';
import { getNonce } from '../utilities/getNonce';
import interpolateHtmlString from '../utilities/interpolateHtmlString';

export class HelloWorldPanel {
  public static currentPanel: HelloWorldPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      extensionUri,
    );
    this._setWebviewMessageListener(this._panel.webview);
  }

  public static render(extensionUri: vscode.Uri) {
    if (HelloWorldPanel.currentPanel) {
      HelloWorldPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel(
        'helloworld',
        'Hello World',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.joinPath(extensionUri, 'out'),
            vscode.Uri.joinPath(extensionUri, 'src', 'assets'),
          ],
        },
      );

      HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
    }
  }

  public dispose() {
    HelloWorldPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _getWebviewContent(
    webview: vscode.Webview,
    extensionUri: vscode.Uri,
  ) {
    const documentUri = getUri(webview, extensionUri, [
      'src',
      'assets',
      'HelloWorldPanel.html',
    ]);
    const styleUri = getUri(webview, extensionUri, [
      'src',
      'assets',
      'HelloWorldPanel.css',
    ]);
    const webviewUri = getUri(webview, extensionUri, ['out', 'webview.js']);

    const nonce = getNonce();

    return interpolateHtmlString(fs.readFileSync(documentUri.fsPath, 'utf8'), {
      webview,
      nonce,
      styleUri,
      webviewUri,
    });
  }

  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      async (message: any) => {
        const command = message.command;
        const text = message.text;

        switch (command) {
          case 'howdy':
            vscode.window.showInformationMessage(text);
            return;
          case 'loaded':
            const article = await (
              await fetch('https://jsonplaceholder.typicode.com/posts/1')
            ).json();

            this._panel.webview.postMessage({
              command: 'loaded',
              text: article.title,
            });

            return;
        }
      },
      undefined,
      this._disposables,
    );
  }
}
