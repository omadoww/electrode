'use strict';
var generators = require('yeoman-generator');
var originUrl = require('git-remote-origin-url');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Module name'
    });

    this.option('github-account', {
      type: String,
      required: true,
      desc: 'GitHub username or organization'
    });
  },

  initializing: function () {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    return originUrl(this.destinationPath())
      .then(function (url) {
        this.originUrl = url;
      }.bind(this), function () {
        this.originUrl = '';
      }.bind(this));
  },

  writing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    var repository = '';
    if (this.originUrl) {
      repository = this.originUrl;
    } else {
      repository = this.options.githubAccount + '/' + this.options.name;
    }

    this.pkg.repository = this.pkg.repository || {};
    if (!this.pkg.repository.url) {
      this.pkg.repository.type = 'git';
      this.pkg.repository.url = repository;
    }

    this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
  },

  end: function () {
    this.spawnCommandSync('git', ['init'], {
      cwd: this.destinationPath()
    });

    if (!this.originUrl) {
      var repoSSH = this.pkg.repository;
      var url = this.pkg.repository && this.pkg.repository.url;
      if (url && url.indexOf('.git') === -1) {
        repoSSH = 'git@github.com:' + this.pkg.repository + '.git';
      }
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
        cwd: this.destinationPath()
      });
    }
  }
});
