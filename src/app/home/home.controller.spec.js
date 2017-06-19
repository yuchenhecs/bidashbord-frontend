// describe('controllers', () => {
//   let vm;
//
//   beforeEach(angular.mock.module('oranjWebBiDashboard'));
//
//   beforeEach(inject(($controller, webDevTec, toastr) => {
//     spyOn(webDevTec, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
//     spyOn(toastr, 'info').and.callThrough();
//
//     vm = $controller('MainController');
//   }));
//
//   it('should have a timestamp creation date', () => {
//     expect(vm.creationDate).toEqual(jasmine.any(Number));
//   });
//
//   it('should define animate class after delaying timeout', inject($timeout => {
//     $timeout.flush();
//     expect(vm.classAnimation).toEqual('rubberBand');
//   }));
//
//   it('should show a Toastr info and stop animation when invoke showToastr()', inject(toastr => {
//     vm.showToastr();
//     expect(toastr.info).toHaveBeenCalled();
//     expect(vm.classAnimation).toEqual('');
//   }));
//
//   it('should define more than 5 awesome things', () => {
//     expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
//     expect(vm.awesomeThings.length === 5).toBeTruthy();
//   });
// });

describe('Home App Module:', function() {
    var $scope, HomeController, chartData, $q, $httpBackend;
    var url = 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/goals';

    //dummy data
    var goalsData =[
        {
            type: "COLLEGE",
            count: 597
        },{
            type: "CUSTOM",
            count: 389
        },{
            type: "HOME",
            count: 450
        },{
            type: "Insurance",
            count: 359
        },{
            type: "RETIREMENT",
            count: 901
        },{
            type: "SPECIAL_EVENT",
            count: 556
        }
    ];

    var aumData =[
        {
          "date": "2014-01-01",
          "total": 51944.29,
          "assetClass": {
            "Non US Stock": 51944.29
          }
        },{
          "date": "2017-04-01",
          "total": 1962838.66,
          "assetClass": {
            "Non US Stock": 260242.52,
            "US Stock": 675684.28,
            "Cash": 96669.34,
            "Other": 930242.52
          }
        },{
          "date": "2017-06-19",
          "total": 0,
          "assetClass": {}
        }
    ];

    var netWorthData = [{
        name: 'Net Worth',
        data: [5000, 5400, 3900, 6700, 10000, 8090],
        yAxis: 1
    }, {
        name: 'Clients',
        data: [0, 1, 3, -5, 10, -3]
    }];

    //Before each test load our app module
    beforeEach(angular.mock.module('app'));

    //Inject the $controller service to create instances of the controller (HomeController) we want to test,
    //Injecting _chartData_ for our factory
    beforeEach(inject(function($controller, $rootScope, _chartData_, _$q_, _$httpBackend_){
        chartData = _chartData_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
        HomeController = function() {
            return $controller('HomeController', {
                $scope: $scope,
            });
        };
    }));

    //Verify our controller exists
    it('HomeController should exist', function() {
        var homeCon = HomeController();
        expect(homeCon).toBeDefined();
    });

    //Verify our factory is defined
    it('chartData factory should be defined', function() {
        expect(chartData).toBeDefined();
    });

    //testing api call
    describe('callApi()', function() {
        var result;

        beforeEach(function() {
            result = {};
            //spyOn() takes in the directive + method name, the specified method's code will not be run
            spyOn(chartData, "callApi").and.callThrough();
            spyOn(chartData, "createOptions");
        });

        it('should return a json object with data', function() {
            $httpBackend.whenGET(url).respond(200, $q.when(goalsData));

            expect(chartData.callApi).not.toHaveBeenCalled();
            expect(result).toEqual({});

            chartData.callApi('pie', 'goalsContainer', url)
            .then(function(res) {
                result = res;
            });

            $httpBackend.flush();

            expect(chartData.callApi).toHaveBeenCalledWith('pie', 'goalsContainer', url);
            expect(result[0].type).toEqual("COLLEGE");
        });
    });

    //testing titleSelector() function
    describe('titleSelector()', function() {
        var result, title;

        //before each test, redefine variables
        beforeEach(function () {
                result = {};
                title = {};
        });

        it('should return the proper title for "goalsContainer"', function() {
            title = {
                text: "Total Goals Created"
            };

            result = chartData.titleSelector('goalsContainer', goalsData);
            expect(result).toEqual(title);
        });

        it('should return the proper title for "aumContainer"', function() {
            title = {
                text: "Assets Under Management from " + "2014-01-01" + " to " + "2017-06-19"
            };

            result = chartData.titleSelector('aumContainer', aumData);
            expect(result).toEqual(title);
        });

        it('should return the proper title for "netWorthContainer"', function() {
            title = {
                text: "Net Worth and Client Change"
            };

            result = chartData.titleSelector('netWorthContainer', netWorthData);
            expect(result).toEqual(title);
        });
    });

    //testing subtitleSelector() function
    describe('subtitleSelector()', function() {
        var result, subtitle;

        beforeEach(function () {
                result = {};
                subtitle = {};
        });

        it('should return number of total goals for "goalsContainer"', function() {
            subtitle = {
                text: "Total Goals: 3252"
            };

            result = chartData.subtitleSelector('goalsContainer', goalsData);
            expect(result).toEqual(subtitle);
        });

        it('should return null for "aumContainer"', function() {
            result = chartData.subtitleSelector('aumContainer', aumData);
            expect(result).toEqual(null);
        });

        it('should return null for "netWorthContainer"', function() {
            result = chartData.subtitleSelector('netWorthContainer', netWorthData);
            expect(result).toEqual(null);
        });
    });

    //testing xAxisSelector() function
    describe('xAxisSelector()', function() {
        var result, xAxis;

        beforeEach(function () {
            result = {};
            xAxis = {};
        });

        it('should return null for "goalsContainer"', function() {
            result = chartData.xAxisSelector('goalsContainer', goalsData);
            expect(result).toEqual(null);
        });

        it('should return a list of dates for "aumContainer"', function() {
            xAxis = {
                categories: ["2014-01-01", "2017-04-01", "2017-06-19"]
            };

            result = chartData.xAxisSelector('aumContainer', aumData);
            expect(result).toEqual(xAxis);
        });

        it('should return a list of months fpr "netWorthContainer"', function() {
            xAxis = {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
            };

            result = chartData.xAxisSelector('netWorthContainer', netWorthData);
            expect(result).toEqual(xAxis);
        });
    });

    //testing yAxisSelector() function
    describe('yAxisSelector()', function() {
        var result, yAxis;

        beforeEach(function() {
            result = {};
            yAxis = {};
        });

        it('should return null for "goalsContainer"', function() {
            result = chartData.yAxisSelector('goalsContainer', goalsData);
            expect(result).toEqual(null);
        });

        it('should return a title for the yAxis for "aumContainer"', function() {
            yAxis = {
                title: {
					text: "Dollars"
				}
            };

            result = chartData.yAxisSelector('aumContainer', aumData);
            expect(result).toEqual(yAxis);
        });


        //needs fixing
        it('should return 2 yAxis titles and their labels for "netWorthContainer"', function() {
            yAxis = [{
				title: {
					text: 'Clients',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				labels: {
					format: '{value}',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				opposite: true
			}, {
				title: {
					text: 'Dollars',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				labels: {
					formatter: function() {
						return '$' + this.axis.defaultLabelFormatter.call(this);
					},
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				}
			}];

            result = chartData.yAxisSelector('netWorthContainer', netWorthData);
            expect(result).toEqual(yAxis);
        });
    });

    //testing tooltipSelector() function
    describe('tooltipSelector()', function() {
        var result, tooltip;

        beforeEach(function() {
            result = {};
            tooltip = {};
        });

        it('should return a pointFormat option for "goalsContainer"', function() {
            tooltip = {
                pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
            };

            result = chartData.tooltipSelector('goalsContainer');
            expect(result).toEqual(tooltip);
        });

        it('should return a pointFormat option for "aumContainer"', function() {
            tooltip = {
                split: true
            };

            result = chartData.tooltipSelector('aumContainer');
            expect(result).toEqual(tooltip);
        });

        it('should return a pointFormat option for "netWorthContainer"', function() {
            tooltip = {
                split: true
            };

            result = chartData.tooltipSelector('netWorthContainer');
            expect(result).toEqual(tooltip);
        });
    });

    describe('plotOptionsSelector()', function() {
        var result, options;

        beforeEach(function() {
            result = {};
            options = {};
        });

        it('should return options for a pie chart for "goalsContainer"', function() {
            options = {
                pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
            };

            result = chartData.plotOptionsSelector('goalsContainer');
            expect(result).toEqual(options);
        });

        it('should return options for an area chart for "aumContainer"', function() {
            options = {
                area: {
					stacking: 'normal',
					lineColor: '#666666',
					lineWidth: 1,
					marker: {
						lineWidth: 1,
						lineColor: '#666666'
					}
				}
            };

            result = chartData.plotOptionsSelector('aumContainer');
            expect(result).toEqual(options);
        });

        it('should return an empty object for "netWorthContainer"', function() {
            options = {};

            result = chartData.plotOptionsSelector('netWorthContainer');
            expect(result).toEqual(options);
        });
    });

    //testing seriesSelector() function
    describe('seriesSelector()', function() {
        var result, series;

        beforeEach(function() {
            result = {};
            series = {};
        });

        it('should return a series with goal type and number of goals for "goalsContainer"', function() {
            series = [{
                name: "Goals",
                data: [
                    {
                        name: "COLLEGE",
                        y: 597
                    },{
                        name: "CUSTOM",
                        y: 389
                    },{
                        name: "HOME",
                        y: 450
                    },{
                        name: "Insurance",
                        y: 359
                    },{
                        name: "RETIREMENT",
                        y: 901
                    },{
                        name: "SPECIAL_EVENT",
                        y: 556
                    }
                ]
            }];

            result = chartData.seriesSelector('goalsContainer', goalsData);
            expect(result).toEqual(series);
        });

        it('should return a series with asset types and arrays of values for each date for "aumContainer"', function () {
            series = [
                {
                    name: "Non US Stock",
                    data: [51944.29, 260242.52, 0]
                },{
                    name: "US Stock",
                    data: [0, 675684.28, 0]
                },{
                    name: "Cash",
                    data: [0, 96669.34, 0]
                },{
                    name: "Other",
                    data: [0, 930242.52, 0]
                }
            ];

            result = chartData.seriesSelector('aumContainer', aumData);
            expect(result).toEqual(series);
        });

        it('should return a series with the names and arrays of values for each month for "netWorthContainer"', function() {
            series = [{
				name: 'Net Worth',
				data: [5000, 5400, 3900, 6700, 10000, 8090],
				yAxis: 1
			}, {
				name: 'Clients',
				data: [0, 1, 3, -5, 10, -3]
			}];

            result = chartData.seriesSelector('netWorthContainer', netWorthData);
            expect(result).toEqual(series);
        });
    });
});
