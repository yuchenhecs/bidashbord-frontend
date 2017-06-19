import { MetricsController } from '../metrics/metrics.controller';

export class AUMController extends MetricsController {
    constructor($http, $scope) {
        'ngInject';
        super($http, $scope);

        // constants
        this.SUB_DOMAIN = "/aum";
        this.USE_DUMMY_DATA = true;
        this.COLOR_ARRAY = Highcharts.getOptions().colors;

        this.halfSeriesNum = 0;

        this.data1 = [{
            "firmId": 801,
            "name": "byall",
            "total": 2,
            "aumDiff": [{
                "date": "2017-04-01",
                "types": {
                    "US Bond": 50000,
                    "US Stocks": 2500,
                    "Cash": 70000
                }
            },
            {
                "date": "2017-06-06",
                "types": {
                    "US Bond": 45000,
                    "US Stocks": 3000,
                    "Cash": 80000
                }
            }
            ]
        },
        {
            "firmId": 283,
            "name": "mattfirm",
            "total": 9,
            "aumDiff": [{
                "date": "2017-04-01",
                "types": {
                    "US Bond": 20000,
                    "US Stocks": 2900,
                    "Cash": 10000
                }
            },
            {
                "date": "2017-06-06",
                "types": {
                    "US Bond": 95000,
                    "US Stocks": 3200,
                    "Cash": 100000
                }
            }
            ]
        }
        ];


        this.data2 = [{
            "advisorId": 801,
            "name": "byall",
            "total": 2,
            "aumDiff": [{
                "date": "2017-04-01",
                "types": {
                    "US Bond": 50000,
                    "US Stocks": 2500,
                    "Cash": 700
                }
            },
            {
                "date": "2017-06-06",
                "types": {
                    "US Bond": 45000,
                    "US Stocks": 3000,
                    "Cash": 800
                }
            }
            ]
        },
        {
            "advisorId": 283,
            "name": "mattfirm",
            "total": 9,
            "aumDiff": [{
                "date": "2017-04-01",
                "types": {
                    "US Bond": 50000,
                    "US Stocks": 2500,
                    "Cash": 700
                }
            },
            {
                "date": "2017-06-06",
                "types": {
                    "US Bond": 45000,
                    "US Stocks": 3000,
                    "Cash": 80000
                }
            }
            ]
        }
        ];

        this.data3 = [{
            "clientId": 801,
            "name": "byall",
            "total": 2,
            "aumDiff": [{
                "date": "2017-04-01",
                "types": {
                    "US Bond": 50000,
                    "US Stocks": 2500,
                    "Cash": 70000
                }
            },
            {
                "date": "2017-06-06",
                "types": {
                    "US Bond": 45000,
                    "US Stocks": 3000,
                    "Cash": 80000
                }
            }
            ]
        },
        {
            "clientId": 283,
            "name": "mattfirm",
            "total": 9,
            "aumDiff": [{
                "date": "2017-04-01",
                "types": {
                    "US Bond": 52000,
                    "US Stocks": 2000,
                    "Cash": 50000
                }
            },
            {
                "date": "2017-06-06",
                "types": {
                    "US Bond": 49000,
                    "US Stocks": 1000,
                    "Cash": 100000
                }
            }
            ]
        }
        ];




        // tooltip formatter
        var formatter = function () {
            var s = '<b>' + this.x + '</b>';

            var currentStack = this.series.userOptions['stackId'];

            this.series.chart.series.forEach(function (series) {
                //console.log(series);
                if (currentStack == series.userOptions['stackId']) {
                    s += '<br/>' + series.name + ': ' + series.processedYData[this.point.index];
                }

            }, this);

            return s;

        }

        // chart onload event
        var chartOnLoad = function (event) {
            AUMController.self.baseChartOnLoad(this);

            for (var i = 0; i <= AUMController.self.halfSeriesNum; i++) {
                var hex = this.series[i].color;
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


                this.series[i].update({
                    color: colorCode
                });

            }


        }

        this.optionTemplate.chart.events.load = chartOnLoad;
        this.optionTemplate.tooltip['shared'] = false;
        this.optionTemplate.tooltip['formatter'] = formatter;
        this.optionTemplate['subtitle'] = {
            text: "Note: lighter bar - previous quarter, darker bar - current quarter",
            y: 50
        };

        this.optionTemplate.legend['y'] = 60;

        this.launch();
    }


    //aumDiffs
    prepareSeries(input) {
        this.halfSeriesNum = input.length;
        var aumMaps = [];
        // for each of firms, advisors or clients
        input.forEach(function (x, i) {
            var aums = x['aumDiff'];
            // for each of the periods
            aums.forEach(function (aum, p) {
                while (aumMaps.length < p + 1) {
                    aumMaps.push([]);
                }

                // each asset
                for (var key in aum['types']) {
                    if (aumMaps[p][key] == null) {
                        aumMaps[p][key] = [];
                    }

                    // add zero paddings to place data on the correct columns
                    var j = aumMaps[p][key].length;

                    while (j < i) {
                        aumMaps[p][key].push(0);
                        j++;
                    }
                    aumMaps[p][key].push(aum['types'][key]);

                }
            });

        });
        // combine all points for each series into lists
        var series = [];

        aumMaps.forEach(function (aumMap, p) {
            var counter = 0;
            for (var key in aumMap) {
                var dataDrillDown = aumMap[key].map(function (x, i) {
                    var self = MetricsController.self;
                    var name = 'firmId';
                    if (self.current_level == -1) {
                        name = 'firmId';
                    } else if (self.current_level == 0) {
                        name = 'advisorId';
                    } else if (self.current_level == 1) {
                        name = 'clientId'
                    }
                    return { id: input[i][name], y: x };
                });
                var points =
                    {
                        name: key,
                        data: dataDrillDown,
                        stack: "stack" + p,
                        color: AUMController.self.COLOR_ARRAY[counter],
                        stackId: p,
                        showInLegend: (p == 0 ? false : true)
                    };
                series.push(points);
                counter++;
            }
        });


        return series;
    }
}
