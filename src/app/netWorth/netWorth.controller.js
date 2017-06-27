angular
    .module('app')
    .controller('NetWorthController', NetWorthController)
    .factory('NetWorthService', NetWorthService);

function NetWorthService(MetricsService) {
    return function () {
        // most code is written in MetricsController

        var base = new MetricsService();
        var seriesRaw = [];
        var avgFirm = 100;
        var avgAdvsior = 120;

        NetWorthService.self = base;
        // constants
        // base.DOMAIN = "http://10.1.10.11:8080";
        base.DOMAIN = "http://localhost:8080";
        base.SUB_DOMAIN = "/bi/netWorth";
        base.USE_DUMMY_DATA = true;
        base.controllerName = "netWorth";
        base.showDatepicker = false;

        base.data1 = {
      	"avgAdvsior": 123,
      	"avgFirm": 123,
      	"hasNext": true,
        "page": 0,
        "firms" : [{
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
          }]};


        base.data2 =
        {
      	"avgAdvsior": 123,
      	"avgFirm": 123,
      	"hasNext": true,
        "page": 0,
        "advisors":[{
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
          }]};


        base.data3 = {
      	"avgAdvsior": 50,
      	"avgFirm": 123,
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


        function prepareCategories (input){
          var categories = input.map(function (x) {
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

        function prepareSeries (input){
          var avgNet = [];
          var absNet = [];
          var series = [];

          input.forEach(function (x, i) {
              avgNet.push(x['avgNet']);
              absNet.push(x['absNet']);
              var self = NetWorthService.self;
              var name = '';
              if (self.current_level === 0) {
                  name = 'firmId';
              } else if (self.current_level === 1) {
                  name = 'advisorId';
              } else if (self.current_level === 2) {
                  name = 'clientId'
              }
          });

          series.push(absNet);
          series.push(avgNet);
          return series;
        };

        function createOptions (data) {

          if (base.current_level === 0) {
              data = data["firms"];
          } else if (base.current_level === 1) {
              data = data["advisors"];
          } else if (base.current_level === 2) {
            avgFirm = data['avgFirm'];
            avgAdvsior = data['avgAdvsior'];
            data = data["clients"];
          }

          seriesRaw = prepareSeries(data);

          var currentOptions = {
            title: titleSelector(data),
            subtitle: subtitleSelector( data),
            series: seriesSelector( data),
            xAxis: xAxisSelector( data),
            yAxis: yAxisSelector( data),
            tooltip: tooltipSelector()
          };

          currentOptions = Object.assign({}, base.optionTemplate, currentOptions);

          console.log(currentOptions);
          return currentOptions;
          // this.chart = Highcharts.chart( currentOptions);
        };


        base.loadData = function (input, name, id, page, last) {
            this.createNewLevel(createOptions(input), name, id, page, last); // update drilldown level and prepare chart data
        };


        function titleSelector( data) {
          var title;

          title = {
            text: "Average and Absolute Net Worth across Firms"
          };

          return title;
        }

        function subtitleSelector( data) {
          var subtitle;
          return subtitle;
        }

        function xAxisSelector( data) {
          var xAxis;
          console.log(data);
          xAxis = {
            scrollbar: {
                enabled: true
            },
            categories: prepareCategories(data),
            // categories: ['Firm 1', 'Firm 2', 'Firm 3', 'Firm 4', 'Firm 5', 'Firm 6', 'Firm 7', 'Firm 8', 'Firm 9', 'Firm 10', 'Firm 11', 'Firm 12'],
            crosshair: false
          };

          return xAxis;
        }

        function yAxisSelector(data) {
          var yAxis = [{
            labels: {
              format: '{value}',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            title: {
              text: 'Average Net Worth',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            }
          },
            { // Secondary yAxis
              title: {
                text: 'Absolute Net Worth',
                style: {
                  color: Highcharts.getOptions().colors[0]
                }
              },
              labels: {
                format: '{value}',
                style: {
                  color: Highcharts.getOptions().colors[0]
                }
              },
              opposite: true
            },
            {
              labels: {
                enabled: false
              },
              title: {
                text: null
              }
            }
          ];

          if (base.current_level === 2){
            yAxis[1]['plotLines']=
                 [{
                  value: avgFirm,
                  color: 'red',
                  dashStyle: 'shortdash',
                  marker: {
                    enabled: false
                  },
                  width: 2,
                  zIndex:4,
                  label: {
                    text: 'Avg Firm'
                  }
                },{
                  value: avgAdvsior,
                  color: 'green',
                  marker: {
                    enabled: false
                  },
                  // dashStyle: 'shortdash',
                  width: 2,
                  zIndex:4,
                  label: {
                    text: 'Avg Advisor'
                  }
                }];
          }
          console.log("yAxis");
          console.log(yAxis);

          return yAxis;
        }

        function seriesSelector( data) {
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

          if (base.current_level === 2){
            series[1].showInLegend = false;
            series.push(
              {
                  name: 'Avg Advisor',
                  color: 'green',
                  yAxis: 2,
                  marker: {
                    enabled: false
                  }
                },
              {
                  name: 'Avg Firm',
                  color: 'red',
                  dashStyle: 'shortdash',
                  yAxis: 2,
                  marker: {
                    enabled: false
                  }
              }
            );
          }

          return series;
        }

        function tooltipSelector() {
          var tooltip;
            tooltip = {
              shared: true
          }

          return tooltip;
        }

        function legendSelector( data){
          var legend = {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
          };
          return legend;
        };

        return base;
    };
}


function NetWorthController($scope, NetWorthService) {
    var netWorth = new NetWorthService();
    netWorth.launch($scope);
}
