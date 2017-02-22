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

angular.module('cv.views.cube').controller("CubesViewerViewsCubeChartLinesController", ['$rootScope', '$scope', '$element', '$timeout', 'cvOptions', 'cubesService', 'viewsService',
    function ($rootScope, $scope, $element, $timeout, cvOptions, cubesService, viewsService) {

        $scope.chart = null;

        $scope.initialize = function () {
            if (!"lineInterpolation" in $scope.view.params.chartoptions) {
                $scope.view.params.chartoptions.lineInterpolation = "linear";
            }
        };

        $scope.$on('gridDataUpdated', function () {
            $scope.drawChartLines();
        });

        $scope.$watch('view.compare_view', function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.drawChartLines();
            }
        });

        $scope.$watch('view.compare_view.grid.data', function (newValue, oldValue) {
            if (newValue && newValue.length && newValue != oldValue) {
                $scope.drawChartLines();
            }
        });

        $scope.$watch('view.compare_view.pendingRequests', function (newValue, oldValue) {
            if (newValue === 0) {
                $scope.drawChartLines();
            }
        });


        /**
         * Draws a vertical bars chart.
         */
        $scope.drawChartLines = function () {
            $scope.chartCtrl.cleanupNvd3();

            var view = $scope.view;

            var dataRows = view.grid.data;
            var columnDefs = view.grid.columnDefs;

            var dRws;
            var cDfs;

            var container = $($element).find("svg").get(0);

            var xAxisLabel = ( (view.params.xaxis != null) ? view.cube.dimensionParts(view.params.xaxis).label : "None");
            var xAxisDimension = view.cube.dimensionParts(view.params.xaxis);

            var tooltip_aggregates = $scope.getTooltipTemplateAggregates(view);

            // TODO: Check there's only one value column

            var d = [];
            var serieCount = 0;
            $(dataRows).each(function (idx, e) {
                var serie = [];
                for (var i = 1; i < columnDefs.length; i++) {
                    if (columnDefs[i].field in e) {
                        var value = e[columnDefs[i].field];
                        var data = {"x": i, "y": (value != undefined) ? value : 0};
                        tooltip_aggregates.forEach(function (v) {
                            data[v] = e['_cells'][columnDefs[i].field][v];
                        });
                        serie.push(data);
                    } else {
                        serie.push({"x": i, "y": 0});
                    }
                }

                serie = $scope.group_x(serie, tooltip_aggregates, $scope.view.params.chart_group_x,
                    $scope.view.params.chart_group_x_method);

                var series = {"values": serie, "key": e["key"] !== "" ? e["key"] : view.params.yaxis};
                if (view.params["chart-disabledseries"]) {
                    if (view.params["chart-disabledseries"]["key"] == (view.params.drilldown.join(","))) {
                        series.disabled = !!view.params["chart-disabledseries"]["disabled"][series.key];
                    }
                }
                d.push(series);
                serieCount++;
            });
            if (view.compare_view) {
                dRws = view.compare_view.grid.data;
                cDfs = view.compare_view.grid.columnDefs;
                $(dRws).each(function (idx, e) {
                    var serie = [];
                    for (var i = 1; i < cDfs.length; i++) {
                        if (cDfs[i].field in e) {
                            var value = e[cDfs[i].field];
                            var data = {"x": i, "y": (value != undefined) ? value : 0};
                            tooltip_aggregates.forEach(function (v) {
                                data[v] = e['_cells'][cDfs[i].field][v];
                            });
                            serie.push(data);
                        } else {
                            serie.push({"x": i, "y": 0});
                        }
                    }
                    var key = e["key"] != "" ? e["key"] : view.params.yaxis;
                    serie = $scope.group_x(serie, tooltip_aggregates, $scope.view.params.chart_group_x,
                        $scope.view.params.chart_group_x_method);
                    var series = {"values": serie, "key": '(C) ' + key};
                    if (view.params["chart-disabledseries"]) {
                        if (view.params["chart-disabledseries"]["key"] == (view.params.drilldown.join(","))) {
                            series.disabled = !!view.params["chart-disabledseries"]["disabled"][series.key];
                        }
                    }
                    d.push(series);
                    serieCount++;
                });
            }
            d.sort(function (a, b) {
                return a.key < b.key ? -1 : (a.key > b.key ? +1 : 0)
            });

            var ag = $.grep(view.cube.aggregates, function (ag) {
                return ag.ref == view.params.yaxis
            })[0];
            var colFormatter = $scope.columnFormatFunction(ag);

            if (view.params.charttype != "lines-stacked") {

                nv.addGraph(function () {
                    var chart = nv.models.lineChart()
                        .useInteractiveGuideline(true)
                        .interpolate($scope.view.params.chartoptions.lineInterpolation)
                        .showLegend(!!view.params.chartoptions.showLegend)
                        .margin({left: 120});

                    chart.xAxis
                        .axisLabel(xAxisLabel)
                        .tickFormat(function (d, i) {
                            if (columnDefs[d]) {
                                return $scope.formatXAxisTick(columnDefs[d], xAxisDimension);
                            } else if (cDfs && cDfs[d]) {
                                return $scope.formatXAxisTick(cDfs[d], xAxisDimension);
                            }
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

                    $scope.modify_tooltip(chart);

                    d3.select(container)
                        .datum(d)
                        .call(chart);

                    $scope.chartCtrl.cleanupTooltip();

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

            } else {

                nv.addGraph(function () {
                    var chart = nv.models.stackedAreaChart()
                        .showLegend(!!view.params.chartoptions.showLegend)
                        .interpolate($scope.view.params.chartoptions.lineInterpolation)
                        .margin({left: 130})
                        .clipEdge(true)
                        .useInteractiveGuideline(true);

                    if (view.params["chart-stackedarea-style"]) {
                        chart.style(view.params["chart-stackedarea-style"]);
                    }

                    chart.xAxis
                        .axisLabel(xAxisLabel)
                        .showMaxMin(false)
                        .tickFormat(function (d, i) {
                            if (columnDefs[d]) {
                                return $scope.formatXAxisTick(columnDefs[d], xAxisDimension);
                            } else if (cDfs && cDfs[d]) {
                                return $scope.formatXAxisTick(cDfs[d], xAxisDimension);
                            }
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

                    d3.select(container)
                        .datum(d)
                        .call(chart);

                    $scope.chartCtrl.cleanupTooltip();

                    // Handler for state change
                    chart.dispatch.on('stateChange', function (newState) {
                        view.params["chart-stackedarea-style"] = newState.style;
                        view.params["chart-disabledseries"] = {
                            "key": view.params.drilldown.join(","),
                            "disabled": {}
                        };
                        for (var i = 0; i < newState.disabled.length; i++) {
                            view.params["chart-disabledseries"]["disabled"][d[i]["key"]] = newState.disabled[i];
                        }
                        if (view.updateUndo) {
                            view.updateUndo();
                        }
                    });

                    $scope.chartCtrl.chart = chart;
                    return chart;
                });
            }

        };

        $scope.initialize();

    }]);


