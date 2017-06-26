angular
    .module('app')
    .controller('NetWorthController', NetWorthController)
    .factory('NetWorthService', NetWorthService);

function NetWorthService(MetricsService) {
    return function () {
        // most code is written in MetricsController

        var base = new MetricsService();
        NetWorthService.self = base;
        // constants
        // base.DOMAIN = "http://10.1.10.11:8080";
        base.DOMAIN = "http://localhost:8080";
        base.SUB_DOMAIN = "/bi/netWorth";
        base.USE_DUMMY_DATA = true;
        base.controllerName = "netWorth";

        base.data1 = [
          {
        "hasNext": true,
        "page": 0,
        "firms": [{
          "firmId": 510,
          "name": "Oranj",
          "absNet": 123,
          "avgNet": 123
        },
          {
            "firmId": 511,
            "name": "Chicago",
            "absNet": 123,
            "avgNet": 123
          },
          {
            "firmId": 512,
            "name": "USA",
            "absNet": 123,
            "avgNet": 123
          }

        ]
      },
      {
      "hasNext": true,
      "page": 0,
      "firms": [{
        "firmId": 510,
        "name": "Oranj",
        "absNet": 123,
        "avgNet": 123
      },
        {
          "firmId": 511,
          "name": "Chicago",
          "absNet": 123,
          "avgNet": 123
        },
        {
          "firmId": 512,
          "name": "USA",
          "absNet": 123,
          "avgNet": 123
        }

      ]
    },
    {
    "hasNext": true,
    "page": 0,
    "firms": [{
      "firmId": 510,
      "name": "Oranj",
      "absNet": 123,
      "avgNet": 123
    },
      {
        "firmId": 511,
        "name": "Chicago",
        "absNet": 123,
        "avgNet": 123
      },
      {
        "firmId": 512,
        "name": "USA",
        "absNet": 123,
        "avgNet": 123
      }

    ]
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


function NetWorthController($scope, NetWorthService) {
    var netWorth = new NetWorthService();

    this.startDate = netWorth.startDate;
    this.endDate = netWorth.endDate;
    this.today = new Date();
    this.isRequired = netWorth.isRequired;

    this.checkDate = function () {
        netWorth.startDate = this.startDate; // bind data to service
        netWorth.endDate = this.endDate;

        netWorth.checkDate();

        this.startDate = netWorth.startDate;
        this.endDate = netWorth.endDate;
    };


    this.assignYTD = function () {
        this.startDate = new Date(new Date().getFullYear(), 0, 1);
        this.endDate = new Date();
        netWorth.startDate = this.startDate; // bind data to service
        netWorth.endDate = this.endDate;
        netWorth.applyDateFilter();
    }

    this.clearDate = function () {
        this.endDate = null;
        this.startDate = null;
        netWorth.startDate = this.startDate; // bind data to service
        netWorth.endDate = this.endDate;

        netWorth.applyDateFilter();

    }

    netWorth.launch($scope);
}
