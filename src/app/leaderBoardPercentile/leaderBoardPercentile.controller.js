angular
    .module('app')
    .service('LeaderBoardPercentileService', LeaderBoardPercentileService);


function LeaderBoardPercentileService(MetricsService) {
    this.init = function(){
        // most code is written in MetricsController
        var base = new MetricsService();
        // constants
        base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
        base.SUB_DOMAIN = "/bi/goals";
        base.USE_DUMMY_DATA = true;
        base.controllerName = "percentile";

        base.showDatepicker = false;
        base.chart_id = 'chart-lg';


        base.data1 = {
            "firms": [{
                "name": "firm 1",
                "total": 40,
                "goals": {
                    "custom": 3,
                    "college": 8,
                    "retirement": 15,
                    "insurance": 4,
                    "home": 10
                }
            },
            {
                "total": 25,
                "name": "firm 2",
                "goals": {
                    "custom": 3,
                    "college": 8,
                    "retirement": 0,
                    "insurance": 4,
                    "home": 10
                }
            },
            {
                "total": 34,
                "name": "firm 3",
                "goals": {
                    "custom": 3,
                    "College": 2,
                    "retirement": 15,
                    "insurance": 4,
                    "home": 10
                }
            }]
        };

        //construct series data for chart template
        base.prepareSeries = function (input) {
            return [{
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }];
        }

        base.chartSelector = function () {
            var chart = {
                type: 'spline'
            }
            return chart;
        }

        base.legendSelector = function () {
            var legend = {
                enabled: false
            }
            return legend;
        }

        base.xAxisSelector = function (input) {
            var xAxis = {
                crosshair: false,
                tickLength: 0
            };
            return xAxis;
        }

        base.yAxisSelector = function () {
            var yAxis = {
                min: 0,
                title: {
                    text: null
                },
                visible: false
            }

            return yAxis;
        }
    
    
        base.titleSelector = function (name) {

            var title = {
                text: null
            };

            return title;
        }



        var colorTheme = {
            colors: ["#007E6A"]
        };

        Highcharts.setOptions(colorTheme);

        return base;
    }

}