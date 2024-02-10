import * as vscode from 'vscode';
import { HelloWorldPanel } from './panels/HelloWorldPanel';

export function activate(context: vscode.ExtensionContext) {
  const helloCommand = vscode.commands.registerCommand(
    'hello-world.helloWorld',
    () => {
      HelloWorldPanel.render(context.extensionUri);
    },
  );

  context.subscriptions.push(helloCommand);
}

export function deactivate() {}
