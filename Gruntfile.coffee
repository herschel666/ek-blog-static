
module.exports = (grunt) ->

  grunt.loadNpmTasks "grunt-contrib-imagemin"

  grunt.initConfig
    imagemin:
      options:
        optimizationLevel: 7
      all:
        files: [{
          expand: true
          cwd: "userfiles/"
          src: ["**/*.{png,jpg,gif}"]
          dest: "wp-content/"
        }]
