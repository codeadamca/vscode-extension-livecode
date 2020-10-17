import fetch from 'node-fetch';
import * as vscode from 'vscode';

/*
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('livecode.update', async () => {

		const editor = vscode.window.activeTextEditor;

		if (!editor)
		{
			vscode.window.showInformationMessage("Editor does not exist");
			return;
		}

		const path = editor.document.uri.path;
		const content = editor.document.getText();

		const api = "http://livecode.codeadam.ca/api.php";

		const response = await fetch(api + "?path=" + path + "&content=" + content);

		vscode.window.showInformationMessage("LiveCode has been updated!");

	});

	context.subscriptions.push(disposable);
}
*/

export function activate({ subscriptions }: vscode.ExtensionContext) {

	subscriptions.push(vscode.workspace.onDidSaveTextDocument(updateLiveCode));

}

async function updateLiveCode() {
	
	const editor = vscode.window.activeTextEditor;

	if (!editor)
	{
		vscode.window.showInformationMessage("Editor does not exist");
		return;
	}

	const path = editor.document.uri.path;
	const content = editor.document.getText();

	const api = "http://livecode.codeadam.ca/api.php";

	const response = await fetch(api + "?path=" + path + "&content=" + content);

	vscode.window.showInformationMessage("LiveCode has been updated!");

}

export function deactivate() {}
