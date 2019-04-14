const Generator = require('yeoman-generator');

const FILES = [
	'.editorconfig',
	'.npmrc'
];

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}

	async prompting() {
		this.answers = await this.prompt([
			{
				type: "checkbox",
				name: "files",
				message: "Pick dotfiles",
				choices: FILES,
				default: FILES
			}
		]);
	}

	writing() {
		this.answers.files.forEach(file => {
			this.fs.copyTpl(
				this.templatePath(file),
				this.destinationPath(file)
			);
		});
	}
};
