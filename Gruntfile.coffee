
module.exports = (grunt) ->

  grunt.loadNpmTasks "grunt-contrib-imagemin"
  grunt.loadNpmTasks "grunt-contrib-copy"

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

    copy:
      zip:
        files: [{
          expand: true,
          cwd: "userfiles/"
          src: ["**/*.zip"]
          dest: "wp-content/"
        }]
      loadCSS:
        src: "_assets/javascripts/vendor/loadcss/loadCSS.js"
        dest: "_assets/javascripts/vendor/loadcss/loadCSS.js"
        options:
          process: (content) ->
            content.replace "/*!", "/**"

  grunt.registerTask "default", ["imagemin:all", "copy:zip"]
