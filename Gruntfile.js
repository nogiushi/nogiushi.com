module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),
        banner: '/**\n' +
                '* <%= bower.name %>.js v<%= bower.version %> \n' +
                '* <%= grunt.template.today("yyyy/mm/dd") %> \n' +
                '*/\n',
	shell: {
            goinstall: {
                options: {
                    failOnError: true,
                    stdout: true,
                    execOptions: {
			cwd: '.'
                    }
		},
		command: 'go install -v .'
            }
	},
        clean: {
            static: ['static/<%= bower.name %>/', 'build']
        },
        ngmin: {
            nogiushi: {
                src: ['js/<%= bower.name %>.js'],
                dest: 'build/js/<%= bower.name %>.annotate.js'
            },
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false
            },
            nogiushi: {
                src: ['bower_components/jquery/jquery.min.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js'],
                dest: 'static/<%= bower.version %>/js/<%= bower.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            nogiushi: {
                files: {
                    'static/<%= bower.version %>/js/<%= bower.name %>.min.js': ['<%= concat.nogiushi.dest %>']
                }
            }
        },
        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['js/*.js']
            },
            test: {
                src: ['js/tests/unit/*.js']
            }
        },
        recess: {
            options: {
                compile: true
            },
            nogiushi: {
                files: {
                    'static/<%= bower.version %>/css/<%= bower.name %>.css': ['less/nogiushi.less']
                }
            },
            min: {
                options: {
                    compress: true
                },
                files: {
                    'static/<%= bower.version %>/css/<%= bower.name %>.min.css': ['less/nogiushi.less']
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                        src: 'images/*',
                        dest: 'static/<%= bower.version %>/'
                    },
                    {
			expand: true,
			cwd: 'bower_components/bootstrap/dist/',
                        src: ['fonts/*'],
                        dest: 'static/<%= bower.version %>/'
                    }
                ]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Test task.
    grunt.registerTask('test', ['jshint']);

    // JS distribution task.
    grunt.registerTask('static-js', ['ngmin', 'concat', 'uglify']); 

    // CSS distribution task.
    grunt.registerTask('static-css', ['recess']);

    // Images distribution task
    grunt.registerTask('static-images', ['copy']);

    // Full distribution task.
    grunt.registerTask('static', ['clean', 'static-css', 'static-js', 'static-images']);

    // Default task.
    grunt.registerTask('default', ['shell', 'test', 'static']);

};
