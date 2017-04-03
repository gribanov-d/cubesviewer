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

angular.module('cv.views.cube').controller("CubesViewerViewsCubeChartLinesPlanController", ['$rootScope', '$scope', '$element', '$timeout',
    function ($rootScope, $scope, $element, $timeout) {

        $scope.chart = null;

        $scope.initialize = function () {
            if (!"lineInterpolation" in $scope.view.params.chartoptions) {
                $scope.view.params.chartoptions.lineInterpolation = "linear";
            }
        };

        $scope.$on('gridDataUpdated', function () {
            $scope.chartCtrl.cleanupNvd3();
            $timeout(function () {
                $scope.drawChartLinesPlan();
            }, 0);
        });


        /**
         * Draws a vertical bars chart.
         */
        $scope.drawChartLinesPlan = function () {
            var view = $scope.view;
            var dataRows = $scope.view.grid.data;
            var columnDefs = view.grid.columnDefs;

            var container = $($element).find("svg").get(0);

            var xAxisLabel = ( (view.params.xaxis !== null) ? view.cube.dimensionParts(view.params.xaxis).label : "None");

            var tooltip_aggregates = $scope.getTooltipTemplateAggregates(view);

            var plan_aggregate = view.params.yaxis + '.plan';
            var plan_data = [];

            var y_max_value = 0;
            var y_min_value = 0;

            var d = [];
            var serieCount = 0;

            $(dataRows).each(function (idx, e) {
                var serie = [];
                for (var i = 1; i < columnDefs.length; i++) {
                    if (columnDefs[i].field in e) {
                        var value = e[columnDefs[i].field];
                        var plan = e['_cells'][columnDefs[i].field][plan_aggregate];
                        plan = plan === undefined ? 0 : plan;
                        var data = {"x": i, "y": (value !== undefined) ? value : 0};
                        if (idx === 0) plan_data.push({"x": i, "y": plan});
                        tooltip_aggregates.forEach(function (v) {
                            data[v] = e['_cells'][columnDefs[i].field][v];
                        });
                        serie.push(data);
                        y_max_value = y_max_value < plan ? plan : y_max_value;
                        y_min_value = y_min_value > plan ? plan : y_min_value;
                    } else {
                        serie.push({"x": i, "y": 0});
                    }
                }

                var series = {"values": serie, "key": e["key"] !== "" ? e["key"] : view.params.yaxis};
                if (view.params["chart-disabledseries"]) {
                    if (view.params["chart-disabledseries"]["key"] === (view.params.drilldown.join(","))) {
                        series.disabled = !!view.params["chart-disabledseries"]["disabled"][series.key];
                    }
                }
                d.push(series);
                serieCount++;
            });

            $scope.sortSeries(d);

            d.push({
                "key": "Plan",
                "values": plan_data,
                "is_plan": true,
                'color': nv.utils.defaultColor()(0),
                'strokeDasharray': '1%'
            });

            var ag = $.grep(view.cube.aggregates, function (ag) {
                return ag.ref === view.params.yaxis
            })[0];
            var colFormatter = $scope.columnFormatFunction(ag);


            nv.addGraph(function () {
                var chart = nv.models.lineChart()
                    .useInteractiveGuideline(true)
                    .interpolate($scope.view.params.chartoptions.lineInterpolation)
                    .showLegend(Boolean(view.params.chartoptions.showLegend))
                    .margin({left: 120});

                chart.xAxis
                    .axisLabel(xAxisLabel)
                    .tickFormat(function (d, i) {
                        return (columnDefs[d].name);
                    });

                chart.yAxis.tickFormat(function (d, i) {
                    return colFormatter(d);
                });

                $scope.modify_tooltip(chart);

                d3.select(container)
                    .datum(d)
                    .call(chart);

                // Handler for state change
                chart.dispatch.on('stateChange', function (newState) {
                    view.params["chart-disabledseries"] = {
                        "key": view.params.drilldown.join(","),
                        "disabled": {}
                    };
                    for (var i = 0; i < newState.disabled.length; i++) {
                        view.params["chart-disabledseries"]["disabled"][d[i]["key"]] = newState.disabled[i];
                    }
                });

                $scope.chartCtrl.chart = chart;
                return chart;
            });
        };

        $scope.initialize();

    }]);


