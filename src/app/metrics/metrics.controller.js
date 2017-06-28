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
        this.USE_DUMMY_DATA = true;
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
        this.doUpdate = false;


        //chart option template
        this.optionTemplate = {
            credits: {
                enabled: false
            }
        };



        // 1. Initial launch pipeline 
        //      launch -> getData -> loadData -> createChart
        // 2. Drilldown pipeline
        //      drillDown -> getData -> loadData -> createChart
        //      drillDown -> createChart
        // 3. Drill-to-certain-Level pipeline
        //      drillToLevel -> createChart
        // 4. Load-next-page pipeline
        //      chartOnRedraw -> getData -> loadData -> updateChart
        // 5. Date change pipeline
        //      applyDateFilter -> getData -> loadData -> createChart



        //------------------------------------ Pipeline ---------------------------------------------------------------
        this.launch = function (scope) {
            var root = 'Oranj';  // dummy root name, should be returned by Oranj API
            var rootId = -1;
            this.canLoadMore = false;

            this.getData(root, rootId, 0);

            if (this.showDatepicker)
                this.createDatepicker(scope);


            // scope.$watch(function () {
            //     return angular.element(document.getElementById("main")).attr('class');
            // }, function (newValue) {
            //     var chart = MetricsService.self.chart;

            //     if (chart != null) {
            //         setTimeout(function (c) {
            //             c.reflow();
            //         }, 300, chart);
            //     }
            // });
        };

        this.drillDown = function (name, id) {
            this.canLoadMore = false;
            if (this.current_level >= 2) {
                alert('Cannot drilldown anymore!');
                return; //level number overflowed, cannot drilldown anymore
            }

            var new_level = this.current_level + 1;
         

            if (new_level == this.level_list.length) {
                this.getDataForLevel(name, id, 0, new_level);
                return;
            }

            if (name.toString().localeCompare(this.level_list[new_level]['name']) != 0) {
                this.removeFromLevel(new_level);
                this.getDataForLevel(name, id, 0, new_level);
                return;
            }

            if (!this.compareDate(new_level)) {
                this.getDataForLevel(name, id, 0, new_level);
                return;
            }

            this.current_level = new_level;
            this.createChart();

        }

        this.drillToLevel = function (level) {
            this.canLoadMore = false;
            // shouldn't replace the chart until this onClick function terminates
            // it seems that Promise is too faster and still causes error compared to setTimeOut
            // could fix later
            setTimeout(function () {
                if(MetricsService.self.applyDateFilter(level)){
                    MetricsService.self.current_level = level;
                    MetricsService.self.createChart();
                }
            }, 10);
        }

        this.scrollToLoad = function (chart) {
            var self = MetricsService.self;
            if (chart.xAxis) {

                var extremes = chart.xAxis[0].getExtremes();
                if (extremes && extremes.max == extremes.dataMax) {
                    var current_level = self.level_list[self.current_level];
                    var last = current_level['last'];

                    if (last) {
                        return;
                    }

                    if (self.canLoadMore) {
                        self.canLoadMore = false;
                        self.doUpdate = true;
                        self.getDataForPage(current_level['page'] + 1, self.current_level);
                    }
                }
            }
        }

        this.getDataForPage = function (page, level) {
            this.getDataForLevel(this.level_list[this.current_level]['name'], this.level_list[this.current_level]['id'], page, level);
        }

        this.getData = function (name, id, page) {
            this.getDataForLevel(name, id, page, this.current_level);
        }

        this.getDataForLevel = function (name, id, page, level) {
            this.canLoadMore = false;

            this.showLoading();

            var domain = this.DOMAIN;
            var subdomain = this.SUB_DOMAIN;
            var baseUrl;
            var endDate = !this.endDate ? null : this.endDate.toISOString().slice(0, 10);
            var startDate = !this.startDate ? null : this.startDate.toISOString().slice(0, 10);


            // construct url based on current drilldown level
            if (level === 0) {
                baseUrl = domain + subdomain + "/firms?page=" + page;
            } else if (level === 1) {
                baseUrl = domain + subdomain + "/advisors?page=" + page + "&firmId=" + id;
            } else if (level === 2) {
                baseUrl = domain + subdomain + "/clients?page=" + page + "&advisorId=" + id;
            }else{
                console.log("Invalid level!");
                MetricsService.self.hideLoading();
                return;
            }

            baseUrl = !startDate ? baseUrl : baseUrl + "&startDate=" + startDate;
            baseUrl = !endDate ? baseUrl : baseUrl + "&endDate=" + endDate;

            console.log(baseUrl);
            this.getDataFromApi(baseUrl, name, id, page, level);
        }

        this.getDataFromApi = function (newUrl, name, id, page, level) {
            if (this.USE_DUMMY_DATA) {
                this.current_level = level;
                var type;
                if (level === 0) {
                    type = this.data1;
                } else if (level === 1) {
                    type = this.data2;
                } else if (level === 2) {
                    type = this.data3;
                }
                this.loadData(type, name, id, page, false);
                return;
            }

            this.$http.get(newUrl).then(function mySuccess(response) {
                var self = MetricsService.self;
                var type;
                if (level === 0) {
                    type = 'firms';
                } else if (level === 1) {
                    type = 'advisors';
                } else if (level === 2) {
                    type = 'clients';
                }

                self.current_level = level;
                var last = response.data['last'];
                if (self.controllerName.localeCompare("netWorth") === 0) {
                    self.loadData(response.data.data, name, id, page, last);
                } else {
                    self.loadData(response.data[type], name, id, page, last);
                }
            }, function myError(response, error) {
                console.log("Error " + response.status + ": " + response.statusText + "!");
               
                MetricsService.self.hideLoading();
            });
        }

        this.loadData = function (input, name, id, page, last) {

            var currentOptions = {
                chart: this.chartSelector(),
                title: this.titleSelector(name),
                subtitle: this.subtitleSelector(),
                series: this.seriesSelector(input),
                xAxis: this.xAxisSelector(input),
                yAxis: this.yAxisSelector(),
                tooltip: this.tooltipSelector(),
                plotOptions: this.plotOptionsSelector(),
                legend: this.legendSelector()
            };

            currentOptions = Object.assign({}, this.optionTemplate, currentOptions);

            this.createNewLevel(currentOptions, name, id, page, last); // update drilldown level and prepare chart data
            this.createChart(); // update drilldown level and prepare chart data
        }



        this.createChart = function () {
            this.hideLoading();
            
            if (!this.doUpdate) {
                this.chart = Highcharts.chart('chart', this.level_list[this.current_level]['option']);
            } else {
                this.doUpdate = false;
                this.chart.update(this.level_list[this.current_level]['option']);
                this.chartOnLoad(true);
            }

        }


        //------------------------------------ Pipeline helper ---------------------------------------------------------------


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
                zoomType: 'y',
                events: {
                    load: this.chartOnLoad,
                    redraw: this.chartOnRedraw
                },
            }

            return chart;
        }


        this.titleSelector = function (name) {
            var title = {
                text: this.TITLE_TEMPLATE + name,
                y: 30,
                margin: 30
            };

            return title;
        }

        this.subtitleSelector = function () {
            return null;
        }

        this.seriesSelector = function (input) {
            return this.prepareSeries(input);
        }

        this.xAxisSelector = function (input) {
            var xAxis = {
                scrollbar: {
                    enabled: true
                },
                categories: this.prepareCategories(input)
            };
            return xAxis;
        }

        this.yAxisSelector = function () {
            var yAxis = {
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
            }

            return yAxis;
        }

        this.tooltipSelector = function () {
            var tooltip = {
                formatter: this.formatter,
                shared: true
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
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: this.chartOnClick
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
            };

            return plotOptions;
        }

        this.legendSelector = function () {
            var legend = {
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
            }
            return legend;
        }

        // chart onload event
        this.chartOnLoad = function (isUpdated) {
            var self = MetricsService.self;

            

            if (isUpdated === true) {
                self.baseChartOnLoad(this.chart);
             //   self.createPathSelector(this.chart); // create new path selector on top left
            } else {
                self.baseChartOnLoad(this);
                self.createPathSelector(this); // create new path selector on top left

            }

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

        this.chartOnRedraw = function () {
            MetricsService.self.scrollToLoad(this);
        }

        // chart bar onclick event
        this.chartOnClick = function () {
            MetricsService.self.drillDown(this.category, this.id);
        }

        // tooltip formatter
        this.formatter = function () {
            var s = '<b>' + this.x + '</b>';
            this.points.forEach(function (element) {
                //element.hover
                if (!element.y || element.y === 0) {
                    return;
                }
                s += '<br/>' + element.series.name + ': ' + element.y;
            });
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


        //------------------------------------datepicker---------------------------------------------------------------

        this.assignYTD = function () {
            this.startDate = new Date(new Date().getFullYear(), 0, 1);
            this.endDate = new Date();
            this.applyDateFilter(this.current_level);
        }

        this.clearDate = function () {
            
            this.endDate = null;
            this.startDate = null;

            this.applyDateFilter(this.current_level);

        }

        this.checkDate = function () {
            if (this.endDate != null) {
                this.endDate = this.startDate > this.endDate ? this.startDate : this.endDate;
            }

            this.applyDateFilter(this.current_level);
        }

        this.applyDateFilter = function (level) {
            var same = this.compareDate(level);
            if (!same) {
                
                this.getDataForPage(0, level);

            }

            return same;
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










        //---------------------------------- Path Selector -----------------------------------------------------------------
        //path selector
        this.createPathSelector = function (chart) {
            chart.renderer.text("Zoom in by drag & select ", 20, 40).css({ fontSize: '10px' }).add();


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

        }

        //TODO: only show levels that the user is authorized to see
        this.generatePathSelectorHTML = function () {
            var output = "Path:";

            this.level_list.forEach(function (element) {
                output += '<a>' + element['name'] + '</a>' + '>';
            });

            return output.slice(0, -1);
        }





















    };

}
