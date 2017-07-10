angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController)
    .service('LeaderBoardService', LeaderBoardService);

function LeaderBoardService(MetricsService) {
    this.init = function () {
        // most code is written in MetricsController
        var base = new MetricsService();
        // constants
        base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
        base.SUB_DOMAIN = "/bi/goals";
        base.USE_DUMMY_DATA = true;
        base.controllerName = "leaderBoard";
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
                crosshair: false
            };
            return xAxis;
        }

        base.yAxisSelector = function () {
            var yAxis = {
                min: 0,
                title: {
                    text: null
                }
            }

            return yAxis;
        }


        return base;
    }
}


function LeaderBoardController($scope, $mdDialog, LeaderBoardService) {
    var service = LeaderBoardService.init();

   



    var chart_sm = Highcharts.chart('chart-sm', {

        chart: {
            type: 'solidgauge'
        },

        title: {
            text: null
        },

        tooltip: {

            enabled: false
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    y: -40,
                    borderWidth: 0,
                    backgroundColor: 'none',
                    useHTML: true,
                    shadow: false,
                    style: {
                        fontSize: '16px'
                    },
                    formatter: function () {
                        return '<div style="width:100%;text-align:center;"><span style="font-size:1.2em;font-weight:bold;">' + this.point.series.name + '</span><br/><span style="font-size:3em;color:' + Highcharts.getOptions().colors[0] + ';font-weight:bold;">' + Highcharts.numberFormat(this.y / 10, 0) + '</span>';
                    }
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },


        series: [{
            name: 'Move',
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '112%',
                innerRadius: '88%',
                y: 80
            }]
        }, {
            name: 'Exercise',
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '87%',
                innerRadius: '63%',
                y: 65
            }]
        }, {
            name: 'Stand',
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '62%',
                innerRadius: '38%',
                y: 50
            }]
        }]
    });


     this.showChart = function (ev) {


        $mdDialog.show({
            contentElement: '#myDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });


 service.launch($scope);
       

        service.chart.reflow();



        chart_sm.reflow();
    };
}