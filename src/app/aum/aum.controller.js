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
        base.USE_DUMMY_DATA = false;
        base.COLOR_ARRAY = Highcharts.getOptions().colors;
        base.controllerName = "aum";
        base.isRequired = true; //datepicker date required
        base.startDate = new Date(new Date().getFullYear(), 0, 1);
        base.endDate = new Date();
        base.TITLE_TEMPLATE = "Asset Under Management by ";

        base.data1 = {
            "firms": [
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
            ]
        };


        base.data2 = {
            "advisors": [
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
            ]
        };

        base.data3 = {
            "clients": [
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
            ]
        };

        base.subtitleSelector = function () {
            var subtitle = {
                text: "Note: lighter bar - previous quarter, darker bar - current quarter"
            };
            return subtitle;
        }


        // tooltip formatter
        base.formatter = function () {
            var s = '<b>' + this.x + '</b>';

            var currentStack = this.series.userOptions['stackId'];

            this.series.chart.series.forEach(function (series) {
                if (currentStack === series.userOptions['stackId'] && series.data[this.point.index].y) {
                    s += '<br/>' + series.name + ': ' + series.data[this.point.index].y;
                }

            }, this);

            return s;

        }


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
                        if (!aumMaps[p][key]) {
                            aumMaps[p][key] = Array.apply(null, Array(i + 1)).map(Number.prototype.valueOf, 0);
                        }
                        aumMaps[p][key][i] = x[aum][field][key];
                    }
                });

            });

            //make sure legends are complete
            for (var key in aumMaps[0]) {
                if (!aumMaps[1][key]) {
                    aumMaps[1][key] = Array.apply(null, Array(input.length)).map(Number.prototype.valueOf, 0);
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
                            data: dataDrillDown,
                            stack: "stack" + p,
                            color: AUMService.self.COLOR_ARRAY[counter],
                            stackId: p,
                            showInLegend: (p === 0 ? false : true)
                        };
                    series.push(points);
                    counter++;
                }
            });

            return series;
        }

        return base;


    };

}


function AUMController($scope, AUMService) {
    var service = new AUMService();


    this.startDate = service.startDate;
    this.endDate = service.endDate;
    this.today = new Date();
    this.isRequired = service.isRequired;

    this.checkDate = function () {
        service.startDate = this.startDate; // bind data to service
        service.endDate = this.endDate;

        try {
            service.checkDate();
        }
        catch (err) {
            console.log("Error when checking date!");
        }


        this.startDate = service.startDate;
        this.endDate = service.endDate;
    };


    this.assignYTD = function () {
        try {
            service.assignYTD();
        }
        catch (err) {
            console.log("Error when assigning YTD!");
        }

        this.startDate = service.startDate;
        this.endDate = service.endDate;
    }

    this.clearDate = function () {
        try {
            service.clearDate();
        }
        catch (err) {
            console.log("Error when clearing dates!");
        }

        this.startDate = service.startDate;
        this.endDate = service.endDate;

    }

    service.launch($scope);
}
