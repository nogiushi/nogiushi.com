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
                dest: 'dist/static/js/<%= bower.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            nogiushi: {
                files: {
                    'dist/static/js/<%= bower.name %>.min.js': ['<%= concat.nogiushi.dest %>']
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
        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'dist/static/css/<%= pkg.name %>.css.map'
                },
                files: {
                    'dist/static/css/<%= bower.name %>.css': ['less/<%= pkg.name %>.less']
                }
            },
            compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>-theme.css.map',
                    sourceMapFilename: 'dist/static/css/<%= pkg.name %>-theme.css.map'
                },
                files: {
                    'dist/static/css/<%= pkg.name %>-theme.css': 'less/theme.less'
                }
            },
            minify: {
                options: {
                    cleancss: true,
                    report: 'min'
                },
                files: {
                    'dist/static/css/<%= bower.name %>.min.css': 'dist/static/css/<%= bower.name %>.css'
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                        src: 'images/*',
                        dest: 'dist/static/'
                    },
                    {
                        src: ['templates/*', 'recipes', 'pages.json'],
                        dest: 'dist/'
                    },
                    {
			expand: true,
			cwd: 'bower_components/bootstrap/dist/',
                        src: ['fonts/*'],
                        dest: 'dist/static/'
                    }
                ]
            }
        },
        hashres: {
            // Global options
            options: {
                encoding: 'utf8',
                fileNameFormat: '${hash}~${name}.${ext}',
                renameFiles: true
            },
            prod: {
                options: {
                },
                // Files to hash
                src: [
                    // WARNING: These files will be renamed!
                    'dist/static/**/*.*', '!dist/static/**/*~*.*', '!dist/static/robots.txt', '!dist/static/favicon.ico'],
                // File that refers to above files and needs to be updated with the hashed name
                dest: ['dist/templates/*.html', 'dist/recipes', 'dist/pages.json']
            }
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    // Test task.
    grunt.registerTask('test', ['jshint']);

    // JS distribution task.
    grunt.registerTask('static-js', ['ngmin', 'concat', 'uglify']); 

    // CSS distribution task.
    grunt.registerTask('static-css', ['less']);

    // Images distribution task
    grunt.registerTask('static-images', ['copy']);

    // Full distribution task.
    grunt.registerTask('static', ['clean', 'static-css', 'static-js', 'static-images']);

    // Default task.
    grunt.registerTask('default', ['shell', 'test', 'static']);

};
