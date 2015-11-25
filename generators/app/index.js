'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		this.appname = path.basename(this.destinationRoot());
		this.log(yosay(
			'Welcome to the ' + chalk.red('generator-slim-twig-scss-babel') + ' generator!'
		));
	},

	writing: function () {
		this.directory('.', '.');
	},

	install: function () {
		this.spawnCommand("npm", ["install"], { cwd: 'web'});
		this.spawnCommand("bower", ["install"], { cwd: 'web'});
		this.spawnCommand("composer", ["install"], { cwd: 'app'});
	}
});
