angular
    .module('app')
    .controller('GoalsController', GoalsController)
    .service('GoalsService', GoalsService);

function GoalsService(MetricsService) {
    this.init = function () {
        // most code is written in MetricsController
        var base = new MetricsService();
        // constants
        base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
        //base.DOMAIN = "http://10.1.15.49:8080"
        //base.DOMAIN = "http://10.1.15.102:8080";
        base.SUB_DOMAIN = "/bi/goals";
        base.USE_DUMMY_DATA = false;
        base.controllerName = "goals";

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


        base.data2 = {
            "advisors": [{
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
            }]
        };


        base.data3 = {
            "clients": [{
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
            }]
        };

        base.createSearchResultHTML = function (item) {
            if(!item) return '';
            
            var total = 0;

            var searchPrefix = item ?
                `<div style="text-align: center" flex="auto">
                    <h5 style="margin-top:10px">`+ item.display + `</h5>
                </div>
                <div class="vertical-line" flex="nogrow"></div>
                ` : "";

            var searchResultHTML = item ? item.series.map(function (obj, i) {
                
                total += obj.data;
                return `<div style="text-align: center" flex="auto">
                        <h3 style="color:`+ base.chart.series[i].color + `">` + obj.data + ` </h3>
                        <h6> `+ obj.name + `</h6>
                    </div>`;
            }).join("") : "";

            var searchSuffix = item ?
                `<div style="text-align: center" flex="auto">
                    <h3>` + total + ` </h3>
                    <h6> Total </h6>
                </div>`: "";

            return searchPrefix + searchResultHTML + searchSuffix;
        };

        return base;
    }
}


function GoalsController($scope, GoalsService) {
    this.self = GoalsService.init();
    this.self.launch($scope);
}
