import fetch from 'node-fetch';
import * as vscode from 'vscode';
import { resolveCliPathFromVSCodeExecutablePath } from 'vscode-test';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('livecode.update', async () => {

		const editor = vscode.window.activeTextEditor;

		if (!editor)
		{
			vscode.window.showInformationMessage("Editor does not exist");
			return;
		}

		const path = editor.document.uri.path;
		const text = editor.document.getText();

		const api = "http://faker.ca/livecode/api.php?";

		const response = await fetch(api + "path=" + path + "&content=" + text);
		await response.json();

		vscode.window.showInformationMessage("LiveCode has been updated!");

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
