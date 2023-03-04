const webpackDevConfig = require('./webpack.config.dev.js');
const webpackProdConfig = require('./webpack.config.prod.js');

module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          './dist/glint.css': './src/style.scss'
        }
      },
      prod: {
        options: {
          style: 'compressed'
        },
        files: {
          './dist/glint.min.css': './src/style.scss'
        }
      }
    },
    webpack: {
      dev: webpackDevConfig,
      prod: webpackProdConfig,
    },
    watch: {
      scripts: {
        files: ['**/*.ts', '**/*.scss'],
        tasks: ['dev'],
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

  grunt.registerTask('dev', ['sass:dev', 'webpack:dev']);
  grunt.registerTask('prod', ['sass:prod', 'webpack:prod']);

  grunt.registerTask('default', ['dev', 'prod']);
};