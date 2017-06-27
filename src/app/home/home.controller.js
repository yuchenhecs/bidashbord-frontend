angular
	.module('app')
	.controller('HomeController', HomeController)
	.factory('chartData', foo);

//factory object with methods
function foo($http) {
	var chartData = {};


	chartData.callApi = function(chartType, chartId, url) {
		if (url === null) {
			chartData.createOptions(chartType, chartId, '');
		}
		else {
				return $http.get(url).then(function mySuccess(response) {
				var apiData = response["data"]["data"];
				chartData.createOptions(chartType, chartId, apiData);
				return response.data;
			}, function myError(response) {
				$log.error("Error " + response.status + ": " + response.statusText + "!");
			});
		}
	};

	chartData.titleSelector = function(chartId, apiData) {
		var title;
			if (chartId === "goalsContainer") {
				title = {
					text: "Total Goals Created"
				};
			} else if (chartId === "aumContainer") {
				var first, last;
				first = apiData[0].date;
				last = apiData[apiData.length - 1].date;
				title = {
					text: "Assets Under Management from " + first + " to " + last
				};
			} else if (chartId === "netWorthContainer") {
				title = {
					text: "Net Worth and Client Change"
				};
			}

			return title;
	};

	chartData.subtitleSelector = function(chartId, apiData) {
		var subtitle;
		var total = 0;

		if (chartId === "goalsContainer") {
			for (var i = 0; i < apiData.length; i++) {
				total+= apiData[i].count;
			}
			subtitle = {
				text: "Total Goals: " + total
			};
		} else if (chartId === "aumContainer") {
			subtitle = null;
		} else if (chartId === "netWorthContainer") {
			subtitle = null;
		}

		return subtitle;
	};

	chartData.xAxisSelector = function(chartId, apiData) {
		var xAxis;
		if (chartId === "goalsContainer") {
			xAxis = null;
		} else if (chartId === "aumContainer") {
			var dates = [];
			for (var i = 0; i < apiData.length; i++) {
				dates.push(apiData[i].date);
			}

			xAxis = {
				categories: dates
			};
		} else if (chartId === "netWorthContainer") {
			xAxis = {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
			};
		}

		return xAxis;
	};

	chartData.yAxisSelector = function(chartId, apiData) {
		var yAxis;
		if (chartId === "goalsContainer") {
			yAxis = null;
		} else if (chartId === "aumContainer") {
			yAxis = {
				title: {
					text: "Dollars"
				}
			};
		// } else if (chartId.localeCompare("netWorthContainer")) {
		} else if (chartId === "netWorthContainer") {
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
					// formatter: function() {
					// 	return '$' + this.axis.defaultLabelFormatter.call(this);
					// },
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				}
			}]
		};

		return yAxis;
	};

	chartData.tooltipSelector = function(chartId) {
		var tooltip;
		if (chartId === "goalsContainer") {
			tooltip = {
				pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
			};
		} else if (chartId === "aumContainer") {
			tooltip = {
				split: true
			};
		// } else if (chartId.localeCompare("netWorthContainer")) {
		} else if (chartId ==="netWorthContainer") {
			tooltip = {
				split: true
			};
		}

		return tooltip;
	};

	chartData.plotOptionsSelector = function(chartId) {
		var options;
		if (chartId === "goalsContainer") {
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
		} else if (chartId === "aumContainer") {
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
		// } else if (chartId.localeCompare("netWorthContainer")) {
		} else if (chartId ==="netWorthContainer") {
			options = {

			};
		}

		return options;
	};

	chartData.seriesSelector = function(chartId, apiData) {
		var series;
		if (chartId === "goalsContainer") {
			var seriesData = [];
			for (var i = 0; i < apiData.length; i++) {
				var obj = {
					name: apiData[i].type,
					y: apiData[i].count
				};
			seriesData.push(obj);
			}

			series = [{
				name: "Goals",
				data: seriesData
			}];
		} else if (chartId === "aumContainer") {
			var assetsMap = {};
			//get each possible type of asset
			apiData.forEach(function (x) {
				var assets = x["assetClass"];
				for (var key in assets) {
					if (assetsMap[key] == null) {
						assetsMap[key] = [];
					}
				}
			});
			//then populate the array with its corresponding value, if it does not exist, fill in 0
			apiData.forEach(function (x) {
				var assets = x["assetClass"];
				for (var key in assetsMap) {
					if (!(key in assets)) {
						assetsMap[key].push(0);
					} else {
						assetsMap[key].push(assets[key]);
					}
				}
			});

			series = [];
			for (var key in assetsMap) {
				var points = {
					name: key,
					data: assetsMap[key]
				};

				series.push(points);
			}
		// } else if (chartId.localeCompare("netWorthContainer")) {
		} else if (chartId ==="netWorthContainer") {
			series = [{
				name: 'Net Worth',
				data: [5000, 5400, 3900, 6700, 10000, 8090],
				yAxis: 1
			}, {
				name: 'Clients',
				data: [0, 1, 3, -5, 10, -3]
			}];
		}

		return series;
	};

	chartData.createOptions = function(chartType, chartId, apiData) {
		var currentOptions = {
			chart: {
				type: chartType
			},
			title: chartData.titleSelector(chartId, apiData),
			subtitle: chartData.subtitleSelector(chartId, apiData),
			xAxis: chartData.xAxisSelector(chartId, apiData),
			yAxis: chartData.yAxisSelector(chartId, apiData),
			tooltip: chartData.tooltipSelector(chartId),
			plotOptions: chartData.plotOptionsSelector(chartId),
			series: chartData.seriesSelector(chartId, apiData)
		}

		//return currentOptions;
		this.chart = Highcharts.chart(chartId, currentOptions);
	};

	return chartData;
}

