import { MarkdownView, Plugin, } from 'obsidian';

export default class MoveCursorOnStartup extends Plugin {

	async onload() {

		let firstNoteOpened = false;

		this.registerEvent(
			this.app.workspace.on('file-open', (file) => {
				if (!firstNoteOpened && file && file.extension === 'md') {
					const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
					if (activeView) {
						setTimeout(() => { // slight delay
							activeView.editor.exec('goRight');
							activeView.editor.exec('goLeft');
						}, 50);
						firstNoteOpened = true;
					}
				}
			})
		);
	}
}