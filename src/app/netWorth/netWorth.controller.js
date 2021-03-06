angular
  .module('app')
  .controller('NetWorthController', NetWorthController)
  .service('NetWorthService', NetWorthService);

function NetWorthService(MetricsService) {
  this.init = function(){
    // most code is written in MetricsController

    var base = new MetricsService();
    var seriesRaw = [];
    var avgFirm = 100;
    var avgAdvsior = 120;

    // constants
    base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
    base.SUB_DOMAIN = "/bi/networth";
    base.USE_DUMMY_DATA = false;
    base.controllerName = "netWorth";
    base.showDatepicker = false;
    base.startDate = null;
    base.endDate = null;
    base.TITLE_TEMPLATE = "Average and Absolute Net Worth across ";

    base.data1 = {
      "avgAdvisor": 123,
      "avgFirm": 123,
      "hasNext": true,
      "page": 0,
      "firms": [{
        "firmId": 510,
        "name": "Oranj",
        "absNet": 123,
        "avgNet": 153546
      },
      {
        "firmId": 511,
        "name": "Chicago",
        "absNet": 123,
        "avgNet": 43533
      },
      {
        "firmId": 512,
        "name": "USA",
        "absNet": 123,
        "avgNet": 45464
      }]
    };


    base.data2 =
      {
        "avgAdvisor": 123,
        "avgFirm": 123,
        "hasNext": true,
        "page": 0,
        "advisors": [{
          "advisorId": 510,
          "firstName": "Oranj",
          "lastName": "Oranj",
          "absNet": 123,
          "avgNet": 45654
        },
        {
          "advisorId": 511,
          "firstName": "Oranj",
          "lastName": "Oranj",
          "absNet": 123,
          "avgNet": 3454
        },
        {
          "advisorId": 512,
          "firstName": "Oranj",
          "lastName": "Oranj",
          "absNet": 123,
          "avgNet": 123
        }]
      };


    base.data3 = {
      "avgAdvisor": 50,
      "avgFirm": 70,
      "hasNext": true,
      "page": 0,
      "clients": [{
        "clientId": 510,
        "firstName": "Oranj",
        "lastName": "Oranj",
        "absNet": 123
      },
      {
        "clientId": 511,
        "firstName": "Oranj",
        "lastName": "Oranj",
        "absNet": 123
      },
      {
        "clientId": 512,
        "firstName": "Oranj",
        "lastName": "Oranj",
        "absNet": 123
      }]
    };




    base.prepareSeries = function (input) {
      var avgNet = [];
      var absNet = [];
      var series = [];

      input.forEach(function (x, i) {
        var self = base;
        var name = '';
        if (self.current_level === 0) {
          name = 'firmId';
        } else if (self.current_level === 1) {
          name = 'advisorId';
        } else if (self.current_level === 2) {
          name = 'clientId'
        }

        avgNet.push({ id: x[name], y: x['avgNet'] });
        absNet.push({ id: x[name], y: x['absNet'] });

      });

      series.push(absNet);
      series.push(avgNet);

      return series;
    };

    base.yAxisSelector = function(input) {
      var avgFirm = input['avgFirm'];
      var avgAdvsior = input['avgAdvisor'];
      
      var yAxis = [{
        labels: {
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: 'Average Net Worth',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      },
      { // Secondary yAxis
        title: {
          text: 'Absolute Net Worth',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }
      ];

      if (base.current_level === 2) {
        yAxis[0]['title']['text'] = null;
        yAxis[1]['plotLines'] =
          [{
            value: avgFirm,
            color: 'red',
            dashStyle: 'shortdash',
            marker: {
              enabled: false
            },
            width: 2,
            zIndex: 4,
            label: {
              // text: 'Avg Firm'
              text: null
            }
          }, {
            value: avgAdvsior,
            color: 'green',
            marker: {
              enabled: true
            },
            width: 2,
            zIndex: 4,
            label: {
              // text: 'Avg Advisor'
              text: null
            }
          }];
      }

      return yAxis;
    }

    base.seriesSelector = function(input) {
      var seriesRaw = this.prepareSeries(input.data);

      var series = [{
        name: 'Absolute Net Worth',
        type: 'column',
        yAxis: 1,
        data: seriesRaw[0],
        tooltip: {
          valueSuffix: 'k'
        }
      },
      {
        name: 'Average Net Worth',
        type: 'spline',
        data: seriesRaw[1],
        tooltip: {
          valueSuffix: 'k'
        }
      }];

      if (base.current_level === 2) {
        series[1].showInLegend = false;
        series.push(
          {
            name: 'Avg Advisor',
            type: 'spline',
            color: 'green',
            yAxis: 1,
            marker: {
              enabled: false
            }
          },
          {
            name: 'Avg Firm',
            type: 'spline',
            dashStyle: 'shortdash',
            color: 'red',
            yAxis: 1,
            marker: {
              enabled: false
            }
          }
        );
      }

      return series;
    }

    return base;
  }
}


function NetWorthController($scope, NetWorthService) {
  var service = NetWorthService.init();


  this.querySearch = service.querySearch;
  this.selectedItemChange = service.selectedItemChange;

  service.launch($scope);
}
