/*
 * CubesViewer
 * Copyright (c) 2012-2016 Jose Juan Montes, see AUTHORS for more details
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Sof	tware, and to permit persons to whom the Software is
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



/**
 * Manipulates series.
 */

"use strict";


/**
 * SeriesTable object. This is part of the "cube" view. Allows the user to select
 * a dimension to use as horizontal axis of a table. This is later used to generate
 * charts.
 */
angular.module('cv.views.cube').controller("CubesViewerViewsCubeSeriesController", ['$rootScope', '$scope', '$timeout', 'cvOptions', 'cubesService', 'viewsService', 'seriesOperationsService',
    function ($rootScope, $scope, $timeout, cvOptions, cubesService, viewsService, seriesOperationsService) {

        $scope.view.grid.enableRowSelection = false;
        $scope.view.grid.enableRowHeaderSelection = false;

	    $scope.initialize = function() {
            $scope.view.params = $.extend(
                {},
			{ "xaxis" : null, "yaxis" : null },
                $scope.view.params
            );
            $scope.refreshView();
        };

	    $scope.$on("ViewRefresh", function(view) {
            $scope.loadData();
        });

        $scope.$watch('view.compare_view', function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.loadData();
            }
        });

        $scope.$watch('view.compare_view.grid.data', function (newValue, oldValue) {
            if (newValue && newValue.length && newValue != oldValue) {
                $scope.loadData();
            }
        });

        $scope.$watch('view.compare_view.pendingRequests', function (newValue, oldValue) {
            if (newValue === 0) {
                $scope.loadData();
            }
        });

        $scope.loadData = function() {

            var view = $scope.view;

            // Check if we can produce a table
            if (view.params.yaxis == null) return;

            var browser_args = cubesService.buildBrowserArgs($scope.view, $scope.view.params.xaxis != null ? true : false, false);
            var browser = new cubes.Browser(cubesService.cubesserver, $scope.view.cube);
            var viewStateKey = $scope.newViewStateKey();
            var jqxhr = browser.aggregate(browser_args, $scope._loadDataCallback(viewStateKey));

            $scope.view.pendingRequests++;
            jqxhr.always(function() {
                $scope.view.pendingRequests--;
                $rootScope.$apply();
            });
            jqxhr.error($scope.requestErrorHandler);

        };

        $scope._loadDataCallback = function(viewStateKey) {
            return function(data, status) {
                // Only update if view hasn't changed since data was requested.
                if (viewStateKey == $scope._viewStateKey) {
                    $scope.validateData(data, status);
                    $scope.processData(data);
                    $rootScope.$apply();
                }
            };
        };

        $scope.processData = function(data) {

            var view = $scope.view;

            //$scope.rawData = data;

            $scope.resetGrid();
            $scope.view.grid.data = [];
            $scope.view.grid.columnDefs = [];
            $rootScope.$apply();

            // Configure grid
            angular.extend($scope.view.grid, {
                data: [],
                //minRowsToShow: 3,
                rowHeight: 24,
                onRegisterApi: $scope.onGridRegisterApi,
                enableColumnResizing: true,
                showColumnFooter: false,
                enableGridMenu: true,
                //showGridFooter: false,
                paginationPageSizes: cvOptions.pagingOptions,
                paginationPageSize: cvOptions.pagingOptions[0],
                //enableHorizontalScrollbar: 0,
                //enableVerticalScrollbar: 0,
                enableRowSelection: false,
                enableRowHeaderSelection: false,
                //enableSelectAll: false,
                enablePinning: false,
                multiSelect: false,
                selectionRowHeaderWidth: 20,
                //rowHeight: 50,
                columnDefs: []
            });

            // Process data
            //$scope._sortData (data.cells, view.params.xaxis != null ? true : false);
            $scope._addRows($scope, data);

            var aggregates = $scope.getTooltipTemplateAggregates(view);

            var aggregateNames = {};
            view.cube.aggregates.forEach(function(agg){
                if (aggregates.indexOf(agg.name) != -1) {
                    aggregateNames[agg.name] = agg.label;
                }
            });

            var newDataRows = [];
            view.grid.data.forEach(function (row) {
                var newRow = {};
                var series = {};
                aggregates.forEach(function (agg) {
                    series[agg] = {};
                });
                view.grid.columnDefs.forEach(function (col) {
                    var id = col['field'];
                    newRow[id] = row[id];
                    aggregates.forEach(function (agg) {
                        if (row['_cells'][id]) {
                            series[agg][id] = row['_cells'][id][agg];
                        } else {
                            series[agg][id] = row[id];
                        }
                        if (id == 'key0') {
                            series[agg][id] = '\\-' + aggregateNames[agg];
                        } else {

                        }
                    });
                });
                newDataRows.push(newRow);
                aggregates.forEach(function (agg) {
                    newDataRows.push(series[agg]);
                });
            });
            view.grid.data = newDataRows;

            if (view.compare_view) {
                var dRws = view.compare_view.grid.data;
                var cDfs = view.compare_view.grid.columnDefs;

                dRws.forEach(function (row) {
                    var newRow = {};
                    var series = {};
                    cDfs.forEach(function (col) {
                        var id = col['field'];
                        newRow[id] = row[id];
                        if (id == 'key0') {
                            newRow[id] = '(C) ' + newRow[id]
                        }
                        aggregates.forEach(function (agg) {
                            if (row['_cells'][id]) {
                                series[agg][id] = row['_cells'][id][agg];
                            } else {
                                series[agg][id] = row[id];
                            }
                            if (id == 'key0') {
                                series[agg][id] = '\\-' + aggregateNames[agg];
                            }
                        });
                    });
                    newDataRows.push(newRow);
                });
                view.grid.data = newDataRows;
            }

            $scope.group_x();

            seriesOperationsService.applyCalculations($scope.view, $scope.view.grid.data, view.grid.columnDefs);

            /*
             // TODO: Is this needed?

             colNames.forEach(function (e) {
             var colLabel = null;
             $(view.cube.aggregates).each(function (idx, ag) {
             if (ag.name == e) {
             colLabel = ag.label||ag.name;
             return false;
             }
             });
             if (!colLabel) {
             $(view.cube.measures).each(function (idx, me) {
             if (me.name == e) {
             colLabel = me.label||ag.name;
             return false;
             }
             });
             }
             //colLabel = view.cube.getDimension(e).label
             colLabels.push(colLabel||e);
             });
             */

        };


        /*
         * Adds rows.
         */
        $scope._addRows = cubesviewer._seriesAddRows;

        $scope.group_x = function () {
            var newRows = [];
            var step = $scope.view.params.chart_group_x;
            var method = $scope.view.params.chart_group_x_method;
            if (step === undefined) {
                step = 1;
            }

            if (step === 1) {
                return;
            }

            var columnDefs = $scope.view.grid.columnDefs;
            var newColDefs = [];
            var j = 1;
            for (var i = 0; i < columnDefs.length; i++) {
                if (columnDefs[i].field === 'key0') {
                    newColDefs.push(columnDefs[i]);
                    continue;
                }
                if (j < step) {
                    j += 1;
                } else {
                    newColDefs.push(columnDefs[i]);
                    j = 1;
                }
            }

            $scope.view.grid.data.forEach(function (row) {
                var sum = 0;
                var j = 1;
                var newRow = {};
                for (var i = 0; i < columnDefs.length; i++) {
                    if (columnDefs[i].field === 'key0') {
                        newRow[columnDefs[i].field] = row[columnDefs[i].field];
                        continue;
                    }
                    sum += row[columnDefs[i].field];
                    if (j < step) {
                        j += 1;
                    } else {
                        newRow[columnDefs[i].field] = sum;
                        if (method === 'avg') {
                            newRow[columnDefs[i].field] = sum / step;
                        }
                        j = 1;
                        sum = 0;
                    }
                }
                newRows.push(newRow);
            });

            $scope.view.grid.data = newRows;
            $scope.view.grid.columnDefs = newColDefs;
        };

        $scope.$on("$destroy", function () {
            $scope.view.grid.data = [];
            $scope.view.grid.columnDefs = [];
        });

        $scope.initialize();

    }]);

