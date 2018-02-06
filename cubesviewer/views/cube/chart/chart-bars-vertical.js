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

/*
 * Series chart object. Contains view functions for the 'chart' mode.
 * This is an optional component, part of the cube view.
 */

"use strict";

angular.module('cv.views.cube').controller("CubesViewerViewsCubeChartBarsVerticalController", ['$rootScope', '$scope', '$element', '$timeout', 'cvOptions', 'cubesService', 'viewsService',
                                                     function ($rootScope, $scope, $element, $timeout, cvOptions, cubesService, viewsService) {

	$scope.chart = null;

	$scope.initialize = function() {
	};

	$scope.$on('gridDataUpdated', function() {
		$scope.chartCtrl.cleanupNvd3();
		$timeout(function() {
			$scope.drawChartBarsVertical();
		}, 0);
	});

	/**
	 * Draws a vertical bars chart.
	 */
	$scope.drawChartBarsVertical = function () {

		var view = $scope.view;
		var dataRows = $scope.view.grid.data;
		var columnDefs = view.grid.columnDefs;

		var container = $($element).find("svg").get(0);
		var xAxisLabel = ( (view.params.xaxis != null) ? view.cube.dimensionParts(view.params.xaxis).label : "None")
        var xAxisDimension = view.cube.dimensionParts(view.params.xaxis);

        var tooltip_aggregates = $scope.getTooltipTemplateAggregates(view);

	    var d = [];

	    var serieCount = 0;
	    $(dataRows).each(function(idx, e) {
	    	var serie = [];
	    	for (var i = 1; i < columnDefs.length; i++) {
	    		var value = e[columnDefs[i].name];
	    		var data = { "x": i, "y":  (value !== undefined) ? value : 0 }
                tooltip_aggregates.forEach(function(v){
                    if (e['_cells'][columnDefs[i].field] !== undefined) {
                        data[v] = e['_cells'][columnDefs[i].field][v];
                    }
                });
	    		serie.push(data);
	    	}
            serie = $scope.group_x(serie, tooltip_aggregates, $scope.view.params.chart_group_x,
                $scope.view.params.chart_group_x_method);
	    	var series = { "values": serie, "key": e["key"] != "" ? e["key"] : view.params.yaxis };
	    	if (view.params["chart-disabledseries"]) {
	    		if (view.params["chart-disabledseries"]["key"] == (view.params.drilldown.join(","))) {
	    			series.disabled = !! view.params["chart-disabledseries"]["disabled"][series.key];
	    		}
	    	}
	    	d.push(series);
	    	serieCount++;
	    });
	    d.sort(function(a,b) { return a.key < b.key ? -1 : (a.key > b.key ? +1 : 0) });


	    var chartOptions = {
	    	  delay: 120,
	    	  groupSpacing: 0.1
	    };

	    var ag = $.grep(view.cube.aggregates, function(ag) { return ag.ref == view.params.yaxis })[0];
		var colFormatter = $scope.columnFormatFunction(ag);

	    nv.addGraph(function() {
	        var chart = nv.models.multiBarChart()
                  .useInteractiveGuideline(true)
		          .showLegend(!!view.params.chartoptions.showLegend)
		          .margin({left: 120});

	    	if (view.params["chart-barsvertical-stacked"]) {
	    		chart.stacked ( view.params["chart-barsvertical-stacked"] );
	    	}

	        chart.options(chartOptions);
	        chart.multibar.hideable(true);

            chart.xAxis
                .axisLabel(xAxisLabel)
                .tickFormat(function (d, i) {
                    return $scope.formatXAxisTick(columnDefs[d], xAxisDimension);
                });

            chart.yAxis.tickFormat(function (d, i) {
                return colFormatter(d);
            });

            chart.tooltip.headerFormatter(function (d, i) {
                return $scope.formatXAxisTooltip(columnDefs[d], xAxisDimension);
            });
            chart.interactiveLayer.tooltip.headerFormatter(function (d, i) {
                return $scope.formatXAxisTooltip(columnDefs[d], xAxisDimension);
            });

            chart.interactiveLayer.tooltip.valueFormatter(function (d, i) {
                return colFormatter(d);
            });

            $scope.modify_tooltip(chart);

            d3.select(container)
                .datum(d)
                .call(chart)
				.append('line')
                .attr('x1', 30).attr('y1', 0).attr('x2', 10).attr('y2', 50)
                .style("stroke-width", 2).style("stroke", "red").style("fill", "none");

            $scope.chartCtrl.cleanupTooltip();


    	    // Handler for state change
            chart.dispatch.on('stateChange', function(newState) {
            	view.params["chart-barsvertical-stacked"] = newState.stacked;
            	view.params["chart-disabledseries"] = {
        			  "key": view.params.drilldown.join(","),
        			  "disabled": {}
            	};
            	for (var i = 0; i < newState.disabled.length; i++) {
            		view.params["chart-disabledseries"]["disabled"][d[i]["key"]] =  newState.disabled[i];
            	}
            	if (view.updateUndo) {
					view.updateUndo();
				}
            });


            $scope.chartCtrl.chart = chart;

            // x values of vertical lines
            var xgrid = [21, 34, 45];

            // add vertical lines
            var custLine = d3.select(container)
                .select('.nv-multiBarWithLegend')
                .append('g');

            custLine.selectAll('line')
                .data(xgrid)
                .enter()
                .append('line')
                .attr({
                    x1: function(d){ return chart.xAxis.scale()(d) },
                    y1: function(d){ return chart.yAxis.scale()(0) },
                    x2: function(d){ return chart.xAxis.scale()(d) },
                    y2: function(d){ return chart.yAxis.scale()(100) }
                })
                .style("stroke", "#6b6669");

	        return chart;

	    });

	}

	$scope.initialize();

}]);


