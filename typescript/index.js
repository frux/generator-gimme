const Generator = require('yeoman-generator');

const TS_ENVIRONMENTS = [
	'node'
];

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}

	async prompting() {
		this.answers = await this.prompt([
			{
				type: "checkbox",
				name: "environments",
				message: "Choose typescript environment",
				choices: TS_ENVIRONMENTS,
				default: TS_ENVIRONMENTS
			}
		]);
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('tsconfig.json'),
			this.destinationPath('tsconfig.json')
		);
	}

	install() {
		this.npmInstall(
			([
				'ts-node',
				'typescript',
				this.answers.environments.includes('node') && '@types/node'
			]).filter(Boolean),
			{ 'save-dev': true }
		);
	}

	addScripts() {
		let pkgJson = {
			main: './dist/index.js',
			scripts: {
				build: 'tsc',
				start: 'ts-node index.ts'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}
};
