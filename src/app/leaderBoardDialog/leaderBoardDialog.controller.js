angular
    .module('app')
    .controller('LeaderBoardDialogController', LeaderBoardDialogController)
    .service('LeaderBoardDialogService', LeaderBoardDialogService);

function LeaderBoardDialogService(MetricsService, $mdDialog) {
    LeaderBoardDialogService.self = this;

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


    this.showChart = function (ev) {
       


        var dialogHTML = `
            <md-dialog style="width:720px">
                <div>
                    <div layout="column" >
                        <div layout="row" layout-align="space-around stretch">
                            <h4>title</h4>
                        </div>
                        
                        <div layout="row" layout-align="space-around center">
                         <div flex="25" style="text-align: center;margin:auto">
                                <h1>777 <small>k</small></h1>
                            </div>
    <div style="height:100px;border-left: thin solid #dfdfdf;"></div>
                            
                            <div flex="25" style="text-align: center">
                                <div id="chart-sm" style="height:150px"></div>
                                <h6 style="margin:0">least in state</h6>
                            </div>

                            <div flex="25" style="text-align: center;margin:auto">
                                <h1>777 <small>k</small></h1>
                                <h3>least in state</h3>
                            </div>

                            <div flex="25" style="text-align: center;margin:auto">
                                <h1>777 <small>k</small></h1>
                                <h3>least in state</h3>
                            </div>
                        </div>
                        <div id="chart-lg" layout="row" layout-align="center center" style="max-height:300px;margin:auto"  layout-padding>
                            <div class="loader no-animate primary-loader loader--style3">
                                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    width="40px" height="40px" viewBox="0 0 50 50" style="enable-background: new 0 0 50 50;" xml:space="preserve">
                                    <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"
                                        />
                                    </path>
                                </svg>
                            </div>
                        </div>

                        <md-tabs md-stretch-tabs="always" md-no-pagination="'true'" md-no-ink="'true'" md-no-ink-bar="'true'" style="visibility: hidden;"> 
                            <md-tab label="&nbsp;&nbsp; AUM &nbsp;&nbsp;"></md-tab>
                            <md-tab label="Net Worth" ></md-tab>
                            <md-tab label="# HNIs"></md-tab>
                            <md-tab label="Conv. Rate"></md-tab>
                            <md-tab label="Avg Conv. Time"></md-tab>
                            <md-tab label="Retention Rate"></md-tab>
                            <md-tab label="Goals created"></md-tab>
                            <md-tab label="Annual AUM"></md-tab>
                            <md-tab label="Annual Clientele"></md-tab>
                            <md-tab label="Annual Net Worth"></md-tab>
                        </md-tabs>
                    </div>
                </div>
            </md-dialog>
        `;

        var service = this.init();


        $mdDialog.show({
            controller: LeaderBoardDialogController,
            template: dialogHTML,
            parent: angular.element(document.getElementById('main-container')),
            targetEvent: ev,
            clickOutsideToClose: true,
            onComplete: () => {
                document.getElementsByTagName("md-tabs")[0].style['visibility'] = "";
                document.querySelector("md-tab-item:nth-child(1)").classList.add("tab-one");
                document.querySelector("md-tab-item:nth-child(2)").classList.add("tab-one");
                document.querySelector("md-tab-item:nth-child(3)").classList.add("tab-one");

                document.querySelector("md-tab-item:nth-child(4)").classList.add("tab-two");
                document.querySelector("md-tab-item:nth-child(5)").classList.add("tab-two");
                document.querySelector("md-tab-item:nth-child(6)").classList.add("tab-two");
                document.querySelector("md-tab-item:nth-child(7)").classList.add("tab-two");

                document.querySelector("md-tab-item:nth-child(8)").classList.add("tab-three");
                document.querySelector("md-tab-item:nth-child(9)").classList.add("tab-three");
                document.querySelector("md-tab-item:nth-child(10)").classList.add("tab-three");
                
                LeaderBoardDialogService.self.createRingChart();
                service.launch();
                service.chart.reflow();
                
            }
        });

        var colorTheme = {
            colors: ["#007E6A"]
        };

        

        Highcharts.setOptions(colorTheme);

    };

    this.createRingChart = function () {
        var chart_sm = Highcharts.chart('chart-sm', {
            credits: {
                enabled: false
            },
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
            }]
        });

        //      chart_sm.reflow();

    }
}


function LeaderBoardDialogController($scope, LeaderBoardDialogService) {

}