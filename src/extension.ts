import fetch from 'node-fetch';
import * as vscode from 'vscode';

let livecodeStatus = "Off";

const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

export function activate({ subscriptions }: vscode.ExtensionContext) {

	status.text = "$(sync-ignored) LiveCode";
	status.color = "#fff";
	status.show();

	let livecodeOn = vscode.commands.registerCommand('livecode.activate', async () => {

		status.text = "$(sync) LiveCode";
		livecodeStatus = "On";
		vscode.window.showInformationMessage("LiveCode Message: LiveCode has been activated! ");

	});

	subscriptions.push(livecodeOn);

	let livecodeOff = vscode.commands.registerCommand('livecode.deactivate', async () => {

		status.text = "$(sync-ignored) LiveCode";
		livecodeStatus = "Off";
		vscode.window.showInformationMessage("LiveCode Message: LiveCode has been deactivated! ");

	});

	subscriptions.push(livecodeOff);

	subscriptions.push(vscode.workspace.onDidSaveTextDocument(updateLiveCode));

}

async function updateLiveCode() {
	
	if (livecodeStatus == "On")
	{	

		status.text = "$(sync~spin) LiveCode";

		const editor = vscode.window.activeTextEditor;

		if (!editor)
		{
			vscode.window.showInformationMessage("LiveCode Error: Editor does not exist");
			return;
		}

		const path = editor.document.uri.path;
		const content = editor.document.getText();
		const api = "http://livecode.codeadam.ca/api.php";

		await fetch(api + "?path=" + path + "&content=" + content);

		vscode.window.showInformationMessage("LiveCode Message: Code has been updated!");

		status.text = "$(sync) LiveCode";

	}

}

export function deactivate() {}
