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
        base.showDatepicker = false;

        base.data1 = [{
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
          }];


        base.data2 = [{
          "advisorId": 510,
          "firstName": "Oranj",
          "lastName": "Oranj",
          "absNet": 123,
          "avgNet": 123
        },
          {
            "advisorId": 511,
            "firstName": "Oranj",
            "lastName": "Oranj",
            "absNet": 123,
            "avgNet": 123
          },
          {
            "advisorId": 512,
            "firstName": "Oranj",
            "lastName": "Oranj",
            "absNet": 123,
            "avgNet": 123
          }];


        base.data3 = [{
          "clientId": 510,
          "firstName": "Oranj",
          "lastName": "Oranj",
          "absNet": 123,
          "avgNet": 123
        },
          {
            "clientId": 511,
            "firstName": "Oranj",
            "lastName": "Oranj",
            "absNet": 123,
            "avgNet": 123
          },
          {
            "clientId": 512,
            "firstName": "Oranj",
            "lastName": "Oranj",
            "absNet": 123,
            "avgNet": 123
          }];

        base.prepareCategories = function(input){
          var categories = input.map(function (x) {
              var self = NetWorthService.self;
              var name = x['name'];
              if (self.current_level === 0) {
                  name = x['name'];
              } else if (self.current_level === 1) {
                  //name = x['name'];
                  name = x['firstName'] + " " + x['lastName'];
              } else if (self.current_level === 2) {
                  //name = x['name'];
                  name = x['firstName'] + " " + x['lastName'];
              }
              return name;
          });

          var output = [];
          categories.forEach(function (x) {
              output.push(x);
          });

          return output;
        };

        base.prepareSeries = function (input){
          var goalMap = {};
          var avgNet = [];
          var absNet = [];
          input.forEach(function (x, i) {
              avgNet.push(x['avgNet']);
              absNet.push(x['absNet']);
              // for (var category in goalMap) {
              //     goalMap[category].push(0);
              // }
              // var goals = x['goals'];
              // for (var key in goals) {
              //     if (!goalMap[key]) {
              //         goalMap[key] = Array.apply(null, Array(i + 1)).map(Number.prototype.valueOf, 0);
              //     }
              //     goalMap[key][i] = goals[key];
              // }
          });

          // combine all points for each series into lists

          var series = [];
          for (var key in goalMap) {
              var dataDrillDown = goalMap[key].map(function (x, i) {
                  var self = NetWorthService.self;
                  var name = 'firmId';
                  if (self.current_level === 0) {
                      name = 'firmId';
                  } else if (self.current_level === 1) {
                      name = 'advisorId';
                  } else if (self.current_level === 2) {
                      name = 'clientId'
                  }
                  return { id: input[i][name], y: x };
              });

              var points =
                  {
                      name: key,
                      data: dataDrillDown
                  };
              series.push(points);
          }

[
  {name:'abs', data:[
    {id:id, y:},
    {},

  ]},


  {},

]


          return series;
        };

        return base;
    }


}


function NetWorthController($scope, NetWorthService) {
    var netWorth = new NetWorthService();

    // this.startDate = netWorth.startDate;
    // this.endDate = netWorth.endDate;
    // this.today = new Date();
    // this.isRequired = false;
    //
    // this.checkDate = function () {
    //     netWorth.startDate = this.startDate; // bind data to service
    //     netWorth.endDate = this.endDate;
    //
    //     netWorth.checkDate();
    //
    //     this.startDate = netWorth.startDate;
    //     this.endDate = netWorth.endDate;
    // };
    //
    //
    // this.assignYTD = function () {
    //     this.startDate = new Date(new Date().getFullYear(), 0, 1);
    //     this.endDate = new Date();
    //     netWorth.startDate = this.startDate; // bind data to service
    //     netWorth.endDate = this.endDate;
    //     netWorth.applyDateFilter();
    // }
    //
    // this.clearDate = function () {
    //     this.endDate = null;
    //     this.startDate = null;
    //     netWorth.startDate = this.startDate; // bind data to service
    //     netWorth.endDate = this.endDate;
    //
    //     netWorth.applyDateFilter();
    //
    // }

    netWorth.launch($scope);
}
