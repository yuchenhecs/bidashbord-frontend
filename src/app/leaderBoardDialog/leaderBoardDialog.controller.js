angular
    .module('app')
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
        var service = this.init();

        var dialogHTML = `
            <md-dialog style="width:720px;overflow: visible">
                <div id="dialog-content" style="position: relative;visibility: hidden;">
                    <div id="tag" class="md-whiteframe-2dp">
                        <h4 style="margin:0">Asset Under Management</h4>
                    </div>


                    <div layout="column" >
                        <div layout="row" layout-align="end center"  layout-padding>
                            <div>
                                <h2 style="margin:0">777 <small>k</small></h2>
                            </div>
                        </div>
                        
                        <div layout="row" layout-align="space-between center"  layout-padding>

                            <div flex="15" style="text-align: center;margin:auto">
                                <h4>Overall</h4>
                            </div>

                            <div style="height:100px;border-right: thin solid #dfdfdf;">
                            </div>
                         
                            <div flex="25">
                                <div id="chart-overall" style="height:120px;width:120px"></div>
                                
                                
                            </div>

                            <div flex="30" style="text-align: center;margin:auto">
                                <h1>777 <small>k</small></h1>
                                <h3>least in state</h3>
                            </div>

                            <div flex="30" style="text-align: center;margin:auto">
                                <h1>777 <small>k</small></h1>
                                <h3>least in state</h3>
                            </div>
                        </div>


                        <div layout="row" layout-align="space-around center"  layout-padding>
                            <div flex="15" style="text-align: center;margin:auto">
                                <h4>State</h4>
                            </div>

                            <div style="height:100px;border-right: thin solid #dfdfdf;">
                            </div>
                         
                            <div flex="25" style="text-align: center">
                                <div id="chart-state" style="height:120px"></div>
                            </div>

                            <div flex="30" style="text-align: center;margin:auto">
                                <h1>777 <small>k</small></h1>
                                <h3>least in state</h3>
                            </div>

                            <div flex="30" style="text-align: center;margin:auto">
                                <h1>777 <small>k</small></h1>
                                <h3>least in state</h3>
                            </div>
                        </div>

                      


                        <div layout="row" layout-align="space-around center"  layout-padding>
                            <div flex="15" style="text-align: center;margin:auto">
                                <h4>Firm</h4>
                            </div>

                            <div style="height:100px;border-right: thin solid #dfdfdf;">
                            </div>
                         
                            <div flex="25" style="text-align: center">
                                <div id="chart-firm" style="height:120px"></div>
                            </div>

                            <div flex="30" style="text-align: center;margin:auto">
                                <h1>777 <small>k</small></h1>
                                <h3>least in state</h3>
                            </div>

                            <div flex="30" style="text-align: center;margin:auto">
                                <h1>777 <small>k</small></h1>
                                <h3>least in state</h3>
                            </div>
                        </div>
                            

                        <md-tabs md-stretch-tabs="always" md-no-pagination="'true'" md-no-ink="'true'" md-no-ink-bar="'true'" > 
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

        $mdDialog.show({
            controller: LeaderBoardController,
            template: dialogHTML,
            parent: angular.element(document.getElementById('main-container')),
            targetEvent: ev,
            clickOutsideToClose: true,
            onComplete: () => {

                document.getElementById("tag").classList.add("tag-one");

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

                LeaderBoardDialogService.self.createAreaChart('chart-overall');
                LeaderBoardDialogService.self.createRingChart('chart-state');
                LeaderBoardDialogService.self.createRingChart('chart-firm');


                document.getElementById("dialog-content").style['visibility'] = "";

            }
        });



        var colorTheme = {
            colors: ["#007E6A"]
        };

        Highcharts.setOptions(colorTheme);
    };

    this.createAreaChart = function (id) {
        Highcharts.chart(id, {
            credits: {
                enabled: false
            },
            chart: {
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                    .setOpacity(0.2)
                    .get(),
                type: 'column',
                margin: [0, 0, 0, 0]
            },
            title: {
                text: null
            },
            legend: {
                enabled: false
            },
            xAxis: {
                visible: false
            },
            yAxis: {
                min: 0,
                max: 100,
                visible: false
            },
            plotOptions: {
                series: {
                    enableMouseTracking: false,
                    borderWidth: 0,
                    pointWidth: 120,
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                data: [50]
            }]
        }, function (chart) { // on complete
            chart.renderer.image('/assets/images/test.png', 0, 0, 123, 120).attr({zIndex: 3}).add();
            chart.renderer.text('asdasdasdas', 60, 60).attr({'text-anchor': 'middle', zIndex: 4}).add();
            
        });


    }

    // <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="height:120px;width:120px">
    //                                 <rect width="100" height="100" style="fill:rgba(0,126,106,0.2)" />         
    //                                 <rect y="20" width="100" height="100" style="fill:rgb(0,126,106)" />       
    //                                 <image id="stateImg" xlink:href="" height="100" width="100"/>    
    //                                 <text text-anchor="middle" x="50" y="50">asdasdasdas</text>
    //                             </svg>

    this.createRingChart = function (id) {
        Highcharts.chart(id, {
            credits: {
                enabled: false
            },
            chart: {
                type: 'solidgauge',
                margin: [0, 0, 0, 0]
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
                    outerRadius: '115%',
                    innerRadius: '100%',
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
                            fontSize: '12px'
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
                    radius: '115%',
                    innerRadius: '100%',
                    y: 80
                }]
            }]
        });

        //      chart_sm.reflow();

    }
}
