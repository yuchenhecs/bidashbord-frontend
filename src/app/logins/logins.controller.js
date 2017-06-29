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
                    "avgSessionTime": 2,
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
                type: 'spline'
            };
            series.push(totalPoints);
            series.push(uniquePoints);
            series.push(avgSessionPoints);

            return series;
        }

        return base;
    }
}


function LoginsController($scope, LoginsService) {
    var service = new LoginsService();

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
