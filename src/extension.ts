import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('Debug: Django CSS Templating loaded properly.');
}

export function deactivate() {}
