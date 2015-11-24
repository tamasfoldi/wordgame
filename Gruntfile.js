module.exports = function (grunt) {

  grunt.initConfig({
    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      all: {
        src: [ "!data/**/*", "**/*.ts", "!node_modules/**/*.ts", "!typings/**/*.ts", "!specs/**/*.ts", "!scripts/references.ts"]
        // avoid linting typings files and node_modules files
      }
    },

    ts: {
      build: {
        src: ["!data/**/*", "scripts/references.ts", "**/*.ts", "!node_modules/**/*.ts"],
        reference: "scripts/references.ts",
        options: {
          module: "commonjs",
          fast: "never"
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['scripts/app.js', 'scripts/models/*.js', 'scripts/services/*.js', 'scripts/controllers/*.js'],
        dest: 'scripts/szojatek.js'
      }
    },
    
    // run watch and nodemon at the same time
    concurrent: {
      watchers: {
        tasks: ['nodemon', 'watch:scripts'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    
    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      },
      options: {
        ignore: ['node_modules/**', 'Gruntfile.js'],
        env: {
          PORT: '1337'
        }
      }
    },

    watch: {
      scripts: {
        files: [ "!data/**/*", '**/*.ts', '!node_modules/**/*.ts'], // the watched files
        tasks: ["newer:tslint:all", "ts:build", "concat:dist"], // the task to run
        options: {
          spawn: false // makes the watch task faster
        }
      },
      karmawatch: {
        files: ["!data/**/*", '**/*.ts', '!node_modules/**/*.ts' ], // the watched files
        tasks: ["ts:build", "concat:dist", "karma:unit"], // the task to run
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-newer");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-karma');


  grunt.registerTask('test', ["karma:unit"]); // "ts:build", "concat", ** , "watch:karmawatch" 
  grunt.registerTask('serve', ["nodemon"]);
  grunt.registerTask('cleanbuild', ["tslint:all", "ts:build", "concat", "concurrent:watchers"]);

};