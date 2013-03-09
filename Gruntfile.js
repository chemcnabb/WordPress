'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').concat(['gruntacular']).forEach(
            grunt.loadNpmTasks);

    // configurable paths & app variables
    var atConfig = {};
    try {
        atConfig.app = require('./package.json').path.app || null;
        atConfig.dist = require('./package.json').path.dist || null;
        atConfig.test = require('./package.json').path.test || null;
        atConfig.scripts = require('./package.json').path.js || null;
        atConfig.styles = require('./package.json').path.styles || null;
        atConfig.config = require('./package.json').path.config || null;
        atConfig.components = require('./package.json').path.lib || null;
        atConfig.name = require('./package.json').name || null;
        atConfig.urlApi = require('./package.json').url.api || null;
    } catch (e) {
        throw new Error(e).stack;
    }

    grunt
            .initConfig({
                at : atConfig,
                watch : {
                    less : {
                        files : ['<%= at.app %>/styles/{,*/}*.{less}'],
                        tasks : ['less']
                    },
                    livereload : {
                        files : [
                                '<%= at.app %>/**/*.html',
                                '{.tmp,<%= at.app %>}/' + atConfig.styles
                                        + '/{,*/}*.css',
                                '{.tmp,<%= at.app %>}/' + atConfig.scripts
                                        + '/{,*/}*.js',
                                '<%= at.app %>/images/{,*/}*.{png,jpg,jpeg}'],
                        tasks : ['concat', 'htmlmin', 'livereload']
                    }
                },
                connect : {
                    livereload : {
                        options : {
                            port : 9001,
                            // Change this to '0.0.0.0' to access the server
                            // from outside.
                            hostname : 'localhost',
                            middleware : function (connect) {
                                return [lrSnippet,
                                        mountFolder(connect, '.tmp'),
                                        mountFolder(connect, atConfig.dist)];
                            }
                        }
                    },
                    test : {
                        options : {
                            port : 9002,
                            middleware : function (connect) {
                                return [mountFolder(connect, '.tmp'),
                                        mountFolder(connect, atConfig.test)];
                            }
                        }
                    }
                },
                less : {
                    css : {
                        options : {
                            paths : ['<%= at.app %>/<%= at.components %>/bootstrap/less/']
                        },
                        files : {
                            '<%= at.dist %>/styles/main.css' : ['<%= at.app %>/'
                                    + atConfig.styles + '/less/main.less']
                        }
                    }
                },
                open : {
                    server : {
                        url : 'http://localhost:<%= connect.livereload.options.port %>'
                    }
                },
                clean : {
                    dist : ['.tmp', '<%= at.dist %>/*'],
                    server : '.tmp'
                },
                jshint : {
                    options : {
                        jshintrc : '.jshintrc'
                    },
                    all : [
                    // 'Gruntfile.js',
                    '<%= at.app %>/' + atConfig.scripts + '/{,*/}*.js']
                },
                testacular : {
                    unit : {
                        configFile : atConfig.config + '/testacular.conf.js',
                        singleRun : true
                    },
                    continuous : {
                        configFile : atConfig.config + '/testacular.conf.js',
                        autoWatch : true
                    }
                },
                concat : {
                    dist : {
                        options : {
                            stripBanners : {
                                block : true,
                                line : true
                            },
                            process : true
                        },
                        files : {
                            '<%= at.dist %>/scripts/main.js' : [
                                    '.tmp/' + atConfig.scripts + '/*.js',
                                    '<%= at.app %>/' + atConfig.scripts
                                            + '/**/*.js']
                        }
                    }
                },
                useminPrepare : {
                    html : '<%= at.app %>/index.html',
                    options : {
                        dest : '<%= at.dist %>'
                    }
                },
                usemin : {
                    html : ['<%= at.dist %>/{,*/}*.html'],
                    css : ['<%= at.dist %>/styles/{,*/}*.css'],
                    options : {
                        dirs : ['<%= at.dist %>']
                    }
                },
                cssmin : {
                    dist : {
                        files : {
                            '<%= at.dist %>/styles/main.css' : [
                                    '.tmp/' + atConfig.styles + '/{,*/}*.css',
                                    '<%= at.dist %>/styles/**/*.css']
                        }
                    }
                },
                htmlmin : {
                    dist : {
                        options : {
                            collapseWhitespace : false,
                            removeComments : false,
                            collapseBooleanAttributes : true,
                            removeRedundantAttributes : true,
                            useShortDoctype : true
                        },
                        files : [{
                            expand : true,
                            cwd : '<%= at.app %>',
                            src : ['*.html', 'views/**/*.html'],
                            dest : '<%= at.dist %>'
                        }]
                    }
                },
                cdnify : {
                    dist : {
                        html : ['<%= at.dist %>/*.html']
                    }
                },
                ngmin : {
                    dist : {
                        files : [{
                            expand : true,
                            cwd : '<%= at.dist %>/' + atConfig.scripts,
                            src : '*.js',
                            dest : '<%= at.dist %>/' + atConfig.scripts
                        }]
                    }
                },
                uglify : {
                    dist : {
                        files : {
                            '<%= at.dist %>/scripts/main.js' : ['<%= at.dist %>/'
                                    + atConfig.scripts + '/main.js'],
                        }
                    }
                },
                copy : {
                    dist : {
                        files : [{
                            expand : true,
                            dot : true,
                            cwd : '<%= at.app %>',
                            dest : '<%= at.dist %>',
                            src : ['*.{ico,txt,php}',
                                    'components/**/*.{ico,txt,php,js,png,jpg,gif,css,less,json}']
                        }]
                    }
                },
                compress : {
                    wordpress : {
                        options : {
                            archive : '<%= at.dist %>/wp-azuretickets.zip'
                        },
                        files : [{
                            expand : true,
                            cwd : '<%= at.dist %>/',
                            src : ['**']
                        }]
                    }
                }
            });

    grunt.renameTask('regarde', 'watch');
    // remove when mincss task is renamed
    grunt.renameTask('mincss', 'cssmin');

    grunt.registerTask('server', ['clean:server', 'livereload-start',
            'connect:livereload', 'open', 'watch']);

    grunt.registerTask('test', ['clean:server', 'less', 'concat',
            'connect:test', 'testacular']);

    grunt.registerTask('build', ['clean:dist', /* 'jshint', */
    'test:unit', 'useminPrepare', 'cssmin', 'htmlmin', 'concat', 'copy',
            'cdnify', 'usemin', 'ngmin', 'uglify']);

    grunt.registerTask('wp', ['build', 'compress:wordpress']);

    grunt.registerTask('default', ['build']);
};
