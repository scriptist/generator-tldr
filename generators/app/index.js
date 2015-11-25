'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('generator-slim-twig-scss-babel') + ' generator!'
		));

		done();

		// var prompts = [{
		// 	type: 'confirm',
		// 	name: 'someOption',
		// 	message: 'Would you like to enable this option?',
		// 	default: true
		// }];

		// this.prompt(prompts, function (props) {
		// 	this.props = props;
		// 	// To access props later use this.props.someOption;

		// 	done();
		// }.bind(this));
	},

	writing: function () {
		this.directory('.', '.');
	},

	install: function () {
		// this.installDependencies();
		this.spawnCommand("npm", ["install"], { cwd: 'web'});
		this.spawnCommand("bower", ["install"], { cwd: 'web'});
		this.spawnCommand("composer", ["install"], { cwd: 'app'});
	}
});
