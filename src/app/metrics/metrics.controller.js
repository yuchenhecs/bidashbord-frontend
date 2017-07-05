angular
    .module('app')
    .factory('MetricsService', MetricsService);


function MetricsService($http, $rootScope, $compile) {
    return function () {
        MetricsService.self = this;

        // constants
        this.DOMAIN = $rootScope.domain;
        this.MAX_COLUMN_NUM = 15;
        this.SUB_DOMAIN = "/bi/goals";
        this.TITLE_TEMPLATE = "Total Goals Created by ";
        this.USE_DUMMY_DATA = true;
        this.controllerName = null;
        this.showDatepicker = true;

        var colorTheme = {
            colors: ["#000285", "#11BEDF", "#40B349", "#A1CB39", "#ACE6F9", "#FCCC08"]
        };

        Highcharts.setOptions(colorTheme);

        this.$http = $http;
        this.$compile = $compile;

        this.chart = null;

        this.level_list = [];
        this.startDate = null;
        this.endDate = null;
        this.isRequired = false;
        this.current_level = 0;
        this.doUpdate = false;
        this.lastInitial = '';

        //chart option template
        this.optionTemplate = {
            credits: {
                enabled: false
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

            var root = 'Oranj';  // dummy root name, should be returned by Oranj API
            var rootId = -1;

            this.getData(root, rootId, 0);

            this.createOffChartWidgets(scope);

        };

        this.drillDown = function (name, id) {
            if (this.current_level >= 2) {
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
                var self = MetricsService.self;

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

        // this.getDataForPage = function (page, level, isWeek, isProspect) {
        //     this.getDataForLevel(this.level_list[this.current_level]['name'], this.level_list[this.current_level]['id'], page, level, isWeek, isProspect);
        // }

        this.getData = function (name, id, page) {
            if (this.controllerName.localeCompare("logins") === 0) {
                this.getDataForLevel(name, id, page, this.current_level, [this.isWeek, this.isProspect]);
            } else {
                this.getDataForLevel(name, id, page, this.current_level);
            }

        }

        this.getDataForLevel = function (name, id, page, level, args) {

            this.showLoading();

            var domain = this.DOMAIN;
            var subdomain = this.SUB_DOMAIN;
            var baseUrl;

            // construct url based on current drilldown level
            if (level === 0) {
                baseUrl = domain + subdomain + "/firms?";
            } else if (level === 1) {
                baseUrl = domain + subdomain + "/advisors?firmId=" + id;
            } else if (level === 2) {
                baseUrl = domain + subdomain + "/clients?advisorId=" + id;
            } else {
                console.log("Invalid level!");
                MetricsService.self.hideLoading();
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



        }

        this.getDataFromApi = function (newUrl, name, id, page, level, args, data) {
            var type;
            if (level === 0) {
                type = 'firms';
            } else if (level === 1) {
                type = 'advisors';
            } else if (level === 2) {
                type = 'clients';
            }

            var newUrl = newUrl.slice(0, newUrl.lastIndexOf("=") + 1) + page;
            console.log(newUrl);

            if (this.USE_DUMMY_DATA) {
                var response;
                if (level === 0) {
                    response = this.data1;
                } else if (level === 1) {
                    response = this.data2;
                } else if (level === 2) {
                    response = this.data3;
                }

                var data = response;
                data['data'] = response[type];
                this.current_level = level;


                if (this.controllerName.localeCompare("logins") === 0) {
                    this.isWeek = args[0];
                    this.isProspect = args[1];
                }

                this.loadData(data, name, id);
                return;
            }


            this.$http.get(newUrl).then(function mySuccess(response) {
                var self = MetricsService.self;
                if (self.controllerName.localeCompare("goals") != 0) {
                    self.PreProcessData(response, type, newUrl, name, id, page, level, args, data);
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
                    } else {
                        self.getDataFromApi(newUrl, name, id, page + 1, level, args, data)
                    }
                }
            }, function myError(response, error) {
                console.log("Error " + response.status + ": " + response.statusText + "!");

                MetricsService.self.hideLoading();
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
            console.time('time');
            this.lastInitial = '';
            this.hideLoading();
            this.chart = Highcharts.chart('chart', this.level_list[this.current_level]['option']);
            //this.chart.update(this.level_list[this.current_level]['option']);

            console.timeEnd('time');
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

        // this.mergeOption = function (options) {
        //     // assume we are expanding the current chart
        //     var originalCategories = this.level_list[this.current_level]['option']['xAxis']['categories'];

        //     var originalLength = originalCategories.length;
        //     var newLength = options['xAxis']['categories'].length;

        //     options['xAxis']['categories'] = originalCategories.concat(options['xAxis']['categories']);

        //     var originalSeries = this.level_list[this.current_level]['option']['series'];
        //     var newSeries = options['series'];

        //     var seriesMap = {};

        //     // 1. initialize seriesMap with originalSeries
        //     originalSeries.forEach(function (element) {
        //         seriesMap[element['name']] = element;
        //     });

        //     // 2. append newSeries
        //     newSeries.forEach(function (element) {
        //         if (!seriesMap[element['name']]) {
        //             var zeroPaddings = Array.apply(null, Array(originalLength)).map(Number.prototype.valueOf, 0);
        //             seriesMap[element['name']]['data'] = zeroPaddings.concat(element['data']);
        //         } else {
        //             seriesMap[element['name']]['data'] = seriesMap[element['name']]['data'].concat(element['data']);

        //         }
        //     });

        //     // 3. fill the rest of originalSeries with zeros
        //     originalSeries.forEach(function (element) {
        //         if (seriesMap[element['name']]['data'].length < originalLength + newLength) {
        //             var zeroPaddings = Array.apply(null, Array(newLength)).map(Number.prototype.valueOf, 0);
        //             seriesMap[element['name']]['data'] = seriesMap[element['name']]['data'].concat(zeroPaddings);
        //         }
        //     });

        //     options['series'] = Object.values(seriesMap);

        //     return options;
        // }



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
                text: this.TITLE_TEMPLATE + name
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
                var self = MetricsService.self;


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
                title: {
                    text: 'Number of goals'
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
                    }
                },
                series: {
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
                    animation: true
                },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    },
                    events: {
                        legendItemClick: function () {
                            return false;
                        }
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
            var self = MetricsService.self;

            var chart = this;
            self.createWidgets(this);

            if (self.controllerName.localeCompare("aum") === 0) {
                // lighten the color of previous date bar
                chart.series.forEach(function (x) {

                    if (x.options.stackId === 1) {
                        return;
                    }
                    var hex = x.color;
                    var percent = 50;

                    // increase brightness
                    var colorCode;

                    // strip the leading # if it's there
                    hex = hex.replace(/^\s*#|\s*$/g, '');

                    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
                    if (hex.length === 3) {
                        hex = hex.replace(/(.)/g, '$1$1');
                    }

                    var r = parseInt(hex.substr(0, 2), 16),
                        g = parseInt(hex.substr(2, 2), 16),
                        b = parseInt(hex.substr(4, 2), 16);

                    colorCode = '#' +
                        ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
                        ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
                        ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);


                    x.update({
                        color: colorCode
                    });
                });
            }
        }



        // chart bar onclick event
        this.chartOnClick = function () {

            MetricsService.self.drillDown(this.category, this.id);
        }

        // tooltip formatter
        this.formatter = function () {
            var s = '<b>' + this.x + '</b>';
            var allSeries = this.series.chart.series;

            allSeries.forEach(function (series) {
                if (series.data[this.point.index] && series.data[this.point.index].y) {
                    s += '<br/>' + series.name + ': ' + series.data[this.point.index].y;
                }

            }, this);

            return s;


        }

        //construct categories data for chart template
        this.prepareCategories = function (input) {
            var categories = input.map(function (x) {
                var self = MetricsService.self;
                var name = x['name'];
                if (self.current_level === 0) {
                    name = x['name'];
                } else if (self.current_level === 1) {
                    name = self.controllerName.localeCompare("goals") === 0 || (self.controllerName.localeCompare("netWorth") === 0) ? x['firstName'] + " " + x['lastName'] : x['name'];
                } else if (self.current_level === 2) {
                    name = self.controllerName.localeCompare("goals") === 0 || (self.controllerName.localeCompare("netWorth") === 0) ? x['firstName'] + " " + x['lastName'] : x['name'];
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
                    var self = MetricsService.self;
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
            var y = textBBox.height;
            text.attr({ x: x, y: y });

            var pathBlocks = text.element.children;

            for (var i = 1; i < pathBlocks.length; i = i + 2) {
                pathBlocks[i].setAttribute('data-level', (i - 1) / 2);
                pathBlocks[i].classList.add("path-link");
                
                pathBlocks[i-1].classList.add("chart-legend");
                pathBlocks[i].classList.add("chart-legend");

                pathBlocks[i].onclick = function () {
                    MetricsService.self.pathOnClick(this);
                };
            }

            pathBlocks[MetricsService.self.current_level * 2 + 1].classList.add("curr-path-link");
        }

        this.pathOnClick = function (element) {

            var level = parseInt(element.dataset.level);

            //drill up
            MetricsService.self.drillToLevel(level);

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

            if (this.showDatepicker)
                this.createDatepicker(scope);
        }

        //datepicker
        this.createDatepicker = function (scope) {

            var ctrl = this.controllerName;
            var datePickerHTML = `
                 <div layout="row"  layout-align="center center">
                    <form name="startForm">
                    <md-input-container style="margin-bottom: 0px !important;">
                        <label>Start date</label>
                        <md-datepicker ng-model="`+ ctrl + `.startDate" name="dateField" md-max-date="` + ctrl + `.today"
                        ng-change="`+ ctrl + `.checkDate()" md-open-on-focus ng-required="` + ctrl + `.isRequired"></md-datepicker>

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
                        <label>End date</label>
                        <md-datepicker ng-model="`+ ctrl + `.endDate" name="dateField" md-min-date="` + ctrl + `.startDate"
                        md-max-date="`+ ctrl + `.today" ng-change="` + ctrl + `.checkDate()" md-open-on-focus ng-required="` + ctrl + `.isRequired"></md-datepicker>

                        <div ng-messages="endForm.dateField.$error">
                        <div ng-message="valid">The entered value is not a date!</div>
                        <div ng-message="required">This date is required!</div>
                        <div ng-message="mindate">Date is too early!</div>
                        <div ng-message="maxdate">Date is too late!</div>
                        </div>
                    </md-input-container>
                    </form>

                    <md-button class=" md-raised" ng-click="`+ ctrl + `.clearDate()" ng-hide="` + ctrl + `.isRequired">Clear</md-button>
                    <md-button class="md-primary md-raised" ng-click="`+ ctrl + `.assignYTD()">YTD</md-button>
                </div>
            `;

            var chartHTML = angular.element(document.getElementById("chart-container"));
            chartHTML.append(this.$compile(datePickerHTML)(scope));
        }

        this.assignYTD = function () {
            this.startDate = new Date(new Date().getFullYear(), 0, 1);
            this.endDate = new Date();
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
