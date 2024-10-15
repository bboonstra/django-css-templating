import * as vscode from "vscode";

export function activateLanguageDetector(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(detectLanguage),
        vscode.workspace.onDidChangeTextDocument((e) =>
            detectLanguage(e.document)
        )
    );

    // Run detection for already opened documents
    vscode.workspace.textDocuments.forEach(detectLanguage);
}

function detectLanguage(document: vscode.TextDocument) {
    if (document.languageId === "css" || document.languageId === "django-css") {
        const text = document.getText();
        const hasDjangoTags = /\{[%{]/.test(text);

        if (hasDjangoTags && document.languageId !== "django-css") {
            vscode.languages.setTextDocumentLanguage(document, "django-css");
        } else if (!hasDjangoTags && document.languageId === "django-css") {
            vscode.languages.setTextDocumentLanguage(document, "css");
        }
    }
}
