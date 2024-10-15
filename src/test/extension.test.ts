import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
import { activateLanguageDetector } from '../languageDetector';

// Add this mock at the top of the file, outside of the test suite
const mockExtensionContext: Partial<vscode.ExtensionContext> = {
    subscriptions: [],
    // Add other required properties as needed
};

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Language detection and basic syntax recognition for Django CSS', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: 'body { color: {{ text_color }}; background: {% if dark_mode %}#000{% else %}#fff{% endif %}; }',
			language: 'css'
		});

		// Activate the language detector
		await activateLanguageDetector(mockExtensionContext as vscode.ExtensionContext);
		
		// Wait for the language detection to occur
		await new Promise(resolve => setTimeout(resolve, 100));

		// Check that the language ID is set correctly
		assert.strictEqual(document.languageId, 'django-css', 'Language should be detected as django-css');

		const text = document.getText();
		const djangoVariableRegex = /{{.*?}}/g;
		const djangoTagRegex = /{%.*?%}/g;
		const cssPropertyRegex = /[a-z-]+:/g;

		assert.ok(djangoVariableRegex.test(text), 'Document should contain Django variables');
		assert.ok(djangoTagRegex.test(text), 'Document should contain Django tags');
		assert.ok(cssPropertyRegex.test(text), 'Document should contain CSS properties');
	});

	test('Language detection for regular CSS file', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: 'body { color: #000000; }',
			language: 'css'
		});

		await activateLanguageDetector(mockExtensionContext as vscode.ExtensionContext);
		
		await new Promise(resolve => setTimeout(resolve, 100));

		assert.strictEqual(document.languageId, 'css', 'Language should remain as css');
	});

	test('Language detection when switching between Django CSS and regular CSS', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: 'body { color: {{ text_color }}; }',
			language: 'css'
		});

		await activateLanguageDetector(mockExtensionContext as vscode.ExtensionContext);
		await new Promise(resolve => setTimeout(resolve, 100));

		assert.strictEqual(document.languageId, 'django-css', 'Language should be detected as django-css');

		// Change content to regular CSS
		await vscode.window.showTextDocument(document);
		await vscode.window.activeTextEditor?.edit(editBuilder => {
			const lastLine = document.lineAt(document.lineCount - 1);
			editBuilder.replace(new vscode.Range(0, 0, lastLine.range.end.line, lastLine.range.end.character), 'body { color: #000000; }');
		});

		await new Promise(resolve => setTimeout(resolve, 100));

		assert.strictEqual(document.languageId, 'css', 'Language should switch back to css');
	});

	test('Language detection with Django tags in comments', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: '/* {{ comment_text }} */ body { color: #000; }',
			language: 'css'
		});

		await activateLanguageDetector(mockExtensionContext as vscode.ExtensionContext);
		await new Promise(resolve => setTimeout(resolve, 100));

		assert.strictEqual(document.languageId, 'django-css', 'Language should be detected as django-css even with tags in comments');
	});

	test('Language detection with multiple Django tags', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: 'body { color: {{ text_color }}; background: {% if dark_mode %}#000{% else %}#fff{% endif %}; }',
			language: 'css'
		});

		await activateLanguageDetector(mockExtensionContext as vscode.ExtensionContext);
		await new Promise(resolve => setTimeout(resolve, 100));

		assert.strictEqual(document.languageId, 'django-css', 'Language should be detected as django-css with multiple tags');
	});

	test('Language detection with Django tags at different positions', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: '{{ variable_at_start }} body { color: #000; } {% tag_at_end %}',
			language: 'css'
		});

		await activateLanguageDetector(mockExtensionContext as vscode.ExtensionContext);
		await new Promise(resolve => setTimeout(resolve, 100));

		assert.strictEqual(document.languageId, 'django-css', 'Language should be detected as django-css with tags at different positions');
	});

	test('Language detection with malformed Django tags', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: 'body { color: {{ unclosed_variable ; }',
			language: 'css'
		});

		await activateLanguageDetector(mockExtensionContext as vscode.ExtensionContext);
		await new Promise(resolve => setTimeout(resolve, 100));

		assert.strictEqual(document.languageId, 'django-css', 'Language should be detected as django-css even with malformed tags');
	});

	test('Language detection with nested Django tags', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: 'body { color: {% if condition %}{{ inner_variable }}{% endif %}; }',
			language: 'css'
		});

		await activateLanguageDetector(mockExtensionContext as vscode.ExtensionContext);
		await new Promise(resolve => setTimeout(resolve, 100));

		assert.strictEqual(document.languageId, 'django-css', 'Language should be detected as django-css with nested tags');
	});
});