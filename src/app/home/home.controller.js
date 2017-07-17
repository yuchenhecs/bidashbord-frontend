angular
	.module('app')
	.controller('HomeController', HomeController)
	.factory('chartData', chartData);

//factory object with methods
function chartData($http, $log) {
	var chartData = {};


	chartData.callApi = function(chartType, chartId, url) {
		if (url === null) {
			chartData.createOptions(chartType, chartId, '');
		} else {
				return $http.get(url).then(function mySuccess(response) {
				var apiData = response["data"];
				if (chartId !== null) {
					chartData.createOptions(chartType, chartId, apiData["data"]);
				}
				//returning for unit testing purposes
				return apiData;
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
			var categories = [];
			apiData.summary.forEach(function(x){
				categories.push(x.date);
			});
			xAxis = {
				categories: categories
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
		} else if (chartId ==="netWorthContainer") {
			apiData = apiData.summary;
			var data = [];
			var clientsDiff = [];
			apiData.forEach(function(x){
					data.push(x.absNet);
					clientsDiff.push(x.clientsDiff);
			});


			series = [{
				name: 'Net Worth',
				data: data,
				yAxis: 1
			}, {
				name: 'Clients',
				data: clientsDiff
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

		this.chart = Highcharts.chart(chartId, currentOptions);
	};

	return chartData;

	chartData.addSign = function(num) {
		console.log('un function');
		if (num >= 0) {
			return '+' + num;
		}

		return num;
	};

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

	var toggle = true;

	$scope.toggleLoginData = function() {
		$scope.showData = toggle ? $scope.clientData : $scope.prospectData;

		$scope.totalSign = $scope.showData['changeInTotalLogins'] < 0 ? 'neg' : 'pos';
		$scope.uniqueSign = $scope.showData['changeInUniqueLogins'] < 0 ? 'neg' : 'pos';
		$scope.timeSign = $scope.showData['changeInAvgSessionTime'] < 0 ? 'neg' : 'pos';

		toggle = !toggle;
	};

	$scope.addSign = function(num) {
		if (num >= 0) {
			return '+' + num;
		}

		return num;
	};

	$scope.loginApi = function() {
		return $http.get(clientUrl).then(function mySuccess(clientResponse) {
			$scope.clientData = clientResponse["data"]["data"]["client"];
			$scope.clientData['changeInTotalLogins'] = $scope.addSign($scope.clientData['changeInTotalLogins']);
			$scope.clientData['changeInUniqueLogins'] = $scope.addSign($scope.clientData['changeInUniqueLogins']);
			$scope.clientData['changeInAvgSessionTime'] = $scope.addSign($scope.clientData['changeInAvgSessionTime']);
		}).then(function () {
			return $http.get(prospectUrl).then(function mySuccess1(prospectResponse) {
				$scope.prospectData = prospectResponse["data"]["data"]["prospect"];
				$scope.prospectData['changeInTotalLogins'] = $scope.addSign($scope.prospectData['changeInTotalLogins']);
				$scope.prospectData['changeInUniqueLogins'] = $scope.addSign($scope.prospectData['changeInUniqueLogins']);
				$scope.prospectData['changeInAvgSessionTime'] = $scope.addSign($scope.prospectData['changeInAvgSessionTime']);
			}).then(function assignValue() {
				$scope.toggleLoginData();
			})
		}, function myError(response) {
			$log.error("Error " + response.status + ": " + response.statusText + "!");
		});
	};

	var clientUrl = 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/stats?user=client';
	var prospectUrl = 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/stats?user=prospect';

	this.chart = Highcharts.setOptions(colorTheme);
	chartData.callApi('pie', 'goalsContainer', 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/goals');
	chartData.callApi('area', 'aumContainer', 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/aums');
	chartData.callApi('line', 'netWorthContainer', 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/networth');
	$scope.loginApi();

};
