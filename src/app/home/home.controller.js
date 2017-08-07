angular
	.module('app')
	.controller('HomeController', HomeController)
	.factory('chartData', chartData);

//factory object with methods
function chartData($http, $log, SessionService) {
	var chartData = {};

	chartData.callApi = function (chartType, chartId, show, url) {
		if(!(SessionService.curr_page === "home")) return;
		if (url === null) {
			chartData.createOptions(chartType, chartId, '');
		}
		if (!show) {
			return;
		} else {
			return $http.get(url, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
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

	chartData.titleSelector = function (chartId, apiData) {
		var title;
		if (chartId === "goalsContainer") {
			var total = 0;

			for (var i = 0; i < apiData.length; i++) {
				total += apiData[i].count;
			}

			title = {
				useHTML: true,
				text: "<h1>" + total + "</h1>",
				y: 130,
				floating: true
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

	chartData.subtitleSelector = function (chartId, apiData) {
		var subtitle;

		if (chartId === "goalsContainer") {
			subtitle = {
				useHTML: true,
				text: "<h6> total goals </h6>",
				y: 170,
				floating: true
			};
		} else if (chartId === "aumContainer") {
			subtitle = null;
		} else if (chartId === "netWorthContainer") {
			subtitle = null;
		}

		return subtitle;
	};

	chartData.xAxisSelector = function (chartId, apiData) {
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
			apiData.summary.forEach(function (x) {
				categories.push(x.date);
			});
			xAxis = {
				categories: categories
			};
		}

		return xAxis;
	};

	chartData.yAxisSelector = function (chartId, apiData) {
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

	chartData.tooltipSelector = function (chartId) {
		var tooltip;
		if (chartId === "goalsContainer") {
			tooltip = {
				pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
			};
		} else if (chartId === "aumContainer") {
			tooltip = {
				split: true
			};
		} else if (chartId === "netWorthContainer") {
			tooltip = {
				split: true
			};
		}

		return tooltip;
	};

	chartData.plotOptionsSelector = function (chartId) {
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
		} else if (chartId === "netWorthContainer") {
			options = {

			};
		}

		return options;
	};

	chartData.seriesSelector = function (chartId, apiData) {
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
				data: seriesData,
				innerSize: '75%',
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
		} else if (chartId === "netWorthContainer") {
			apiData = apiData.summary;
			var data = [];
			var clientsDiff = [];
			apiData.forEach(function (x) {
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

	chartData.createOptions = function (chartType, chartId, apiData) {
		var currentOptions = {
			credits: {
				enabled: false
			},
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

	chartData.addSign = function (num) {
		console.log('un function');
		if (num >= 0) {
			return '+' + num;
		}

		return num;
	};

	return chartData;
}

function HomeController($scope, $http, $log, $rootScope, chartData, SessionService) {

	HomeController.self = this; // singleton
	$scope.$http = $http;
	this.$log = $log;

	SessionService.refreshCanceller();
	SessionService.curr_page = "home";
	var DOMAIN = "http://10.1.15.102:8080";
	//var DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend"

	this.total = 0;
	//var DOMAIN = $scope.domain;

	var DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/"
	var clientUrl = DOMAIN + '/bi/stats?user=client';
	var prospectUrl = DOMAIN + '/bi/stats?user=prospect';
	var colorTheme = {colors: ["#000285", "#11BEDF", "#40B349", "#A1CB39", "#ACE6F9", "#FCCC08"]};
	var loginsToggle = true;
	var goalsGrid = {};
	var aumGrid = {};
	var netWorthGrid = {};
	var loginsGrid = {};

	//default position
	var goalsDefault = {x: 0, y: 0, height: 7, width: 2};
	var aumDefault = {x: 4, y: 0, height: 7, width: 4};
	var netWorthDefault = {x: 0, y: 13, height: 7, width: 6};
	var loginsDefault = {x: 0, y: 7, height: 6, width: 6};

	goalsGrid = $scope.goalsDefault;
	aumGrid = $scope.aumDefault;
	netWorthGrid = $scope.netWorthDefault;
	loginsGrid = $scope.loginsDefault;

	$scope.goalsGrid = goalsDefault;
	$scope.aumGrid = aumDefault;
	$scope.netWorthGrid = netWorthDefault;
	$scope.loginsGrid = loginsDefault;

	var storeGrid = function(items) {
		for (var i=0;i<Object.keys(items).length;i++) {
			if (items[i]['id'] === 'goalsContainer' && $scope.goalsShow) {
				goalsGrid['x'] = items[i]['x'];
				goalsGrid['y'] = items[i]['y'];
				goalsGrid['height'] = items[i]['height'];
				goalsGrid['width'] = items[i]['width'];
			} else if (items[i]['id'] === 'aumContainer' && $scope.aumShow) {
				aumGrid['x'] = items[i]['x'];
				aumGrid['y'] = items[i]['y'];
				aumGrid['height'] = items[i]['height'];
				aumGrid['width'] = items[i]['width'];
			} else if (items[i]['id'] === 'netWorthContainer' && $scope.netWorthShow) {
				netWorthGrid['x'] = items[i]['x'];
				netWorthGrid['y'] = items[i]['y'];
				netWorthGrid['height'] = items[i]['height'];
				netWorthGrid['width'] = items[i]['width'];
			} else if (items[i]['id'] === 'loginsContainer' && $scope.loginsShow) {
				loginsGrid['x'] = items[i]['x'];
				loginsGrid['y'] = items[i]['y'];
				loginsGrid['height'] = items[i]['height'];
				loginsGrid['width'] = items[i]['width'];
			}
		}
	};

	var addSign = function (num) {
		if (num >= 0) {
			return '+' + num;
		}

		return num;
	};

	var useDefault = function () {
		$scope.goalsGrid = goalsDefault;
		$scope.aumGrid = aumDefault;
		$scope.netWorthGrid = netWorthDefault;
		$scope.loginsGrid = loginsDefault;

		$scope.goalsShow = true;
		$scope.aumShow = true;
		$scope.netWorthShow = true;
		$scope.loginsShow = true;

		chartData.callApi('pie', 'goalsContainer', $scope.goalsShow, DOMAIN + '/bi/goals');
		chartData.callApi('area', 'aumContainer', $scope.aumShow, DOMAIN + '/bi/aums');
		chartData.callApi('line', 'netWorthContainer', $scope.netWorthShow, DOMAIN + '/bi/networth');
		$scope.loginApi($scope.loginsShow);
	}

	var useCustom = function (response) {
		$scope.goalsGrid = response.data.goals;
		$scope.aumGrid = response.data.aum;
		$scope.netWorthGrid = response.data.netWorth;
		$scope.loginsGrid = response.data.logins;

		if (response.data.goals === null) {$scope.goalsShow = false;} else {$scope.goalsShow = true;}
		if (response.data.aum === null) {$scope.aumShow = false;} else {$scope.aumShow = true;}
		if (response.data.netWorth === null) {$scope.netWorthShow = false;} else {$scope.netWorthShow = true;}
		if (response.data.logins === null) {$scope.loginsShow = false;} else {$scope.loginsShow = true;}

		chartData.callApi('pie', 'goalsContainer', $scope.goalsShow, DOMAIN + '/bi/goals');
		chartData.callApi('area', 'aumContainer', $scope.aumShow, DOMAIN + '/bi/aums');
		chartData.callApi('line', 'netWorthContainer', $scope.netWorthShow, DOMAIN + '/bi/networth');
		$scope.loginApi($scope.loginsShow);

		if (!$scope.goalsShow) {$scope.remove('goals');}
		if (!$scope.aumShow) {$scope.remove('aum');}
		if (!$scope.netWorthShow) {$scope.remove('netWorth');}
		if (!$scope.loginsShow) {$scope.remove('logins');}
	}

	var redrawCharts = function () {
		var goals = $('#goalsContainer').highcharts();
		var aum = $('#aumContainer').highcharts();
		var networth = $('#netWorthContainer').highcharts();

		if ($scope.goalsShow) {
			goals.reflow();
		}
		if ($scope.aumShow) {
			aum.reflow();
		}
		if ($scope.netWorthShow){
			networth.reflow();
		}
	};

	$scope.addRemove = function () {
		goalsGrid = $scope.goalsShow ? goalsDefault : null;
		aumGrid = $scope.aumShow ? aumDefault : null;
		netWorthGrid = $scope.netWorthShow ? netWorthDefault : null;
		loginsGrid = $scope.loginsShow ? loginsDefault : null;

		$scope.saveGridData(1);
	};

	$scope.reset = function() {
		console.log('reset');

		$scope.goalsGrid = goalsDefault;
		$scope.aumGrid = aumDefault;
		$scope.netWorthGrid = netWorthDefault;
		$scope.loginsGrid = loginsDefault;

		goalsGrid = goalsDefault;
		aumGrid = aumDefault;
		netWorthGrid = netWorthDefault;
		loginsGrid = loginsDefault;

		$scope.saveGridData(1);
	};

	$scope.remove = function (id) {
		var grid = $('.grid-stack').data('gridstack');
		var element = document.getElementById(id);
		grid.removeWidget(element); //using provided api
		if (id === 'goals') {
			$scope.goalsShow = false;
		} else if (id === 'aum') {
			$scope.aumShow = false;
		} else if (id === 'netWorth') {
			$scope.netWorthShow = false;
		} else if (id === 'logins') {
			$scope.loginsShow = false;
		}
	};

	$scope.toggleLoginData = function () {
		$scope.showData = loginsToggle ? $scope.clientData : $scope.prospectData;

		$scope.totalSign = $scope.showData['changeInTotalLogins'] < 0 ? 'neg' : 'pos';
		$scope.uniqueSign = $scope.showData['changeInUniqueLogins'] < 0 ? 'neg' : 'pos';
		$scope.timeSign = $scope.showData['changeInAvgSessionTime'] < 0 ? 'neg' : 'pos';

		loginsToggle = !loginsToggle;
	};

	$scope.loginApi = function (show) {
		if (!show) {return;}
		return $http.get(clientUrl, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(clientResponse) {
			$scope.clientData = clientResponse["data"]["data"]["client"];

			$scope.clientData['changeInTotalLogins'] = addSign($scope.clientData['changeInTotalLogins']);
			$scope.clientData['changeInUniqueLogins'] = addSign($scope.clientData['changeInUniqueLogins']);
			$scope.clientData['changeInAvgSessionTime'] = addSign($scope.clientData['changeInAvgSessionTime']);
		}).then(function () {
			return $http.get(prospectUrl, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess1(prospectResponse) {
				$scope.prospectData = prospectResponse["data"]["data"]["prospect"];

				$scope.prospectData['changeInTotalLogins'] = addSign($scope.prospectData['changeInTotalLogins']);
				$scope.prospectData['changeInUniqueLogins'] = addSign($scope.prospectData['changeInUniqueLogins']);
				$scope.prospectData['changeInAvgSessionTime'] = addSign($scope.prospectData['changeInAvgSessionTime']);
			}).then(function assignValue() {
				$scope.toggleLoginData();
			})
		}, function myError(response) {
			$log.error("Error " + response.status + ": " + response.statusText + "!");
		});
	};

	$scope.getGridData = function() {
		return $http.get(DOMAIN + '/bi/grid-config/' + SessionService.user_id, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
		// return $http.get('http://10.1.15.102:8080/bi/grid-config/' + SessionService.user_id, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
			if (response.data === null) {
				console.log('if');
				useDefault();
			} else {
				console.log('else');
				useCustom(response);
			}
		}, function myError(response) {
			$log.error("Error " + response.status + ": " + response.statusText + "!");
		});
	};

	$scope.saveGridData = function(reset) {
		var gridData = {
			userId: SessionService.user_id,
			goals: goalsGrid,
			aum: aumGrid,
			netWorth: netWorthGrid,
			logins: loginsGrid
		};
		return $http.post(DOMAIN + '/bi/grid-config', gridData).then(function mySuccess(response) {
		// return $http.post('http://10.1.15.102:8080/bi/grid-config/', gridData).then(function mySuccess(response) {
			console.log('reset');
			if (reset) $window.location.reload();
		}, function myError(response) {
			console.log('err');
		});
	};

	$scope.closeDialog = function () {
		$mdDialog.hide();
	}

	var formHTML = `
			<md-dialog>
				<md-dialog-content>
					<header>Add or Remove Tiles</header>
					<md-switch ng-model="goalsShow">Goals</md-switch>
					<md-switch ng-model="aumShow">Assets Under Management</md-switch>
					<md-switch ng-model="netWorthShow">Net Worth</md-switch>
					<md-switch ng-model="loginsShow">Logins</md-switch>
				</md-dialog-content>
				<md-dialog-actions>
					<md-button ng-click="closeDialog()" class="md-primary">Close</md-button>
					<md-button ng-click="saveGridData()"style="background-color:#11BEDF">Save</md-button>
				</md-dialog-actions>
			</md-dialog>
		`;

	$scope.showForm = function (ev) {
		console.log('show');
		$mdDialog.show({
            controller: HomeController,
            template: formHTML,
			preserveScope: true,
            parent: angular.element(document.getElementById('main-container')),
            targetEvent: ev,
            scope: $scope,
            clickOutsideToClose: true
        });
	}

	SessionService.role_promise.then(function mySuccess() {
		console.log(SessionService.user_id);
		$scope.getGridData();
	});

	this.chart = Highcharts.setOptions(colorTheme);


	//jQuery for gridstack
	$(function () {
		var gridOptions = {
			float: false,
			width: 6
		};
		$('.grid-stack').gridstack(gridOptions);
		$('.grid-stack').on('change', function(event, items) {
			redrawCharts(); //redraw highcharts to match new dimensions after every change
			if (items !== undefined) {storeGrid(items);}//store new position after every change
		});
	});

};
