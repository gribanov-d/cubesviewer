angular.module('cv').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dialog/dialog.html',
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" ng-click=\"close()\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\"><i class=\"fa fa-fw fa-close\"></i></span></button>\n" +
    "    <h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"fa fa-fw fa-exclamation\"></i> CubesViewer</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "        <p>{{ dialog.text }}</p>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <!-- <button type=\"button\" ng-click=\"close()\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>  -->\n" +
    "    <button type=\"button\" ng-click=\"close()\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close</button>\n" +
    "  </div>\n" +
    "\n"
  );


  $templateCache.put('studio/about.html',
    "<div class=\"modal fade\" id=\"cvAboutModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"\">\n" +
    "  <div class=\"modal-dialog\" role=\"document\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\"><i class=\"fa fa-fw fa-close\"></i></span></button>\n" +
    "        <h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"cv-logo-embedded\"></i> CubesViewer</h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "\n" +
    "            <p><a href=\"http://jjmontesl.github.io/cubesviewer/\" target=\"_blank\">CubesViewer</a> is a visual, web-based application for exploring and analyzing\n" +
    "            OLAP databases served by the <a href=\"http://cubes.databrewery.org/\" target=\"_blank\">Cubes OLAP Framework</a>.</p>\n" +
    "            <hr />\n" +
    "\n" +
    "            <p>Version {{ cvVersion }}<br />\n" +
    "            <a href=\"https://github.com/jjmontesl/cubesviewer/\" target=\"_blank\">https://github.com/jjmontesl/cubesviewer/</a></p>\n" +
    "\n" +
    "            <p>by José Juan Montes and others (see AUTHORS)<br />\n" +
    "            2012 - 2016</p>\n" +
    "\n" +
    "            <p>\n" +
    "            <a href=\"http://github.com/jjmontesl/cubesviewer/blob/master/LICENSE.txt\" target=\"_blank\">LICENSE</a>\n" +
    "            </p>\n" +
    "\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\"><i class=\"fa fa-cube\"></i> Close</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('studio/dashboard/rename.html',
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" ng-click=\"close();\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\"><i class=\"fa fa-fw fa-close\"></i></span></button>\n" +
    "    <h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"fa fa-pencil\"></i> Rename dashboard</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "\n" +
    "        <form class=\"form\" ng-submit=\"renameDashboard(dashboardName);\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label>Name:</label>\n" +
    "                <input class=\"form-control\" ng-model=\"dashboardName\" />\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"close();\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n" +
    "    <button type=\"button\" ng-click=\"renameDashboard(dashboardName);\" class=\"btn btn-primary\" data-dismiss=\"modal\">Rename</button>\n" +
    "  </div>"
  );


  $templateCache.put('studio/help.html',
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" ng-click=\"close();\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\"><i class=\"fa fa-fw fa-close\"></i></span></button>\n" +
    "    <h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"fa fa-question\"></i> Help</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\" ng-bind-html=\"help\"></div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"close();\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
    "  </div>\n"
  );


  $templateCache.put('studio/panel.html',
    "<div class=\"cv-bootstrap cv-gui-viewcontainer\" ng-controller=\"CubesViewerStudioViewController\">\n" +
    "\n" +
    "    <div class=\"panel panel-primary\">\n" +
    "        <div ng-if=\"! cvOptions.hideControls\" class=\"panel-heading\">\n" +
    "\n" +
    "            <button type=\"button\" ng-click=\"studioViewsService.closeView(view)\" class=\"btn btn-danger btn-xs pull-right hidden-print\" style=\"margin-left: 10px;\"><i class=\"fa fa-fw fa-close\"></i></button>\n" +
    "            <button type=\"button\" ng-click=\"studioViewsService.toggleCollapseView(view)\" class=\"btn btn-primary btn-xs pull-right hidden-print\" style=\"margin-left: 5px;\"><i class=\"fa fa-fw\" ng-class=\"{'fa-caret-up': !view.collapsed, 'fa-caret-down': view.collapsed }\"></i></button>\n" +
    "\n" +
    "            <i class=\"fa fa-fw fa-file\"></i> <span class=\"cv-gui-title\" style=\"cursor: pointer;\" ng-dblclick=\"studioViewsService.studioScope.showRenameView(view)\"><a name=\"cvView{{ view.id }}\"></a><span ng-if=\"view.params.menu_path\">{{view.params.menu_path}}&colon;&nbsp;</span>{{ view.params.name }}</span>\n" +
    "\n" +
    "            <span ng-if=\"view.savedId > 0 && reststoreService.isViewChanged(view)\" class=\"badge cv-gui-container-state\" style=\"margin-left: 15px; font-size: 80%;\">Modified</span>\n" +
    "            <span ng-if=\"view.savedId > 0 && !reststoreService.isViewChanged(view)\" class=\"badge cv-gui-container-state\" style=\"margin-left: 15px; font-size: 80%;\">Saved</span>\n" +
    "            <span ng-if=\"view.shared\" class=\"badge cv-gui-container-state\" style=\"margin-left: 5px; font-size: 80%;\">Shared</span>\n" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-danger btn-xs\" style=\"visibility: hidden;\"><i class=\"fa fa-fw fa-info\"></i></button>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\" ng-hide=\"view.collapsed\">\n" +
    "            <div class=\"cv-gui-viewcontent\">\n" +
    "\n" +
    "                <div cv-view-cube view=\"view\"></div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('studio/rename.html',
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" ng-click=\"close();\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\"><i class=\"fa fa-fw fa-close\"></i></span></button>\n" +
    "    <h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"fa fa-pencil\"></i> Rename view</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "\n" +
    "        <form class=\"form\" ng-submit=\"renameView(viewName);\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"serializedView\">Name:</label>\n" +
    "                <input class=\"form-control\" ng-model=\"viewName\" />\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"close();\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n" +
    "    <button type=\"button\" ng-click=\"renameView(viewName);\" class=\"btn btn-primary\" data-dismiss=\"modal\">Rename</button>\n" +
    "  </div>\n" +
    "\n"
  );


  $templateCache.put('studio/serialize-add.html',
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" ng-click=\"close()\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\"><i class=\"fa fa-fw fa-close\"></i></span></button>\n" +
    "    <h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"fa fa-code\"></i> Add view from serialized JSON</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "\n" +
    "        <div class=\"form\">\n" +
    "            <label for=\"serializedView\">Code:</label>\n" +
    "            <textarea class=\"form-control\" ng-model=\"serializedView\" style=\"width: 100%; height: 12em;\" />\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"close()\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n" +
    "    <button type=\"button\" ng-click=\"addSerializedView(serializedView)\" class=\"btn btn-primary\" data-dismiss=\"modal\">Add View</button>\n" +
    "  </div>\n" +
    "\n"
  );


  $templateCache.put('studio/serialize-view.html',
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" ng-click=\"close()\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\"><i class=\"fa fa-fw fa-close\"></i></span></button>\n" +
    "    <h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"fa fa-code\"></i> Serialized View</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "\n" +
    "        <div class=\"form\">\n" +
    "            <label for=\"serializedView\">View definition JSON:</label>\n" +
    "            <textarea class=\"form-control cv-serialized-view\" ng-bind=\"serializedView\" style=\"width: 100%; height: 12em;\" readonly></textarea>\n" +
    "        </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"close()\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
    "  </div>\n" +
    "\n"
  );


  $templateCache.put('studio/serverinfo.html',
    "<div class=\"modal fade\" id=\"cvServerInfo\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"\">\n" +
    "  <div class=\"modal-dialog\" role=\"document\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\"><i class=\"fa fa-fw fa-close\"></i></span></button>\n" +
    "        <h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"fa fa-fw fa-database\"></i> Server info</h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "\n" +
    "            <p>\n" +
    "                <i>This CubesViewer version supports Cubes Server version 1.0.x and 1.1.x</i><br />\n" +
    "                <br />\n" +
    "                <b>Server version:</b> {{ cubesService.cubesserver.server_version }} <br />\n" +
    "                <b>Cubes version:</b> {{ cubesService.cubesserver.cubes_version }} <br />\n" +
    "                <b>API version:</b> {{ cubesService.cubesserver.api_version }} <br />\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                <b>Timezone:</b> {{ cubesService.cubesserver.info.timezone }} <br />\n" +
    "                <b>Week start:</b> {{ cubesService.cubesserver.info.first_weekday }} <br />\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                <b>Result limit:</b> <strong class=\"text-warning\">{{ cubesService.cubesserver.info.json_record_limit }}</strong> items<br />\n" +
    "            </p>\n" +
    "\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\"> Close</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('studio/setup-controls.html',
    "<div class=\"modal-header\">\n" +
    "    <button type=\"button\" ng-click=\"close();\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n" +
    "            aria-hidden=\"true\"><i class=\"fa fa-fw fa-close\"></i></span></button>\n" +
    "    <h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"fa fa-pencil\"></i> Setup controls</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form>\n" +
    "        <div class=\"form-group\">\n" +
    "            <h4>Menu path</h4>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"menu_path\" placeholder=\"folder/subfolder\" ng-model=\"menuPath\">\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <h4>Tooltip template</h4>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"tooltip_template\" ng-model=\"tooltipTemplate\">\n" +
    "            <p class=\"help-block\">Use aggregate names in %name% fashion. Ex: (Fail: %fail_sum%).</p>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <h4>Help</h4>\n" +
    "            <textarea class=\"form-control\" rows=\"5\" ng-model=\"help\"></textarea>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <h4>Hide controls</h4>\n" +
    "        </div>\n" +
    "        <div class=\"panel panel-default panel-outline\">\n" +
    "            <div class=\"panel-heading clearfix\" ng-if=\"drilldowns.length > 0\">\n" +
    "                <h5>Drilldowns</h5>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div ng-repeat=\"d in drilldowns\" style=\"display: inline-block; margin-right: 1em;\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" ng-model=\"d.selected\"/>\n" +
    "                        <span title=\"{{ d.label }}\">{{ ::d.label }}</span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"panel-heading clearfix\" ng-if=\"filters.length > 0\">\n" +
    "                <h5>Filters</h5>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div ng-repeat=\"d in filters\" style=\"display: inline-block; margin-right: 1em;\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" ng-model=\"d.selected\"/>\n" +
    "                        <span title=\"{{ d.label }}\">{{ ::d.label }}</span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"panel-heading clearfix\" ng-if=\"horizontalDimensions.length > 0\">\n" +
    "                <h5>Horizontal dimension</h5>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div ng-repeat=\"d in horizontalDimensions\" style=\"display: inline-block; margin-right: 1em;\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" ng-model=\"d.selected\"/>\n" +
    "                        <span title=\"{{ d.label }}\">{{ ::d.label }}</span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"panel-heading clearfix\" ng-if=\"measures.length > 0\">\n" +
    "                <h5>Measures</h5>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div ng-repeat=\"d in measures\" style=\"display: inline-block; margin-right: 1em;\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" ng-model=\"d.selected\"/>\n" +
    "                        <span title=\"{{ d.label }}\">{{ ::d.label }}</span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"panel-heading clearfix\" ng-if=\"aggregates.length > 0\">\n" +
    "                <h5>Aggregates</h5>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div ng-repeat=\"d in aggregates\" style=\"display: inline-block; margin-right: 1em;\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" ng-model=\"d.selected\"/>\n" +
    "                        <span title=\"{{ d.label }}\">{{ ::d.label }}</span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"panel-heading clearfix\" ng-if=\"zAxis.length > 0\">\n" +
    "                <h5>Compare dimension</h5>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div ng-repeat=\"d in zAxis\" style=\"display: inline-block; margin-right: 1em;\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" ng-model=\"d.selected\"/>\n" +
    "                        <span title=\"{{ d.label }}\">{{ ::d.label }}</span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group form-inline\">\n" +
    "            <h4>Clone this view with cube</h4>\n" +
    "            <select class=\"form-control\" ng-model=\"_cloneCube\"\n" +
    "                    ng-options=\"cube.name as cube.label for cube in cubesService.cubesserver._cube_list | orderBy:'label'\"\n" +
    "                    ng-init=\"_cloneCube=view.params.cubename\">\n" +
    "            </select>\n" +
    "            <button class=\"btn btn-info\" ng-click=\"cloneWithCube(_cloneCube)\">Clone</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"close();\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n" +
    "    <button type=\"button\" ng-click=\"save();\" class=\"btn btn-primary\" data-dismiss=\"modal\">Save</button>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('studio/studio.html',
    "<div class=\"cv-bootstrap\" ng-controller=\"CubesViewerStudioController\">\n" +
    "    <h2 class=\"dashboard-title\"><span class=\"lbl\">Dashboard:</span> <span\n" +
    "            ng-if=\"reststoreService.DASHBOARD_DEFAULT_NAME !== reststoreService.dashboard.name\">{{ reststoreService.dashboard.name }}</span>\n" +
    "    </h2>\n" +
    "    <div class=\"cv-gui-panel hidden-print\">\n" +
    "\n" +
    "        <div class=\"dropdown m-b\" style=\"display: inline-block;\" ng-if=\"cvOptions.is_admin\">\n" +
    "            <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "                <i class=\"fa fa-fw fa-cube\"></i> Cubes <span class=\"caret\"></span>\n" +
    "            </button>\n" +
    "\n" +
    "            <ul class=\"dropdown-menu cv-gui-cubeslist-menu\">\n" +
    "\n" +
    "                <li ng-show=\"cubesService.state === 1\" class=\"disabled\"><a>Loading...</a></li>\n" +
    "                <li ng-show=\"cubesService.state === 2 && cubesService.cubesserver._cube_list.length === 0\"\n" +
    "                    class=\"disabled\"><a>No cubes found</a></li>\n" +
    "                <li ng-show=\"cubesService.state === 3\" class=\"disabled text-danger\"><a>Loading failed</a></li>\n" +
    "\n" +
    "                <li ng-repeat=\"cube in cubesService.cubesserver._cube_list | orderBy:'label'\"\n" +
    "                    ng-click=\"studioViewsService.addViewCube(cube.name)\"><a>{{ cube.label }}</a></li>\n" +
    "\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"dropdown m-b\" style=\"display: inline-block; margin-left: 5px;\" ng-if=\"cvOptions.is_admin\">\n" +
    "            <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "                <i class=\"fa fa-fw fa-wrench\"></i> Tools <span class=\"caret\"></span>\n" +
    "            </button>\n" +
    "\n" +
    "            <ul class=\"dropdown-menu\">\n" +
    "\n" +
    "                <li ng-click=\"showSerializeAdd()\"><a tabindex=\"0\"><i class=\"fa fa-fw fa-code\"></i> Add view from JSON...</a>\n" +
    "                </li>\n" +
    "\n" +
    "                <div class=\"divider\"></div>\n" +
    "\n" +
    "                <li ng-click=\"toggleTwoColumn()\"\n" +
    "                    ng-class=\"{ 'hidden-xs': ! cvOptions.studioTwoColumn, 'disabled': studioViewsService.views.length == 0 }\">\n" +
    "                    <a tabindex=\"0\"><i class=\"fa fa-fw fa-columns\"></i> 2 column\n" +
    "                        <span class=\"label label-default\" style=\"margin-left: 10px;\"\n" +
    "                              ng-class=\"{ 'label-success': cvOptions.studioTwoColumn }\">{{ cvOptions.studioTwoColumn ? \"ON\" : \"OFF\" }}</span></a>\n" +
    "                </li>\n" +
    "                <li ng-click=\"toggleHideControls()\" ng-class=\"{ 'disabled': studioViewsService.views.length == 0 }\"><a\n" +
    "                        tabindex=\"0\"><i class=\"fa fa-fw fa-unlock-alt\"></i> Hide controls\n" +
    "                    <span class=\"label label-default\" style=\"margin-left: 10px;\"\n" +
    "                          ng-class=\"{ 'label-success': cvOptions.hideControls }\">{{ cvOptions.hideControls ? \"ON\" : \"OFF\" }}</span></a>\n" +
    "                </li>\n" +
    "\n" +
    "                <div class=\"divider\"></div>\n" +
    "\n" +
    "\n" +
    "                <!-- <li class=\"\"><a data-toggle=\"modal\" data-target=\"#cvServerInfo\"><i class=\"fa fa-fw fa-server\"></i> Data model</a></li> -->\n" +
    "                <li class=\"\" ng-class=\"{ 'disabled': cubesService.state != 2 }\"><a data-toggle=\"modal\"\n" +
    "                                                                                   data-target=\"#cvServerInfo\"><i\n" +
    "                        class=\"fa fa-fw fa-database\"></i> Server info</a></li>\n" +
    "\n" +
    "                <div class=\"divider\"></div>\n" +
    "\n" +
    "                <li class=\"\"><a\n" +
    "                        href=\"http://github.com/jjmontesl/cubesviewer/blob/master/doc/guide/cubesviewer-user-main.md\"\n" +
    "                        target=\"_blank\"><i class=\"fa fa-fw fa-question\"></i> User guide</a></li>\n" +
    "                <li class=\"\"><a data-toggle=\"modal\" data-target=\"#cvAboutModal\"><i class=\"fa fa-fw fa-info\"></i> About\n" +
    "                    CubesViewer...</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"dropdown m-b\" style=\"display: inline-block; margin-left: 5px;\">\n" +
    "            <script type=\"text/ng-template\" id=\"categoryTree\">\n" +
    "                <a ng-if=\"view.data\" ng-click=\"reststoreService.addSavedView(view.id)\"\n" +
    "                   style=\"max-width: 360px; overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;\"><i\n" +
    "                        class=\"fa fa-fw\"></i> {{ view.name }}</a>\n" +
    "                <a ng-if=\"view.submenu\"\n" +
    "                   style=\"max-width: 360px; overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;\"><i\n" +
    "                        class=\"fa fa-fw\"></i> {{ view.name }}</a>\n" +
    "                <ul class=\"dropdown-menu submenu\" ng-if=\"view.submenu\">\n" +
    "                    <li ng-repeat=\"view in view.submenu | orderBy:'view.name'\" ng-include=\"'categoryTree'\"\n" +
    "                        class=\"dropdown-submenu\"></li>\n" +
    "                    <li ng-repeat=\"view in view.views | orderBy:'view.name'\"\n" +
    "                        ng-click=\"reststoreService.addSavedView(view.id)\"><a\n" +
    "                            style=\"max-width: 360px; overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;\"><i\n" +
    "                            class=\"fa fa-fw\"></i> {{ view.name }}</a></li>\n" +
    "                </ul>\n" +
    "            </script>\n" +
    "\n" +
    "            <div ng-if=\"cvOptions.backendUrl\" class=\"dropdown m-b\" style=\"display: inline-block; \">\n" +
    "                <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "                    <i class=\"fa fa-fw fa-bars\"></i> Saved views <span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu cv-gui-catalog-menu\">\n" +
    "                    <li class=\"dropdown-header\">Personal</li>\n" +
    "                    <li ng-repeat=\"view in savedViews | orderBy:'view.name'\" ng-include=\"'categoryTree'\"\n" +
    "                        ng-class=\"{'dropdown-submenu': view.submenu}\"></li>\n" +
    "                    <li class=\"dropdown-header\">Shared</li>\n" +
    "                    <li ng-repeat=\"view in sharedViews | orderBy:'view.name'\" ng-include=\"'categoryTree'\"\n" +
    "                        ng-class=\"{'dropdown-submenu': view.submenu}\"></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"dropdown m-b\" style=\"display: inline-block; margin-left: 5px;\">\n" +
    "            <div ng-if=\"cvOptions.backendUrl\" class=\"dropdown m-b\" style=\"display: inline-block; \">\n" +
    "                <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "                    <i class=\"fa fa-fw fa-bars\"></i> Dashboards <span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "\n" +
    "                <ul class=\"dropdown-menu cv-gui-catalog-menu\">\n" +
    "                    <li class=\"dropdown-header\">Personal</li>\n" +
    "                    <li ng-repeat=\"d in reststoreService.savedDashboards | orderBy:'d.name'\"\n" +
    "                        ng-if=\"!d.shared\" ng-click=\"reststoreService.restoreDashboard(d)\"><a\n" +
    "                            style=\"max-width: 360px; overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;\"><i\n" +
    "                            class=\"fa fa-fw\"></i> {{ d.name }} [{{d.login}}]\n" +
    "                        <i ng-if=\"d.is_default\" class=\"fa fa-fw fa-star-o\"></i></a></li>\n" +
    "                    <li class=\"dropdown-header\">Shared</li>\n" +
    "                    <li ng-repeat=\"d in reststoreService.savedDashboards | orderBy:'d.name'\"\n" +
    "                        ng-if=\"d.shared\" ng-click=\"reststoreService.restoreDashboard(d)\"><a\n" +
    "                            style=\"max-width: 360px; overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;\"><i\n" +
    "                            class=\"fa fa-fw\"></i> {{ d.name }} [{{d.login}}]</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"dropdown\" style=\"display: inline-block;\">\n" +
    "                <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "                    <i class=\"fa fa-fw fa-wrench\"></i> Dashboard tools <span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "\n" +
    "                <ul class=\"dropdown-menu\">\n" +
    "                    <li class=\"dropdown-header\">Current</li>\n" +
    "                    <li><a ng-if=\"reststoreService.dashboard\">{{reststoreService.dashboard.name}}</a></li>\n" +
    "                    <div class=\"divider\"></div>\n" +
    "                    <li><a ng-click=\"renameDashboard()\"><i class=\"fa fa-fw fa-pencil\"></i> Rename...</a>\n" +
    "                    <li ng-class=\"{disabled:reststoreService.dashboard == null}\"><a ng-click=\"cloneDashboard()\"><i\n" +
    "                            class=\"fa fa-fw fa-clone\"></i> Clone</a></li>\n" +
    "                    <li><a ng-click=\"saveDashboard()\"><i class=\"fa fa-fw fa-save\"></i> Save</a></li>\n" +
    "                    <div class=\"divider\"></div>\n" +
    "                    <li><a ng-click=\"reststoreService.closeDashboard()\"><i class=\"fa fa-fw fa-close\"></i> Close</a>\n" +
    "                    <div class=\"divider\"></div>\n" +
    "                    <li ng-class=\"{disabled:reststoreService.dashboard == null}\"><a\n" +
    "                            ng-click=\"reststoreService.shareDashboard()\"><i class=\"fa fa-fw fa-share\"></i>{{reststoreService.dashboard.shared\n" +
    "                        ? \"Unshare\" : \"Share\" }}</a>\n" +
    "                    <li ng-class=\"{disabled:reststoreService.dashboard == null}\"><a\n" +
    "                            ng-click=\"reststoreService.makeDefaultDashboard()\"><i class=\"fa fa-fw fa-star-o\"></i>\n" +
    "                        {{reststoreService.dashboard.is_default ? \"Unmark\" : \"Mark\" }} default</a>\n" +
    "                    </li>\n" +
    "                    <li ng-class=\"{disabled:reststoreService.dashboard == null}\"><a\n" +
    "                            ng-click=\"reststoreService.deleteDashboard()\"><i class=\"fa fa-fw fa-trash-o\"></i> Delete...</a>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div style=\"display: inline-block; margin-left: 10px; margin-bottom: 0px;\">\n" +
    "\n" +
    "            <div class=\"form-group hidden-xs\" style=\"display: inline-block; margin-bottom: 0px;\">\n" +
    "                <button class=\"btn\" type=\"button\" title=\"2 column\" ng-disabled=\"studioViewsService.views.length == 0\"\n" +
    "                        ng-class=\"cvOptions.studioTwoColumn ? 'btn-active btn-success' : 'btn-primary'\"\n" +
    "                        ng-click=\"toggleTwoColumn()\"><i class=\"fa fa-fw fa-columns\"></i></button>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" style=\"display: inline-block; margin-bottom: 0px;\">\n" +
    "                <button class=\"btn\" type=\"button\" title=\"Hide controls\"\n" +
    "                        ng-disabled=\"studioViewsService.views.length == 0\"\n" +
    "                        ng-class=\"cvOptions.hideControls ? 'btn-active btn-success' : 'btn-primary'\"\n" +
    "                        ng-click=\"toggleHideControls()\"><i class=\"fa fa-fw fa-unlock-alt\"></i></button>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cv-gui-modals\">\n" +
    "            <div ng-include=\"'studio/about.html'\"></div>\n" +
    "            <div ng-include=\"'studio/serverinfo.html'\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"cv-gui-workspace\">\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div ng-if=\"cubesService.state == 3\" class=\"col-xs-12\" style=\"margin-bottom: 10px;\">\n" +
    "                <div class=\"alert alert-danger\" style=\"margin: 0px;\">\n" +
    "                    <p>Could not connect to server: {{ cubesService.stateText }}</p>\n" +
    "                    <p>Please try again and contact your administrator if the problem persists.</p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row news\" ng-if=\"studioViewsService.views.length == 0\">\n" +
    "            <div class=\"panel panel-info\" ng-repeat=\"news in news\">\n" +
    "                <div class=\"panel-heading\"><h3 class=\"panel-title\">{{news.title}}</h3></div>\n" +
    "                <div class=\"panel-body\" ng-bind-html=\"news.body\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row cv-views-container\"\n" +
    "             data-masonry='{ \"itemSelector\": \".cv-view-container\", \"columnWidth\": \".cv-views-gridsizer\", \"percentPosition\": true }'>\n" +
    "\n" +
    "            <div class=\"col-xs-1 cv-views-gridsizer\"></div>\n" +
    "\n" +
    "            <div ng-repeat=\"studioView in studioViewsService.views\" style=\"display: none;\"\n" +
    "                 class=\"col-xs-12 cv-view-container sv{{ studioView.id }}\"\n" +
    "                 ng-class=\"(cvOptions.studioTwoColumn ? 'col-sm-6' : 'col-sm-12')\">\n" +
    "                <div>\n" +
    "                    <div cv-studio-view view=\"studioView\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('views/cube/alerts.html',
    "<div>\n" +
    "\n" +
    "    <div ng-if=\"view.requestFailed\" class=\"alert alert-dismissable alert-danger\" style=\"margin-bottom: 5px;\">\n" +
    "        <div style=\"display: inline-block;\"><i class=\"fa fa-exclamation\"></i></div>\n" +
    "        <div style=\"display: inline-block; margin-left: 20px;\">\n" +
    "            An error has occurred. Cannot present view.<br />\n" +
    "            Please try again and contact your administrator if the problem persists.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.resultLimitHit\" class=\"alert alert-dismissable alert-warning\" style=\"margin-bottom: 5px;\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"view._resultLimitHit = false;\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n" +
    "        <div style=\"display: inline-block; vertical-align: top;\"><i class=\"fa fa-exclamation\"></i></div>\n" +
    "        <div style=\"display: inline-block; margin-left: 20px;\">\n" +
    "            Limit of {{ cubesService.cubesserver.info.json_record_limit }} items has been hit. <b>Results are incomplete.</b><br />\n" +
    "            <i>Tip</i>: reduce level of drilldown or filter your selection to reduce the number of items in the result.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/cube/chart/chart-common.html',
    "<div ng-show=\"(view.grid.data.length > 0 && view.params.yaxis != null) && (!(view.params.charttype == 'pie' && view.grid.columnDefs.length > 2)) && (!(view.params.charttype == 'radar' && view.grid.columnDefs.length < 4))\" style=\"width: 99%;\">\n" +
    "    <div>\n" +
    "        <div class=\"cv-chart-container\">\n" +
    "            <svg style=\"height: 400px;\" />\n" +
    "        </div>\n" +
    "        <div ng-hide=\"view.getControlsHidden() || view.params.charttype == 'radar'\" style=\"font-size: 8px; float: right;\">\n" +
    "            <a href=\"\" class=\"cv-chart-height\" ng-click=\"chartCtrl.resizeChart(400);\">Small</a>\n" +
    "            <a href=\"\" class=\"cv-chart-height\" ng-click=\"chartCtrl.resizeChart(550);\">Medium</a>\n" +
    "            <a href=\"\" class=\"cv-chart-height\" ng-click=\"chartCtrl.resizeChart(700);\">Tall</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"view.params.yaxis == null\" class=\"alert alert-info\" style=\"margin-bottom: 0px;\">\n" +
    "    <p>\n" +
    "        Cannot present chart: no <b>measure</b> has been selected.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        Tip: use the <kbd><i class=\"fa fa-fw fa-cogs\"></i> View &gt; <i class=\"fa fa-fw fa-crosshairs\"></i> Measure</kbd> menu.\n" +
    "    </p>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"view.pendingRequests == 0 && view.params.yaxis != null && view.grid.data.length == 0\" class=\"alert alert-info\" style=\"margin-bottom: 0px;\">\n" +
    "    <p>\n" +
    "        Cannot present chart: <b>no rows returned</b> by the current filtering, horizontal dimension, and drilldown combination.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        Tip: use the <kbd><i class=\"fa fa-fw fa-cogs\"></i> View</kbd> menu to select an horizontal dimension.\n" +
    "    </p>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"view.pendingRequests == 0 && view.params.charttype == 'pie' && view.grid.columnDefs.length > 2\" class=\"alert alert-info\" style=\"margin-bottom: 0px;\">\n" +
    "    <p>\n" +
    "        Cannot present a <b>pie chart</b> when <b>more than one column</b> is present.<br />\n" +
    "    </p>\n" +
    "    <p>\n" +
    "        Tip: review chart data and columns in <a href=\"\" ng-click=\"setViewMode('series')\" class=\"alert-link\">series mode</a>,\n" +
    "        or <a href=\"\" ng-click=\"selectXAxis(null);\" class=\"alert-link\">remove horizontal dimension</a>.\n" +
    "    </p>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"view.pendingRequests == 0 && view.params.yaxis != null && view.params.charttype == 'radar' && view.grid.columnDefs.length < 4\" class=\"alert alert-info\" style=\"margin-bottom: 0px;\">\n" +
    "    Cannot present a <b>radar chart</b> when <b>less than 3 columns</b> are present.<br />\n" +
    "    Tip: review chart data and columns in <a href=\"\" ng-click=\"setViewMode('series')\" class=\"alert-link\">series mode</a>.\n" +
    "</div>\n"
  );


  $templateCache.put('views/cube/chart/chart.html',
    "<div ng-controller=\"CubesViewerViewsCubeChartController as chartCtrl\">\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'pie'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-pie-chart\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartPieController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'bars-vertical'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-bar-chart\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartBarsVerticalController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'bars-horizontal'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-bar-chart fa-rotate-270\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartBarsHorizontalController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'lines'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-line-chart\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartLinesController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'lines-stacked'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-area-chart\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartLinesController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'radar'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-bullseye\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartRadarController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'sunburst'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-sun-o\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartSunburstController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'lines-avg'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-area-chart\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartLinesAVGController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'variance'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-area-chart\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartLinesVarianceController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.charttype == 'lines-plan'\">\n" +
    "        <h3><i class=\"fa fa-fw fa-area-chart\"></i> Chart\n" +
    "            <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "        </h3>\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerViewsCubeChartLinesPlanController\">\n" +
    "            <div ng-include=\"'views/cube/chart/chart-common.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/cube/cube-menu-drilldown.html',
    "  <button class=\"btn btn-primary btn-sm dropdown-toggle drilldownbutton\" ng-disabled=\"view.params.mode == 'facts'\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "    <i class=\"fa fa-fw fa-arrow-down\"></i> <span class=\"hidden-xs\" ng-class=\"{ 'hidden-sm hidden-md': cvOptions.studioTwoColumn }\">Drilldown</span> <span class=\"caret\"></span>\n" +
    "  </button>\n" +
    "\n" +
    "  <ul class=\"dropdown-menu dropdown-menu-right cv-view-menu-drilldown\">\n" +
    "\n" +
    "      <!-- if ((grayout_drill) && ((($.grep(view.params.drilldown, function(ed) { return ed == dimension.name; })).length > 0))) { -->\n" +
    "      <li on-repeat-done ng-repeat-start=\"dimension in view.getEnabledDrilldowns()\" ng-if=\"dimension.levels.length == 1\" ng-click=\"selectDrill(dimension.name, true);\">\n" +
    "        <a href=\"\">{{ dimension.label }}</a>\n" +
    "      </li>\n" +
    "      <li ng-repeat-end ng-if=\"dimension.levels.length != 1\" class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\">{{ dimension.label }}</a>\n" +
    "\n" +
    "        <ul ng-if=\"dimension.hierarchies_count() != 1\" class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"(hikey,hi) in dimension.hierarchies\" class=\"dropdown-submenu\">\n" +
    "                <a tabindex=\"0\" href=\"\" onclick=\"return false;\">{{ hi.label }}</a>\n" +
    "                <ul class=\"dropdown-menu\">\n" +
    "                    <li ng-repeat=\"level in hi.levels\" ng-click=\"selectDrill(dimension.name + '@' + hi.name + ':' + level.name, true)\"><a href=\"\">{{ level.label }}</a></li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <ul ng-if=\"dimension.hierarchies_count() == 1\" class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"level in dimension.default_hierarchy().levels\" ng-click=\"selectDrill(dimension.name + '@' + dimension.default_hierarchy().name + ':' + level.name, true)\"><a href=\"\">{{ level.label }}</a></li>\n" +
    "        </ul>\n" +
    "\n" +
    "      </li>\n" +
    "\n" +
    "      <div class=\"divider\"></div>\n" +
    "\n" +
    "      <li ng-class=\"{ 'disabled': view.params.drilldown.length == 0 }\" ng-click=\"selectDrill('')\"><a href=\"\"><i class=\"fa fa-fw fa-close\"></i> None</a></li>\n" +
    "\n" +
    "  </ul>\n" +
    "\n"
  );


  $templateCache.put('views/cube/cube-menu-filter.html',
    "  <button class=\"btn btn-primary btn-sm dropdown-toggle cutbutton\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "    <i class=\"fa fa-fw fa-filter\"></i> <span class=\"hidden-xs\" ng-class=\"{ 'hidden-sm hidden-md': cvOptions.studioTwoColumn }\">Filter</span> <span class=\"caret\"></span>\n" +
    "  </button>\n" +
    "\n" +
    "  <ul class=\"dropdown-menu dropdown-menu-right cv-view-menu cv-view-menu-cut\">\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode == 'explore'\" ng-click=\"filterSelected()\" ng-class=\"{ 'disabled': view.params.drilldown.length != 1 }\"><a href=\"\"><i class=\"fa fa-fw fa-filter\"></i> Filter selected rows</a></li>\n" +
    "    <div ng-show=\"view.params.mode == 'explore'\" class=\"divider\"></div>\n" +
    "\n" +
    "    <li class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-bars\"></i> Dimension filter</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "\n" +
    "          <li on-repeat-done ng-repeat-start=\"dimension in view.getEnabledFilters()\" ng-if=\"dimension.levels.length == 1 && !dimension.isRangeFilter()\" ng-click=\"showDimensionFilter(dimension.name);\">\n" +
    "            <a href=\"\">{{ dimension.label }}</a>\n" +
    "          </li>\n" +
    "          <li ng-repeat-end ng-if=\"dimension.levels.length != 1\" class=\"dropdown-submenu\">\n" +
    "            <a tabindex=\"0\">{{ dimension.label }}</a>\n" +
    "\n" +
    "            <ul ng-if=\"dimension.hierarchies_count() != 1\" class=\"dropdown-menu\">\n" +
    "                <li ng-repeat=\"(hikey,hi) in dimension.hierarchies\" class=\"dropdown-submenu\">\n" +
    "                    <a tabindex=\"0\" href=\"\" onclick=\"return false;\">{{ hi.label }}</a>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <!-- ng-click=\"selectDrill(dimension.name + '@' + hi.name + ':' + level.name, true)\"  -->\n" +
    "                        <li ng-repeat=\"level in hi.levels\" ng-click=\"showDimensionFilter(dimension.name + '@' + hi.name + ':' + level.name )\"><a href=\"\">{{ level.label }}</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <ul ng-if=\"dimension.hierarchies_count() == 1\" class=\"dropdown-menu\">\n" +
    "                <!--  selectDrill(dimension.name + ':' + level.name, true) -->\n" +
    "                <li ng-repeat=\"level in dimension.default_hierarchy().levels\" ng-click=\"showDimensionFilter(dimension.name + '@' + dimension.default_hierarchy().name + ':' + level.name);\"><a href=\"\">{{ level.label }}</a></li>\n" +
    "            </ul>\n" +
    "\n" +
    "          </li>\n" +
    "\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <li class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-calendar\"></i> Date filter</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "          <li ng-repeat=\"dimension in view.getEnabledFilters()\" ng-if=\"dimension.isDateDimension()\">\n" +
    "            <a href=\"\" ng-click=\"selectDateFilter(dimension.name + ((dimension.info['cv-datefilter-hierarchy']) ? '@' + dimension.info['cv-datefilter-hierarchy'] : ''), true)\">\n" +
    "                {{ dimension.label + ((dimension.hierarchy(dimension.info[\"cv-datefilter-hierarchy\"])) ? \" / \" + dimension.hierarchy(dimension.info[\"cv-datefilter-hierarchy\"]).label : \"\") }}\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li ng-if=\"view.cube.dateDimensions().length == 0\" class=\"disabled\">\n" +
    "            <a href=\"\" ng-click=\"\"><i>No date filters defined for this cube.</i></a>\n" +
    "          </li>\n" +
    "\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <li class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-arrows-h\"></i> Range filter</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "\n" +
    "          <li ng-repeat=\"dimension in view.getEnabledFilters()\" ng-if=\"dimension.isRangeFilter()\" ng-click=\"showDimensionRangeFilter(dimension.name);\">\n" +
    "            <a href=\"\">{{ dimension.label }}</a>\n" +
    "          </li>\n" +
    "\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <div class=\"divider\"></div>\n" +
    "\n" +
    "    <li ng-class=\"{ 'disabled': view.params.cuts.length == 0 && view.params.datefilters.length == 0 }\" ng-click=\"clearFilters()\"><a href=\"\"><i class=\"fa fa-fw fa-trash\"></i> Clear filters</a></li>\n" +
    "\n" +
    "  </ul>\n"
  );


  $templateCache.put('views/cube/cube-menu-panel.html',
    "<button class=\"btn btn-primary btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "    <i class=\"fa fa-fw fa-file\"></i> <span class=\"hidden-xs\"\n" +
    "                                           ng-class=\"{ 'hidden-sm hidden-md': cvOptions.studioTwoColumn }\">Panel</span>\n" +
    "    <span class=\"caret\"></span>\n" +
    "</button>\n" +
    "\n" +
    "<ul class=\"dropdown-menu dropdown-menu-right cv-view-menu cv-view-menu-view\">\n" +
    "\n" +
    "    <li ng-click=\"viewsService.studioViewsService.studioScope.showRenameView(view)\"><a><i\n" +
    "            class=\"fa fa-fw fa-pencil\"></i> Rename...</a></li>\n" +
    "    <li ng-click=\"viewsService.studioViewsService.studioScope.cloneView(view)\"><a><i class=\"fa fa-fw fa-clone\"></i>\n" +
    "        Clone</a></li>\n" +
    "\n" +
    "    <div class=\"divider\"></div>\n" +
    "    <li ng-click=\"viewsService.studioViewsService.studioScope.showSetupControlsView(view)\" ng-if=\"cvOptions.is_admin\">\n" +
    "        <a><i class=\"fa fa-fw fa-pencil\"></i> Setup controls</a></li>\n" +
    "\n" +
    "    <div ng-if=\"cvOptions.backendUrl\" class=\"divider\"></div>\n" +
    "    <li ng-if=\"cvOptions.backendUrl\" ng-click=\"reststoreService.saveView(view)\"><a><i class=\"fa fa-fw fa-save\"></i> Save</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"cvOptions.backendUrl\" ng-click=\"reststoreService.shareView(view, ! view.shared)\"><a><i\n" +
    "            class=\"fa fa-fw fa-share\"></i> {{ view.shared ? \"Unshare\" : \"Share\" }}</a></li>\n" +
    "    <li ng-if=\"cvOptions.backendUrl\" ng-click=\"reststoreService.deleteView(view)\"><a><i class=\"fa fa-fw fa-trash-o\"></i>\n" +
    "        Delete...</a></li>\n" +
    "\n" +
    "    <div class=\"divider\"></div>\n" +
    "    <li ng-click=\"viewsService.studioViewsService.studioScope.showSerializeView(view)\"><a><i\n" +
    "            class=\"fa fa-fw fa-code\"></i> Serialize...</a></li>\n" +
    "    <div class=\"divider\"></div>\n" +
    "    <li ng-click=\"viewsService.studioViewsService.studioScope.showHelpView(view)\"><a><i\n" +
    "            class=\"fa fa-fw fa-question\"></i> Help</a></li>\n" +
    "\n" +
    "    <div class=\"divider\"\n" +
    "         ng-if=\"view.params.mode == 'chart' && (view.params.charttype == 'lines' || view.params.charttype == 'lines-avg')\"></div>\n" +
    "    <li class=\"dropdown-submenu compare_views\"\n" +
    "        ng-if=\"view.params.mode == 'chart' && (view.params.charttype == 'lines' || view.params.charttype == 'lines-avg')\">\n" +
    "        <a><i\n" +
    "            class=\"fa fa-fw fa-exchange\"></i> Compare with</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"mergeView in viewsService.studioViewsService.views\" ng-if=\"mergeView != view\">\n" +
    "                <a ng-click=\"viewsService.studioViewsService.studioScope.MergeWithView(view, mergeView)\">{{ mergeView.getName() }}</a>\n" +
    "            </li>\n" +
    "\n" +
    "            <div class=\"divider\"></div>\n" +
    "\n" +
    "            <li ng-click=\"viewsService.studioViewsService.studioScope.MergeWithView(view, null);\"><a href=\"\"><i class=\"fa fa-fw fa-close\"></i> None</a></li>\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <div class=\"divider\"></div>\n" +
    "    <li ng-click=\"viewsService.studioViewsService.closeView(view)\"><a><i class=\"fa fa-fw fa-close\"></i> Close</a></li>\n" +
    "</ul>\n"
  );


  $templateCache.put('views/cube/cube-menu-view.html',
    "<button class=\"btn btn-primary btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "    <i class=\"fa fa-fw fa-cogs\"></i> <span class=\"hidden-xs\"\n" +
    "                                           ng-class=\"{ 'hidden-sm hidden-md': cvOptions.studioTwoColumn }\">View</span>\n" +
    "    <span class=\"caret\"></span>\n" +
    "</button>\n" +
    "\n" +
    "<ul class=\"dropdown-menu dropdown-menu-right cv-view-menu cv-view-menu-view\">\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode == 'chart'\" class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-area-chart\"></i> Chart type</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-click=\"selectChartType('pie')\"><a href=\"\"><i class=\"fa fa-fw fa-pie-chart\"></i> Pie</a></li>\n" +
    "            <li ng-click=\"selectChartType('bars-vertical')\"><a href=\"\"><i class=\"fa fa-fw fa-bar-chart\"></i> Bars\n" +
    "                Vertical</a></li>\n" +
    "            <li ng-click=\"selectChartType('bars-horizontal')\"><a href=\"\"><i\n" +
    "                    class=\"fa fa-fw fa-rotate-270 fa-bar-chart\"></i> Bars Horizontal</a></li>\n" +
    "            <li ng-click=\"selectChartType('lines')\"><a href=\"\"><i class=\"fa fa-fw fa-line-chart\"></i> Lines</a></li>\n" +
    "            <li ng-click=\"selectChartType('lines-stacked')\"><a href=\"\"><i class=\"fa fa-fw fa-area-chart\"></i> Areas</a>\n" +
    "            </li>\n" +
    "            <li ng-click=\"selectChartType('radar')\"><a href=\"\"><i class=\"fa fa-fw fa-bullseye\"></i> Radar</a></li>\n" +
    "            <li ng-click=\"selectChartType('lines-avg')\"><a href=\"\"><i class=\"fa fa-fw fa-bullseye\"></i> Lines with\n" +
    "                AVG</a>\n" +
    "            </li>\n" +
    "            <li ng-click=\"selectChartType('variance')\"><a href=\"\"><i class=\"fa fa-fw fa-bullseye\"></i> Lines with\n" +
    "                Variance</a></li>\n" +
    "            <li ng-click=\"selectChartType('lines-plan')\"><a href=\"\"><i class=\"fa fa-fw fa-bullseye\"></i> Lines with\n" +
    "                Plan</a></li>\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode == 'widget'\" class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-cubes\"></i> Widget type</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-click=\"selectWidgetType('max-value')\"><a href=\"\"><i class=\"fa fa-fw fa-sort-amount-desc\"></i> Max\n" +
    "                value</a></li>\n" +
    "            <li ng-click=\"selectWidgetType('threshold')\"><a href=\"\"><i class=\"fa fa-fw fa-text-width\"></i> Threshold</a>\n" +
    "            </li>\n" +
    "            <li ng-click=\"selectWidgetType('movement')\"><a href=\"\"><i class=\"fa fa-fw fa-map-signs\"></i> Movement</a>\n" +
    "            </li>\n" +
    "            <li ng-click=\"selectWidgetType('value')\"><a href=\"\"><i class=\"fa fa-fw fa-bolt\"></i> Value</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <li class=\"dropdown-submenu\"\n" +
    "        ng-show=\"view.params.mode == 'chart' && (view.params.charttype == 'lines-stacked' || view.params.charttype == 'lines')\">\n" +
    "        <a href=\"\"><i class=\"fa fa-fw fa-angle-up\"></i> Curve type</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-class=\"{'active': view.params.chartoptions.lineInterpolation == 'linear'}\"\n" +
    "                ng-click=\"view.params.chartoptions.lineInterpolation = 'linear'; refreshView();\"><a href=\"\"> Linear</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{'active': view.params.chartoptions.lineInterpolation == 'monotone'}\"\n" +
    "                ng-click=\"view.params.chartoptions.lineInterpolation = 'monotone'; refreshView();\"><a href=\"\">\n" +
    "                Smooth</a></li>\n" +
    "            <!-- <li ng-class=\"{'active': view.params.chartoptions.lineInterpolation == 'cardinal'}\" ng-click=\"view.params.chartoptions.lineInterpolation = 'cardinal'; refreshView();\"><a href=\"\"> Smooth (Cardinal)</a></li>  -->\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <li ng-class=\"{'disabled': view.grid.data.length != 2 }\"\n" +
    "        ng-show=\"(view.params.mode == 'chart' || view.params.mode == 'widget') && view.params.charttype == 'bars-horizontal'\"\n" +
    "        ng-click=\"view.params.chartoptions.mirrorSerie2 = !view.params.chartoptions.mirrorSerie2; refreshView();\">\n" +
    "        <a><i class=\"fa fa-fw fa-arrows-h\"></i> Invert 2nd series\n" +
    "            <span style=\"margin-left: 5px;\" class=\"label label-default\"\n" +
    "                  ng-class=\"{ 'label-success': view.params.chartoptions.mirrorSerie2 }\">{{ view.params.chartoptions.mirrorSerie2 ? \"ON\" : \"OFF\" }}</span>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode == 'chart'\"\n" +
    "        ng-click=\"view.params.chartoptions.showLegend = !view.params.chartoptions.showLegend; refreshView();\">\n" +
    "        <a><i class=\"fa fa-fw\"\n" +
    "              ng-class=\"{'fa-toggle-on': view.params.chartoptions.showLegend, 'fa-toggle-off': ! view.params.chartoptions.showLegend }\"></i>\n" +
    "            Toggle legend\n" +
    "            <span style=\"margin-left: 5px;\" class=\"label label-default\"\n" +
    "                  ng-class=\"{ 'label-success': view.params.chartoptions.showLegend }\">{{ view.params.chartoptions.showLegend ? \"ON\" : \"OFF\" }}</span>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "\n" +
    "    <div ng-show=\"(view.params.mode == 'chart' || view.params.mode == 'widget')\" class=\"divider\"></div>\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode == 'series' || view.params.mode == 'chart' || view.params.mode == 'widget'\"\n" +
    "        class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-long-arrow-right\"></i> Horizontal dimension</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "\n" +
    "            <li on-repeat-done ng-repeat-start=\"dimension in view.getEnabledHorizontalDimensions()\"\n" +
    "                ng-if=\"dimension.levels.length == 1\" ng-click=\"selectXAxis(dimension.name)\">\n" +
    "                <a href=\"\">{{ dimension.label }}</a>\n" +
    "            </li>\n" +
    "            <li ng-repeat-end ng-if=\"dimension.levels.length != 1\" class=\"dropdown-submenu\">\n" +
    "                <a tabindex=\"0\">{{ dimension.label }}</a>\n" +
    "\n" +
    "                <ul ng-if=\"dimension.hierarchies_count() != 1\" class=\"dropdown-menu\">\n" +
    "                    <li ng-repeat=\"(hikey,hi) in dimension.hierarchies\" class=\"dropdown-submenu\">\n" +
    "                        <a tabindex=\"0\" href=\"\" onclick=\"return false;\">{{ hi.label }}</a>\n" +
    "                        <ul class=\"dropdown-menu\">\n" +
    "                            <!-- ng-click=\"selectDrill(dimension.name + '@' + hi.name + ':' + level.name, true)\"  -->\n" +
    "                            <li ng-repeat=\"level in hi.levels\"\n" +
    "                                ng-click=\"selectXAxis(dimension.name + '@' + hi.name + ':' + level.name )\"><a href=\"\">{{\n" +
    "                                level.label }}</a></li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "\n" +
    "                <ul ng-if=\"dimension.hierarchies_count() == 1\" class=\"dropdown-menu\">\n" +
    "                    <!--  selectDrill(dimension.name + ':' + level.name, true) -->\n" +
    "                    <li ng-repeat=\"level in dimension.default_hierarchy().levels\"\n" +
    "                        ng-click=\"selectXAxis(dimension.name + ':' + level.name);\"><a href=\"\">{{ level.label }}</a></li>\n" +
    "                </ul>\n" +
    "\n" +
    "            </li>\n" +
    "\n" +
    "            <div class=\"divider\"></div>\n" +
    "\n" +
    "            <li ng-click=\"selectXAxis(null);\"><a href=\"\"><i class=\"fa fa-fw fa-close\"></i> None</a></li>\n" +
    "\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode == 'series' || view.params.mode == 'chart' || view.params.mode == 'widget'\"\n" +
    "        class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-crosshairs\"></i> Measure</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "\n" +
    "            <li ng-repeat=\"measure in view.getEnabledMeasures()\"\n" +
    "                ng-if=\"view.cube.measureAggregates(measure.name).length > 0\" class=\"dropdown-submenu\">\n" +
    "                <a href=\"\">{{ measure.label }}</a>\n" +
    "                <ul class=\"dropdown-menu\">\n" +
    "                    <li ng-repeat=\"aggregate in view.cube.measureAggregates(measure.name)\">\n" +
    "                        <a href=\"\" ng-click=\"selectMeasure(aggregate.ref)\">{{ aggregate.label }}</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "\n" +
    "            <div class=\"divider\" ng-if=\"view.getEnabledAggregates().length > 0\"></div>\n" +
    "            <li ng-repeat=\"aggregate in view.getEnabledAggregates()\" ng-if=\"view.getEnabledAggregates().length > 0\">\n" +
    "                <a href=\"\" ng-click=\"selectMeasure(aggregate.ref)\">{{ aggregate.label }}</a>\n" +
    "            </li>\n" +
    "\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode == 'widget'\"\n" +
    "        class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-balance-scale\"></i> Compare dimension</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "\n" +
    "            <li on-repeat-done\n" +
    "                ng-repeat-start=\"dimension in view.getEnabledCompareDimensions()\"\n" +
    "                ng-if=\"dimension.levels.length == 1\" ng-click=\"selectZAxis(dimension.name)\">\n" +
    "                <a href=\"\">{{ dimension.label }}</a>\n" +
    "            </li>\n" +
    "            <li ng-repeat-end ng-if=\"dimension.levels.length != 1\" class=\"dropdown-submenu\">\n" +
    "                <a tabindex=\"0\">{{ dimension.label }}</a>\n" +
    "\n" +
    "                <ul ng-if=\"dimension.hierarchies_count() != 1\" class=\"dropdown-menu\">\n" +
    "                    <li ng-repeat=\"(hikey,hi) in dimension.hierarchies\" class=\"dropdown-submenu\">\n" +
    "                        <a tabindex=\"0\" href=\"\" onclick=\"return false;\">{{ hi.label }}</a>\n" +
    "                        <ul class=\"dropdown-menu\">\n" +
    "                            <li ng-repeat=\"level in hi.levels\"\n" +
    "                                ng-click=\"selectZAxis(dimension.name + '@' + hi.name + ':' + level.name )\"><a href=\"\">{{\n" +
    "                                level.label }}</a></li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "\n" +
    "                <ul ng-if=\"dimension.hierarchies_count() == 1\" class=\"dropdown-menu\">\n" +
    "                    <li ng-repeat=\"level in dimension.default_hierarchy().levels\"\n" +
    "                        ng-click=\"selectZAxis(dimension.name + ':' + level.name);\"><a href=\"\">{{ level.label }}</a></li>\n" +
    "                </ul>\n" +
    "\n" +
    "            </li>\n" +
    "\n" +
    "            <div class=\"divider\"></div>\n" +
    "\n" +
    "            <li ng-click=\"selectZAxis(null);\"><a href=\"\"><i class=\"fa fa-fw fa-close\"></i> None</a></li>\n" +
    "\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode == 'widget' && view.params.widget.type == 'max-value'\"\n" +
    "        class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-filter\"></i> Limit</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"l in [2,4,8,16,32,64,128]\" ng-click=\"MaxValueSetLimit(l)\">\n" +
    "                <a href=\"\">{{ l }}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode == 'chart'\"\n" +
    "        class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-forward\"></i> Group X</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-click=\"SetGroupXMethod('Sum')\">\n" +
    "                <a href=\"\">Sum</a>\n" +
    "            </li>\n" +
    "            <li ng-click=\"SetGroupXMethod('Avg')\">\n" +
    "                <a href=\"\">Avg</a>\n" +
    "            </li>\n" +
    "            <div class=\"divider\"></div>\n" +
    "            <li ng-repeat=\"l in [1,5,10,25,50,100]\" ng-click=\"SetGroupX(l)\">\n" +
    "                <a href=\"\">{{ l }}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <div ng-show=\"cvOptions.seriesOperationsEnabled && (view.params.mode == 'series' || view.params.mode == 'chart' || view.params.mode == 'widget')\"\n" +
    "         class=\"divider\"></div>\n" +
    "\n" +
    "    <li ng-show=\"cvOptions.seriesOperationsEnabled && (view.params.mode == 'series' || view.params.mode == 'chart' || view.params.mode == 'widget')\"\n" +
    "        class=\"dropdown-submenu\">\n" +
    "        <a tabindex=\"0\"><i class=\"fa fa-fw fa-calculator\"></i> Series operations</a>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-click=\"selectOperation('difference')\"><a href=\"\"><i class=\"fa fa-fw fa-line-chart\"></i>\n" +
    "                Difference</a></li>\n" +
    "            <li ng-click=\"selectOperation('percentage')\"><a href=\"\"><i class=\"fa fa-fw fa-percent\"></i> Change rate</a>\n" +
    "            </li>\n" +
    "            <div class=\"divider\"></div>\n" +
    "            <li ng-click=\"selectOperation(null)\"><a href=\"\"><i class=\"fa fa-fw fa-times\"></i> Clear operations</a></li>\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "\n" +
    "    <div ng-show=\"view.params.mode == 'series' || view.params.mode == 'chart' || view.params.mode == 'widget'\"\n" +
    "         class=\"divider\"></div>\n" +
    "\n" +
    "    <li ng-show=\"view.params.mode != 'chart' || view.params.mode == 'widget'\"\n" +
    "        ng-click=\"exportService.exportGridAsCsv(view)\"><a><i\n" +
    "            class=\"fa fa-fw fa-table\"></i> Export table</a></li>\n" +
    "    <li ng-show=\"view.params.mode != 'chart' || view.params.mode == 'widget'\"\n" +
    "        ng-click=\"exportService.exportGridAsTransposedCsv(view)\"><a><i\n" +
    "            class=\"fa fa-fw fa-table\"></i> Export transposed table</a></li>\n" +
    "    <li ng-show=\"view.params.mode == 'chart' && view.params.charttype != 'radar' \" ng-click=\"view.exportChartAsPNG()\">\n" +
    "        <a><i class=\"fa fa-fw fa-picture-o\"></i> Export figure</a></li>\n" +
    "    <li ng-click=\"exportService.exportFacts(view)\"><a><i class=\"fa fa-fw fa-th\"></i> Export facts</a></li>\n" +
    "\n" +
    "</ul>\n" +
    "\n"
  );


  $templateCache.put('views/cube/cube.html',
    "<div class=\"cv-view-panel\" ng-controller=\"CubesViewerViewsCubeController as cubeView\">\n" +
    "\n" +
    "    <div ng-if=\"view.state == 3\">\n" +
    "        <div class=\"alert alert-danger\" style=\"margin: 0px;\">\n" +
    "            <p>An error occurred. Cannot present view.</p>\n" +
    "            <p ng-if=\"cubesService.state != 3\">{{ view.error }}</p>\n" +
    "            <p ng-if=\"cubesService.state == 3\">Could not connect to data server: {{ cubesService.stateText }}</p>\n" +
    "            <p>Please try again and contact your administrator if the problem persists.</p>\n" +
    "            <p class=\"text-right\">\n" +
    "                <a class=\"alert-link\" href=\"http://jjmontesl.github.io/cubesviewer/\" target=\"_blank\">CubesViewer Data\n" +
    "                    Visualizer</a>\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div>\n" +
    "        <h2 ng-show=\"view.getControlsHidden()\" style=\"margin-top: 5px;\">\n" +
    "            <i class=\"fa fa-fw fa-file-o\"></i> {{ view.getName() }}\n" +
    "            <span ng-if=\"reststoreService.getCubeUpdate(view.cube.name)\"\n" +
    "                  class=\"pull-right small\">Last date: {{reststoreService.getCubeUpdate(view.cube.name)}}</span>\n" +
    "        </h2>\n" +
    "\n" +
    "        <div ng-include=\"'views/cube/alerts.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.state == 2\" style=\"min-height: 80px;\">\n" +
    "\n" +
    "        <div class=\"cv-view-viewmenu hidden-print\" ng-hide=\"view.getControlsHidden()\">\n" +
    "\n" +
    "            <div class=\"panel panel-primary pull-right\"\n" +
    "                 style=\"padding: 3px; white-space: nowrap; margin-bottom: 6px; margin-left: 6px;\">\n" +
    "\n" +
    "                <button type=\"button\" ng-click=\"applyAggregate()\"\n" +
    "                        class=\"btn btn-default btn-sm\" ng-class=\"{'btn-primary': view.pendingActions > 0}\"\n" +
    "                        title=\"Apply\"><i class=\"fa fa-fw fa-play\"></i></button>\n" +
    "\n" +
    "                <div ng-if=\"cvOptions.undoEnabled\" class=\"btn-group\" role=\"group\"\n" +
    "                     ng-controller=\"CubesViewerViewsUndoController\">\n" +
    "                    <button type=\"button\" ng-click=\"undo()\" ng-disabled=\"view.undoPos <= 0\"\n" +
    "                            class=\"btn btn-default btn-sm\" title=\"Undo\"><i class=\"fa fa-fw fa-undo\"></i></button>\n" +
    "                    <button type=\"button\" ng-click=\"redo()\" ng-disabled=\"view.undoPos >= view.undoList.length - 1\"\n" +
    "                            class=\"btn btn-default btn-sm\" title=\"Redo\"><i\n" +
    "                            class=\"fa fa-fw fa-undo fa-flip-horizontal\"></i></button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"btn-group\" role=\"group\" aria-label=\"...\" style=\"margin-left: 5px;\">\n" +
    "                    <button type=\"button\" ng-click=\"setViewMode('explore')\"\n" +
    "                            ng-if=\"cvOptions.enabledModes.indexOf('explore') != -1\"\n" +
    "                            ng-class=\"{'active': view.params.mode == 'explore'}\"\n" +
    "                            class=\"btn btn-primary btn-sm explorebutton\" title=\"Explore\"><i\n" +
    "                            class=\"fa fa-fw fa-arrow-circle-down\"></i></button>\n" +
    "                    <button type=\"button\" ng-click=\"setViewMode('facts')\"\n" +
    "                            ng-if=\"cvOptions.enabledModes.indexOf('facts') != -1\"\n" +
    "                            ng-class=\"{'active': view.params.mode == 'facts'}\" class=\"btn btn-primary btn-sm \"\n" +
    "                            title=\"Facts\"><i class=\"fa fa-fw fa-th\"></i></button>\n" +
    "                    <button type=\"button\" ng-click=\"setViewMode('series')\"\n" +
    "                            ng-if=\"cvOptions.enabledModes.indexOf('series') != -1\"\n" +
    "                            ng-class=\"{'active': view.params.mode == 'series'}\" class=\"btn btn-primary btn-sm \"\n" +
    "                            title=\"Series\"><i class=\"fa fa-fw fa-clock-o\"></i></button>\n" +
    "                    <button type=\"button\" ng-click=\"setViewMode('chart')\"\n" +
    "                            ng-if=\"cvOptions.enabledModes.indexOf('chart') != -1\"\n" +
    "                            ng-class=\"{'active': view.params.mode == 'chart'}\" class=\"btn btn-primary btn-sm \"\n" +
    "                            title=\"Charts\"><i class=\"fa fa-fw fa-area-chart\"></i></button>\n" +
    "                    <button type=\"button\" ng-click=\"setViewMode('widget')\"\n" +
    "                            ng-if=\"cvOptions.enabledModes.indexOf('widget') != -1\"\n" +
    "                            ng-class=\"{'active': view.params.mode == 'widget'}\" class=\"btn btn-primary btn-sm \"\n" +
    "                            title=\"Widgets\"><i class=\"fa fa-fw fa-cubes\"></i></button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-include=\"'views/cube/cube-menu-drilldown.html'\" class=\"dropdown m-b\"\n" +
    "                     style=\"display: inline-block; margin-left: 5px;\"></div>\n" +
    "\n" +
    "                <div ng-include=\"'views/cube/cube-menu-filter.html'\" class=\"dropdown m-b\"\n" +
    "                     style=\"display: inline-block; margin-left: 2px;\"></div>\n" +
    "\n" +
    "                <div ng-include=\"'views/cube/cube-menu-view.html'\" class=\"dropdown m-b\"\n" +
    "                     style=\"display: inline-block; margin-left: 5px;\"></div>\n" +
    "\n" +
    "                <div ng-if=\"cvOptions.container\" ng-include=\"'views/cube/cube-menu-panel.html'\" class=\"dropdown m-b\"\n" +
    "                     style=\"display: inline-block; margin-left: 5px;\"></div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pull-right\"\n" +
    "                 style=\"white-space: nowrap; padding-top: 4px; padding-bottom: 4px; margin-left: 6px; margin-bottom: 6px;\">\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cv-view-viewinfo\" ng-hide=\"view.getControlsHidden()\">\n" +
    "            <div>\n" +
    "                <div class=\"label label-secondary cv-infopiece cv-view-viewinfo-cubename\"\n" +
    "                     style=\"color: black;background: #bcf5ba;\">\n" +
    "                    <span><i class=\"fa fa-fw fa-cube\" title=\"Cube\"></i> <b class=\"hidden-xs hidden-sm\">Cube:</b> {{ view.cube.label }}</span>\n" +
    "                    <button type=\"button\" class=\"btn btn-info btn-xs\" style=\"visibility: hidden;\"><i\n" +
    "                            class=\"fa fa-fw fa-info\"></i></button>\n" +
    "                    <span ng-if=\"reststoreService.getCubeUpdate(view.cube.name)\">Last date: {{reststoreService.getCubeUpdate(view.cube.name)}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"cv-view-viewinfo-drill\">\n" +
    "\n" +
    "\n" +
    "                    <div ng-repeat=\"drilldown in view.params.drilldown\"\n" +
    "                         ng-init=\"parts = view.cube.dimensionParts(drilldown);\" ng-if=\"view.params.mode != 'facts'\"\n" +
    "                         class=\"label label-secondary cv-infopiece cv-view-viewinfo-drill\"\n" +
    "                         style=\"color: black; background-color: #ccffcc;\">\n" +
    "                        <span><i class=\"fa fa-fw fa-arrow-down\" title=\"Drilldown\"></i> <b class=\"hidden-xs hidden-sm\">Drilldown:</b> <span\n" +
    "                                title=\"{{ view.cube.dimensionParts(drilldown).label }}\">{{ parts.labelShort }}</span></span>\n" +
    "                        <button type=\"button\" class=\"btn btn-info btn-xs\"\n" +
    "                                style=\"visibility: hidden; margin-left: -20px;\"><i class=\"fa fa-fw fa-info\"></i>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <button ng-hide=\"view.getControlsHidden() || parts.hierarchy.levels.length < 2\"\n" +
    "                                ng-disabled=\"! parts.drilldownDimensionMinus\" type=\"button\"\n" +
    "                                ng-click=\"selectDrill(parts.drilldownDimensionMinus, true)\"\n" +
    "                                class=\"btn btn-secondary btn-xs hidden-print\" style=\"margin-left: 3px;\"><i\n" +
    "                                class=\"fa fa-fw fa-minus\"></i></button>\n" +
    "                        <button ng-hide=\"view.getControlsHidden() || parts.hierarchy.levels.length < 2\"\n" +
    "                                ng-disabled=\"! parts.drilldownDimensionPlus\" type=\"button\"\n" +
    "                                ng-click=\"selectDrill(parts.drilldownDimensionPlus, true)\"\n" +
    "                                class=\"btn btn-secondary btn-xs hidden-print\" style=\"margin-left: 0px;\"><i\n" +
    "                                class=\"fa fa-fw fa-plus\"></i></button>\n" +
    "\n" +
    "                        <button ng-hide=\"view.getControlsHidden()\" type=\"button\"\n" +
    "                                ng-click=\"showDimensionFilter(drilldown)\" class=\"btn btn-secondary btn-xs hidden-print\"\n" +
    "                                style=\"margin-left: 3px;\"><i class=\"fa fa-fw fa-search\"></i></button>\n" +
    "                        <button ng-hide=\"view.getControlsHidden()\" type=\"button\" ng-click=\"selectDrill(drilldown, '')\"\n" +
    "                                class=\"btn btn-danger btn-xs hidden-print\" style=\"margin-left: 1px;\"><i\n" +
    "                                class=\"fa fa-fw fa-trash\"></i></button>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"cv-view-viewinfo-cut\">\n" +
    "                    <div ng-repeat=\"cut in view.params.cuts\" ng-init=\"equality = cut.invert ? ' &ne; ' : ' = ';\"\n" +
    "                         class=\"label label-secondary cv-infopiece cv-view-viewinfo-cut\"\n" +
    "                         style=\"color: black; background-color: #ffcccc;\">\n" +
    "                        <span style=\"max-width: 480px;\"><i class=\"fa fa-fw fa-filter\" title=\"Filter\"></i> <b\n" +
    "                                class=\"hidden-xs hidden-sm\">Filter:</b> <span\n" +
    "                                title=\"{{ view.cube.dimensionPartsFromCut(cut).label }}\">{{ view.cube.dimensionPartsFromCut(cut).labelShort }}</span> <span\n" +
    "                                ng-class=\"{ 'text-danger': cut.invert }\">{{ equality }}</span> <span\n" +
    "                                title=\"{{ filterDisplay(cut.value) }}\">{{ filterDisplay(cut.value) }}</span></span>\n" +
    "                        <button type=\"button\" class=\"btn btn-info btn-xs\"\n" +
    "                                style=\"visibility: hidden; margin-left: -20px;\"><i class=\"fa fa-fw fa-info\"></i>\n" +
    "                        </button>\n" +
    "                        <button ng-hide=\"view.getControlsHidden()\" type=\"button\"\n" +
    "                                ng-click=\"showDimensionFilter(view.cube.dimensionPartsFromCut(cut).drilldownDimension)\"\n" +
    "                                class=\"btn btn-secondary btn-xs hidden-print\" style=\"margin-left: 3px;\"><i\n" +
    "                                class=\"fa fa-fw fa-search\"></i></button>\n" +
    "                        <button ng-hide=\"view.getControlsHidden()\" type=\"button\"\n" +
    "                                ng-click=\"selectCut(cut.dimension, '', cut.invert)\"\n" +
    "                                class=\"btn btn-danger btn-xs hidden-print\" style=\"margin-left: 1px;\"><i\n" +
    "                                class=\"fa fa-fw fa-trash\"></i></button>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div ng-repeat=\"cut in view.params.rangefilters\"\n" +
    "                         class=\"label label-secondary cv-infopiece cv-view-viewinfo-rangefilter\"\n" +
    "                         style=\"color: black; background-color: #ffcccc;\">\n" +
    "                        <span style=\"max-width: 480px;\"><i class=\"fa fa-fw fa-filter\" title=\"Filter\"></i> <b\n" +
    "                                class=\"hidden-xs hidden-sm\">Range filter:</b> <span\n" +
    "                                title=\"{{ view.cube.dimensionParts(cut.dimension).label }}\">{{ view.cube.dimensionParts(cut.dimension).label }}</span> <span\n" +
    "                                title=\"{{ cut.range_from }}-{{ cut.range_to}}\">{{ cut.range_from }}-{{ cut.range_to}}</span></span>\n" +
    "                        <button type=\"button\" class=\"btn btn-info btn-xs\"\n" +
    "                                style=\"visibility: hidden; margin-left: -20px;\"><i class=\"fa fa-fw fa-info\"></i>\n" +
    "                        </button>\n" +
    "                        <button ng-hide=\"view.getControlsHidden()\" type=\"button\"\n" +
    "                                ng-click=\"showDimensionRangeFilter(view.cube.dimensionParts(cut.dimension).drilldownDimension)\"\n" +
    "                                class=\"btn btn-secondary btn-xs hidden-print\" style=\"margin-left: 3px;\"><i\n" +
    "                                class=\"fa fa-fw fa-search\"></i></button>\n" +
    "                        <button ng-hide=\"view.getControlsHidden()\" type=\"button\" ng-click=\"selectRange(cut.dimension)\"\n" +
    "                                class=\"btn btn-danger btn-xs hidden-print\" style=\"margin-left: 1px;\"><i\n" +
    "                                class=\"fa fa-fw fa-trash\"></i></button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-include=\"'views/cube/filter/datefilter.html'\"></div>\n" +
    "\n" +
    "                <div class=\"cv-view-viewinfo-extra\">\n" +
    "\n" +
    "                    <div ng-if=\"view.params.mode == 'series' || view.params.mode == 'chart' || view.params.mode == 'widget'\"\n" +
    "                         class=\"label label-secondary cv-infopiece cv-view-viewinfo-extra\"\n" +
    "                         style=\"color: black; background-color: #ccccff;\">\n" +
    "                        <span style=\"max-width: 350px;\"><i class=\"fa fa-fw fa-crosshairs\" title=\"Measure\"></i> <b\n" +
    "                                class=\"hidden-xs hidden-sm\">Measure:</b> {{ (view.params.yaxis != null) ? view.cube.aggregateFromName(view.params.yaxis).label : \"None\" }}</span>\n" +
    "                        <button type=\"button\" class=\"btn btn-info btn-xs\"\n" +
    "                                style=\"visibility: hidden; margin-left: -20px;\"><i class=\"fa fa-fw fa-info\"></i>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div ng-if=\"view.params.mode == 'series' || view.params.mode == 'chart' || view.params.mode == 'widget'\"\n" +
    "                         class=\"label label-secondary cv-infopiece cv-view-viewinfo-extra\"\n" +
    "                         style=\"color: black; background-color: #ccddff;\">\n" +
    "                        <span style=\"max-width: 350px;\"><i class=\"fa fa-fw fa-long-arrow-right\"\n" +
    "                                                           title=\"Horizontal dimension\"></i> <b\n" +
    "                                class=\"hidden-xs hidden-sm\">Horizontal dimension:</b> {{ (view.params.xaxis != null) ? view.cube.dimensionParts(view.params.xaxis).labelShort : \"None\" }}</span>\n" +
    "                        <button type=\"button\" class=\"btn btn-info btn-xs\"\n" +
    "                                style=\"visibility: hidden; margin-left: -20px;\"><i class=\"fa fa-fw fa-info\"></i>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <button ng-hide=\"view.getControlsHidden() || !view.params.xaxis || view.cube.dimensionParts(view.params.xaxis).hierarchy.levels.length < 2\"\n" +
    "                                ng-disabled=\"! view.cube.dimensionParts(view.params.xaxis).drilldownDimensionMinus\"\n" +
    "                                type=\"button\"\n" +
    "                                ng-click=\"selectXAxis(view.cube.dimensionParts(view.params.xaxis).drilldownDimensionMinus, true)\"\n" +
    "                                class=\"btn btn-secondary btn-xs hidden-print\" style=\"margin-left: 3px;\"><i\n" +
    "                                class=\"fa fa-fw fa-minus\"></i></button>\n" +
    "                        <button ng-hide=\"view.getControlsHidden() || !view.params.xaxis || view.cube.dimensionParts(view.params.xaxis).hierarchy.levels.length < 2\"\n" +
    "                                ng-disabled=\"! view.cube.dimensionParts(view.params.xaxis).drilldownDimensionPlus\"\n" +
    "                                type=\"button\"\n" +
    "                                ng-click=\"selectXAxis(view.cube.dimensionParts(view.params.xaxis).drilldownDimensionPlus, true)\"\n" +
    "                                class=\"btn btn-secondary btn-xs hidden-print\" style=\"margin-left: 0px;\"><i\n" +
    "                                class=\"fa fa-fw fa-plus\"></i></button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"cv-view-info-widget\" ng-if=\"view.params.mode == 'widget'\">\n" +
    "                    <div ng-include=\"'views/cube/widget/params.html'\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "\n" +
    "        <div class=\"cv-view-viewdialogs\">\n" +
    "            <div ng-if=\"view.dimensionFilter\" ng-include=\"'views/cube/filter/dimension.html'\"></div>\n" +
    "            <div ng-if=\"view.dimensionRangeFilter\" ng-include=\"'views/cube/filter/range.html'\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cv-view-viewdata\">\n" +
    "\n" +
    "            <div ng-if=\"view.params.mode == 'explore'\" ng-include=\"'views/cube/explore/explore.html'\"></div>\n" +
    "            <div ng-if=\"view.params.mode == 'facts'\" ng-include=\"'views/cube/facts/facts.html'\"></div>\n" +
    "            <div ng-if=\"view.params.mode == 'series'\" ng-include=\"'views/cube/series/series.html'\"></div>\n" +
    "            <div ng-if=\"view.params.mode == 'chart'\" ng-include=\"'views/cube/chart/chart.html'\"></div>\n" +
    "            <div ng-if=\"view.params.mode == 'widget'\" ng-include=\"'views/cube/widget/widget.html'\"></div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "\n" +
    "        <div class=\"cv-view-viewfooter\"></div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/cube/explore/explore.html',
    "<div ng-controller=\"CubesViewerViewsCubeExploreController\">\n" +
    "\n" +
    "    <!-- ($(view.container).find('.cv-view-viewdata').children().size() == 0)  -->\n" +
    "    <h3><i class=\"fa fa-fw fa-arrow-circle-down\"></i> Aggregated data\n" +
    "        <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "    </h3>\n" +
    "\n" +
    "    <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "        <span class=\"loadingbar-expand\"></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ui-grid=\"view.grid\"\n" +
    "         ui-grid-resize-columns ui-grid-move-columns ui-grid-selection ui-grid-auto-resize\n" +
    "         ui-grid-pagination ui-grid-pinning\n" +
    "         style=\"width: 100%;\" ng-style=\"{height: ((view.grid.data.length < 15 ? view.grid.data.length : 15) * 24) + 44 + 30 + 'px'}\">\n" +
    "    </div>\n" +
    "    <div style=\"height: 30px;\">&nbsp;</div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/cube/facts/facts.html',
    "<div ng-controller=\"CubesViewerViewsCubeFactsController\">\n" +
    "\n" +
    "    <!-- ($(view.container).find('.cv-view-viewdata').children().size() == 0)  -->\n" +
    "    <h3><i class=\"fa fa-fw fa-th\"></i> Facts data\n" +
    "        <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "    </h3>\n" +
    "\n" +
    "    <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "        <span class=\"loadingbar-expand\"></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.grid.data.length > 0\"\n" +
    "         ui-grid=\"view.grid\"\n" +
    "         ui-grid-resize-columns ui-grid-move-columns ui-grid-selection ui-grid-auto-resize\n" +
    "         ui-grid-pagination ui-grid-pinning\n" +
    "         style=\"width: 100%;\" ng-style=\"{height: ((view.grid.data.length < 15 ? view.grid.data.length : 15) * 24) + 44 + 30 + 'px'}\">\n" +
    "    </div>\n" +
    "    <div ng-if=\"view.grid.data.length > 0\" style=\"height: 30px;\">&nbsp;</div>\n" +
    "\n" +
    "    <div ng-if=\"viewController.view.pendingRequests == 0 && view.grid.data.length == 0\">No facts are returned by the current filtering combination.</div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/cube/filter/datefilter.html',
    "<div class=\"cv-view-viewinfo-date\">\n" +
    "    <div ng-repeat=\"datefilter in view.params.datefilters\" ng-controller=\"CubesViewerViewsCubeFilterDateController\" ng-init=\"dimparts = view.cube.dimensionParts(datefilter.dimension);\" class=\"label label-secondary cv-infopiece cv-view-viewinfo-cut text-left\" style=\"color: black; background-color: #ffdddd; text-align: left;\">\n" +
    "        <span style=\"max-width: 280px; white-space: nowrap;\"><i class=\"fa fa-fw fa-filter\"></i> <b class=\"hidden-xs hidden-sm\">Filter:</b> {{ dimparts.labelNoLevel }}:</span>\n" +
    "\n" +
    "        <!--\n" +
    "        <br class=\"hidden-sm hidden-md hidden-lg\" />\n" +
    "        <i class=\"fa fa-fw hidden-sm hidden-md hidden-lg\" />\n" +
    "         -->\n" +
    "\n" +
    "        <div class=\"cv-datefilter\" style=\"overflow: visible; display: inline-block;\">\n" +
    "\n" +
    "            <form class=\"form-inline\">\n" +
    "\n" +
    "                 <div class=\"form-group\" style=\"display: inline-block; margin: 0px;\">\n" +
    "                    <div class=\"dropdown\" style=\"display: inline-block;\">\n" +
    "                      <button ng-hide=\"view.getControlsHidden()\" style=\"height: 20px;\" class=\"btn btn-default btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" data-submenu>\n" +
    "                        <i class=\"fa fa-fw fa-calendar\"></i> {{ datefilter.mode | datefilterMode }} <span class=\"caret\"></span>\n" +
    "                      </button>\n" +
    "                      <span ng-show=\"view.getControlsHidden()\"><i class=\"fa fa-fw fa-calendar\"></i> {{ datefilter.mode | datefilterMode }}</span>\n" +
    "\n" +
    "                      <ul class=\"dropdown-menu cv-view-menu cv-view-menu-view\">\n" +
    "                        <li ng-click=\"setMode('custom')\"><a><i class=\"fa fa-fw\"></i> Custom</a></li>\n" +
    "                        <div class=\"divider\"></div>\n" +
    "                        <li ng-click=\"setMode('auto-lastupdated')\" ng-if=\"view.last_updated\"><a><i class=\"fa fa-fw\"></i> Last updated</a></li>\n" +
    "                        <li ng-click=\"setMode('auto-yesterday')\"><a><i class=\"fa fa-fw\"></i> Yesterday</a></li>\n" +
    "                        <li ng-click=\"setMode('auto-last7d')\"><a><i class=\"fa fa-fw\"></i> Last 7 days</a></li>\n" +
    "                        <li ng-click=\"setMode('auto-last1m')\"><a><i class=\"fa fa-fw\"></i> Last month</a></li>\n" +
    "                        <li ng-click=\"setMode('auto-last3m')\"><a><i class=\"fa fa-fw\"></i> Last 3 months</a></li>\n" +
    "                        <li ng-click=\"setMode('auto-last6m')\"><a><i class=\"fa fa-fw\"></i> Last 6 months</a></li>\n" +
    "                        <li ng-click=\"setMode('auto-last12m')\"><a><i class=\"fa fa-fw\"></i> Last year</a></li>\n" +
    "                        <li ng-click=\"setMode('auto-last24m')\"><a><i class=\"fa fa-fw\"></i> Last 2 years</a></li>\n" +
    "                        <li ng-click=\"setMode('auto-january1st')\"><a><i class=\"fa fa-fw\"></i> From January 1st</a></li>\n" +
    "                      </ul>\n" +
    "                  </div>\n" +
    "                 </div>\n" +
    "\n" +
    "            <div ng-show=\"datefilter.mode == 'custom'\" style=\"display: inline-block; margin: 0px;\">\n" +
    "\n" +
    "                 &rArr;\n" +
    "\n" +
    "                 <div class=\"form-group\" style=\"display: inline-block; margin: 0px;\">\n" +
    "                    <p class=\"input-group disabled\" style=\"margin: 0px; display: inline-block;\">\n" +
    "                      <input ng-disabled=\"view.getControlsHidden()\" autocomplete=\"off\" type=\"text\" style=\"height: 20px; width: 80px; display: inline-block;\" class=\"form-control input-sm\" uib-datepicker-popup=\"yyyy-MM-dd\" ng-model=\"dateStart.value\" is-open=\"dateStart.opened\" datepicker-options=\"dateStart.options\" ng-required=\"true\" close-text=\"Close\" />\n" +
    "                      <span ng-hide=\"view.getControlsHidden()\"  class=\"input-group-btn\" style=\"display: inline-block;\">\n" +
    "                        <button type=\"button\" style=\"height: 20px;\" class=\"btn btn-default\" ng-click=\"dateStartOpen()\"><i class=\"fa fa-fw fa-calendar\"></i></button>\n" +
    "                      </span>\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "\n" +
    "                <span ng-hide=\"view.getControlsHidden()\" style=\"margin-left: 17px; margin-right: 0px;\">-</span>\n" +
    "                <span ng-show=\"view.getControlsHidden()\" style=\"margin-left: 0px; margin-right: 0px;\">-</span>\n" +
    "\n" +
    "                 <div class=\"form-group\" style=\"display: inline-block; margin: 0px;\">\n" +
    "                    <p class=\"input-group\" style=\"margin: 0px; display: inline-block;\">\n" +
    "                      <input ng-disabled=\"view.getControlsHidden()\" autocomplete=\"off\" type=\"text\" style=\"height: 20px; width: 80px; display: inline-block;\" class=\"form-control input-sm\" uib-datepicker-popup=\"yyyy-MM-dd\" ng-model=\"dateEnd.value\" is-open=\"dateEnd.opened\" datepicker-options=\"dateEnd.options\" ng-required=\"true\" close-text=\"Close\" />\n" +
    "                      <span ng-hide=\"view.getControlsHidden()\" class=\"input-group-btn\" style=\"display: inline-block;\">\n" +
    "                        <button type=\"button\" style=\"height: 20px;\" class=\"btn btn-default\" ng-click=\"dateEndOpen()\"><i class=\"fa fa-fw fa-calendar\"></i></button>\n" +
    "                      </span>\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <button type=\"button\" ng-hide=\"view.getControlsHidden()\" ng-click=\"selectDateFilter(datefilter.dimension, false)\" class=\"btn btn-danger btn-xs\" style=\"margin-left: 20px;\"><i class=\"fa fa-fw fa-trash\"></i></button>\n" +
    "        <button type=\"button\" class=\"btn btn-info btn-xs\" style=\"visibility: hidden; margin-left: -20px;\"><i class=\"fa fa-fw fa-info\"></i></button>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('views/cube/filter/dimension.html',
    "<div ng-controller=\"CubesViewerViewsCubeFilterDimensionController\">\n" +
    "\n" +
    "    <div class=\"panel panel-default panel-outline hidden-print\" ng-hide=\"view.getControlsHidden()\" style=\"border-color: #ffcccc;\">\n" +
    "        <div class=\"panel-heading clearfix\" style=\"border-color: #ffcccc;\">\n" +
    "            <button class=\"btn btn-xs btn-danger pull-right\" ng-click=\"closeDimensionFilter()\"><i class=\"fa fa-fw fa-close\"></i></button>\n" +
    "            <h4 style=\"margin: 2px 0px 0px 0px;\"><i class=\"fa fa-fw fa-filter\"></i> Dimension filter: <b>{{ parts.label }}</b></h4>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\">\n" +
    "\n" +
    "            <div >\n" +
    "            <form >\n" +
    "\n" +
    "              <div class=\"form-group has-feedback\" style=\"display: inline-block; margin-bottom: 0; vertical-align: middle; margin-bottom: 2px;\">\n" +
    "                <!-- <label for=\"search\">Search:</label>  -->\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"searchString\" ng-model-options=\"{ debounce: 300 }\" placeholder=\"Search...\" style=\"width: 16em;\">\n" +
    "                <i class=\"fa fa-fw fa-times-circle form-control-feedback\" ng-click=\"searchString = ''\" style=\"cursor: pointer; pointer-events: inherit;\"></i>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"btn-group\" style=\"margin-left: 10px; display: inline-block; vertical-align: middle; margin-bottom: 2px; margin-right: 5px;\">\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"selectAll();\" type=\"button\" title=\"Select all\"><i class=\"fa fa-fw fa-check-square-o\"></i></button>\n" +
    "                    <button class=\"btn btn-default\" ng-click=\"selectNone();\" type=\"button\" title=\"Select none\"><i class=\"fa fa-fw fa-square-o\"></i></button>\n" +
    "              </div>\n" +
    "\n" +
    "<!--               <div class=\"form-group\" style=\"display: inline-block; margin-bottom: 0; vertical-align: middle; margin-bottom: 2px;\"> -->\n" +
    "              <div class=\"btn-group\" style=\"display: inline-block; vertical-align: middle; margin-bottom: 2px; margin-right: 5px;\">\n" +
    "                    <button ng-hide=\"parts.hierarchy.levels.length < 2\" ng-disabled=\"! parts.drilldownDimensionMinus\"  class=\"btn btn-default\" ng-click=\"showDimensionFilter(parts.drilldownDimensionMinus)\" type=\"button\" title=\"Drilldown less\"><i class=\"fa fa-fw fa-minus\"></i></button>\n" +
    "                    <button ng-hide=\"parts.hierarchy.levels.length < 2\" ng-disabled=\"! parts.drilldownDimensionPlus\"  class=\"btn btn-default\" ng-click=\"showDimensionFilter(parts.drilldownDimensionPlus)\" type=\"button\" title=\"Drilldown more\"><i class=\"fa fa-fw fa-plus\"></i></button>\n" +
    "                    <button class=\"btn btn-default\" type=\"button\" title=\"Drilldown this\" ng-click=\"selectDrill(parts.drilldownDimension, true)\"><i class=\"fa fa-fw fa-arrow-down\"></i></button>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\" style=\"display: inline-block; margin-bottom: 0; vertical-align: middle; margin-bottom: 2px; margin-right: 5px;\">\n" +
    "                 <div class=\"btn btn-default\" ng-click=\"filterShowAll = ! filterShowAll\" ng-class=\"{ 'active': filterShowAll, 'btn-info': filterShowAll }\">\n" +
    "                    <i class=\"fa fa-fw fa-filter fa-rotate-180\"></i> Show all\n" +
    "                 </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"form-group\" style=\"display: inline-block; margin-bottom: 0; vertical-align: middle; margin-bottom: 2px; \">\n" +
    "\n" +
    "                  <div class=\"btn btn-default\" ng-click=\"filterInverted = !filterInverted\" ng-class=\"{ 'active': filterInverted, 'btn-danger': filterInverted }\">\n" +
    "                    <input type=\"checkbox\" ng-model=\"filterInverted\" style=\"pointer-events: none; margin: 0px; vertical-align: middle;\" ></input>\n" +
    "                    <b>&ne;</b> Invert\n" +
    "                  </div>\n" +
    "\n" +
    "              </div>\n" +
    "\n" +
    "              <!--<div class=\"form-group\" style=\"display: inline-block; margin-bottom: 0; vertical-align: middle; margin-bottom: 2px;\">-->\n" +
    "                 <!--<button ng-click=\"applyFilter()\" class=\"btn btn-success\" type=\"button\"><i class=\"fa fa-fw fa-filter\"></i> Apply</button>-->\n" +
    "              <!--</div>-->\n" +
    "            </form>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"clearfix\"></div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-xs-9 col-sm-6\">\n" +
    "                <div style=\"margin-top: 5px;\">\n" +
    "                    <div class=\"panel panel-default panel-outline\" style=\"margin-bottom: 0px; \"><div class=\"panel-body\" style=\"max-height: 180px; overflow-y: auto; overflow-x: hidden;\">\n" +
    "                        <div ng-show=\"loadingDimensionValues\" ><i class=\"fa fa-circle-o-notch fa-spin fa-fw\"></i> Loading...</div>\n" +
    "\n" +
    "                        <div ng-if=\"!loadingDimensionValues\" class=\"row\" style=\"white-space: nowrap;\">\n" +
    "                            <div ng-repeat=\"val in dimensionValues | filter:filterDimensionValue(searchString)\" style=\"overflow-x: hidden; text-overflow: ellipsis;\" class=\"col-md-3\">\n" +
    "                                <label style=\"font-weight: normal; margin-bottom: 2px;\" title=\"{{ ::val.label }}\">\n" +
    "                                    <input type=\"checkbox\" name=\"selectedValues[]\" ng-model=\"val.selected\" value=\"{{ ::val.value }}\" ng-click=\"applyFilter()\" style=\"vertical-align: bottom;\" />\n" +
    "                                    <span title=\"{{ ::val.label }}\">{{ ::val.label }}</span>\n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div></div>\n" +
    "\n" +
    "                    <div ng-if=\"!loadingDimensionValues\" class=\"\" style=\"margin-bottom: 0px; \">\n" +
    "                        <div class=\"text-right\">\n" +
    "                            {{ dimensionValues.length }} items\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div ng-if=\"!loadingDimensionValues && dimensionValues.length >= cubesService.cubesserver.info.json_record_limit\" class=\"alert alert-warning\" style=\"margin-bottom: 0px;\">\n" +
    "                        <div style=\"display: inline-block;\"><i class=\"fa fa-exclamation\"></i></div>\n" +
    "                        <div style=\"display: inline-block; margin-left: 20px;\">\n" +
    "                            Limit of {{ cubesService.cubesserver.info.json_record_limit }} items has been hit. Dimension value list is <b>incomplete</b>.<br />\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"clearfix\"></div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/cube/filter/range.html',
    "<div ng-controller=\"CubesViewerViewsCubeRangeFilterDimensionController\">\n" +
    "\n" +
    "    <div class=\"panel panel-default panel-outline hidden-print\" ng-hide=\"view.getControlsHidden()\"\n" +
    "         style=\"border-color: #ffcccc;\">\n" +
    "        <div class=\"panel-heading clearfix\" style=\"border-color: #ffcccc;\">\n" +
    "            <button class=\"btn btn-xs btn-danger pull-right\" ng-click=\"closeDimensionFilter()\"><i\n" +
    "                    class=\"fa fa-fw fa-close\"></i></button>\n" +
    "            <h4 style=\"margin: 2px 0px 0px 0px;\"><i class=\"fa fa-fw fa-filter\"></i> Dimension range filter: <b>{{\n" +
    "                parts.label }}</b></h4>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\">\n" +
    "\n" +
    "            <div>\n" +
    "                <form>\n" +
    "\n" +
    "                    <div class=\"form-group has-feedback\"\n" +
    "                         style=\"display: inline-block; margin-bottom: 0; vertical-align: middle; margin-bottom: 2px;\">\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"rangeFrom\"\n" +
    "                               ng-model-options=\"{ debounce: 300 }\"\n" +
    "                               ng-change=\"applyFilter()\" placeholder=\"From\" style=\"width: 8em;\">\n" +
    "                        <i class=\"fa fa-fw fa-times-circle form-control-feedback\" ng-click=\"setRangeFrom()\"\n" +
    "                           style=\"cursor: pointer; pointer-events: inherit;\"></i>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group has-feedback\"\n" +
    "                         style=\"display: inline-block; margin-bottom: 0; vertical-align: middle; margin-bottom: 2px;\">\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"rangeTo\" ng-model-options=\"{ debounce: 300 }\"\n" +
    "                               ng-change=\"applyFilter()\" placeholder=\"To\" style=\"width: 8em;\">\n" +
    "                        <i class=\"fa fa-fw fa-times-circle form-control-feedback\" ng-click=\"setRangeTo()\"\n" +
    "                           style=\"cursor: pointer; pointer-events: inherit;\"></i>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!--<div class=\"form-group\" style=\"display: inline-block; margin-bottom: 0; vertical-align: middle; margin-bottom: 2px;\">-->\n" +
    "                    <!--<button ng-click=\"applyFilter()\" class=\"btn btn-success\" type=\"button\"><i class=\"fa fa-fw fa-filter\"></i> Apply</button>-->\n" +
    "                    <!--</div>-->\n" +
    "                </form>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"clearfix\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/cube/series/series.html',
    "<div ng-controller=\"CubesViewerViewsCubeSeriesController\">\n" +
    "\n" +
    "    <!-- ($(view.container).find('.cv-view-viewdata').children().size() == 0)  -->\n" +
    "    <h3><i class=\"fa fa-fw fa-clock-o\"></i> Series table\n" +
    "        <i ng-show=\"view.pendingRequests > 0\" class=\"fa fa-circle-o-notch fa-spin fa-fw margin-bottom text-info pull-right\"></i>\n" +
    "    </h3>\n" +
    "\n" +
    "    <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "        <span class=\"loadingbar-expand\"></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.grid.data.length > 0\"\n" +
    "         ui-grid=\"view.grid\"\n" +
    "         ui-grid-resize-columns ui-grid-move-columns ui-grid-selection ui-grid-auto-resize\n" +
    "         ui-grid-pagination ui-grid-pinning\n" +
    "         style=\"width: 100%;\" ng-style=\"{height: ((view.grid.data.length < 15 ? view.grid.data.length : 15) * 24) + 44 + 30 + 'px'}\">\n" +
    "    </div>\n" +
    "    <div ng-if=\"view.grid.data.length > 0\" style=\"height: 30px;\">&nbsp;</div>\n" +
    "\n" +
    "    <div ng-if=\"view.pendingRequests == 0 && view.params.yaxis == null\" class=\"alert alert-info\" style=\"margin-bottom: 0px;\">\n" +
    "        <p>\n" +
    "            Cannot present series table: no <b>measure</b> has been selected.\n" +
    "        </p>\n" +
    "        <p>\n" +
    "            Tip: use the <kbd><i class=\"fa fa-fw fa-cogs\"></i> View &gt; <i class=\"fa fa-fw fa-crosshairs\"></i> Measure</kbd> menu.\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.pendingRequests == 0 && view.params.yaxis != null && view.grid.data.length == 0\" class=\"alert alert-info\" style=\"margin-bottom: 0px;\">\n" +
    "        <p>\n" +
    "            Cannot present series table: <b>no rows</b> are returned by the current horizontal dimension, drilldown or filtering combination.\n" +
    "        </p>\n" +
    "        <p>\n" +
    "            Tip: use the <kbd><i class=\"fa fa-fw fa-cogs\"></i> View</kbd> menu to select an horizontal dimension.\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/cube/widget/max-value.html',
    "<div class=\"container-fluid\">\n" +
    "    <div ng-style=\"{'font-size': view.params.widget.zoom + '%'}\">\n" +
    "        <div ng-repeat=\"serie in series\" class=\"row\" style=\"margin-top: 1em;\">\n" +
    "            <div class=\"col-sm-12\"><h3 style=\"color: #337ab7;\">{{ ::serie['key'] }}</h3></div>\n" +
    "            <div ng-repeat=\"point in serie['values']\" class=\"col-xs-6\"\n" +
    "                 ng-class=\"(cvOptions.studioTwoColumn ? 'col-md-6 col-sm-6' : 'col-md-3 col-sm-3')\"\n" +
    "                 ng-init=\"chevron = point['diff'] > 0 ? 'fa-chevron-up text-success' : 'fa-chevron-down text-danger'\">\n" +
    "                <span style=\"font-size: 200%\">{{ ::toFixed(point['y'], 2) }}</span>\n" +
    "                <span ng-if=\"point['diff'] > 0\"><i ng-class=\"chevron\" class=\"fa fa-fw\" style=\"font-size: 150%\"></i>\n" +
    "            <span style=\"font-size: 150%;\">{{ ::diff_abs(point['diff']) }}%</span></span>\n" +
    "                <span style=\"font-size: 150%; color: #777;\">\n" +
    "                (<span style=\"font-size: 75%;\">{{ ::view.cube.dimensionParts(view.params.xaxis).labelShort }}\n" +
    "                </span>&nbsp;<span>{{ ::point['x'] }})</span>\n" +
    "            </span>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-12\" ng-if=\"serie.length == 0\">\n" +
    "                No rows to display.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/cube/widget/movement.html',
    "<div class=\"container-fluid\">\n" +
    "    <div ng-style=\"{'font-size': view.params.widget.zoom + '%'}\">\n" +
    "        <div ng-repeat=\"serie in series\" class=\"row\" style=\"margin-top: 1em;\">\n" +
    "            <div class=\"col-sm-12\"><h3 style=\"color: #337ab7;\">{{ ::serie['key'] }}</h3></div>\n" +
    "            <div ng-repeat=\"point in serie['values']\" class=\"col-xs-6\"\n" +
    "                 ng-if=\"compareMovement(point['diff'])\"\n" +
    "                 ng-class=\"(cvOptions.studioTwoColumn ? 'col-md-6 col-sm-6' : 'col-md-3 col-sm-3')\"\n" +
    "                 ng-init=\"color = point['diff'] > 0 ? '#669366' : '#dba4a3'; chevron = point['diff'] > 0 ? 'fa-chevron-up' : 'fa-chevron-down'\">\n" +
    "                <span style=\"font-size: 200%\">{{ ::point['x'] }}</span>\n" +
    "                <span style=\"font-size: 150%; color: #777;\">({{ ::point['y'] }}<span ng-if=\"point['diff'] != 0\">\n" +
    "                <i ng-class=\"chevron\" class=\"fa fa-fw\" ng-style=\"{color: color}\"></i>{{ ::diff_abs(point['diff']) }}%</span>)</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-12\" ng-if=\"isSerieEmpty(serie['values'])\">\n" +
    "                No rows to display.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/cube/widget/params.html',
    "<div class=\"label label-secondary cv-infopiece cv-view-viewinfo-extra\"\n" +
    "     style=\"color: black; background-color: #ffcc99;\">\n" +
    "                        <span style=\"max-width: 350px;\"><i class=\"fa fa-fw fa-balance-scale\"\n" +
    "                                                           title=\"History dimension\"></i> <b\n" +
    "                                class=\"hidden-xs hidden-sm\">Compare dimension:</b> {{ (view.params.zaxis != null) ? view.cube.dimensionParts(view.params.zaxis).labelShort : \"None\" }}</span>\n" +
    "    <button type=\"button\" class=\"btn btn-info btn-xs\"\n" +
    "            style=\"visibility: hidden; margin-left: -20px;\"><i class=\"fa fa-fw fa-info\"></i>\n" +
    "    </button>\n" +
    "\n" +
    "    <button ng-hide=\"view.getControlsHidden() || !view.params.zaxis || view.cube.dimensionParts(view.params.zaxis).hierarchy.levels.length < 2\"\n" +
    "            ng-disabled=\"! view.cube.dimensionParts(view.params.zaxis).drilldownDimensionMinus\"\n" +
    "            type=\"button\"\n" +
    "            ng-click=\"selectZAxis(view.cube.dimensionParts(view.params.zaxis).drilldownDimensionMinus, true)\"\n" +
    "            class=\"btn btn-secondary btn-xs hidden-print\" style=\"margin-left: 3px;\"><i\n" +
    "            class=\"fa fa-fw fa-minus\"></i></button>\n" +
    "    <button ng-hide=\"view.getControlsHidden() || !view.params.zaxis || view.cube.dimensionParts(view.params.zaxis).hierarchy.levels.length < 2\"\n" +
    "            ng-disabled=\"! view.cube.dimensionParts(view.params.zaxis).drilldownDimensionPlus\"\n" +
    "            type=\"button\"\n" +
    "            ng-click=\"selectZAxis(view.cube.dimensionParts(view.params.zaxis).drilldownDimensionPlus, true)\"\n" +
    "            class=\"btn btn-secondary btn-xs hidden-print\" style=\"margin-left: 0px;\"><i\n" +
    "            class=\"fa fa-fw fa-plus\"></i></button>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"view.zaxis_compare\"\n" +
    "     class=\"label label-secondary cv-infopiece cv-view-viewinfo-extra\"\n" +
    "     style=\"color: black; background-color: #ffcc99;\">\n" +
    "                        <span style=\"max-width: 350px;\"><i class=\"fa fa-fw fa-balance-scale\"\n" +
    "                                                           title=\"Compare\"></i> <b\n" +
    "                                class=\"hidden-xs hidden-sm\">Compare:</b> {{ view.zaxis_compare }}</span>\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "    <div ng-if=\"view.params.widget.type == 'threshold'\"\n" +
    "         class=\"label label-secondary cv-infopiece cv-view-viewinfo-cut text-left\"\n" +
    "         style=\"color: black; background-color: #ffdddd; text-align: left;\">\n" +
    "        <span style=\"white-space: nowrap;\"><i class=\"fa fa-fw fa-text-width\"></i> <b\n" +
    "                class=\"hidden-xs hidden-sm\">Threshold:</b> <input type=\"number\"\n" +
    "                                                                  ng-model=\"view.params.widget.threshold\"\n" +
    "                                                                  style=\"width: 7em;\">\n" +
    "\n" +
    "            <label><i class=\"fa fa-fw fa-chevron-right\"></i> <input type=\"radio\" value=\"up\"\n" +
    "                                                                    ng-model=\"view.params.widget.compareMode\"></label>\n" +
    "            <label><i class=\"fa fa-fw fa-chevron-left\"></i> <input type=\"radio\" value=\"down\"\n" +
    "                                                                   ng-model=\"view.params.widget.compareMode\"></label>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.widget.type == 'movement'\"\n" +
    "         class=\"label label-secondary cv-infopiece cv-view-viewinfo-cut text-left\"\n" +
    "         style=\"color: black; background-color: #ffdddd; text-align: left;\">\n" +
    "        <span style=\"white-space: nowrap;\"><i class=\"fa fa-fw fa-map-signs\"></i> <b\n" +
    "                class=\"hidden-xs hidden-sm\">Min. change:</b> <input type=\"number\"\n" +
    "                                                                    ng-model=\"view.params.widget.movement\"\n" +
    "                                                                    style=\"width: 7em;\" step=\"0.1\" min=\"0\"></span>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/cube/widget/threshold.html',
    "<div class=\"container-fluid\">\n" +
    "    <div ng-style=\"{'font-size': view.params.widget.zoom + '%'}\">\n" +
    "        <div ng-repeat=\"serie in series\" class=\"row\" style=\"margin-top: 1em;\">\n" +
    "            <div class=\"col-sm-12\"><h3 style=\"color: #337ab7;\">{{ ::serie['key'] }}</h3></div>\n" +
    "            <div ng-repeat=\"point in serie['values']\" class=\"col-xs-6\"\n" +
    "                 ng-if=\"compareThreshold(point['y'])\"\n" +
    "                 ng-class=\"(cvOptions.studioTwoColumn ? 'col-md-6 col-sm-6' : 'col-md-3 col-sm-3')\"\n" +
    "                 ng-init=\"chevron = point['diff'] > 0 ? 'fa-chevron-up' : 'fa-chevron-down'\">\n" +
    "                <span style=\"font-size: 200%\">{{ :: point['x'] }}</span>\n" +
    "                <span style=\"font-size: 150%; opacity: .7;\">({{ ::point['y'] }}<span ng-if=\"point['diff'] != 0\">\n" +
    "                <span ng-class=\"{'text-success': point['diff'] > 0, 'text-danger': point['diff'] < 0}\"><i\n" +
    "                        ng-class=\"chevron\" class=\"fa fa-fw\"></i>{{ ::diff_abs(point['diff']) }}%</span></span>)</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-12\" ng-if=\"isSerieEmpty(serie['values'])\">\n" +
    "                No rows to display.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/cube/widget/value.html',
    "<div class=\"container-fluid\">\n" +
    "    <div ng-style=\"{'font-size': view.params.widget.zoom + '%'}\">\n" +
    "        <div ng-repeat=\"serie in series\" class=\"row\" style=\"margin-top: 1em;\">\n" +
    "            <div class=\"col-sm-12\"><h3 style=\"color: #337ab7;\">{{ ::serie['key'] }}</h3></div>\n" +
    "            <div class=\"col-xs-6\"\n" +
    "                 ng-class=\"(cvOptions.studioTwoColumn ? 'col-md-6 col-sm-6' : 'col-md-3 col-sm-3')\"\n" +
    "                 ng-init=\"chevron = serie['diff'] > 0 ? 'fa-chevron-up' : 'fa-chevron-down'\">\n" +
    "                <span style=\"font-size: 200%\">{{ ::toFixed(serie['value'], 2) }}</span>\n" +
    "                <span ng-if=\"serie['diff'] > 0\"\n" +
    "                      ng-class=\"{'text-success': serie['diff'] > 0, 'text-danger': serie['diff'] < 0}\"><i\n" +
    "                        ng-class=\"chevron\" class=\"fa fa-fw\" style=\"font-size: 150%\"></i>\n" +
    "            <span style=\"font-size: 150%;\">{{ ::diff_abs(serie['diff']) }}%</span></span>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-12\" ng-if=\"serie['value'] == undefined\">\n" +
    "                No rows to display.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/cube/widget/widget.html',
    "<div ng-controller=\"CubesViewerWidgetController\">\n" +
    "    <div ng-if=\"view.params.widget.type == 'max-value'\">\n" +
    "\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerWidgetMaxValueController\">\n" +
    "            <div ng-include=\"'views/cube/widget/max-value.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.widget.type == 'threshold'\">\n" +
    "\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerWidgetThresholdController\">\n" +
    "            <div ng-include=\"'views/cube/widget/threshold.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.widget.type == 'movement'\">\n" +
    "\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerWidgetMovementController\">\n" +
    "            <div ng-include=\"'views/cube/widget/movement.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.widget.type == 'value'\">\n" +
    "\n" +
    "        <div ng-if=\"view.pendingRequests > 0\" class=\"loadingbar-content\">\n" +
    "            <span class=\"loadingbar-expand\"></span>\n" +
    "        </div>\n" +
    "        <div ng-controller=\"CubesViewerWidgetValueController\">\n" +
    "            <div ng-include=\"'views/cube/widget/value.html'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"view.params.zaxis == null\" class=\"alert alert-info\" style=\"margin-bottom: 0px;\">\n" +
    "        <p>\n" +
    "            Cannot present widget: no <b>Compare dimension</b> has been selected.\n" +
    "        </p>\n" +
    "        <p>\n" +
    "            Tip: use the <kbd><i class=\"fa fa-fw fa-cogs\"></i> View &gt; <i class=\"fa fa-fw fa-balance-scale\"></i>\n" +
    "            Compare dimension</kbd> menu.\n" +
    "        </p>\n" +
    "    </div>\n" +
    "    <div ng-if=\"view.pendingRequests == 0 && view.params.zaxis != null && view.grid.data.length == 0\"\n" +
    "         class=\"alert alert-info\" style=\"margin-bottom: 0px;\">\n" +
    "        <p>\n" +
    "            Cannot present widget: <b>no rows returned</b> by the current filtering and drilldown combination.\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-hide=\"view.getControlsHidden()\">\n" +
    "        <div class=\"pull-right\">Zoom: <a ng-click=\"view.params.widget.zoom=view.params.widget.zoom-5;\"><i\n" +
    "                class=\"fa fa-minus-circle\"></i></a>\n" +
    "            <a ng-click=\"view.params.widget.zoom=view.params.widget.zoom+5;\"><i class=\"fa fa-plus-circle\"></i></a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
