import * as vscode from 'vscode';
import { activateLanguageDetector } from './languageDetector';

export function activate(context: vscode.ExtensionContext) {
	activateLanguageDetector(context);
}

export function deactivate() {}
