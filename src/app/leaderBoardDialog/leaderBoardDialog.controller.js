angular
    .module('app')
    .service('LeaderBoardDialogService', LeaderBoardDialogService);

function LeaderBoardDialogService(MetricsService, $mdDialog) {
    LeaderBoardDialogService.self = this;

    var dialogHTML = `
            <md-dialog style="width:900px;overflow: visible">
                <div id="dialog-content" style="position: relative;visibility: hidden;">
                
                    <div id="tag" class="md-whiteframe-2dp {{tabInfo[currentTab].color}}">
                        <h4 style="margin:0"><b>{{tabInfo[currentTab].title}}</b></h4>
                    </div>


                    <div layout="column" >
                        <div layout="row" layout-align="end center"  layout-padding>
                            <div>
                                <h1 style="margin:0">777 <small>k</small></h1>
                            </div>
                        </div>
                        
                        <div layout="row" layout-align="space-between center"  layout-padding>

                         
                            <div flex="40" layout="column" layout-align="center center" >
                                <div style="text-align: center">
                                    <h6>Overall</h6>
                                </div>
                                <div id="chart-overall" style="height:200px;width:300px"></div>
                                
                                <div layout="row" layout-align="space-between center"  layout-margin>
                                    <div flex="50" style="text-align: center">
                                        <h3 style="margin:0">111 <small>k</small></h3>
                                        <h6>least</h6>
                                    </div>

                                    <div style="height:50px;border-right: thin solid #dfdfdf;">
                                    </div>
                         

                                    <div flex="50" style="text-align: center">
                                        <h3 style="margin:0">999 <small>k</small></h3>
                                        <h6>most</h6>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div flex="30" layout="column" layout-align="center center" >
                                <div style="text-align: center">
                                    <h6>State</h6>
                                </div>
                                <div id="chart-state" style="height:200px;width:200px"></div>
                                
                                <div layout="row" layout-align="space-between center"  layout-margin>
                                    <div flex="50" style="text-align: center">
                                        <h3 style="margin:0">111 <small>k</small></h3>
                                        <h6>least</h6>
                                    </div>

                                    <div style="height:50px;border-right: thin solid #dfdfdf;">
                                    </div>
                         

                                    <div flex="50" style="text-align: center">
                                        <h3 style="margin:0">999 <small>k</small></h3>
                                        <h6>most</h6>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div flex="30" layout="column" layout-align="center center" >
                                <div style="text-align: center">
                                    <h6>Firm</h6>
                                </div>
                                <div id="chart-firm" style="height:200px;width:200px"></div>
                                
                                <div layout="row" layout-align="space-between center"  layout-margin>
                                    <div flex="50" style="text-align: center">
                                        <h3 style="margin:0">111 <small>k</small></h3>
                                        <h6>least</h6>
                                    </div>

                                    <div style="height:50px;border-right: thin solid #dfdfdf;">
                                    </div>
                         

                                    <div flex="50" style="text-align: center">
                                        <h3 style="margin:0">999 <small>k</small></h3>
                                        <h6>most</h6>
                                    </div>
                                </div>
                                
                            </div>

                           
                        </div>


                       
                            

                        <md-tabs md-stretch-tabs="always" md-no-pagination="'true'" md-no-ink="'true'" md-no-ink-bar="'true'" > 
                            <md-tab label="AUM" md-on-select="tabOnSelected(0)"></md-tab>
                            <md-tab label="Net Worth" md-on-select="tabOnSelected(1)"></md-tab>
                            <md-tab label="# HNIs" md-on-select="tabOnSelected(2)"></md-tab>
                            <md-tab label="Conv. Rate" md-on-select="tabOnSelected(3)"></md-tab>
                            <md-tab label="Avg Conv. Time" md-on-select="tabOnSelected(4)"></md-tab>
                            <md-tab label="Retention Rate" md-on-select="tabOnSelected(5)"></md-tab>
                            <md-tab label="Goals created" md-on-select="tabOnSelected(6)"></md-tab>
                            <md-tab label="Annual AUM" md-on-select="tabOnSelected(7)"></md-tab>
                            <md-tab label="Annual Clientele" md-on-select="tabOnSelected(8)"></md-tab>
                            <md-tab label="Annual Net Worth" md-on-select="tabOnSelected(9)"></md-tab>
                        </md-tabs>
                    </div>
                </div>
            </md-dialog>
        `;


    this.init = function ($scope) {
        var colorTheme = {
            colors: ["#007E6A"]
        };
        Highcharts.setOptions(colorTheme);

        $scope.tabInfo = [
            { title: "Asset Under Management", color: "tag-one" },
            { title: "Net Worth", color: "tag-one" },
            { title: "Number of HNIs", color: "tag-one" },
            { title: "Convertion Rate", color: "tag-two" },
            { title: "Average Convertion Time", color: "tag-two" },
            { title: "Retention Rate", color: "tag-two" },
            { title: "Weekly Client Logins", color: "tag-two" },
            { title: "Annualized AUM Growth", color: "tag-three" },
            { title: "Annualized Clientele Growth", color: "tag-three" },
            { title: "Annualized Worth Growth", color: "tag-three" }
        ];

        $scope.currentTab = 0;

        $scope.tabOnSelected = function (tab) {
            $scope.currentTab = tab;
            LeaderBoardDialogService.self.loadData(tab);
        };
    }


    this.loadData = function (tab) {
        this.createAreaChart('chart-overall', 10, 'test_us', true);
        this.createAreaChart('chart-state', 30, 'test_state');
        this.createAreaChart('chart-firm', 80, 'test_firm');

    }


    this.showChart = function (ev) {

        $mdDialog.show({
            controller: LeaderBoardController,
            template: dialogHTML,
            parent: angular.element(document.getElementById('main-container')),
            targetEvent: ev,
            clickOutsideToClose: true,
            onComplete: () => {
                LeaderBoardDialogService.self.loadData(0);


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




                document.getElementById("dialog-content").style['visibility'] = "";

            }
        });


    };

    this.createAreaChart = function (id, value, img, isRectangle) {
        var x = isRectangle ? 300 : 200;
        var y = isRectangle ? 200 : 200;

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
                    borderColor: 'white',
                    borderWidth: 0,
                    pointWidth: x,
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                data: [value]
            }]
        }, function (chart) { // on complete
            chart.renderer.image('/assets/images/' + img + '.png', 0, 0, x + 1, y + 1).attr({ zIndex: 3 }).add();
            chart.renderer.text(value + '%', x / 2, y / 2).attr({ 'text-anchor': 'middle', zIndex: 4 }).css({ stroke: '#007E6A', fill: 'white', 'font-size': '3em', 'font-weight':'bold'}).add();
        });
    }

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
                name: 'Top',
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
