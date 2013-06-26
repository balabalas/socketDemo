
module.exports = function(grunt){
  grunt.initConfig({
    jshint: {
      files: ['app.js', 'routes/*.js', 'public/js/index.js'],
      options: {
        globals: {
          console: true,
          module: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint']);
};





