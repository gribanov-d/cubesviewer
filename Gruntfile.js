module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
              'cubesviewer/angular-bootstrap-submenu/angular-bootstrap-submenu.js',
              'cubesviewer/cubes/cubes.js',
              'cubesviewer/cubes/cubes-cvextensions.js',
              'cubesviewer/cubes/cubes-service.js',
              'cubesviewer/cubes/cache.js',
              'cubesviewer/core/cubesviewer.js',
              'cubesviewer/views/views.js',
              'cubesviewer/dialog/dialog.js',
              'cubesviewer/views/cube/cube.js',
              'cubesviewer/views/cube/explore/explore.js',
              'cubesviewer/views/cube/filter/dimension.js',
              'cubesviewer/views/cube/filter/datefilter.js',
              'cubesviewer/views/cube/filter/range.js',
              'cubesviewer/views/cube/facts/facts.js',
              'cubesviewer/views/cube/series/series.js',
              'cubesviewer/views/cube/series/operations.js',
              'cubesviewer/views/cube/chart/chart.js',
              'cubesviewer/views/cube/chart/chart-bars-vertical.js',
              'cubesviewer/views/cube/chart/chart-bars-horizontal.js',
              'cubesviewer/views/cube/chart/chart-lines.js',
              'cubesviewer/views/cube/chart/chart-pie.js',
              'cubesviewer/views/cube/chart/chart-radar.js',
              'cubesviewer/views/cube/chart/chart-sunburst.js',
              'cubesviewer/views/cube/chart/chart-lines-avg.js',
              'cubesviewer/views/cube/chart/chart-lines-variance.js',
              'cubesviewer/views/cube/chart/chart-lines-plan.js',
              'cubesviewer/views/cube/widget/widget.js',
              'cubesviewer/views/cube/widget/max-value.js',
              'cubesviewer/views/cube/widget/threshold.js',
              'cubesviewer/views/cube/widget/movement.js',
              'cubesviewer/views/cube/widget/value.js',
              //'cubesviewer/cubesviewer.views.cube.rangefilter.js',
              'cubesviewer/views/cube/export.js',
              'cubesviewer/views/undo.js',
              'cubesviewer/studio/studio.js',
              'cubesviewer/studio/serialize.js',

              'cubesviewer/server/reststore.js',
              'cubesviewer/ga/googleanalytics.js',

              // The templates file is autogenerated by grunt-angular-templates
              'cubesviewer/cubesviewer.templates.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    less: {
    	options: {
            compress: true
    	},
    	dist: {
	    	files: {
	    		'dist/cubesviewer.min.css': 'cubesviewer/cubesviewer.less'
                // Здесь можно прописать путь до локального analytics-web и при компиляции файлы сразу будут копироваться туда
			    // '/.../analytics-web/app/static/vendor/cubesviewer/dist/cubesviewer.min.css': 'cubesviewer/cubesviewer.less'

	    	}
    	}
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
            'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            // Здесь можно прописать путь до локального analytics-web и при компиляции файлы сразу будут копироваться туда
	        // '/.../analytics-web/app/static/vendor/cubesviewer/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']

        }
      }
    },
    copy: {
      	dist: {
    		files: [
    		    { expand: true, cwd: 'dist', src: '*', dest: '../cubesviewer-page/lib/cubesviewer/' },
    		    { expand: true, cwd: 'dist', src: '*', dest: '../cubesviewer-server/cvapp/cubesviewer/static/lib/cubesviewer/' },
    		    { expand: true, cwd: 'bower_components', src: '**/*.min.js', dest: 'html/lib' },
    		    { expand: true, cwd: 'bower_components', src: '**/*.min.css', dest: 'html/lib' }
	        ]
    	}
    },
    qunit: {
      files: ['test/**/*.html']
    },
    bower: {
    	install: {
    		options: {
    			targetDir: 'html/lib/',
    			layout: 'byComponent',
    			verbose: true
		    }
	    }
    },
    /*
    wiredep: {
	  dist: {
          src: [
        	  'html/*.html'
          ],
          options: {
        	 ignorePath: '../bower_components/',
        	 fileTypes: {
        		 html: {
        			 replace: {
        				 js: '<script src="../lib/{{filePath}}"></script>',
        				 css: '<link rel="stylesheet" href="../lib/{{filePath}}" />'
        			 }
        		 }
        	 }
          }
      }
	},
	*/
    jsdoc : {
        dist : {
            src: ['cubesviewer/**/*.js'], // 'test/*.js'
            options: {
                destination: 'build/doc',
                configure : 'doc/jsdoc/jsdoc.conf.json'
            }
        }
    },
    jshint: {
      files: ['Gruntfile.js', 'bower,json', 'cubesviewer/**/*.js', 'cubesviewer/**/*.less', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'bower.json', 'cubesviewer/**/**.*'],
      tasks: ['default']  // 'copy'
    },
    ngtemplates:  {
    	  app:        {
    	    cwd:      'cubesviewer',
    	    src:      '**/**.html',
    	    dest:     'cubesviewer/cubesviewer.templates.js',
    	    options: {
    	    	module:	  "cv"
    	    }
    	  }
    	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-task');
  //grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('test', ['jshint']);  // 'qunit'

  grunt.registerTask('default', ['less', 'ngtemplates', 'concat', 'uglify', 'jsdoc']);  // 'bower',

  grunt.registerTask('dev', ['less', 'ngtemplates', 'concat']);

};

