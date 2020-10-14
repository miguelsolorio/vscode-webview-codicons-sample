import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('catCodicons.show', () => {
			CatCodiconsPanel.show(context.extensionUri);
		})
	);
}


class CatCodiconsPanel {

	public static readonly viewType = 'catCodicons';

	public static show(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		const panel = vscode.window.createWebviewPanel(
			CatCodiconsPanel.viewType,
			"Webview Chart Colors",
			column || vscode.ViewColumn.One
		);

		panel.webview.html = this._getHtmlForWebview(panel.webview, extensionUri);
	}

	private static _getHtmlForWebview(webview: vscode.Webview, extensionUri: vscode.Uri) {

		// Get resource paths
		const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'styles.css'));
		const codiconsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'node_modules', 'vscode-codicons', 'dist', 'codicon.css'));
		const codiconsFontUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'node_modules', 'vscode-codicons', 'dist', 'codicon.ttf'));

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${codiconsFontUri}; style-src ${webview.cspSource} ${codiconsUri};">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Cat Coding</title>

				<link href="${styleUri}" rel="stylesheet" />
				<link href="${codiconsUri}" rel="stylesheet" />
			</head>
			<body>
			<div><div class='charts-foreground'></div> charts.foreground</div>
			<div><div class='charts-lines'></div> charts.lines</div>
			<div><div class='charts-red'></div> charts.red</div>
			<div><div class='charts-blue'></div> charts.blue</div>
			<div><div class='charts-yellow'></div> charts.yellow</div>
			<div><div class='charts-orange'></div> charts.orange</div>
			<div><div class='charts-green'></div> charts.green</div>
			<div><div class='charts-purple'></div> charts.purple</div>
			</body>
			</html>`;
	}
}

