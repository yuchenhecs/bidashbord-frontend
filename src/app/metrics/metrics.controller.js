angular
    .module('app')
    .factory('MetricsService', MetricsService);


function MetricsService($http, $rootScope, $compile, $q, SessionService) {
    return function () {
        var self = this;

        SessionService.refreshCanceller();

        // constants
        this.DOMAIN = $rootScope.domain;
        this.MAX_COLUMN_NUM = 15;
        this.SUB_DOMAIN = "/bi/goals";
        this.TITLE_TEMPLATE = "Total Goals Created by ";
        this.Y_AXIS_TITLE = "Number of goals";

        this.USE_DUMMY_DATA = true;
        this.controllerName = null;
        this.showDatepicker = true;
        this.chart_id = 'chart';
        this.unit_prefix = '';

        this.start_text = "Start Date";
        this.end_text = "End Date";

        this.firstDay = new Date(new Date().getFullYear(), 0, 1);
        this.yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        var fuse;
        var $scope;
        var colorTheme = {
            colors: ["#000285", "#11BEDF", "#40B349", "#A1CB39", "#ACE6F9", "#FCCC08"]
        };

        Highcharts.setOptions(colorTheme);

        this.chart = null;

        this.level_list = [];
        this.startDate = null;
        this.endDate = null;
        this.isRequired = false;
        this.current_level = 0;
        this.lastInitial = '';

        //chart option template
        this.optionTemplate = {
            credits: {
                enabled: false
            },
            lang: {
                noData: "No data to display"
            },
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#303030'
                }
            }
        };



        // 1. Initial launch pipeline 
        //      launch -> getData -> loadData -> createChart
        // 2. When-click-on-bars pipeline
        //      drillDown -> getData -> loadData -> createChart  
        //      drillDown -> createChart  (When previous data is available)
        // 3. When-click-on-path-selector pipeline
        //      drillToLevel -> createChart
        // 4. Date-change pipeline
        //      validateLevel -> getData -> loadData -> createChart
        // 5. Week/Month and Prospects/Clients pipeline  (in LoginsController.js)
        //      validateLevel -> getData -> loadData -> createChart





        //------------------------------------ Pipeline ---------------------------------------------------------------
        this.launch = function (scope) {
            $scope = scope;
               
            SessionService.role_promise.then(function mySuccess() {
                var root = SessionService.name;  // dummy root name, should be returned by Oranj API
                var rootId = SessionService.id;

                self.getData(root, rootId, 0);
                self.createOffChartWidgets(scope);

            });


           

        };

        this.drillDown = function (name, id) {
            if (this.current_level + SessionService.level >= 2) {
                alert('Cannot drilldown anymore!');
                return; //level number overflowed, cannot drilldown anymore
            }

            var new_level = this.current_level + 1;

            if (new_level === this.level_list.length) {
                this.getDataForLevel(name, id, 0, new_level);
                return;
            }

            if (name.toString().localeCompare(this.level_list[new_level]['name']) != 0) {
                this.removeFromLevel(new_level);
                this.getDataForLevel(name, id, 0, new_level);
                return;
            }


            if (!this.validateLevel(new_level)) {
                return;
            }

            this.current_level = new_level;
            this.createChart();

        }

        this.drillToLevel = function (level) {
            // shouldn't replace the chart until this onClick function terminates
            // it seems that Promise is too faster and still causes error compared to setTimeOut
            // could fix later

            setTimeout(function () {

                if (!self.validateLevel(level)) {
                    return;
                }
                self.current_level = level;
                self.createChart();
            }, 10);
        }

        this.validateLevel = function (level) {
            if (!this.compareDate(level)) {
                var name = this.level_list[level]['name'];
                var id = this.level_list[level]['id'];

                this.getDataForLevel(name, id, 0, level);
                return false;
            }

            return true;
        }

        this.getData = function (name, id, page) {

            if (this.controllerName.localeCompare("logins") === 0) {
                this.getDataForLevel(name, id, page, this.current_level, [this.isWeek, this.isProspect]);
            } else {
                this.getDataForLevel(name, id, page, this.current_level);
            }

        }

        this.getDataForLevel = function (name, id, page, level, args) {
            console.time('API');
            this.showLoading();

            var domain = this.DOMAIN;
            var subdomain = this.SUB_DOMAIN;
            var baseUrl;

            var role_level = level + SessionService.level;

            // construct url based on current drilldown level
            if (role_level === 0) {
                baseUrl = domain + subdomain + "/firms?";
            } else if (role_level === 1) {
                baseUrl = domain + subdomain + "/advisors?firmId=" + id;
            } else if (role_level === 2) {
                baseUrl = domain + subdomain + "/clients?advisorId=" + id;
            } else {
                console.log("Invalid level!");
                self.hideLoading();
                return;
            }

            var endDate = !this.endDate ? null : this.endDate.toISOString().slice(0, 10);
            var startDate = !this.startDate ? null : this.startDate.toISOString().slice(0, 10);

            var startName = this.controllerName.localeCompare("aum") === 0 ? "previousDate" : "startDate";
            var endName = this.controllerName.localeCompare("aum") === 0 ? "currentDate" : "endDate";

            // add start/end date
            baseUrl = !startDate ? baseUrl : baseUrl + "&" + startName + "=" + startDate;
            baseUrl = !endDate ? baseUrl : baseUrl + "&" + endName + "=" + endDate;

            // add page number

            if (this.controllerName.localeCompare("logins") === 0) {
                if (!args) {
                    args = [this.isWeek, this.isProspect];
                }
                var isWeek = args[0];
                var isProspect = args[1];
                // add range and user for Logins
                baseUrl = isWeek === undefined ? baseUrl : baseUrl + "&range=" + (isWeek ? "week" : "month");
                baseUrl = isProspect === undefined ? baseUrl : baseUrl + "&user=" + (isProspect ? "prospect" : "client");

                baseUrl = baseUrl + "&page=" + page;

                this.getDataFromApi(baseUrl, name, id, page, level, [isWeek, isProspect]);
            } else {
                baseUrl = baseUrl + "&page=" + page;

                this.getDataFromApi(baseUrl, name, id, page, level);
            }

            return baseUrl;



        }

        this.getDataFromApi = function (newUrl, name, id, page, level, args, data) {
            var type;

            var role_level = level + SessionService.level;
            if (role_level === 0) {
                type = 'firms';
            } else if (role_level === 1) {
                type = 'advisors';
            } else if (role_level === 2) {
                type = 'clients';
            }

            var newUrl = newUrl.slice(0, newUrl.lastIndexOf("=") + 1) + page;
            console.log(newUrl);

            if (this.USE_DUMMY_DATA) {
                var response;

                var role_level = level + SessionService.level;

                if (role_level === 0) {
                    response = this.data1;
                } else if (role_level === 1) {
                    response = this.data2;
                } else if (role_level === 2) {
                    response = this.data3;
                }

                var data = response;
                data['data'] = response[type];
                this.current_level = level;

                if (this.controllerName.localeCompare("logins") === 0) {
                    this.isWeek = args[0];
                    this.isProspect = args[1];
                    this.unit = data['unit'];
                }

                this.loadData(data, name, id);
                return;
            }

            return $http.get(newUrl, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
                if (self.controllerName.localeCompare("goals") != 0) {
                    self.PreProcessData(response, type, newUrl, name, id, page, level, args, data);
                    return data;
                }
                else {
                    var hasNext = response.data.data['last'];

                    if (data) {
                        data['data'] = data['data'].concat(response.data.data[type]);
                    } else {
                        data = response.data.data;
                        data['data'] = response.data.data[type];
                    }
                    if (hasNext) {

                        self.current_level = level;
                        self.loadData(data, name, id);
                        return data;
                    } else {
                        self.getDataFromApi(newUrl, name, id, page + 1, level, args, data)
                    }
                }
            }, function myError(response, error) {
                console.log("Error " + response.status + ": " + response.statusText + "!");
                self.hideLoading();
            });
        }



        this.PreProcessData = function (response, type, newUrl, name, id, page, level, args, data) {
            var hasNext = response.data.data['hasNext'];

            if (data) {
                data['data'] = data['data'].concat(response.data.data[type]);
            } else {
                data = response.data.data;
                data['data'] = response.data.data[type];
            }

            if (!hasNext) {

                if (this.controllerName.localeCompare("logins") === 0) {
                    this.isWeek = args[0];
                    this.isProspect = args[1];
                    this.unit = data['unit'];
                }


                this.current_level = level;
                this.loadData(data, name, id);
            } else {
                this.getDataFromApi(newUrl, name, id, page + 1, level, args, data)
            }
        }

        this.loadData = function (input, name, id) {

            console.timeEnd('API');
            var currentOptions = {
                chart: this.chartSelector(input),
                title: this.titleSelector(name),
                subtitle: this.subtitleSelector(input),
                series: this.seriesSelector(input),
                xAxis: this.xAxisSelector(input),
                yAxis: this.yAxisSelector(input),
                tooltip: this.tooltipSelector(input),
                plotOptions: this.plotOptionsSelector(input),
                legend: this.legendSelector(input)
            };

            currentOptions = Object.assign({}, this.optionTemplate, currentOptions);

            this.createNewLevel(currentOptions, name, id); // update drilldown level and prepare chart data
            this.createChart(); // update drilldown level and prepare chart data
        }



        this.createChart = function () {
            console.time('Chart');
            this.lastInitial = '';
            this.hideLoading();
            this.chart = Highcharts.chart(this.chart_id, this.level_list[this.current_level].option);
            console.timeEnd('Chart');

        }

        //------------------------------------ Pipeline helper ---------------------------------------------------------------


        this.createNewLevel = function (options, name, id) {

            var startDate = !this.startDate ? null : new Date(this.startDate);
            var endDate = !this.endDate ? null : new Date(this.endDate);

            var newLevel = {
                option: options,
                name: name,
                id: id,
                start: startDate,
                end: endDate
            };


            if (this.current_level === this.level_list.length) {
                this.level_list.push(newLevel);
            } else {
                this.level_list[this.current_level] = newLevel;
            }
        }

        this.showLoading = function () {
            if (this.chart != null) {
                this.chart.showLoading('Loading...');
            }
        }

        this.hideLoading = function () {
            if (this.chart != null) {
                this.chart.hideLoading();
            }
        }

        this.removeFromLevel = function (level) {
            this.level_list = this.level_list.slice(0, level);
        }

        //------------------------------------ Chart Options Constructor ---------------------------------------------------------------
        this.chartSelector = function () {
            var chart = {
                type: 'column',
                zoomType: 'xy',
                events: {
                    load: this.chartOnLoad
                },
                panning: true,
                panKey: 'shift'
            }

            return chart;
        }


        this.titleSelector = function (name) {

            var title = {
                text: this.TITLE_TEMPLATE + name,
                y: 20
            };

            return title;
        }

        this.subtitleSelector = function () {
            return null;
        }

        this.seriesSelector = function (input) {
            return this.prepareSeries(input.data);
        }

        this.xAxisSelector = function (input) {
            var xAxis = {
                categories: this.prepareCategories(input.data),
                crosshair: false,
                labels: {
                    formatter: this.xAxisFormatter
                }

            };
            return xAxis;
        }

        this.xAxisFormatter = function () {

            var label = this.axis.defaultLabelFormatter.call(this);
            this.axis.autoRotation = null;

            if (this.axis.tickInterval > 1) {
                var initial = label.charAt(0).toUpperCase();
                if (initial === self.lastInitial) {
                    return '';
                }

                self.lastInitial = initial;

                return initial;
            }

            return label;
        }

        this.yAxisSelector = function () {
            var yAxis = {
                min: 0,
                allowDecimals: false,
                title: {
                    text: this.Y_AXIS_TITLE
                }
            }

            return yAxis;
        }

        this.tooltipSelector = function () {
            var tooltip = {
                formatter: this.formatter,
                shared: false
            }

            return tooltip;
        }

        this.plotOptionsSelector = function () {
            var plotOptions = {

                line: {
                    marker: {
                        enabled: false
                    },
                    dataLabels: {
                        enabled: false
                    }
                },
                series: {
                    stickyTracking: false,
                    turboThreshold: 0,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: this.chartOnClick
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    events: {
                        legendItemClick: function () {
                            return false;
                        }
                    },
                    animation: true
                },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false
                    },
                    marker: {
                        enabled: false
                    }
                }
            };

            return plotOptions;
        }

        this.legendSelector = function () {
            var legend = {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                shadow: false,
                itemHoverStyle: {
                    cursor: 'auto'
                }
            }
            return legend;
        }

        // chart onload event
        this.chartOnLoad = function () {
            self.createWidgets(this);
            self.updateSearchlist();
        }



        // chart bar onclick event
        this.chartOnClick = function () {
            self.drillDown(this.category, this.id);
        }

        // tooltip formatter
        this.formatter = function () {
            var s = '<b>' + this.x + '</b>';
            var allSeries = this.series.chart.series;

            allSeries.forEach(function (series) {
                if (series.data[this.point.index] && series.data[this.point.index].y) {
                    s += '<br/> <span style="color:' + series.color + '">● </span>';
                    if (this.series.index === series.index) {
                        s += '<b>' + series.name + ':' + self.unit_prefix + series.data[this.point.index].y + '</b>';
                    } else {
                        s += series.name + ':' + self.unit_prefix + series.data[this.point.index].y;
                    }
                }

            }, this);

            return s;
        }

        //construct categories data for chart template
        this.prepareCategories = function (input) {
            var categories = input.map(function (x) {
                var name = x['name'];
                if (self.current_level === 0) {
                    name = x['name'];
                } else if (self.current_level === 1) {
                    name = x['name'];
                } else if (self.current_level === 2) {
                    name = x['name'];
                }
                return name;
            });

            var output = [];
            categories.forEach(function (x) {
                output.push(x);
            });

            return output;
        }

        //construct series data for chart template
        this.prepareSeries = function (input) {
            var goalMap = {};
            input.forEach(function (x, i) {
                for (var category in goalMap) {
                    goalMap[category].push(0);
                }
                var goals = x['goals'];
                for (var key in goals) {
                    if (!goalMap[key]) {
                        goalMap[key] = Array.apply(null, Array(i + 1)).map(Number.prototype.valueOf, 0);
                    }
                    goalMap[key][i] = goals[key];
                }
            });

            // combine all points for each series into lists

            var series = [];
            for (var key in goalMap) {
                var dataDrillDown = goalMap[key].map(function (x, i) {

                    var name = 'firmId';
                    if (self.current_level === 0) {
                        name = 'firmId';
                    } else if (self.current_level === 1) {
                        name = 'advisorId';
                    } else if (self.current_level === 2) {
                        name = 'clientId'
                    }
                    return { id: input[i][name], y: x };
                });

                var points =
                    {
                        name: key,
                        data: dataDrillDown
                    };
                series.push(points);
            }

            return series;
        }



        //---------------------------------- Widgets -----------------------------------------------------------------

        this.createWidgets = function (chart) {
            this.createPathSelector(chart);
        }



        //path selector
        this.createPathSelector = function (chart) {

            var note = chart.renderer.text("Zoom in by drag & select ").css({ fontSize: '10px' }).add();
            var noteBBox = note.getBBox();
            var x = chart.plotLeft * 0.5;
            var y = noteBBox.height * 3.3;
            note.attr({ x: x, y: y });
            //note.element.classList.add("chart-legend");


            var pathHTML = this.generatePathSelectorHTML();
            var text = chart.renderer.text(pathHTML).add();
            var textBBox = text.getBBox();
            var x = chart.plotLeft * 0.25;
            var y = textBBox.height * 0.7;
            text.attr({ x: x, y: y });

            var pathBlocks = text.element.children;

            for (var i = 1; i < pathBlocks.length; i = i + 2) {
                pathBlocks[i].setAttribute('data-level', (i - 1) / 2);
                pathBlocks[i].classList.add("path-link");

                pathBlocks[i - 1].classList.add("chart-legend");
                pathBlocks[i].classList.add("chart-legend");

                pathBlocks[i].onclick = function () {
                    self.pathOnClick(this);
                };
            }

            pathBlocks[(self.current_level) * 2 + 1].classList.add("curr-path-link");
        }

        this.pathOnClick = function (element) {
            var level = parseInt(element.dataset.level);

            //drill up
            self.drillToLevel(level);
        }

        this.generatePathSelectorHTML = function () {
            var output = "Path:";

            this.level_list.forEach(function (element) {
                output += '<a>' + element['name'] + '</a>' + '>';
            });

            return output.slice(0, -1);
        }

        //---------------------------------- Offchart Widgets -----------------------------------------------------------------


        this.createOffChartWidgets = function (scope) {
            if (this.showDatepicker) {
                this.createDatepicker(scope);
            }

            this.createSearchBar(scope);
        }

        //datepicker
        this.createDatepicker = function (scope) {

            var ctrl = this.controllerName;
            var datePickerHTML = `
                 <div layout="row"  layout-align="center center">
                    <form name="startForm">
                            <md-input-container style="margin-bottom: 0px !important;">
                                <label>` + this.start_text + `</label>
                                <md-datepicker ng-model="`+ ctrl + `.self.startDate" name="dateField" md-max-date="` + ctrl + `.self.yesterday"
                                ng-change="`+ ctrl + `.self.checkDate()" md-open-on-focus ng-required="` + ctrl + `.self.isRequired"></md-datepicker>

                                <div ng-messages="startForm.dateField.$error">
                                <div ng-message="valid">The entered value is not a date!</div>
                                <div ng-message="required">This date is required!</div>
                                <div ng-message="mindate">Date is too early!</div>
                                <div ng-message="maxdate">Date is too late!</div>
                                </div>
                            </md-input-container>
                        </form>

                        <form name="endForm">
                            <md-input-container style="margin-bottom: 0px !important;">
                                <label>`+ this.end_text + `</label>
                                <md-datepicker ng-model="`+ ctrl + `.self.endDate" name="dateField" md-min-date="` + ctrl + `.self.startDate"
                                md-max-date="`+ ctrl + `.self.yesterday" ng-change="` + ctrl + `.self.checkDate()" md-open-on-focus ng-required="` + ctrl + `.self.isRequired"></md-datepicker>

                                <div ng-messages="endForm.dateField.$error">
                                <div ng-message="valid">The entered value is not a date!</div>
                                <div ng-message="required">This date is required!</div>
                                <div ng-message="mindate">Date is too early!</div>
                                <div ng-message="maxdate">Date is too late!</div>
                                </div>
                            </md-input-container>


                        </form>

                        <md-button class="md-secondary md-raised"  ng-click="`+ ctrl + `.self.clearDate()" ng-hide="` + ctrl + `.self.isRequired">Clear</md-button>
                        <md-button class="md-primary md-raised"  ng-click="`+ ctrl + `.self.assignYTD()">YTD</md-button>
                </div>
            `;

            var chartHTML = angular.element(document.getElementById("chart-container"));
            chartHTML.append($compile(datePickerHTML)(scope));
        }

        this.updateSearchlist = function () {
            var list = this.level_list[this.current_level].option.xAxis.categories;

            var objList = list.map(function (x, i) {
                var series = self.level_list[self.current_level].option.series.map(function (obj) {
                    return {
                        name: obj.name,
                        data: obj.data[i].y
                    };
                });
                return {
                    value: x.toLowerCase(),
                    display: x,
                    series: series
                };
            });

            var options = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                    "value"
                ]
            };
            fuse = new Fuse(objList, options); // "list" is the item array


            if (this.current_level === 0) {
                this.icon = 'fa-building';
            } else if (self.current_level === 1) {
                this.icon = 'fa-black-tie';
            } else {
                this.icon = 'fa-user';
            }
        }

        this.createSearchBar = function (scope) {
            var ctrl = this.controllerName;
            var searchBarHTML = `
                <div layout="column">
                    <div layout="row"  layout-align="end center">
                        <md-autocomplete 
                            class="oranj-default"
                            md-autoselect="'true'"
                            md-no-cache="'true'"
                            md-selected-item-change="`+ ctrl + `.self.selectedItemChange(item)"
                            md-selected-item="`+ ctrl + `.selectedItem" 
                            md-search-text="`+ ctrl + `.searchText" 
                            md-items="item in `+ ctrl + `.self.querySearch(` + ctrl + `.searchText)" 
                            md-item-text="item.display"
                            md-min-length="0"
                            placeholder="Search">
                            <i id="search-icon" class="fa" ng-class="` + ctrl + `.self.icon" aria-hidden="true" style="margin:3px"></i><span  md-highlight-text="` + ctrl + `.searchText" md-highlight-flags="gi">{{item.display}}</span>
                        </md-autocomplete>
                    </div>

                    <div id="search-result" layout="row"  layout-align="space-between stretch" layout-padding>
                    </div>
                </div>
            `;

            var chartHTML = angular.element(document.getElementById("chart-container"));
            chartHTML.append($compile(searchBarHTML)(scope));
        }

        this.createSearchResultHTML = function (item) {
            var searchPrefix = item ?
                `<div style="text-align: center">
                    <h5 style="margin-top:10px">`+ item.display + `</h5> 
                </div>
                <div class="vertical-line"></div>
                ` : "";

            var searchResultHTML = item ? item.series.map(function (obj, i) {
                return `<div style="text-align: center">
                        <h1 style="color:`+ self.chart.series[i].color + `">` + self.unit_prefix + obj.data + ` </h1>
                        <h6> `+ obj.name + `</h6>
                    </div>`;
            }).join("") : "";

            return searchPrefix + searchResultHTML;
        }

        this.createSearchResult = function (item) {
            var html = this.createSearchResultHTML(item);
            var chartHTML = angular.element(document.getElementById("search-result"));
            chartHTML.html($compile(html)($scope));
        }

        this.selectedItemChange = function (item) {
            self.createSearchResult(item);
        }

        this.querySearch = function (query) {
            if (!fuse) {
                return [];
            }
            return fuse.search(query);
        }

        this.assignYTD = function () {
            this.startDate = new Date(this.firstDay);
            this.endDate = new Date(this.yesterday);

            this.validateLevel(this.current_level);
        }

        this.clearDate = function () {

            this.endDate = null;
            this.startDate = null;

            this.validateLevel(this.current_level);

        }

        this.checkDate = function () {
            if (this.endDate != null) {
                this.endDate = this.startDate > this.endDate ? this.startDate : this.endDate;
            }

            this.validateLevel(this.current_level);
        }


        this.compareDate = function (level) {

            var startDate_X = this.level_list[level]['start'];
            startDate_X = !startDate_X ? null : startDate_X.getTime();

            var startDate_Y = this.startDate;
            startDate_Y = !startDate_Y ? null : startDate_Y.getTime();

            var endDate_X = this.level_list[level]['end'];
            endDate_X = !endDate_X ? null : endDate_X.getTime();

            var endDate_Y = this.endDate;
            endDate_Y = !endDate_Y ? null : endDate_Y.getTime();

            return (startDate_X == startDate_Y && endDate_X == endDate_Y)
        }


    };

}
