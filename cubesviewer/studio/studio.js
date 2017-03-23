/*
 * CubesViewer
 * Copyright (c) 2012-2016 Jose Juan Montes, see AUTHORS for more details
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

/**
 * CubesViewer Studio module. CubesViewer Studio is the (optional) interface that
 * provides a full visualization environment allowing users to create and
 * interact with cubes and views.
 *
 * See the CubesViewer Studio demo at `html/studio.html` in the package.
 *
 * @namespace cv.studio
 */
angular.module('cv.studio', ['cv' /*'ui.bootstrap-slider', 'ui.validate', 'ngAnimate', */
                             /*'angularMoment', 'smart-table', 'angular-confirm', 'debounce', 'xeditable',
                             'nvd3' */ ]);

/**
 * This service manages the panels and views of the CubesViewer Studio interface.
 * Provides methods to create, remove and collapse view panels which are rendered
 * within the CubesViewer Studio user interface.
 *
 * @class studioViewsService
 * @memberof cv.studio
 */
angular.module('cv.studio').service("studioViewsService", ['$rootScope', '$anchorScroll', '$timeout', 'cvOptions', 'cubesService', 'viewsService', 'dialogService',
                                                            function ($rootScope, $anchorScroll, $timeout, cvOptions, cubesService, viewsService, dialogService) {

	this.views = [];

	this.studioScope = null;

	viewsService.studioViewsService = this;
	cubesviewerStudio.studioViewsService = this;

	/**
	 * Adds a new clean view of type "cube" given a cube name.
	 *
	 * @memberof cv.studio.studioViewsService
	 * @returns The created view object.
	 */
	this.addViewCube = function(cubename) {

		// Find cube name
		var cubeinfo = cubesService.cubesserver.cubeinfo(cubename);

		//var container = this.createContainer(viewId);
		//$('.cv-gui-viewcontent', container),

		var name = cubeinfo.label + " (" + (viewsService.lastViewId + 1) + ")";
		var view = viewsService.createView("cube", { "cubename": cubename, "name": name });
		this.views.push(view);

		$timeout(function() {
			$('.cv-views-container').masonry('appended', $('.cv-views-container').find(".sv" + view.id).show());
			//$('.cv-views-container').masonry('reloadItems');
			//$('.cv-views-container').masonry('layout');
			$timeout(function() { $anchorScroll("cvView" + view.id); }, 500);
		}, 0);

		return view;
	};

	/**
	 * Adds a view given its parameters descriptor either as an object or as
	 * a JSON string.
	 *
	 * @memberof cv.studio.studioViewsService
	 * @returns The created view object.
	 */
	this.addViewObject = function(data) {

		// Check at least JSON is valid to avoid creating an unusable view from Studio
		if (typeof data == "string") {
			try {
				data = $.parseJSON(data);
			} catch (err) {
				dialogService.show('Could not process serialized data: JSON parse error.')
				return;
			}
		}
		var compare_view = null;

		var view = viewsService.createView("cube", data);
		view.help = data.help;
		if (data.compare_view) {
			compare_view = viewsService.createView("cube", data.compare_view);
			if (compare_view) {
				this.views.unshift(compare_view);
				view.compare_view = compare_view;
			}
		}
		this.views.unshift(view);

		$timeout(function() {
			$('.cv-views-container').masonry('prepended', $('.cv-views-container').find(".sv" + view.id).show());
			if (compare_view) {
				$('.cv-views-container').masonry('appended', $('.cv-views-container').find(".sv" + compare_view.id).show());
			}
			//$('.cv-views-container').masonry('reloadItems');
			//$('.cv-views-container').masonry('layout');
			$timeout(function() { $anchorScroll("cvView" + view.id); }, 500);
		}, 0);

		return view;
	};

	/**
	 * Closes the panel of the given view.
	 *
	 * @memberof cv.studio.studioViewsService
	 */
	this.closeView = function(view) {
		var viewIndex = this.views.indexOf(view);
		if (viewIndex >= 0) {
			$('.cv-views-container').masonry('remove', $('.cv-views-container').find(".sv" + view.id));
			this.views.splice(viewIndex, 1);
			//$('.cv-views-container').masonry('reloadItems');
			$('.cv-views-container').masonry('layout');
		}

	};

	/**
	 * Collapses the panel of the given view.
	 *
	 * @memberof cv.studio.studioViewsService
	 */
	this.toggleCollapseView = function(view) {
		view.collapsed = !view.collapsed;
		$timeout(function() {
			$('.cv-views-container').masonry('layout');
		}, 100);
	};


}]);


