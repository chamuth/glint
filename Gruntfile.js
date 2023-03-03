const webpackConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          './dist/style.css': './src/style.scss'
        }
      }
    },
    webpack: {
      options: {
        mode: "production"
      },
      prod: webpackConfig,
    },
    watch: {
      scripts: {
        files: ['**/*.ts', '**/*.scss'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'webpack']);
};