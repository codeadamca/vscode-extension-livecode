// process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

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
		vscode.window.showInformationMessage("LiveCode Message: LiveCode has been activated! " + test);

	});

	subscriptions.push(livecodeOn);

	let livecodeOff = vscode.commands.registerCommand('livecode.deactivate', async () => {

		status.text = "$(sync-ignored) LiveCode";
		livecodeStatus = "Off";
		vscode.window.showInformationMessage("LiveCode Message: LiveCode has been deactivated! ");

	});

	subscriptions.push(livecodeOff);

	let livecodeReset = vscode.commands.registerCommand('livecode.reset', async () => {

		resetLivecode();

	});

	subscriptions.push(livecodeReset);

	subscriptions.push(vscode.workspace.onDidSaveTextDocument(updateLivecode));

}

async function resetLivecode() {

	status.text = "$(sync~spin) LiveCode";
	
	const api = "https://livecode.codeadam.ca/api.php?reset";

	await fetch(api);

	vscode.window.showInformationMessage("LiveCode Message: Paths have been reset!");

	if (livecodeStatus == "On")
	{
		status.text = "$(sync) LiveCode";
	} else {
		status.text = "$(sync-ignored) LiveCode";
	}

}

async function updateLivecode() {
	
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
		const api = "https://livecode.codeadam.ca/api.php";

		const headers = {"Content-Type": "application/json"};
		const body = JSON.stringify({
			"path": path,
			"content": content,
			"github": vscode.workspace.getConfiguration('livecode').githubUsername
		  });
		  

		let response = await fetch(api, {method: 'POST', headers: headers, body: body});
		const data = await response.json();

		vscode.window.showInformationMessage("LiveCode Message: Code has been updated!");

		status.text = "$(sync) LiveCode";

	}

}

export function deactivate() {}
