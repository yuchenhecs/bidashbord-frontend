angular
    .module('app')
    .controller('AUMController', AUMController)
    .factory('AUMService', AUMService);

function AUMService($http, MetricsService) {
    return function () {
        var base = new MetricsService();
        AUMService.self = base;
        // constants
        base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
        base.SUB_DOMAIN = "/bi/aums";
        base.USE_DUMMY_DATA = true;
        base.COLOR_ARRAY = Highcharts.getOptions().colors;
        base.controllerName = "aum";
        base.isRequired = true;
        base.startDate = new Date(new Date().getFullYear(), 0, 1);
        base.endDate = new Date();
        base.test = 111;

        base.data1 = [
            {
                "firmId": 283,
                "name": "mattfirm",
                "previous": {
                    "date": "2017-06-12",
                    "total": null,
                    "assetClass": {
                        "US Bond": 17292,
                        "Non US Stock": 20529.6,
                        "US Stock": 24773.06,
                        "Cash": 28150.9,
                        "Other": 9543.31
                    }
                },
                "current": {
                    "date": "2017-06-12",
                    "total": 304229.27,
                    "assetClass": {
                        "US Bond": 7292.4,
                        "Non US Stock": 20529.6,
                        "US Stock": 247713.06,
                        "Cash": 18150.9,
                        "Other": 10543.31
                    }
                }
            },
            {
                "firmId": 509,
                "name": "auto",
                "previous": {
                    "date": "2017-06-12",
                    "total": null,
                    "assetClass": {}
                },
                "current": {
                    "date": "2017-06-12",
                    "total": 133576.06,
                    "assetClass": {
                        "US Stock": 114459.75,
                        "Cash": 1031.1,
                        "Other": 18085.21
                    }
                }
            }
        ];


        base.data2 = [
            {
                "firmId": 283,
                "name": "mattfirm",
                "previous": {
                    "date": "2017-06-12",
                    "total": null,
                    "assetClass": {
                        "US Bond": 222.4,
                        "Non US Stock": 33.6,
                        "US Stock": 232.06,
                        "Cash": 77.9,
                        "Other": 88.31
                    }
                },
                "current": {
                    "date": "2017-06-12",
                    "total": 304229.27,
                    "assetClass": {
                        "US Bond": 123.4,
                        "Non US Stock": 312.6,
                        "US Stock": 411.06,
                        "Cash": 11.9,
                        "Other": 33.31
                    }
                }
            },
            {
                "firmId": 509,
                "name": "auto",
                "previous": {
                    "date": "2017-06-12",
                    "total": null,
                    "assetClass": {
                        "US Bond": 1222.4,
                        "Non US Stock": 233.6,
                        "US Stock": 232.06,
                        "Cash": 177.9,
                        "Other": 188.31
                    }
                },
                "current": {
                    "date": "2017-06-12",
                    "total": 133576.06,
                    "assetClass": {
                        "US Stock": 233.75,
                        "Cash": 444.1,
                        "Other": 777.21
                    }
                }
            }
        ];

        base.data3 = [
            {
                "firmId": 283,
                "name": "mattfirm",
                "previous": {
                    "date": "2017-06-12",
                    "total": null,
                    "assetClass": {
                        "US Bond": 89.4,
                        "Non US Stock": 89.6,
                        "US Stock": 78.06,
                        "Cash": 99.9,
                        "Other": 9.31
                    }
                },
                "current": {
                    "date": "2017-06-12",
                    "total": 304229.27,
                    "assetClass": {
                        "US Bond": 89.4,
                        "Non US Stock": 111.6,
                        "US Stock": 22.06,
                        "Cash": 33.9,
                        "Other": 88.31
                    }
                }
            },
            {
                "firmId": 509,
                "name": "auto",
                "previous": {
                    "date": "2017-06-12",
                    "total": null,
                    "assetClass": {}
                },
                "current": {
                    "date": "2017-06-12",
                    "total": 99.06,
                    "assetClass": {
                        "US Stock": 99.75,
                        "Cash": 88.1,
                        "Other": 66.21
                    }
                }
            }
        ];




        // tooltip formatter
        var formatter = function () {
            var s = '<b>' + this.x + '</b>';

            var currentStack = this.series.userOptions['stackId'];

            this.series.chart.series.forEach(function (series) {
                if (currentStack == series.userOptions['stackId'] && series.processedYData[this.point.index] != undefined) {
                    s += '<br/>' + series.name + ': ' + series.processedYData[this.point.index];
                }

            }, this);

            return s;

        }



        var chartOnRedraw = function (event) {
            var self = AUMService.self;

            if (this.xAxis) {

                var extremes = this.xAxis[0].getExtremes();
                if (extremes && extremes.max == extremes.dataMax) {
                    var current_level = self.level_list[self.current_level];
                    var last = current_level['last'];

                    if (!last) { // it's actually hasNext
                        return;
                    }

                    if (self.canLoadMore) {
                        self.canLoadMore = false;
                        self.getData(current_level['name'], current_level['id'], current_level['page'] + 1);
                    }
                }
            }

        }

        base.optionTemplate.chart.events.redraw = chartOnRedraw;

        base.optionTemplate.tooltip['shared'] = false;
        base.optionTemplate.tooltip['formatter'] = formatter;
        base.optionTemplate['subtitle'] = {
            text: "Note: lighter bar - previous quarter, darker bar - current quarter",
            y: 50
        };

        base.optionTemplate.legend['y'] = 60;


        // chart onload event
        base.chartOnLoad = function () {
            var self = AUMService.self;
            var chart = this.chart;
            self.baseChartOnLoad(chart);

            // lighten the color of previous date bar
            chart.series.forEach(function (x) {

                if (x.options.stackId == 1) {
                    return;
                }
                var hex = x.color;
                var percent = 50;

                // increase brightness
                var colorCode;

                // strip the leading # if it's there
                hex = hex.replace(/^\s*#|\s*$/g, '');

                // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
                if (hex.length == 3) {
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

            //unlock scroll to load
            self.canLoadMore = true;
        }



        base.getData = function (name, id, page) {

            this.canLoadMore = false; // lock the chartOnRedraw scroll-to-load function

            this.showLoading();

            var domain = this.DOMAIN;
            var subdomain = this.SUB_DOMAIN;
            var baseUrl;
            var currentDate = this.endDate.toISOString().slice(0, 10);
            var previousDate = this.startDate.toISOString().slice(0, 10);

            // construct url based on current drilldown level
            if (this.current_level == 0) {
                baseUrl = domain + subdomain + "/firms?page=" + page + "&previousDate=" + previousDate + "&currentDate=" + currentDate;
            } else if (this.current_level == 1) {
                baseUrl = domain + subdomain + "/advisors?page=" + page + "&firmId=" + id + "&previousDate=" + previousDate + "&currentDate=" + currentDate;
            } else if (this.current_level == 2) {
                baseUrl = domain + subdomain + "/clients?page=" + page + "&advisorId=" + id + "&previousDate=" + previousDate + "&currentDate=" + currentDate;
            }

            console.log(baseUrl);
            this.getDataFromApi(baseUrl, name, id, page);
        }

        base.getDataFromApi = function (newUrl, name, id, page) {
            if (this.USE_DUMMY_DATA) {
                var type;
                if (this.current_level == 0) {
                    type = this.data1;
                } else if (this.current_level == 1) {
                    type = this.data2;
                } else if (this.current_level == 2) {
                    type = this.data3;
                }

                this.loadData(type, name, id, page, true);
                if (page == 0) {
                    this.createChart();
                } else {
                    this.hideLoading();
                    this.chart.update(this.level_list[this.current_level]['option']);
                }
                this.chartOnLoad();
                return;
            }

            this.$http.get(newUrl).then(function mySuccess(response) {
                var self = AUMService.self;
                var type;
                if (self.current_level == 0) {
                    type = 'firms';
                } else if (self.current_level == 1) {
                    type = 'advisors';
                } else if (self.current_level == 2) {
                    type = 'clients';
                }

                var last = response.data.data['hasNext'];
                self.loadData(response.data.data[type], name, id, page, last);

                if (page == 0) { // create new chart	
                    self.createChart();
                } else {// append to existing chart
                    self.hideLoading();
                    self.chart.update(self.level_list[self.current_level]['option']);
                }
                self.chartOnLoad();
            }, function myError(response, error) {
                console.log("Error " + response.status + ": " + response.statusText + "!");
                AUMService.self.hideLoading();
            });
        }

        //construct categories data for chart template
        base.prepareCategories = function (input) {
            var categories = input.map(function (x) {
                var self = AUMService.self;
                var name = x['name'];
                if (self.current_level == 0) {
                    name = x['name'];
                } else if (self.current_level == 1) {
                    name = x['name'];
                    //name = x['firstName'] + " " + x['lastName'];
                } else if (self.current_level == 2) {
                    name = x['name'];
                    //name = x['firstName'] + " " + x['lastName'];
                }
                return name;
            });

            var output = [];
            categories.forEach(function (x) {
                output.push(x);
            });

            return output;
        }

        //aumDiffs
        base.prepareSeries = function (input) {
            var aums = ['previous', 'current'];
            var aumMaps = Array.apply(null, Array(aums.length)).map(function () { return {}; }); // [{prev_map},{curr_map}]
            // for each of firms, advisors or clients
            input.forEach(function (x, i) {
                // for each of the periods
                aums.forEach(function (aum, p) {
                    // add zero paddings to place data on the correct column
                    for (var category in aumMaps[p]) {
                        aumMaps[p][category].push(0);
                    }

                    // each asset
                    var field = 'assetClass';
                    for (var key in x[aum][field]) {
                        if (aumMaps[p][key] == null) {
                            aumMaps[p][key] = Array.apply(null, Array(i + 1)).map(Number.prototype.valueOf, 0);
                        }
                        aumMaps[p][key][i] = x[aum][field][key];
                    }
                });

            });

            //make sure both period have the same categories
            for (var key in aumMaps[0]) {
                if (aumMaps[1][key] == null) {
                    aumMaps[1][key] = Array.apply(null, Array(input.length)).map(Number.prototype.valueOf, 0);
                }
            }

            for (var key in aumMaps[1]) {
                if (aumMaps[0][key] == null) {
                    aumMaps[0][key] = Array.apply(null, Array(input.length)).map(Number.prototype.valueOf, 0);
                }
            }



            // combine all points for each series into lists
            var series = [];

            aumMaps.forEach(function (aumMap, p) {
                var counter = 0;
                for (var key in aumMap) {
                    var dataDrillDown = aumMap[key].map(function (x, i) {
                        var self = AUMService.self;
                        var name = 'firmId';
                        if (self.current_level == 0) {
                            name = 'firmId';
                        } else if (self.current_level == 1) {
                            name = 'advisorId';
                        } else if (self.current_level == 2) {
                            name = 'clientId'
                        }

                        return { id: input[i][name], y: x };
                    });
                    var points =
                        {
                            name: key,
                            data: dataDrillDown,
                            stack: "stack" + p,
                            color: AUMService.self.COLOR_ARRAY[counter],
                            stackId: p,
                            showInLegend: (p == 0 ? false : true)
                        };
                    series.push(points);
                    counter++;
                }
            });

            return series;
        }


        base.mergeOption = function (options) {
            // assume we are expanding the current chart 
            var originalCategories = this.level_list[this.current_level]['option']['xAxis']['categories'];

            var originalLength = originalCategories.length;
            var newLength = options['xAxis']['categories'].length;

            options['xAxis']['categories'] = originalCategories.concat(options['xAxis']['categories']);

            var originalSeries = this.level_list[this.current_level]['option']['series'];
            var newSeries = options['series'];

            var seriesMap = Array.apply(null, Array(2)).map(function () { return {}; });;

            // 1. initialize seriesMap with originalSeries
            originalSeries.forEach(function (element) {
                seriesMap[element['stackId']][element['name']] = element;
            });

            // 2. append newSeries
            newSeries.forEach(function (element) {
                if (seriesMap[element['stackId']][element['name']] == null) {
                    var zeroPaddings = Array.apply(null, Array(originalLength)).map(Number.prototype.valueOf, 0);
                    seriesMap[element['stackId']][element['name']]['data'] = zeroPaddings.concat(element['data']);
                } else {
                    seriesMap[element['stackId']][element['name']]['data'] = seriesMap[element['stackId']][element['name']]['data'].concat(element['data']);

                }
            });

            // 3. fill the rest of originalSeries with zeros
            originalSeries.forEach(function (element) {
                if (seriesMap[element['stackId']][element['name']]['data'].length < originalLength + newLength) {
                    var zeroPaddings = Array.apply(null, Array(newLength)).map(Number.prototype.valueOf, 0);
                    seriesMap[element['stackId']][element['name']]['data'] = seriesMap[element['stackId']][element['name']]['data'].concat(zeroPaddings);
                }
            });


            options['series'] = Object.values(seriesMap[0]).concat(Object.values(seriesMap[1]));
            return options;
        }


        return base;


    };

}


function AUMController($scope, AUMService) {
    var aum = new AUMService();
   
    this.startDate = aum.startDate;
    this.endDate = aum.endDate;
    this.today = new Date();
    this.isRequired = aum.isRequired;

    this.checkDate = function () {
        aum.startDate = this.startDate; // bind data to service
        aum.endDate = this.endDate;

        aum.checkDate();

        this.startDate = aum.startDate;
        this.endDate = aum.endDate;
    };


    this.assignYTD = function () {
        this.startDate = new Date(new Date().getFullYear(), 0, 1);
        this.endDate = new Date();
        aum.startDate = this.startDate; // bind data to service
        aum.endDate = this.endDate;
        aum.applyDateFilter();
    }

    this.clearDate = function () {
        this.endDate = null;
        this.startDate = null;
        aum.startDate = this.startDate; // bind data to service
        aum.endDate = this.endDate;

        aumapplyDateFilter();

    }
    aum.launch($scope);
}