/**
 * cvStudioView directive. Shows a Studio panel containing the corresponding view.
 */
angular.module('cv.studio').controller("CubesViewerStudioViewController", ['$rootScope', '$scope', 'cvOptions', 'cubesService', 'studioViewsService', 'reststoreService',
                                                     function ($rootScope, $scope, cvOptions, cubesService, studioViewsService, reststoreService) {

	$scope.cubesService = cubesService;
	$scope.studioViewsService = studioViewsService;
	$scope.cvOptions = cvOptions;
	$scope.reststoreService = reststoreService;

	$scope.$watch('__height', function() {
		$('.cv-views-container').masonry('layout');
	});

}]).directive("cvStudioView", ['$rootScope', function($rootScope) {
	return {
		restrict: 'A',
		templateUrl: 'studio/panel.html',
		scope: {
			view: "="
		},
        link: function( scope, elem, attrs ) {
			angular.element(elem).attr("draggable", "true");

            elem.bind("dragstart", function (e) {
                $rootScope.$emit("VIEW-DRAG-START", e);
                if (e.originalEvent.dataTransfer) {
                    e.originalEvent.dataTransfer.setData('Text', this.id);
                }
            });

            elem.bind("dragover", function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.dataTransfer) {
                    e.dataTransfer.dropEffect = 'move';
                }
                $(e.currentTarget).parents('.cv-view-container').css('opacity', '.3');

                return false;
            });

            elem.bind("dragleave", function (e) {
                $(e.currentTarget).parents('.cv-view-container').css('opacity', 'inherit');
            });

            elem.bind("drop", function (e) {
                 $rootScope.$emit("VIEW-DRAG-STOP", e);
                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                $(e.currentTarget).parents('.cv-view-container').css('opacity', 'inherit');
            });

            scope.$watch( function() {
                scope.__height = elem.height();
            } );

        }

	};
}]);


function get_hierarchy_menu(views_list, check_func) {
	var ret = [];
	var d = [];
	var menu = {};
	$(views_list).each(function (idx, view) {
		if (check_func(view)) {
			var view_params = JSON.parse(view.data);
			if (view_params.menu_path) {
				var parent = menu;
				$(view_params.menu_path.split('/')).each(function (idx, name) {
					if (!parent[name]) {
						parent[name] = {};
					}
					parent = parent[name];
				});
				if (!parent['views']) {
					parent['views'] = [];
				}
				parent['views'].push(view);
			} else {
				d.push(view)
			}
		}
	});

	ret = construct_menu(menu);

	$(d).each(function (i, v) {
		ret.push(v)
	});

	return ret;
}

function construct_menu(menu) {
	var r = [];
	var menu_keys = Object.keys(menu).sort();
	menu_keys.forEach(function(key){
		if (key != 'views') {
			var item = {'name': key};
			item['submenu'] = construct_menu(menu[key]);
			item['display'] = 'none';
			if (menu[key]['views']) {
				item['views'] = menu[key]['views'];
			}
			r.push(item);
		}
	});
	return r;
}

