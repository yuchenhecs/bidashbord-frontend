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
        base.TITLE_TEMPLATE = "Login Statistics for ";

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
                    "uniqueLogins": 11,
                    "avgSessionTime": 2,
                },
                {
                    "firmId": 801,
                    "name": "Yuchen Firm2",
                    "totalLogins": 100,
                    "uniqueLogins": 20,
                    "avgSessionTime": 3.4,
                },
                {
                    "firmId": 801,
                    "name": "Yuchen Firm3",
                    "totalLogins": 50,
                    "uniqueLogins": 18,
                    "avgSessionTime": 1.4,
                },
                {
                    "firmId": 801,
                    "name": "Yuchen Firm4",
                    "totalLogins": 70,
                    "uniqueLogins": 58,
                    "avgSessionTime": 3,
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
                    "name": "Robert2",
                    "totalLogins": 30,
                    "uniqueLogins": 30,
                    "avgSessionTime":0.4,
                },
                {
                    "advisorId": 801,
                    "name": "Robert3",
                    "totalLogins": 50,
                    "uniqueLogins": 20,
                    "avgSessionTime":1,
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
                    "name": "Robert4",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 2
                },
                {
                    "clientId": 801,
                    "name": "Robert5",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 1
                }
            ]
        };


        //---------------------------------- Pipeline -----------------------------------------------------------------

        base.checkRange = function (range) {
            if (this.isWeek != range) {
                setTimeout(function () {
                    var self = LoginsService.self;
                    var name = self.level_list[self.current_level]['name'];
                    var id = self.level_list[self.current_level]['id'];
                    self.getDataForLevel(name, id, 0, self.current_level, [range, self.isProspect]);
                }, 10);
            }
        }

        base.checkUserType = function () {
            setTimeout(function () {
                var self = LoginsService.self;
                var name = self.level_list[self.current_level]['name'];
                var id = self.level_list[self.current_level]['id'];
                self.getDataForLevel(name, id, 0, self.current_level, [self.isWeek, self.isProspect]);
            }, 10);
        }






        base.validateLevel = function (level) {
            if (!this.compareUserType(level) || !this.compareRange(level)) {

                var name = this.level_list[level]['name'];
                var id = this.level_list[level]['id'];
               

                this.getDataForLevel(name, id, 0, level);
                return false;
            }

            return true;
        }

        base.compareRange = function (level) {
            var range_X = this.level_list[level]['isWeek'];
            var range_Y = this.isWeek;

            return (range_X === range_Y)
        }

        base.compareUserType = function (level) {
            var user_X = this.level_list[level]['isProspect'];
            var user_Y = this.isProspect;

            return (user_X === user_Y)

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

            var self = LoginsService.self;
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

            var text = chart.renderer.text(rangeHTML).add();
            var textBBox = text.getBBox();


            var x = chart.plotLeft + (chart.plotWidth) - (textBBox.width * 0.75);
            var y = textBBox.height;
            text.attr({ x: "99%", y: y, "text-anchor": "end" });

            var rangeBlocks = text.element.children;

            for (var i = 0; i < rangeBlocks.length; i = i + 2) {
                rangeBlocks[i].setAttribute('data-isWeek', i);
                rangeBlocks[i].classList.add("path-link");
                rangeBlocks[i].classList.add("chart-legend");
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
                        <div class="row">
                            <div class="oranj-toggle medium-one-color">
                                <input id="user-switch" type="checkbox"  ng-model="`+ ctrl + `.isProspect" ng-change="` + ctrl + `.checkUserType()">
                                <label for="user-switch">
                                    <div class="toggle-switch" data-unchecked="Clients" data-checked="Prospects"></div>
                                </label>
                            </div>
                        </div>
            `;

            var chartHTML = angular.element(document.getElementById("chart-container"));
            chartHTML.append(this.$compile(switchHTML)(scope));
        }

        base.createNewLevel = function (options, name, id) {

            //var startDate = !this.startDate ? null : new Date(this.startDate);
            //var endDate = !this.endDate ? null : new Date(this.endDate);

            var newLevel = {
                option: options,
                name: name,
                id: id,
                isWeek: this.isWeek,
                isProspect: this.isProspect
            };


            if (this.current_level === this.level_list.length) {
                this.level_list.push(newLevel);
            } else {
                this.level_list[this.current_level] = newLevel;
            }
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
    }

    service.launch($scope);
}
