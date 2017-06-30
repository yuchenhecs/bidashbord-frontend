angular
    .module('app')
    .controller('LoginsController', LoginsController)
    .factory('LoginsService', LoginsService);

function LoginsService(MetricsService) {
    return function () {
        // most code is written in MetricsController

        var base = new MetricsService();
        LoginsService.self = base;
        // constants
        base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
        base.SUB_DOMAIN = "/bi/logins";
        base.USE_DUMMY_DATA = true;
        base.controllerName = "logins";
        base.showDatepicker = false;
        base.startDate = null;
        base.endDate = null;

        base.isWeek = true;
        base.isProspect = true;


        base.data1 = {
            "totalFirms": 599,
            "unit": "minute/hour",
            "Page": 0,
            "hasNext": true,
            "firms": [
                {
                    "firmId": 801,
                    "name": "Yuchen Firm",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 2,
                },
                {
                    "firmId": 801,
                    "name": "Yuchen Firm",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 3.4,
                }
            ]
        };


        base.data2 = {
            "totalAdvisors": 599,
            "unit": "minute/hour",
            "Page": 0,
            "hasNext": true,
            "advisors": [
                {
                    "advisorId": 801,
                    "name": "Robert",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 2,
                },
                {
                    "advisorId": 801,
                    "name": "Robert",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 2,
                }
            ]
        };


        base.data3 = {
            "totalClients": 599,
            "unit": "minute/hour",
            "Page": 0,
            "hasNext": true,
            "clients": [
                {
                    "clientId": 801,
                    "name": "Robert",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 2
                },
                {
                    "clientId": 801,
                    "name": "Robert",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 2
                }
            ]
        };


        //---------------------------------- Pipeline -----------------------------------------------------------------

        base.checkRange = function (range) {
            if (this.isWeek === range) {

            }
            setTimeout(function () {
                var self = LoginsService.self;
                self.getDataForPage(0, self.current_level, range, self.isProspect);
            }, 10);
        }

        base.checkUserType = function () {
            setTimeout(function () {
                var self = LoginsService.self;
                self.getDataForPage(0, self.current_level, self.isWeek, self.isProspect);
            }, 10);

        }


        //---------------------------------- Pipeline helper ---------------------------------------------------------------

        base.yAxisSelector = function () {
            var yAxis = [{
                min: 0,
                title: {
                    text: 'Number of logins',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
                // ,
                // stackLabels: {
                //     style: {
                //         fontWeight: 'bold',
                //         color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                //     },
                //     enabled: true
                // }
            },
            {
                min: 0,
                title: {
                    text: 'Session time',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }];




            return yAxis;
        }


        base.prepareSeries = function (input) {

            // combine all points for each series into lists
            var totalLogins = [];
            var uniqueLogins = [];
            var avgSessionTime = [];

            var series = [];

            input.forEach(function (obj, p) {
                var name = 'firmId';
                if (self.current_level === 0) {
                    name = 'firmId';
                } else if (self.current_level === 1) {
                    name = 'advisorId';
                } else if (self.current_level === 2) {
                    name = 'clientId'
                }
                totalLogins.push({ id: obj[name], y: obj['totalLogins'] });
                uniqueLogins.push({ id: obj[name], y: obj['uniqueLogins'] });
                avgSessionTime.push({ id: obj[name], y: obj['avgSessionTime'] });

            });


            var totalPoints = {
                name: 'Total Logins',
                data: totalLogins,
                stack: "stack0",
                stackId: 0
            };

            var uniquePoints = {
                name: 'Unique Logins',
                data: uniqueLogins,
                stack: "stack1",
                stackId: 1
            };


            var avgSessionPoints = {
                name: 'Avg Session Time',
                data: avgSessionTime,
                type: 'spline',
                yAxis: 1
            };
            series.push(totalPoints);
            series.push(uniquePoints);
            series.push(avgSessionPoints);

            return series;
        }


        //---------------------------------- Widgets -----------------------------------------------------------------
        base.createWidgets = function (chart) {
            this.createPathSelector(chart);
            this.createRangeSelector(chart);
        }

        //path selector
        base.createRangeSelector = function (chart) {
            var rangeHTML = this.generateRangeSelector();

            var text = chart.renderer.text(rangeHTML).css({ fontSize: '13px' }).add();
            var textBBox = text.getBBox();


            var x = chart.plotLeft + (chart.plotWidth) - (textBBox.width * 0.75);
            var y = textBBox.height;
            text.attr({ x: "99%", y: y, "text-anchor": "end" });

            var rangeBlocks = text.element.children;

            for (var i = 0; i < rangeBlocks.length; i = i + 2) {
                rangeBlocks[i].setAttribute('data-isWeek', i);
                rangeBlocks[i].classList.add("path-link");
                rangeBlocks[i].onclick = function () {
                    LoginsService.self.rangeOnClick(this);
                };
            };

            var tmp = LoginsService.self.isWeek ? 0 : 2;
            rangeBlocks[tmp].classList.add("curr-path-link");
        }

        base.rangeOnClick = function (element) {

            var w = parseInt(element.dataset.isWeek) === 0 ? true : false;
            this.checkRange(w);

            // //drill up
            // MetricsService.self.drillToLevel(level);

        }

        base.generateRangeSelector = function () {
            var output = '<a>Last Week</a> | <a>Last Month</a>';
            return output;
        }

        base.createOffChartWidgets = function (scope) {
            this.createSwitch(scope);
        }


        // prospect/client switch
        base.createSwitch = function (scope) {
            var ctrl = this.controllerName;
            var switchHTML = `
            <div>
                <div layout="row"  layout-align="center center" >
                    <md-radio-group ng-model="`+ ctrl + `.isProspect" ng-change="` + ctrl + `.checkUserType()" layout="row" style="padding:15px" >
                        <md-radio-button ng-value="true" class="md-primary">Prospects</md-radio-button>
                        <md-radio-button ng-value="false"> Clients </md-radio-button>
                    </md-radio-group>
                </div>
            </div>
            `;



            var chartHTML = angular.element(document.getElementById("chart-container"));
            chartHTML.append(this.$compile(switchHTML)(scope));
        }

        return base;
    }
}


function LoginsController($scope, LoginsService) {
    var service = new LoginsService();

    this.isWeek = service.isWeek;
    this.isProspect = service.isProspect;



    this.checkUserType = function () {

        service.isWeek = this.isWeek;
        service.isProspect = this.isProspect;


        try {
            service.checkUserType();
        }
        catch (err) {
            console.log("Error when clearing dates!");
        }

        this.isWeek = service.isWeek;
        this.isProspect = service.isProspect;


        // this.startDate = service.startDate;
        // this.endDate = service.endDate;

    }

    service.launch($scope);
}