angular.module('cv.studio').controller("CubesViewerStudioController", ['$rootScope', '$scope', '$uibModal', '$element',
'$timeout', '$sce', 'cvOptions', 'cubesService', 'studioViewsService', 'viewsService', 'reststoreService',
	function ($rootScope, $scope, $uibModal, $element, $timeout, $sce, cvOptions, cubesService, studioViewsService, viewsService, reststoreService) {

	$scope.cvVersion = cubesviewer.version;
	$scope.cvOptions = cvOptions;
	$scope.cubesService = cubesService;
	$scope.studioViewsService = studioViewsService;
	$scope.reststoreService = reststoreService;

	$scope.studioViewsService.studioScope = $scope;

	$scope.savedViews = [];
	$scope.sharedViews = [];

	$scope.savedDashboards = [];

	$scope.news = [];

	$scope.initialize = function() {
	};

	$scope.showSerializeAdd = function() {

	    var modalInstance = $uibModal.open({
	    	animation: true,
	    	templateUrl: 'studio/serialize-add.html',
	    	controller: 'CubesViewerSerializeAddController',
	    	appendTo: angular.element($($element).find('.cv-gui-modals')[0]),
	    	/*
		    size: size,
	    	 */
	    });

	    modalInstance.result.then(function (selectedItem) {
	    	//$scope.selected = selectedItem;
	    }, function () {
	        //console.debug('Modal dismissed at: ' + new Date());
	    });
	};

	$scope.showSerializeView = function(view) {

	    var modalInstance = $uibModal.open({
	    	animation: true,
	    	templateUrl: 'studio/serialize-view.html',
	    	controller: 'CubesViewerSerializeViewController',
	    	appendTo: angular.element($($element).find('.cv-gui-modals')[0]),
		    resolve: {
		        view: function () { return view; },
	    		element: function() { return $($element).find('.cv-gui-modals')[0] },
		    }
	    });

	    modalInstance.result.then(function (selectedItem) {
	    	//$scope.selected = selectedItem;
	    }, function () {
	        //console.debug('Modal dismissed at: ' + new Date());
	    });
	};

	/*
	 * Renames a view (this is the user-defined label that is shown in the GUI header).
	 */
	$scope.showRenameView = function(view) {

		var modalInstance = $uibModal.open({
	    	animation: true,
	    	templateUrl: 'studio/rename.html',
	    	controller: 'CubesViewerRenameController',
	    	appendTo: angular.element($($element).find('.cv-gui-modals')[0]),
	    	size: "md",
		    resolve: {
		        view: function () { return view; },
	    		element: function() { return $($element).find('.cv-gui-modals')[0] },
		    }
	    });

	    modalInstance.result.then(function (selectedItem) {
	    	//$scope.selected = selectedItem;
	    }, function () {
	        //console.debug('Modal dismissed at: ' + new Date());
	    });

	};

	/*
	 * Show setup controls for a view.
	 */
	$scope.showSetupControlsView = function(view) {

		var modalInstance = $uibModal.open({
	    	animation: true,
	    	templateUrl: 'studio/setup-controls.html',
	    	controller: 'CubesViewerSetupControlsController',
	    	appendTo: angular.element($($element).find('.cv-gui-modals')[0]),
	    	size: "md",
		    resolve: {
		        view: function () { return view; },
	    		element: function() { return $($element).find('.cv-gui-modals')[0] }
		    }
	    });

	    modalInstance.result.then(function (selectedItem) {
	    }, function () {});

	};

	/*
	 * Show help for a view.
	 */
	$scope.showHelpView = function(view) {

		var modalInstance = $uibModal.open({
	    	animation: true,
	    	templateUrl: 'studio/help.html',
	    	controller: 'CubesViewerHelpController',
	    	appendTo: angular.element($($element).find('.cv-gui-modals')[0]),
	    	size: "md",
		    resolve: {
		        view: function () { return view; },
	    		element: function() { return $($element).find('.cv-gui-modals')[0] },
		    }
	    });

	    modalInstance.result.then(function (selectedItem) {
	    }, function () {
	    });

	};

	/*
	 * Clones a view.
	 * This uses the serialization facility.
	 */
	$scope.cloneView = function(view) {

		var viewObject = $.parseJSON(viewsService.serializeView(view));
		viewObject.name = "Clone of " + viewObject.name;

		var help = view.help;
		var view = studioViewsService.addViewObject(viewObject);

		// TODO: These belong to plugins
		view.savedId = 0;
		view.owner = cvOptions.user;
		view.shared = false;
		view.help = help;
	};

	/**
	 * Toggles two column mode.
	 */
	$scope.toggleTwoColumn = function() {
		cvOptions.studioTwoColumn = ! cvOptions.studioTwoColumn;
		reststoreService.dashboard.options.studioTwoColumn = cvOptions.studioTwoColumn;
		$timeout(function() {
			$('.cv-views-container').masonry('layout');
		}, 100);
	};

	/**
	 * Toggles two column mode.
	 */
	$scope.toggleHideControls = function() {
		cvOptions.hideControls = ! cvOptions.hideControls;
		reststoreService.dashboard.options.hideControls = cvOptions.hideControls;
		$timeout(function() {
			$('.cv-views-container').masonry('layout');
		}, 100);
	};

    /*
	 * Clone a dashboard.
	 */
	$scope.cloneDashboard = function () {
        var d = JSON.parse(JSON.stringify(reststoreService.dashboard));
        d.id = 0;
		d.name = 'Clone of ' + d.name;
		d.owner = cvOptions.user;
        d.shared = false;
        d.is_default = false;
		reststoreService.dashboard = d;
	};

	/*
	 * Save a dashboard.
	 */
	$scope.saveDashboard = function () {
		reststoreService.dashboard.views = [];
		studioViewsService.views.forEach(function (v) {
			reststoreService.dashboard.views.unshift(viewsService.serializeView(v));
		});
		reststoreService.saveDashboard();
	};

	/*
	 * Renames a dashboard.
	 */
	$scope.renameDashboard = function() {

		var modalInstance = $uibModal.open({
	    	animation: true,
	    	templateUrl: 'studio/dashboard/rename.html',
	    	controller: 'CubesViewerRenameDashboardController',
	    	appendTo: angular.element($($element).find('.cv-gui-modals')[0]),
	    	size: "md",
		    resolve: {
		        dashboard: function () { return reststoreService.dashboard; },
	    		element: function() { return $($element).find('.cv-gui-modals')[0] },
		    }
	    });
	};
	/*
	 * Merge a view for comparison.
	 */
	$scope.MergeWithView = function(baseview, mergeView) {
		baseview.compare_view = mergeView;
		if (mergeView) {
			baseview.params.compare_view = $.parseJSON(viewsService.serializeView(mergeView));
		} else {
			baseview.params.compare_view = null;
		}
	};

    $scope.$watch('reststoreService.savedViews', function (newValue, oldValue) {
	    if (newValue != oldValue) {
           $scope.savedViews = get_hierarchy_menu(reststoreService.savedViews, function(view){
			   return view.owner == cvOptions.user && view.shared == false;
		   });
           $scope.sharedViews = get_hierarchy_menu(reststoreService.savedViews, function(view){
			   return view.shared == true;
		   });
       }
    });

	$scope.initialize();

	$scope.$watch('reststoreService.savedViews', function(newValue, oldValue){
       if (newValue != oldValue) {
           reststoreService.dashboardList();
       }
    });

   $scope.$watch('reststoreService.savedDashboards', function (newValue, oldValue) {
       // First load
       if (newValue != oldValue && newValue.length != 0 && oldValue.length == 0) {
           reststoreService.savedDashboards.forEach(function (d) {
               if (d.is_default && d.owner == cvOptions.user) {
                   reststoreService.dashboard = d;
                   reststoreService.restoreDashboard(d);
                   return;
               }
           });
       }
   });

   $scope.$watch('reststoreService.news', function (newValue, oldValue) {
       // First load
       if (newValue != oldValue && newValue.length != 0) {
           reststoreService.news.forEach(function (n) {
           	n.body = $sce.trustAsHtml(n.body);
           	$scope.news.push(n);
           });
       }
   });

   $rootScope.$on("VIEW-DRAG-START", function (e, event) {
       $scope.drag_start_event = event;
   });

   $rootScope.$on("VIEW-DRAG-STOP", function (e, event) {
       var start_idx = studioViewsService.views.indexOf(angular.element($scope.drag_start_event.currentTarget).scope().studioView);
       var stop_idx = studioViewsService.views.indexOf(angular.element(event.currentTarget).scope().studioView);

       if (start_idx == stop_idx) {
           return;
       }

       // Rearrange views
       var tmp = studioViewsService.views[start_idx];
       studioViewsService.views[start_idx] = studioViewsService.views[stop_idx];
       studioViewsService.views[stop_idx] = tmp;

       $timeout(function () {
           $('.cv-views-container').masonry('reloadItems').masonry('layout');
           $timeout(function () {
               $('.cv-views-container').masonry('reloadItems').masonry('layout');
           }, 100);
       }, 100);
   });
}]);




