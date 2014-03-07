'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  //var dateFormat = require('dateformat');

  var tests = 'test/**/*_test.js';
  var scripts = 'lib/**/*.js';
  var reportDir = 'test/coverage';

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      test: {
        src: [tests]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: [scripts]
      },
      test: {
        src: [tests]
      }
    },
    shell: {
      get_coverage: {
        options: {
          stdout: true
        },
        command: 'istanbul cover --dir ' + reportDir + ' node_modules/mocha/bin/_mocha -- -R spec'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'mochaTest']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochaTest']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest']);
  grunt.registerTask('cover', function (){
    grunt.task.run('shell:get_coverage');
  });
};
