import * as vscode from 'vscode';
import { activateLanguageDetector } from './languageDetector';

export function activate(context: vscode.ExtensionContext) {
	activateLanguageDetector(context);
	vscode.window.showInformationMessage('Debug: Django CSS Templating loaded properly.');
}

export function deactivate() {}
