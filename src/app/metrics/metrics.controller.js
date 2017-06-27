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
        this.TITLE_TEMPLATE = "Total goals created by ";
        this.USE_DUMMY_DATA = false;
        this.controllerName = null;
        this.showDatepicker = true;

        var colorTheme = {
            colors: ["#000285", "#11BEDF", "#40B349", "#A1CB39", "#ACE6F9", "#FCCC08"]
        };

        Highcharts.setOptions(colorTheme);

        // init
        //MetricsService.self = this; // singleton
        this.$http = $http;
        this.$compile = $compile;

        this.chart = null;

        this.level_list = [];
        this.startDate = null;
        this.endDate = null;
        this.isRequired = false;
        this.current_level = 0;

        this.canLoadMore = false;

        // tooltip formatter
        var formatter = function () {

            var s = '<b>' + this.x + '</b>';
            this.points.forEach(function (element) {
                //element.hover
                if (!element.y || element.y === 0 ) {
                    return;
                }
                s += '<br/>' + element.series.name + ': ' + element.y;
            });
            return s;
        }

        // chart bar onclick event
        var chartOnClick = function () {
            MetricsService.self.drillDown(this.category, this.id);
        }

        var chartOnRedraw = function (event) {
            console.log("chart on readraw");
            var self = MetricsService.self;
            if (this.xAxis) {

                var extremes = this.xAxis[0].getExtremes();
                if (extremes && extremes.max == extremes.dataMax) {
                    var current_level = self.level_list[self.current_level];
                    var last = current_level['last'];

                    if (last) {
                        return;
                    }

                    if (self.canLoadMore) {
                        self.canLoadMore = false;
                        self.getData(current_level['name'], current_level['id'], current_level['page'] + 1);
                    }
                }
            }
        }

        //chart option template
        this.optionTemplate = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'column',
                zoomType: 'y',
                events: {
                    redraw: chartOnRedraw
                },
            },
            title: null,
            xAxis: null,
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of goals'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                x: -30,
                y: 40,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false,
                itemHoverStyle: {
                    cursor: 'auto'
                }
            },
            tooltip: {
                formatter: formatter,
                shared: true
            },
            plotOptions: {
                line: {
                    marker: {
                      enabled: false
                    }
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: chartOnClick
                        }
                    },
                    marker: {
                        enabled: true
                    }
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
            },
            series: null
        };


        this.launch = function (scope) {
            var root = 'Oranj';  // dummy root name, should be returned by Oranj API
            var rootId = -1;
            this.getData(root, rootId, 0);
            if(this.showDatepicker)
              this.createDatepicker(scope);


            scope.$watch(function () {
                return angular.element(document.getElementById("main")).attr('class');
            }, function (newValue) {
                var chart = MetricsService.self.chart;

                if (chart != null) {
                    setTimeout(function (c) {
                        c.reflow();
                    }, 300, chart);
                }
            });
        };



        //------------------------------------datepicker---------------------------------------------------------------

        this.assignYTD = function () {
            this.startDate = new Date(new Date().getFullYear(), 0, 1);
            this.endDate = new Date();
            this.applyDateFilter();
        }

        this.clearDate = function () {
            this.endDate = null;
            this.startDate = null;

            this.applyDateFilter();

        }

        this.checkDate = function () {
            if (this.endDate != null) {
                this.endDate = this.startDate > this.endDate ? this.startDate : this.endDate;
            }

            this.applyDateFilter();
        }

        this.applyDateFilter = function () {
            var isValid = this.validateDate();
            if (!isValid) {
                this.getData(this.level_list[this.current_level]['name'], this.level_list[this.current_level]['id'], 0);
            }

            return isValid;
        }


        this.validateDate = function () {
            var startDate_X = this.level_list[this.current_level + 0]['start'];
            startDate_X = !startDate_X ? null : startDate_X.getTime();

            var startDate_Y = this.startDate;
            startDate_Y = !startDate_Y ? null : startDate_Y.getTime();

            var endDate_X = this.level_list[this.current_level + 0]['end'];
            endDate_X = !endDate_X ? null : endDate_X.getTime();

            var endDate_Y = this.endDate;
            endDate_Y = !endDate_Y ? null : endDate_Y.getTime();

            return (startDate_X == startDate_Y && endDate_X == endDate_Y)
        }

        this.createDatepicker = function (scope) {

            var ctrl = this.controllerName;
            var datePickerHTML = `
            <div>
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
            </div>
      		`;

            var chartHTML = angular.element(document.getElementById("chart-container"));
            chartHTML.append(this.$compile(datePickerHTML)(scope));
        }









        //----------------------------------chart utilities-----------------------------------------------------------------
        // chart onload event
        this.chartOnLoad = function () {
            console.log("chartOnLoad");
            var self = MetricsService.self;
            self.baseChartOnLoad(this.chart);

            self.canLoadMore = true;
        }


        this.baseChartOnLoad = function (chart) {
            var xSetMax = this.MAX_COLUMN_NUM;
            var xDataMax = chart.xAxis[0].getExtremes().dataMax;
            var xMax = xDataMax < xSetMax ? xDataMax : xSetMax;

            // limit max number of columns shown
            chart.xAxis[0].update({
                max: xMax
            });
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




        //----------------------------------path selector-----------------------------------------------------------------


        //path selector
        this.createPathSelector = function (chart) {
            var pathHTML = this.generatePathSelectorHTML();

            //TODO: remove hardcoded data
            chart.renderer.text(pathHTML, 12, 15).attr({ id: 'path-selector' }).css({ fontSize: '13px' }).add();

            var pathBlocks = document.querySelectorAll('#path-selector tspan');

            var flag = false;
            var i = 0;

            pathBlocks.forEach(function (element) {
                if (flag) {
                    if (i === MetricsService.self.current_level) {
                        element.classList.add("curr-path-link");
                    }
                    element.setAttribute('data-level', i);
                    element.classList.add("path-link");
                    element.onclick = function () {
                        MetricsService.self.pathOnClick(this);
                    };
                    i++;
                }

                flag = !flag;
            });
        }

        this.pathOnClick = function (element) {

            var level = parseInt(element.dataset.level);
            //drill up
            MetricsService.self.drillToLevel(level);
            // shouldn't replace the chart until this onClick function terminates
            // it seems that Promise is too faster and still causes error compared to setTimeOut
            // could fix later
            setTimeout(function () {
                if (MetricsService.self.applyDateFilter()) {
                    MetricsService.self.createChart();
                    MetricsService.self.chartOnLoad();
                };
            }, 10);

        }

        //TODO: only show levels that the user is authorized to see
        this.generatePathSelectorHTML = function () {
            var output = "Path:";

            this.level_list.forEach(function (element) {
                output += '<a>' + element['name'] + '</a>' + '>';
            });

            return output.slice(0, -1);
        }

        this.removeFromLevel = function (level) {
            this.level_list = this.level_list.slice(0, level);
        }

        this.drillDown = function (name, id) {
            this.canLoadMore = false;
            if (this.current_level >= 2) {
                alert('Cannot drilldown anymore!');
                return; //level number overflowed, cannot drilldown anymore
            }

            this.current_level++;

            if (this.current_level == this.level_list.length) {
                this.getData(name, id, 0);
                return;
            }

            if (name.toString().localeCompare(this.level_list[this.current_level]['name']) != 0) {
                this.removeFromLevel(this.current_level);
                this.getData(name, id, 0);
                return;
            }

            if (!this.validateDate()) {
                this.getData(name, id, 0);
                return;
            }

            this.createChart();

        }

        this.drillToLevel = function (level) {
            this.canLoadMore = false;
            this.current_level = level;

        }









        //----------------------------------api calls-----------------------------------------------------------------

        this.getData = function (name, id, page) {
            //debugger;
            console.log("getData");
            this.canLoadMore = false;

            this.showLoading();

            var domain = this.DOMAIN;
            var subdomain = this.SUB_DOMAIN;
            var baseUrl;
            var endDate = !this.endDate ? null : this.endDate.toISOString().slice(0, 10);
            var startDate = !this.startDate ? null : this.startDate.toISOString().slice(0, 10);

            // construct url based on current drilldown level
            if (this.current_level === 0) {
                baseUrl = domain + subdomain + "/firms?page=" + page;
            } else if (this.current_level === 1) {
                baseUrl = domain + subdomain + "/advisors?page=" + page + "&firmId=" + id;
            } else if (this.current_level === 2) {
                baseUrl = domain + subdomain + "/clients?page=" + page + "&advisorId=" + id;
            }

            baseUrl = !startDate ? baseUrl : baseUrl + "&startDate=" + startDate;
            baseUrl = !endDate ? baseUrl : baseUrl + "&endDate=" + endDate;

            console.log(baseUrl);
            this.getDataFromApi(baseUrl, name, id, page);
        }

        this.getDataFromApi = function (newUrl, name, id, page) {
            if (this.USE_DUMMY_DATA) {
                var type;
                if (this.current_level === 0) {
                    type = this.data1;
                } else if (this.current_level === 1) {
                    type = this.data2;
                } else if (this.current_level === 2) {
                    type = this.data3;
                }
                this.loadData(type, name, id, page, false);
                // var last = response.data['last'];
                // if (this.controllerName.localeCompare("netWorth") === 0){
                //   this.loadData(response.data.data, name, id, page, last);
                // } else {
                //   this.loadData(response.data[type], name, id, page, last);
                // }
                if (page === 0) {
                    this.createChart();
                } else {
                    this.hideLoading();
                    this.chart.update(this.level_list[this.current_level]['option']);

                }
                this.chartOnLoad();
                return;
            }

            this.$http.get(newUrl).then(function mySuccess(response) {
                var self = MetricsService.self;
                var type;
                if (self.current_level === 0) {
                    type = 'firms';
                } else if (self.current_level === 1) {
                    type = 'advisors';
                } else if (self.current_level === 2) {
                    type = 'clients';
                }

                var last = response.data['last'];
                if (self.controllerName.localeCompare("netWorth") === 0){
                  self.loadData(response.data.data, name, id, page, last);
                } else {
                  self.loadData(response.data[type], name, id, page, last);
                }

                if (page === 0) { // create new chart
                    self.createChart();
                } else {// append to existing chart
                    self.hideLoading();
                    self.chart.update(self.level_list[self.current_level]['option']);
                }
                self.chartOnLoad();
            }, function myError(response, error) {
                console.log("Error " + response.status + ": " + response.statusText + "!");
                //alert("Error " + response.status + ": " + response.statusText + "!");

                MetricsService.self.hideLoading();
            });
        }



        //construct categories data for chart template
        this.prepareCategories = function (input) {
            var categories = input.map(function (x) {
                var self = MetricsService.self;
                var name = x['name'];
                if (self.current_level === 0) {
                    name = x['name'];
                } else if (self.current_level === 1) {
                    //name = x['name'];
                    name = x['firstName'] + " " + x['lastName'];
                } else if (self.current_level === 2) {
                    //name = x['name'];
                    name = x['firstName'] + " " + x['lastName'];
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

        this.createNewLevel = function (options, name, id, page, last) {

            var startDate = !this.startDate ? null : new Date(this.startDate);
            var endDate = !this.endDate ? null : new Date(this.endDate);



            if (page > 0) { // need to merge with existing options
                options = this.mergeOption(options);
            }
            var newLevel = {
                option: options,
                name: name,
                id: id,
                start: startDate,
                end: endDate,
                page: page,
                last: last
            };


            if (this.current_level === this.level_list.length) {
                this.level_list.push(newLevel);
            } else {
                this.level_list[this.current_level] = newLevel;
            }
        }

        this.mergeOption = function (options) {
          console.log("mergeOption");

            // assume we are expanding the current chart
            var originalCategories = this.level_list[this.current_level]['option']['xAxis']['categories'];

            var originalLength = originalCategories.length;
            var newLength = options['xAxis']['categories'].length;

            options['xAxis']['categories'] = originalCategories.concat(options['xAxis']['categories']);

            var originalSeries = this.level_list[this.current_level]['option']['series'];
            var newSeries = options['series'];

            var seriesMap = {};

            // 1. initialize seriesMap with originalSeries
            originalSeries.forEach(function (element) {
                seriesMap[element['name']] = element;
            });

            // 2. append newSeries
            newSeries.forEach(function (element) {
                if (!seriesMap[element['name']]) {
                    var zeroPaddings = Array.apply(null, Array(originalLength)).map(Number.prototype.valueOf, 0);
                    seriesMap[element['name']]['data'] = zeroPaddings.concat(element['data']);
                } else {
                    seriesMap[element['name']]['data'] = seriesMap[element['name']]['data'].concat(element['data']);

                }
            });

            // 3. fill the rest of originalSeries with zeros
            originalSeries.forEach(function (element) {
                if (seriesMap[element['name']]['data'].length < originalLength + newLength) {
                    var zeroPaddings = Array.apply(null, Array(newLength)).map(Number.prototype.valueOf, 0);
                    seriesMap[element['name']]['data'] = seriesMap[element['name']]['data'].concat(zeroPaddings);
                }
            });

            options['series'] = Object.values(seriesMap);


            return options;
        }

        this.loadData = function (input, name, id, page, last) {
          console.log("loadData");

            var currentOptions = Object.assign({}, this.optionTemplate, {
                title: {
                    text: this.TITLE_TEMPLATE + name,
                    y: 30,
                    margin: 30
                },
                series: this.prepareSeries(input),
                xAxis: {
                    scrollbar: {
                        enabled: true
                    },
                    categories: this.prepareCategories(input)
                }
            });
            this.createNewLevel(currentOptions, name, id, page, last); // update drilldown level and prepare chart data

            console.log("createNewLevel");
        }

        this.createChart = function () {
          console.log(this.level_list[this.current_level]['option']);



            this.hideLoading();
            this.chart = Highcharts.chart('chart', this.level_list[this.current_level]['option']);
            this.createPathSelector(this.chart); // create new path selector on top left
            this.chart.renderer.text("Zoom in by drag & select ", 20, 40).css({ fontSize: '10px' }).add();
        }


    };

}
