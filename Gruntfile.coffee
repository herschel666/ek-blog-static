
module.exports = (grunt) ->

  grunt.loadNpmTasks "grunt-contrib-imagemin"
  grunt.loadNpmTasks "grunt-contrib-copy"

  grunt.initConfig

    imagemin:
      options:
        optimizationLevel: if process.env.NODE_END is 'production' then 7 else 0
      all:
        files: [{
          expand: true
          cwd: "userfiles/"
          src: ["**/*.{png,jpg,gif}"]
          dest: "_site/wp-content/"
        }]

    copy:
      zip:
        files: [{
          expand: true,
          cwd: "userfiles/"
          src: ["**/*.zip"]
          dest: "wp-content/"
        }]

  grunt.registerTask "default", ["imagemin:all", "copy:zip"]
