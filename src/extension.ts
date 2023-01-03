'use strict';

import { spawn } from "child_process";
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.openITerm2', async (e: vscode.Uri) => {
        if (process.platform !== "darwin") {
            vscode.commands.executeCommand("workbench.action.terminal.openNativeConsole", e);
            return;
        }

        fs.stat(e.fsPath, (err, stats) => {
            if (err) {
                return;
            }

            spawn("osascript", [
                path.join(__dirname, "../../res/open-item2.scpt"),
                "cd", `"${(stats.isFile()) ? path.dirname(e.fsPath) : e.fsPath}"`
            ]);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
