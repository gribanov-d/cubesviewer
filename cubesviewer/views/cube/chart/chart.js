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

/*
 * Series chart object. Contains view functions for the 'chart' mode.
 * This is an optional component, part of the cube view.
 */

angular.module('cv.views.cube').controller("CubesViewerViewsCubeChartController", ['$rootScope', '$scope',
    '$timeout', '$element', 'cvOptions', 'cubesService', 'viewsService', 'seriesOperationsService', 'exportService',
    'studioViewsService',
    function ($rootScope, $scope, $timeout, $element, cvOptions, cubesService, viewsService, seriesOperationsService,
              exportService, studioViewsService) {

        $scope.studioViewsService = studioViewsService;
        var chartCtrl = this;

        this.chart = null;

        this.initialize = function () {
            // Add chart view parameters to view definition
            $scope.view.params = $.extend(
                {},
                {
                    "charttype": "bars-vertical",
                    "chartoptions": {showLegend: true},
                    "chart_group_x": 1,
                    "chart_group_x_method": "sum"
                },
                $scope.view.params
            );
            //$scope.refreshView();
        };

        $scope.$watch("view.params.charttype", function () {
            chartCtrl.loadData();
        });
        $scope.$on("ViewRefresh", function (view) {
            chartCtrl.loadData();
        });

        this.loadData = function () {

            var view = $scope.view;

            // Check if we can produce a table
            if (view.params.yaxis == null) return;

            var browser_args = cubesService.buildBrowserArgs($scope.view, $scope.view.params.xaxis != null ? true : false, false);
            var browser = new cubes.Browser(cubesService.cubesserver, $scope.view.cube);
            var viewStateKey = $scope.newViewStateKey();
            var jqxhr = browser.aggregate(browser_args, $scope._loadDataCallback(viewStateKey));

            $scope.view.pendingRequests++;
            jqxhr.always(function () {
                $scope.view.pendingRequests--;
                $rootScope.$apply();
            });
            jqxhr.error($scope.requestErrorHandler);

        };

        $scope._loadDataCallback = function (viewStateKey) {
            return function (data, status) {
                // Only update if view hasn't changed since data was requested.
                if (viewStateKey == $scope._viewStateKey) {
                    $scope.validateData(data, status);
                    chartCtrl.processData(data);
                    $rootScope.$apply();
                }
            };
        };

        this.processData = function (data) {

            if ($scope.view.pendingRequests == 0) {
                $($element).find("svg").empty();
                $($element).find("svg").parent().children().not("svg").remove();
            }

            $scope.rawData = data;

            $scope.resetGrid();
            $scope.view.grid.data = [];
            $scope.view.grid.columnDefs = [];
            $rootScope.$apply();

            var view = $scope.view;
            var rows = $scope.view.grid.data;
            var columnDefs = view.grid.columnDefs;

            // Process data
            //$scope._sortData (data.cells, view.params.xaxis != null ? true : false);
            this._addRows($scope, data);
            seriesOperationsService.applyCalculations($scope.view, $scope.view.grid.data, view.grid.columnDefs);

            // Join keys
            if (view.params.drilldown.length > 0) {
                columnDefs.splice(0, view.params.drilldown.length, {
                    name: "key"
                });

                $(rows).each(function (idx, e) {
                    var jointkey = [];
                    for (var i = 0; i < view.params.drilldown.length; i++) jointkey.push(e["key" + i]);
                    e["key"] = jointkey.join(" / ");
                });
            }

            $scope.$broadcast("gridDataUpdated");

        };

        /*
         * Adds rows.
         */
        this._addRows = cubesviewer._seriesAddRows;

        this.cleanupNvd3 = function () {

            //$($element).find("svg").empty();
            $($element).find("svg").parent().children().not("svg").remove();

            this.cleanupTooltip();
        };

        this.cleanupTooltip = function () {
            if (chartCtrl.chart) {
                $("#" + chartCtrl.chart.tooltip.id()).remove(); // div.nvtooltip
                if (chartCtrl.chart.interactiveLayer && chartCtrl.chart.interactiveLayer.tooltip) {
                    $("#" + chartCtrl.chart.interactiveLayer.tooltip.id()).remove(); // div.nvtooltip
                }
            }
        };

        $scope.$watch('cvOptions.studioTwoColumn', function () {
            if (chartCtrl.chart) {
                $timeout(function () {
                    chartCtrl.chart.update();
                }, 100);
            }
        });

        this.resizeChart = function (size) {
            var view = $scope.view;
            $($element).find('svg').height(size);
            $($element).find('svg').resize();

            if (chartCtrl.chart) chartCtrl.chart.update();
        };

        $scope.$on("ViewResize", function (view) {
            if (chartCtrl.chart) chartCtrl.chart.update();
        });

        /**
         * FIXME: This shouldn't be defined here.
         * Note that `this` refers to the view in this context.
         */
        $scope.view.exportChartAsPNG = function () {

            var doctype = '<?xml version="1.0" standalone="no"?>'
                + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

            // Get page styles
            var styles = exportService.getDocumentStyles();
            styles = (styles === undefined) ? "" : styles;

            // Serialize our SVG XML to a string.
            var svgSel = $($element).find('svg').first();
            svgSel.addClass("cv-bootstrap");
            svgSel.css("font-size", "10px");
            svgSel.css("font-family", "Helvetica, Arial, sans-serif");
            svgSel.css("background-color", "white");
            svgSel.attr("width", svgSel.width());
            svgSel.attr("height", svgSel.height());
            svgSel.attr("version", "1.1")

            var defsEl = document.createElement("defs");
            svgSel[0].insertBefore(defsEl, svgSel[0].firstChild);
            //defsEl.setAttribute("class", "cv-bootstrap");
            var styleEl = document.createElement("style")
            defsEl.appendChild(styleEl);
            styleEl.setAttribute("type", "text/css");

            var source = (new XMLSerializer()).serializeToString(svgSel.get(0));
            source = source.replace('</style>', '<![CDATA[' + styles + ']]></style>')

            // Create a file blob of our SVG.
            var blob = new Blob([doctype + source], {type: 'image/svg+xml;charset=utf-8'});

            var url = window.URL.createObjectURL(blob);

            // Put the svg into an image tag so that the Canvas element can read it in.
            var img = d3.select('body').append('img').attr('visibility', 'hidden').attr('width', svgSel.width()).attr('height', svgSel.height()).node();

            img.onload = function () {
                // Now that the image has loaded, put the image into a canvas element.
                var canvas = d3.select('body').append('canvas').node();
                $(canvas).addClass("cv-bootstrap");
                $(canvas).attr('visibility', 'hidden');
                canvas.width = svgSel.width();
                canvas.height = svgSel.height();
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, svgSel.width(), svgSel.height());
                var canvasUrl = canvas.toDataURL("image/png");

                $(img).remove();
                $(canvas).remove();

                exportService.saveAs(canvasUrl, 'image/png', $scope.view.cube.name + "-" + $scope.view.params.charttype + ".png");
            };
            // start loading the image.
            img.src = url;
        };

        $scope.modify_tooltip = function (chart) {
            var view = $scope.view;
            if (view.params.tooltip_template) {
                var tooltip_replaces = get_tooltip_replaces(view.params.tooltip_template);
                var tooltipContentGenerator = chart.interactiveLayer.tooltip.contentGenerator();
                chart.interactiveLayer.tooltip.contentGenerator(function (i) {
                    var idx = i.value;
                    $.each(i.series, function (_, serie) {
                        var tooltip_template = view.params.tooltip_template;
                        for (var i = 0; i < tooltip_replaces.length; i++) {
                            var key = tooltip_replaces[i];
                            var val = serie.data[key] === undefined ? 0 : serie.data[key];
                            tooltip_template = tooltip_template.replace('%' + key + '%', val);
                        }
                        serie['key'] += '&nbsp;&nbsp;<span style="color: #777;">(' + tooltip_template + ')</span>';
                    });

                    return tooltipContentGenerator(i);
                });
            }
        };

        $scope.group_x = function (serie, ta, step, method) {
            if (step === undefined) {
                step = 5;
            }
            var tooltip_aggregates = ta.slice(0);
            tooltip_aggregates.push('y');
            var sum = {};
            var j = 1;
            var ret = [];
            for (var i = 0; i < serie.length; i++) {
                tooltip_aggregates.forEach(function (t) {
                    sum[t] = sum[t] === undefined ? 0 : sum[t];
                    sum[t] += serie[i][t] === undefined ? 0 : serie[i][t];
                });
                if (j < step) {
                    j += 1;
                } else {
                    tooltip_aggregates.forEach(function (t) {
                        serie[i][t] = sum[t];
                    });
                    if (method === 'avg') {
                        serie[i]['y'] /= step;
                    }
                    ret.push(serie[i]);
                    j = 1;
                    sum = {};
                }
            }
            return ret;
        };

        $scope.formatXAxisTick = function (colsdef, xd) {
            if (xd.dimension.role === 'time' && colsdef.asDate) {
                var f = d3.format('02f');
                var year = colsdef.asDate.getFullYear(),
                    month = f(colsdef.asDate.getMonth() + 1),
                    week = colsdef.weekNum,
                    day = f(colsdef.asDate.getDate()),
                    hour = f(colsdef.asDate.getHours()),
                    minutes = f(colsdef.asDate.getMinutes());

                if (xd.level.role === 'year') {
                    return year;
                }

                else if (xd.level.role === 'month') {
                    return month + '.' + year;
                }

                else if (xd.level.role === 'week') {
                    return year + ', week ' + week;
                }

                else if (xd.level.role === 'day') {
                    return day + '.' + month + '.' + year;
                }

                else if (xd.level.role === 'hour' || xd.level.role === 'minutes') {
                    return hour + ':' + minutes;
                }
            } else {
                return colsdef.name;
            }
        };

        $scope.formatXAxisTooltip = function (colsdef, xd) {
            if (xd.dimension.role === 'time' && colsdef.asDate) {
                var f = d3.format('02f');
                var year = colsdef.asDate.getFullYear(),
                    month = f(colsdef.asDate.getMonth() + 1),
                    week = f(colsdef.weekNum),
                    day = f(colsdef.asDate.getDate()),
                    hour = f(colsdef.asDate.getHours()),
                    minutes = f(colsdef.asDate.getMinutes());

                if (xd.level.role === 'year') {
                    return '' + year;
                }

                else if (xd.level.role === 'month') {
                    return month + '.' + year;
                }

                else if (xd.level.role === 'week') {
                    return year + ', week ' + week;
                }

                else if (xd.level.role === 'day') {
                    return day + '.' + month + '.' + year;
                }

                else {
                    return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes;
                }

            } else {
                return colsdef.name;
            }
        };

        $scope.sortSeries = function (seriesArr) {
            seriesArr.sort(function (a, b) {
                var a_key = parseFloat(a.key);
                var b_key = parseFloat(b.key);
                if (Number.isNaN(a_key) || Number.isNaN(b_key)) {
                    a_key = a.key;
                    b_key = b.key;
                }

                return a_key < b_key ? -1 : (a_key > b_key ? +1 : 0)
            });

            return seriesArr;
        };

        $scope.$watch('view.params.chartoptions.showLegend', function (newValue, oldValue) {
            if (!newValue) {
                var legend = $($element).find('.nv-legendWrap');
                if (legend.length) {
                    legend.attr('transform', 'translate(0, -500)');
                }
            }
        });

        $scope.$on("$destroy", function () {
            chartCtrl.cleanupNvd3();
            $scope.view.grid.data = [];
            $scope.view.grid.columnDefs = [];
        });

        this.initialize();

        var tooltip_replaces_regex = /(?:%([\w-]+)%)/g;

        function get_tooltip_replaces(template) {
            var tooltip_replaces = [];
            var m;

            while ((m = tooltip_replaces_regex.exec(template)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === tooltip_replaces_regex.lastIndex) {
                    tooltip_replaces_regex.lastIndex++;
                }
                m.forEach(function (match, groupIndex) {
                    if (groupIndex === 1) {
                        tooltip_replaces.push(match);
                    }
                });
            }
            return tooltip_replaces;
        }

    }]);