cubesviewer._seriesAddRows = function($scope, data, zaxis) {

    var view = $scope.view;
    var rows = view.grid.data;

    var counter = 0;
    var dimensions = view.cube.dimensions;
    var measures = view.cube.measures;
    var details = view.cube.details;

    // Copy drilldown as we'll modify it
    var drilldown = view.params.drilldown.slice(0);

    // Include X Axis if necessary
    if (view.params.xaxis != null) {
        drilldown.splice(0,0, view.params.xaxis);
    }

    // Include Z Axis if necessary
    if (zaxis != null) {
        drilldown.splice(1, 0, zaxis);
    }

    var baseidx = ((view.params.xaxis == null) ? 0 : 1);

    var xAxisDimension = view.cube.dimensionParts(view.params.xaxis);

    var addedCols = [];
    $(data.cells).each(function (idx, e) {

        var row = [];
        var key = [];

        // For the drilldown level, if present
        for (var i = 0; i < drilldown.length; i++) {

            // Get dimension
            var parts = view.cube.dimensionParts(drilldown[i]);
            var infos = parts.hierarchy.readCell(e, parts.level);

            // Values and Labels
            var drilldownLevelValues = [];
            var drilldownLevelLabels = [];

            $(infos).each(function(idx, info) {
                drilldownLevelValues.push(info.key);
                drilldownLevelLabels.push(info.label);
            });

			key.push (drilldownLevelLabels.join(" / "));

        }

        // Set key
        var colKey = (view.params.xaxis == null) ? view.params.yaxis : key[0];
        var value = (e[view.params.yaxis]);
        var rowKey = (view.params.xaxis == null) ? key.join (' / ') : key.slice(1).join (' / ');

        // Search or introduce
		var row = $.grep(rows, function(ed) { return ed["key"] == rowKey; });
        if (row.length > 0) {
            row[0][colKey] = value;
            row[0]["_cells"][colKey] = e;
        } else {
            var newrow = {};
            newrow["key"] = rowKey;
            newrow[colKey] = value;

			for (var i = baseidx ; i < key.length; i++) {
                newrow["key" + (i - baseidx)] = key[i];
            }

            newrow["_cells"] = {};
            newrow["_cells"][colKey] = e;
			rows.push ( newrow );
        }


        // Add column definition if the column hasn't been added yet
        if (addedCols.indexOf(colKey) < 0) {
            addedCols.push(colKey);

			var ag = $.grep(view.cube.aggregates, function(ag) { return ag.ref == view.params.yaxis })[0];

            var asDate = null;
            var weeknum = null;
            if (xAxisDimension.dimension.role === 'time') {
                var date_arr = colKey.split('/');
                if (xAxisDimension.dimension.info['cv-datefilter-hasweek']) {
                    weeknum = date_arr.splice(2, 1);
                }
                if (date_arr.length > 1) {
                    date_arr[1] -= 1;
                }
                asDate = new Date(Date.UTC.apply(null, date_arr));
            }

            var col = {
                name: colKey,
                field: colKey,
				index : colKey,
                asDate: asDate,
                weekNum: weeknum,
				cellClass : "text-right",
                //sorttype : "number",
                cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{ col.colDef.formatter(COL_FIELD, row, col) }}</div>',
                formatter: $scope.columnFormatFunction(ag),
                //footerValue: $scope.columnFormatFunction(ag)(data.summary[ag.ref], null, col)
                //formatoptions: {},
                //cellattr: cubesviewer.views.cube.explore.columnTooltipAttr(ag.ref),
                //footerCellTemplate = '<div class="ui-grid-cell-contents text-right">{{ col.colDef.footerValue }}</div>';
                enableHiding: false,
                width: $scope.defineColumnWidth(colKey, 90),
                sort: $scope.defineColumnSort(colKey),
            };
            view.grid.columnDefs.push(col);
        }
    });

    //var label = [];
	$(view.params.drilldown).each (function (idx, e) {
        var col = {
            name: view.cube.cvdim_dim(e).label,
            field: "key" + idx,
			index : "key" + idx,
            headerCellClass: "cv-grid-header-dimension",
            enableHiding: false,
            //cellClass : "text-right",
            //sorttype : "number",
            //cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{ col.colDef.formatter(COL_FIELD, row, col) }}</div>',
            //formatter: $scope.columnFormatFunction(ag),
            //footerValue: $scope.columnFormatFunction(ag)(data.summary[ag.ref], null, col)
            //formatoptions: {},
            //cellattr: cubesviewer.views.cube.explore.columnTooltipAttr(ag.ref),
            //footerCellTemplate = '<div class="ui-grid-cell-contents text-right">{{ col.colDef.footerValue }}</div>';
			width : $scope.defineColumnWidth("key" + idx, 190),
            sort: $scope.defineColumnSort("key" + idx),
            sortingAlgorithm: $scope.sortDimensionParts(view.cube.dimensionParts(e))
        };
        view.grid.columnDefs.splice(idx, 0, col);
    });

    if (view.params.drilldown.length == 0 && rows.length > 0) {
        rows[0]["key0"] = view.cube.aggregateFromName(view.params.yaxis).label;

        var col = {
            name: "Measure",
            field: "key0",
			index : "key0",
            headerCellClass: "cv-grid-header-measure",
            enableHiding: false,
            //cellClass : "text-right",
            //sorttype : "number",
            //cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{ col.colDef.formatter(COL_FIELD, row, col) }}</div>',
            //formatter: $scope.columnFormatFunction(ag),
            //footerValue: $scope.columnFormatFunction(ag)(data.summary[ag.ref], null, col)
            //formatoptions: {},
            //cellattr: cubesviewer.views.cube.explore.columnTooltipAttr(ag.ref),
            //footerCellTemplate = '<div class="ui-grid-cell-contents text-right">{{ col.colDef.footerValue }}</div>';
			width : $scope.defineColumnWidth("key0", 190),
            sort: $scope.defineColumnSort("key0")
        };
        view.grid.columnDefs.splice(0, 0, col);
    }

};

