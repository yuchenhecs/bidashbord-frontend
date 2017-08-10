angular
	.module('app')
	.controller('HomeController', HomeController)
	.factory('chartData', chartData);

//factory object with methods
function chartData($http, $log, SessionService) {
	var chartData = {};

	chartData.callApi = function (chartType, chartId, show, url) {
		//if(!(SessionService.curr_page === "home")) return;
		if (url === null) {
			chartData.createOptions(chartType, chartId, '');
		}
		if (!show) return;
		else {
			return $http.get(url, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
				var apiData = response.data;
				if (chartId === "netWorthContainer") console.log(apiData);
				if (chartId !== null) {
					chartData.createOptions(chartType, chartId, apiData);
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
				text: "<h6> Total Goals </h6>",
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
			apiData.forEach(function (x) {
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
		if (num >= 0) {
			return '+' + num;
		}

		return num;
	};

	return chartData;
}

function HomeController($scope, $http, $log, $rootScope, $mdDialog, $window, chartData, SessionService) {

	HomeController.self = this; // singleton
	$scope.$http = $http;
	this.$log = $log;

	SessionService.refreshCanceller();
	SessionService.curr_page = "home";
	//var DOMAIN = "http://10.1.15.102:8080";

	this.total = 0;
	//var DOMAIN = $scope.domain;

	var DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend"
	var clientUrl = DOMAIN + '/bi/stats?user=client';
	var prospectUrl = DOMAIN + '/bi/stats?user=prospect';
	var colorTheme = {colors: ["#000285", "#11BEDF", "#40B349", "#A1CB39", "#ACE6F9", "#FCCC08"]};
	var loginsToggle = true;

	//default position
	var goalsDefault = {x: 0, y: 0, height: 7, width: 4};
	var aumDefault = {x: 5, y: 0, height: 7, width: 8};
	var netWorthDefault = {x: 0, y: 13, height: 7, width: 12};
	var loginsDefault = {x: 0, y: 7, height: 7, width: 12};

	var goalsGrid = goalsDefault;
	var aumGrid = aumDefault;
	var netWorthGrid = netWorthDefault;
	var loginsGrid = loginsDefault;

	var editHTML = `
		<md-dialog>
			<md-dialog-content class="md-dialog-content">
				<strong>Add or Remove Tiles</strong>
				<md-switch ng-model="goalsShow">Goals</md-switch>
				<md-switch ng-model="aumShow">Assets Under Management</md-switch>
				<md-switch ng-model="netWorthShow">Net Worth</md-switch>
				<md-switch ng-model="loginsShow">Logins</md-switch>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button ng-click="closeDialog()"style="background-color:#11BEDF">Cancel</md-button>
				<md-button ng-click="addRemove()"style="background-color:#11BEDF">Save</md-button>
			</md-dialog-actions>
		</md-dialog>
	`;

	var confirmHTML = `
	<md-dialog>
		<md-dialog-content class="md-dialog-content">
			<strong>Tile Settings Saved</strong>
			<h6 style="margin-top:25px;">Your tile positions have been saved</h6>
		</md-dialog-content>
		<md-dialog-actions>
			<md-button ng-click="closeDialog()"style="background-color:#11BEDF">OK</md-button>
		</md-dialog-actions>
	</md-dialog>
	`;

////////function declarations
	//login api
	var addSign = function (num) {
		if (num >= 0) {
			return '+' + num;
		}

		return num;
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
			$scope.clientData = clientResponse.data;

			$scope.clientData['changeInTotalLogins'] = addSign($scope.clientData['changeInTotalLogins']);
			$scope.clientData['changeInUniqueLogins'] = addSign($scope.clientData['changeInUniqueLogins']);
			$scope.clientData['changeInAvgSessionTime'] = addSign($scope.clientData['changeInAvgSessionTime']);
		}).then(function () {
			return $http.get(prospectUrl, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess1(prospectResponse) {
				$scope.prospectData = prospectResponse.data;

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
	//end login api

	//grid functions
	$scope.getGridData = function() {
		return $http.get(DOMAIN + '/bi/grid-config/' + SessionService.user_id, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
			if (response.data === null) useDefault();
			else useCustom(response.data);
			//hide loading, then show grid
			var loading = document.getElementById("dialog-loading");
			loading.style['visibility'] = "hidden";
			var grid = document.getElementById('grid');
			grid.style['visibility'] = 'visible';
		}, function myError(response) {
			$log.error("Error " + response.status + ": " + response.statusText + "!");
		});
	};

	//use defualt grid options when response is null
	var useDefault = function () {
		//set grid to defualt values
		$scope.goalsGrid = goalsDefault;
		$scope.aumGrid = aumDefault;
		$scope.netWorthGrid = netWorthDefault;
		$scope.loginsGrid = loginsDefault;

		setTimeout(function() {
			var gridOptions = {
				float: false,
				width: 12
			};
			$('.grid-stack').gridstack(gridOptions);
			$('.grid-stack').on('change', function(event, items) {
				redrawCharts(); //redraw highcharts to match new dimensions after every change
				if (items !== undefined) {storeGrid(items);}//store new position after every change
			});
		}, 10)

		//show all on default
		$scope.goalsShow = true;
		$scope.aumShow = true;
		$scope.netWorthShow = true;
		$scope.loginsShow = true;

		//draw charts
		chartData.callApi('pie', 'goalsContainer', $scope.goalsShow, DOMAIN + '/bi/goals');
		chartData.callApi('area', 'aumContainer', $scope.aumShow, DOMAIN + '/bi/aums');
		chartData.callApi('line', 'netWorthContainer', $scope.netWorthShow, DOMAIN + '/bi/networth');
		$scope.loginApi($scope.loginsShow);
	}

	//use custom grid options if available
	var useCustom = function (response) {
		//set grid to saved values
		$scope.goalsGrid = response.goals;
		$scope.aumGrid = response.aum;
		$scope.netWorthGrid = response.netWorth;
		$scope.loginsGrid = response.logins;

		//if null, don't show grid, temporarily give tile non null values before removing
		if (response.goals === null) {$scope.goalsShow = false; $scope.goalsGrid = {x:0,y:0,height:7,width:0};} else {$scope.goalsShow = true;}
		if (response.aum === null) {$scope.aumShow = false; $scope.aumGrid = {x:0,y:0,height:7,width:0};} else {$scope.aumShow = true;}
		if (response.netWorth === null) {$scope.netWorthShow = false; $scope.netWorthGrid = {x:0,y:0,height:7,width:0};} else {$scope.netWorthShow = true;}
		if (response.logins === null) {$scope.loginsShow = false; $scope.loginsGrid = {x:0,y:0,height:7,width:0};} else {$scope.loginsShow = true;}

		setTimeout(function() {
			var gridOptions = {
				float: false,
				width: 12
			};
			$('.grid-stack').gridstack(gridOptions);
			$('.grid-stack').on('change', function(event, items) {
				//highlight greyed out save button
				var save = document.getElementById('gridSave');
				var fauxSave = document.getElementById('fauxGridSave');
				save.style['display'] = 'inline';
				fauxSave.style['display'] = 'none';
				redrawCharts(); //redraw highcharts to match new dimensions after every change
				if (items !== undefined) {storeGrid(items);}//store new position after every change
			});

			//remove only after grid has been made
			if (!$scope.goalsShow) {$scope.remove('goals');}
			if (!$scope.aumShow) {$scope.remove('aum');}
			if (!$scope.netWorthShow) {$scope.remove('netWorth');}
			if (!$scope.loginsShow) {$scope.remove('logins');}
		}, 10);

		//draw charts depending on $scope.***Show
		chartData.callApi('pie', 'goalsContainer', $scope.goalsShow, DOMAIN + '/bi/goals');
		chartData.callApi('area', 'aumContainer', $scope.aumShow, DOMAIN + '/bi/aums');
		chartData.callApi('line', 'netWorthContainer', $scope.netWorthShow, DOMAIN + '/bi/networth');
		$scope.loginApi($scope.loginsShow);
	}

	//used in edit button, re-add or remove tiles
	$scope.addRemove = function () {
		goalsGrid = $scope.goalsShow ? goalsDefault : null;
		aumGrid = $scope.aumShow ? aumDefault : null;
		netWorthGrid = $scope.netWorthShow ? netWorthDefault : null;
		loginsGrid = $scope.loginsShow ? loginsDefault : null;

		$scope.saveGridData(1, null);
	};

	//used in save button
	$scope.saveGridData = function(reset, ev) {
		var gridData = {
			userId: SessionService.user_id,
			goals: goalsGrid,
			aum: aumGrid,
			netWorth: netWorthGrid,
			logins: loginsGrid
		};
		return $http.post(DOMAIN + '/bi/grid-config', gridData, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
			if (reset) $window.location.reload();
			if (ev !== null) showConfirmation(ev);
		}, function myError(response) {
			$log.error(response);
		});
	};

	//remove tiles
	$scope.remove = function (id) {
		if (id === 'goals') {
			$scope.goalsShow = false;
			goalsGrid = null;
		} else if (id === 'aum') {
			$scope.aumShow = false;
			aumGrid = null;
		} else if (id === 'netWorth') {
			$scope.netWorthShow = false;
			netWorthGrid = null;
		} else if (id === 'logins') {
			$scope.loginsShow = false;
			loginsGrid = null;
		}
		var grid = $('.grid-stack').data('gridstack');
		var element = document.getElementById(id);
		if (element !== null && grid !== undefined) grid.removeWidget(element); //using provided api
	};

	//store dimensions and positions for each tile
	var storeGrid = function(items) {
		for (var i=0;i<Object.keys(items).length;i++) {
			if (items[i].id === 'goalsContainer' && $scope.goalsShow) {
				goalsGrid.x = items[i].x;
				goalsGrid.y = items[i].y;
				goalsGrid.height = items[i].height;
				goalsGrid.width = items[i].width;
			} else if (items[i].id === 'aumContainer' && $scope.aumShow) {
				aumGrid.x = items[i].x;
				aumGrid.y = items[i].y;
				aumGrid.height = items[i].height;
				aumGrid.width = items[i].width;
			} else if (items[i].id === 'netWorthContainer' && $scope.netWorthShow) {
				netWorthGrid.x = items[i].x;
				netWorthGrid.y = items[i].y;
				netWorthGrid.height = items[i].height;
				netWorthGrid.width = items[i].width;
			} else if (items[i].id === 'loginsContainer' && $scope.loginsShow) {
				loginsGrid.x = items[i].x;
				loginsGrid.y = items[i].y;
				loginsGrid.height = items[i].height;
				loginsGrid.width = items[i].width;
			}
		}
	};

	//redraw using highcharts provided function
	var redrawCharts = function () {
		var goals = $('#goalsContainer').highcharts();
		var aum = $('#aumContainer').highcharts();
		var networth = $('#netWorthContainer').highcharts();

		if ($scope.goalsShow && goals !== undefined) {
			goals.reflow();
		}
		if ($scope.aumShow && aum !== undefined) {
			aum.reflow();
		}
		if ($scope.netWorthShow && networth !== undefined){
			networth.reflow();
		}
	};

	//dialog related functions
	var showConfirmation = function(ev) {
		$mdDialog.show({
			template: confirmHTML,
			preserveScope: true,
			parent: angular.element(document.getElementById('main-container')),
			targetEvent: ev,
			scope: $scope,
			clickOutsideToClose: true,
			escapeToClose: true
		});
	};

	$scope.closeDialog = function () {
		$mdDialog.hide();
	}

	$scope.showForm = function (ev) {
		$mdDialog.show({
            template: editHTML,
			preserveScope: true,
            parent: angular.element(document.getElementById('main-container')),
            targetEvent: ev,
            scope: $scope,
            clickOutsideToClose: true,
			escapeToClose: true
        });
	}
	//end dialog related functions
//////end function declarations


	//hide grid until it's done loading
	var grid = document.getElementById('grid');
	grid.style['visibility'] = 'hidden';

	SessionService.role_promise.then(function mySuccess() {$scope.getGridData();});

	this.chart = Highcharts.setOptions(colorTheme);

};
