angular
    .module('app')
    .controller('GoalsController', GoalsController)
    .factory('GoalsService', GoalsService);

function GoalsService(MetricsService) {
    return function () {
        // most code is written in MetricsController

        var base = new MetricsService();
        GoalsService.self = base;
        // constants
        base.DOMAIN = "http://10.1.10.11:8080";
        base.SUB_DOMAIN = "/bi/goals";
        base.USE_DUMMY_DATA = false;
        base.controllerName = "goals";

        base.data1 = [{
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
        }];


        base.data2 = [{
            "name": "advisor 1",
            "total": 23,
            "goals": {
                "custom": 10,
                "college": 4,
                "retirement": 6,
                "insurance": 2,
                "home": 1
            }
        },
        {
            "total": 24,
            "name": "advisor 2",
            "goals": {
                "custom": 1,
                "college": 14,
                "retirement": 6,
                "insurance": 2,
                "home": 1
            }
        },
        {
            "total": 14,
            "name": "advisor 3",
            "goals": {
                "custom": 1,
                "college": 4,
                "retirement": 6,
                "insurance": 2,
                "home": 1
            }
        }];


        base.data3 = [{
            "name": "client 1",
            "total": 14,
            "goals": {
                "custom": 1,
                "college": 4,
                "retirement": 6,
                "insurance": 2,
                "home": 1
            }
        },
        {
            "total": 14,
            "name": "client 2",
            "goals": {
                "custom": 1,
                "college": 4,
                "retirement": 6,
                "insurance": 2,
                "home": 1
            }
        },
        {
            "total": 8,
            "name": "client 3",
            "goals": {
                "custom": 1,
                "college": 4,
                "retirement": 0,
                "insurance": 2,
                "home": 1
            }
        }];

        return base;
    }
}


function GoalsController($scope, GoalsService) {
    var goals = new GoalsService();

    this.startDate = goals.startDate;
    this.endDate = goals.endDate;
    this.today = new Date();
    this.isRequired = goals.isRequired;

    this.checkDate = function () {
        goals.startDate = this.startDate; // bind data to service
        goals.endDate = this.endDate;

        goals.checkDate();

        this.startDate = goals.startDate;
        this.endDate = goals.endDate;
    };


    this.assignYTD = function () {
        this.startDate = new Date(new Date().getFullYear(), 0, 1);
        this.endDate = new Date();
        goals.startDate = this.startDate; // bind data to service
        goals.endDate = this.endDate;
        goals.applyDateFilter();
    }

    this.clearDate = function () {
        this.endDate = null;
        this.startDate = null;
        goals.startDate = this.startDate; // bind data to service
        goals.endDate = this.endDate;

        goals.applyDateFilter();

    }

    goals.launch($scope);
}
