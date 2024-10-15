import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activateDjangoValidator(context: vscode.ExtensionContext) {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('django-css');
    context.subscriptions.push(diagnosticCollection);

    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(document => {
            if (document.languageId === 'django-css') {
                validateDjangoCSS(document, diagnosticCollection);
            }
        })
    );
}

function validateDjangoCSS(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection) {
    const djangoInterpreter = vscode.workspace.getConfiguration('django-css').get('djangoInterpreter', 'python');
    const tempFile = vscode.Uri.file(`${document.fileName}.tmp`);

    vscode.workspace.fs.writeFile(tempFile, Buffer.from(document.getText())).then(() => {
        exec(`${djangoInterpreter} -c "from django.template import Template, Context; Template(open('${tempFile.fsPath}').read())"`, (error, stdout, stderr) => {
            const diagnostics: vscode.Diagnostic[] = [];

            if (error) {
                const errorMatch = stderr.match(/^.*?(\d+).*?$/m);
                if (errorMatch) {
                    const lineNumber = parseInt(errorMatch[1]) - 1;
                    const range = document.lineAt(lineNumber).range;
                    const diagnostic = new vscode.Diagnostic(range, stderr, vscode.DiagnosticSeverity.Error);
                    diagnostics.push(diagnostic);
                }
            }

            diagnosticCollection.set(document.uri, diagnostics);
            vscode.workspace.fs.delete(tempFile);
        });
    });
}

