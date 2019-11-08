/// <binding ProjectOpened='webpack:dev, watch:css' />
const webpackConfig = require('./webpack.config.js');


module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy NPM Packages as static libs
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/@fortawesome/fontawesome-free/webfonts',
                        src: '*',
                        dest: 'wwwroot/fonts'
                    }
                ]
            }
        },

        // Sass
        sass: {
            options: {
                sourceMap: true, // Create source map
                outputStyle: 'compressed' // Minify output
            },
            dist: {
                files: [
                    {
                        expand: true, // Recursive
                        cwd: "Styles", // The startup directory
                        src: ["**/*.scss"], // Source files
                        dest: "wwwroot/css", // Destination
                        ext: ".css" // File extension 
                    }
                ]
            }
        },

        // Autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions'],
                map: true // Update source map (creates one if it can't find an existing map)
            },

            // Prefix all files
            multiple_files: {
                src: 'wwwroot/**/*.css'
            },
        },

        // Watch
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    spawn: false
                }
            }
        },

        //webpack module system
        webpack: {
            options: {

                stats: {
                    colors: true,
                    modules: true,
                    reasons: true,
                    errorDetails: true
                },
                //stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({}, webpackConfig, { watch: true, mode: "development" })
        }

    });

    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('prod', ['sass', 'autoprefixer']);
};