angular.module('cv.studio').controller("CubesViewerRenameController", ['$rootScope', '$scope', '$uibModalInstance', 'cvOptions', 'cubesService', 'studioViewsService', 'view',
                                                                       function ($rootScope, $scope, $uibModalInstance, cvOptions, cubesService, studioViewsService, view) {

	$scope.cvVersion = cubesviewer.version;
	$scope.cvOptions = cvOptions;
	$scope.cubesService = cubesService;
	$scope.studioViewsService = studioViewsService;

	$scope.viewName = view.params.name;

	/*
	 * Add a serialized view.
	 */
	$scope.renameView = function(viewName) {

		// TODO: Validate name
		if ((viewName != null) && (viewName != "")) {
			view.params.name = viewName;
		}

		$uibModalInstance.close(view);
	};

	$scope.close = function() {
		$uibModalInstance.dismiss('cancel');
	};

}]);

angular.module('cv.studio').controller("CubesViewerSetupControlsController", ['$rootScope', '$scope', '$uibModalInstance', 'cvOptions', 'cubesService', 'studioViewsService', 'viewsService', 'view',
    function ($rootScope, $scope, $uibModalInstance, cvOptions, cubesService, studioViewsService, viewsService, view) {

        $scope.cvVersion = cubesviewer.version;
        $scope.cvOptions = cvOptions;
        $scope.cubesService = cubesService;
        $scope.studioViewsService = studioViewsService;

        $scope.menuPath = view.params.menu_path;
        $scope.tooltipTemplate = view.params.tooltip_template;
        $scope.help = view.help;
        $scope.view = view;

        $scope.drilldowns = [];
        $scope.filters = [];
        $scope.horizontalDimensions = [];
        $scope.zAxis = [];
        $scope.measures = [];
        $scope.aggregates = [];

		$scope._cloneCube = null;

        var enabled_drilldowns = view.getEnabledDrilldowns();
        var enabled_filters = view.getEnabledFilters();
        var enabled_h_dim = view.getEnabledHorizontalDimensions();
        var enabled_z_dim = view.getEnabledCompareDimensions();
        var enabled_measures = view.getEnabledMeasures();
        var enabled_aggregates = view.getEnabledAggregates();

        view.cube.dimensions.forEach(function (d) {
            $scope.drilldowns.push({'selected': enabled_drilldowns.indexOf(d) != -1, 'label': d.label, 'name': d.name});
            $scope.filters.push({'selected': enabled_filters.indexOf(d) != -1, 'label': d.label, 'name': d.name});
            $scope.horizontalDimensions.push({'selected': enabled_h_dim.indexOf(d) != -1, 'label': d.label, 'name': d.name});
            if (d.name != view.params.xaxis) {
				$scope.zAxis.push({'selected': enabled_z_dim.indexOf(d) != -1, 'label': d.label, 'name': d.name});
			}
        });

        view.cube.measures.forEach(function (d) {
            $scope.measures.push({'selected': enabled_measures.indexOf(d) != -1, 'label': d.label, 'name': d.name});
        });

        view.cube.aggregates.forEach(function (d) {
            $scope.aggregates.push({'selected': enabled_aggregates.indexOf(d) != -1, 'label': d.label, 'name': d.name});
        });

        /*
         * Add a serialized view.
         */
        $scope.save = function () {
            view.params.menu_path = $scope.menuPath;
            view.params.tooltip_template = $scope.tooltipTemplate;

            view.setEnabledDrilldowns($scope.drilldowns);
            view.setEnabledFilters($scope.filters);
			view.setEnabledHorizontalDimensions($scope.horizontalDimensions);
			view.setEnabledCompareDimensions($scope.zAxis);
            view.setEnabledMeasures($scope.measures);
            view.setEnabledAggregates($scope.aggregates);
			view.help = $scope.help;

            $uibModalInstance.close(view);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.cloneWithCube = function(cube) {
			$scope.close();
			var serializedView  = viewsService.serializeView($scope.view);
			var view = $.parseJSON(serializedView);
			view.cubename = cube;
			view.name = 'Clone of ' + view.name;
			view.help = $scope.view.help;
			studioViewsService.addViewObject(view);
		};

    }]);

angular.module('cv.studio').controller("CubesViewerHelpController", ['$rootScope', '$scope', '$uibModalInstance', '$sce',
    'cvOptions', 'cubesService', 'studioViewsService', 'view',
    function ($rootScope, $scope, $uibModalInstance, $sce, cvOptions, cubesService, studioViewsService, view) {
        $scope.help = $sce.trustAsHtml(view.help);

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

angular.module('cv.studio').controller("CubesViewerRenameDashboardController", ['$rootScope', '$scope', '$uibModalInstance', 'cvOptions', 'cubesService', 'studioViewsService', 'dashboard',
                                                                       function ($rootScope, $scope, $uibModalInstance, cvOptions, cubesService, studioViewsService, dashboard) {

	$scope.dashboardName = dashboard.name;

	$scope.renameDashboard = function(name) {

		if ((name != null) && (name != "")) {
			dashboard.name = name;
		}

		$uibModalInstance.close();
	};

	$scope.close = function() {
		$uibModalInstance.dismiss('cancel');
	};

}]);

// Disable Debug Info (for production)
angular.module('cv.studio').config([ '$compileProvider', function($compileProvider) {
	// TODO: Enable debug optionally
	// $compileProvider.debugInfoEnabled(false);
} ]);


angular.module('cv.studio').run(['$rootScope', '$compile', '$controller', '$http', '$templateCache', 'cvOptions',
           function($rootScope, $compile, $controller, $http, $templateCache, cvOptions) {

	console.debug("Bootstrapping CubesViewer Studio.");

    // Add default options
	var defaultOptions = {
        container: null,
        user: null,
        studioTwoColumn: false,
        hideControls: false,

        backendUrl: null
    };
	$.extend(defaultOptions, cvOptions);
	$.extend(cvOptions, defaultOptions);

    // Get main template from template cache and compile it
	$http.get("studio/studio.html", { cache: $templateCache } ).then(function(response) {

		//var scope = angular.element(document).scope();
		var templateScope = $rootScope.$new();
		$(cvOptions.container).html(response.data);

		//templateCtrl = $controller("CubesViewerStudioController", { $scope: templateScope } );
		//$(cvOptions.container).children().data('$ngControllerController', templateCtrl);

		$compile($(cvOptions.container).contents())(templateScope);
	});

}]);


/**
 * CubesViewer Studio global instance and entry point. Used to initialize
 * CubesViewer Studio.
 *
 * This class is available through the global cubesviewerStudio variable,
 * and must not be instantiated.
 *
 * If you are embedding views in a 3rd party site and you do not need
 * Studio features, use {@link CubesViewer} initialization method instead.
 *
 * Note that the initialization method varies depending
 * on whether your application uses Angular 1.x or not.
 *
 * @class
 */
function CubesViewerStudio() {

	this._configure = function(options) {
		cubesviewer._configure(options);
	};

	/**
	 * Initializes CubesViewer Studio.
	 *
	 * If you wish to embed CubesViewer Studio within an Angular application, you don't
	 * need to call this method. Instead, use your application Angular `config`
	 * block to initialize the cvOptions constant with your settings,
	 * and add the 'cv.studio' module as a dependency to your application.
	 *
	 * See the `cv-angular.html` example for further information.
	 */
	this.init = function(options) {
		this._configure(options);
   		angular.element(document).ready(function() {
   			angular.bootstrap(document, ['cv.studio']);
   		});
	};

}

/**
 * This is Cubesviewer Studio main entry point. Please see {@link CubesViewerStudio}
 * documentation for further information.
 *
 * @global
 */
var cubesviewerStudio = new CubesViewerStudio();