function HomeController($scope, $http, $log, chartData) {
	HomeController.self = this; // singleton
	$scope.$http = $http;
	this.$log = $log;
	this.DOMAIN = $scope.domain;
	this.total = 0;

	var colorTheme = {
		colors: ["#000285", "#11BEDF", "#40B349", "#A1CB39", "#ACE6F9", "#FCCC08"]
	};

	this.chart = Highcharts.setOptions(colorTheme);
	chartData.callApi('pie', 'goalsContainer', 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/goals');
	chartData.callApi('area', 'aumContainer', 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/aums');
	chartData.callApi('line', 'netWorthContainer', null);

	//console.log(apiData.$$state);
	//chartData.createOptions('pie', 'aumContainer', apiData);

	// getGoalsFromApi("pie", "goalsContainer");
	// getAUMFromApi("area", "aumContainer");
	// getNetWorthFromApi(null, "netWorthContainer");

	// function getGoalsFromApi(chartType, chartId) {
	// 	//var url = this.DOMAIN + "/goals";
	// 	var url = "http://10.1.10.247:8080/goals";
	//
	//
	// 	$http.get(url).then(function mySuccess(response) {
	// 		var apiData = response["data"]["data"];
	// 		createOptions(chartType, chartId, apiData);
	// 	}, function myError(response) {
	// 		$log.error("Error " + response.status + ": " + response.statusText + "!");
	// 	});
	// };
	//
	// function getAUMFromApi(chartType, chartId) {
	// 	var response = {
	// 		"aumDiff": [{
	// 			"date": "2016-01-01",
	// 			"types": {
	// 				"US Bond": 1000,
	// 				"US Stocks": 2500,
	// 				"Cash": 700
	// 			}
	// 		},{
	// 			"date": "2016-04-01",
	// 			"types": {
	// 				"US Bond": 5000,
	// 				"US Stocks": 3000,
	// 				"Cash": 900
	// 			}
	// 		},{
	// 			"date": "2016-07-01",
	// 			"types": {
	// 				"US Bond": 6000,
	// 				"US Stocks": 2000,
	// 				"Cash": 1400
	// 			}
	// 		},{
	// 			"date": "2016-10-06",
	// 			"types": {
	// 				"US Bond": 9000,
	// 				"US Stocks": 1000,
	// 				"Cash": 300
	// 			}
	// 		}
	// 	]};
	//
	// 	//return dummyData["aumDiff"];
	//
	// 	var apiData = response["aumDiff"];
	// 	createOptions(chartType, chartId, apiData);
	// 	// var url = "http://10.1.10.247:8080/aum";
	// 	//
	// 	// this.$http.get(url).then(function mySuccess(response) {
	// 	// 	var apiData = response["data"]["data"];
	// 	// 	var self = HomeController.self;
	// 	// 	HomeController.self.createOptions(chartType, chartId, apiData);
	// 	// }, function myError(response) {
	// 	// 	console.log("Error " + response.status + ": " + response.data.error + "!");
	// 	// });
	// };
	//
	// function getNetWorthFromApi(chartType, chartId) {
	// 	createOptions(chartType, chartId);
	// };

};
