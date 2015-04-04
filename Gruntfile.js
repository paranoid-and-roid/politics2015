module.exports = function(grunt) {

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		express: {
				all: {
				options: {
					port: 9000,
					hostname: "0.0.0.0",
					bases: [__dirname],
					livereload: true
				}
			}
		},

		watch: {
			all: {
				files: 'index.html',
				options: {
					livereload: true
				}
			}
		},

		open: {
			all: {
				path: 'http://localhost:<%=express.all.options.port %>'
			}
		}
	});

	grunt.registerTask('serve', ['express', 'open', 'watch']);
	grunt.registerTask('default', ['serve']);
};