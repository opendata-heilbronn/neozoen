module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            }
        },
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [
                    {
                        src: ['dist/{css,js}/*.{js,css}']
                    }
                ]
            }
        },
        useminPrepare: {
            html: ['src/*.html'],
            options: {
                dest: 'dist/'
            }
        },
        usemin: {
            html: ['dist/**/*.html'],
            css: ['dist/**/*.css'],
            options: {
                dirs: ['dist/']
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'src/',
                        dest: 'dist/',
                        src: ['*.{ico,txt,html}', 'img/{,*/}*.{gif}', 'fonts/*']
                    }
                ]
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: ['dist/{css,js,img}']
                    }
                ]
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/img',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: 'dist/img'
                    }
                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 8011,
                    hostname: '0.0.0.0',
                    base: 'src/',
                    middleware: function (connect, options) {
                        var modRewrite = require('connect-modrewrite');
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            proxy,
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect.static(options.base),
                            connect.directory(options.base)
                        ];
                    }
                },
                proxies: [
                    {
                        context: '/api/',
                        host: 'localhost',
                        port: 8080
                    }
                ]
            }
        },
        protractor: {
            options: {
                keepAlive: false
            },
            ui: {
                options: {
                    configFile: "test/protractor.conf.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('server', function () {
        grunt.task.run([
            'configureProxies:server',
            'connect:server:keepalive'
        ]);
    });
    grunt.registerTask('build', ['clean:dist', 'useminPrepare', 'imagemin', 'concat', 'cssmin', 'uglify', 'copy:dist', 'rev', 'usemin']);
    grunt.registerTask('default', ['build']);
};
