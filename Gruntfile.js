
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
    },
    clean: ['test/web/*.jade']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'clean']);

};





