'use strict';
import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.openITerm2', (e: vscode.Uri) => {
        if (process.platform === "darwin") {
            const scriptPath = path.join(__dirname, "../../res/open-item2.scpt");

            console.log(e);
            fs.stat(e.fsPath, (err, stats) => {
                if (err) return;

                let dirPath = e.fsPath;
                if (stats.isFile()) {
                    dirPath = path.dirname(dirPath);
                }

                console.log(dirPath);
                let childProcess = spawn("osascript", [scriptPath, "cd", `"${dirPath}"`]);

            });
        } else {
            vscode.commands.executeCommand("workbench.action.terminal.openNativeConsole", e);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
