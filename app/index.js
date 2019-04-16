const Generator = require('yeoman-generator');

const GENERATORS = {
	dotfiles: 'dotfiles'
};

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}

	async prompting() {
		this.answers = await this.prompt([
			{
				type: "checkbox",
				name: "generators",
				message: "Pick what you need",
				choices: Object.keys(GENERATORS).map(generatorName => ({
					name: GENERATORS[generatorName],
					value: generatorName
				})),
				default: Object.keys(GENERATORS)
			}
		]);
	}

	writing() {
		this.answers.generators.forEach(generator => {
			this.composeWith(`ziggurat:${generator}`)
		});
	}
};
