angular
    .module('app')
    .controller('MGoalsController', MGoalsController);

function MGoalsController() {
	var vm = this;

    vm.mainGridOptions = {
        dataSource: {
            data: [{ Name: "Stable Earnings", RiskLevel: "Conservative", Source: "Vanguard", Type: "ClassModel", ExpenseRatio: "20%", StandardDevition: "1%", ThreeMonthReturn: "2%", OneYearReturn: "3%", ThreeYearReturn: "4%", FiveYearReturn: "5%" },
            { Name: "Tmo Seven", RiskLevel: "Moderate", Source: "Vanguard" },
            { Name: "Senior Care", RiskLevel: "Balanced", Source: "Vanguard" },
            { Name: "Gold All the Way", RiskLevel: "Aggressive", Source: "BlackRock" }],
            schema: {
                model: {
                    fields: {
                        Name: { type: "string" },
                        RiskLevel: { type: "string" },
                        Source: { type: "string" },
                        Type: { type: "string" },
                        ExpenseRatio: { type: "string" },
                        StandardDevition: { type: "string" },
                        ThreeMonthReturn: { type: "string" },
                        OneYearReturn: { type: "string" },
                        ThreeYearReturn: { type: "string" },
                        FiveYearReturn: { type: "string" }
                    }
                }
            },
            pagesize: 10,
        },
        sortable: true,
        pageable: true,
        height: 500,
        filterable: {
            mode: "row"
        },
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [{
            field: "Id",
            title: "Name",
            width: 150,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    operator: "contains",
                    width: 150,
                    height: 30
                }
            },
            template: "<a href='\\#' class='templateLink' ng-click='details.open()' style='color:viking;text-decoration:none;'>#=Name#</a>"
        }, {
            field: "RiskLevel",
            title: "Risk Level",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    operator: "contains",
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "Source",
            title: "Vendor",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    operator: "contains",
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "Type",
            title: "Type",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "ExpenseRatio",
            title: "Expense Ratio",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "StandardDevition",
            title: "Standard Devition",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "ThreeMonthReturn",
            title: "Three Month Return",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "OneYearReturn",
            title: "One Year Return",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "ThreeYearReturn",
            title: "Three Year Return",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "FiveYearReturn",
            title: "Five Year Return",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }]
    };

    vm.windowOptions = {
        modal: true,
        draggable: true,
        width: 1425,
        height: 444,
        title: "Grid Window",
        actions: ['Close'],
        visible: false,
        animation: {
            open: {
                effects: "slideIn:left fadeIn",
                duration: 500
            },
            close: {
                effects: "slideIn:left fadeIn",
                reverse: true,
                duration: 500
            }
        },
        position: {
            // top: 135,
            top: angular.element('#grid').offset().top,
            left: 448
        },
        resizable: true
    };

    vm.chartsConfig = {
        history: {
            chart: {
                type: 'pie',
                height: 350
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            tooltip: {
                shared: true
            },
            legend: {
                align: 'right',
                verticalAlign: 'center',
                layout: 'vertical',
                x: 0,
                y: 100
            },
            series: [{
                showInLegend: true,
                innerSize: '50%'
            }],
            title: {
                text: 'Stable Earnings',
                align: 'left'
            },
            credits: {
                enabled: false
            }
        }
    };
    vm.chartsConfig.history.series[0].data = [{
        name: 'US Bond',
        y: 22,
        color: '#C0C0C0'
    }, {
        name: 'US Stock',
        y: 18,
        color: '#C0C0C0'
    }, {
        name: 'Non US Bond',
        y: 24,
        color: '#A9A9A9'
    }, {
        name: 'Non US Stock',
        y: 16,
        color: '#808080'
    }, {
        name: 'Cash',
        y: 20,
        color: '#696969'
    }];

    vm.detailGridOptions = {
        selectable: true,
        resizable: true,
        pageable: false,
        editable: false,
        height: 70,
        dataSource: {
            //type: "odata",
            //transport: {
            //    read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            //},
            data: [{ Name: "Stable Earnings", RiskLevel: "Conservative", Source: "Vanguard", Type: "ClassModel", ExpenseRatio: "20%", StandardDevition: "1%", ThreeMonthReturn: "2%", OneYearReturn: "3%", ThreeYearReturn: "4%", FiveYearReturn: "5%" }],
        },
        columns: [{
            field: "ExpenseRatio",
            title: "Expense Ratio",
            width: "120px",
        }, {
            field: "StandardDevition",
            title: "Standard Devition",
            width: "120px"
        }, {
            field: "ThreeMonthReturn",
            title: "Three Month Return",
            width: "120px"
        }, {
            field: "OneYearReturn",
            title: "One Year Return",
            width: "120px"
        }, {
            field: "ThreeYearReturn",
            title: "Three Year Return",
            width: "120px"
        }, {
            field: "FiveYearReturn",
            title: "Five Year Return",
            width: "120px"
        }]
    }
};





































// angular
// 	.module('app');
// 	// .service('MetricsController', MetricsController);

// class MetricsController {
// 	constructor($http, $scope, $compile, $sce) {
// 		'ngInject';
// 		// constants
// 		this.DOMAIN = $scope.domain;
// 		this.MAX_COLUMN_NUM = 15;
// 		this.SUB_DOMAIN = "/bi/goals";
// 		this.TITLE_TEMPLATE = "Total goals created by ";
// 		this.USE_DUMMY_DATA = false;
// 		this.controllerName = null;
// 		this.today = new Date();


// 		var colorTheme = {
// 			colors: ["#000285", "#11BEDF", "#40B349", "#A1CB39", "#ACE6F9", "#FCCC08"]
// 		};

// 		Highcharts.setOptions(colorTheme);

// 		// init
// 		MetricsController.self = this; // singleton
// 		this.$http = $http;
// 		this.$scope = $scope;
// 		this.$compile = $compile;

// 		this.chart = null;

// 		this.level_list = [];
// 		this.startDate = null;
// 		this.endDate = null;
// 		this.isRequired = false;
// 		this.current_level = 0;

// 		this.canLoadMore = false;

// 		// tooltip formatter
// 		var formatter = function () {

// 			var s = '<b>' + this.x + '</b>';
// 			this.points.forEach(function (element) {
// 				//element.hover
// 				if (element.y == 0 || element.y == undefined || element.y == null) {
// 					return;
// 				}
// 				s += '<br/>' + element.series.name + ': ' + element.y;
// 			});
// 			return s;
// 		}

// 		// chart bar onclick event
// 		var chartOnClick = function () {
// 			MetricsController.self.drillDown(this.category, this.id);
// 		}

// 		var chartOnRedraw = function (event) {
// 			var self = MetricsController.self;
// 			if (this.xAxis) {

// 				var extremes = this.xAxis[0].getExtremes();
// 				if (extremes && extremes.max == extremes.dataMax) {
// 					var current_level = self.level_list[self.current_level];
// 					var last = current_level['last'];

// 					if (last) {
// 						return;
// 					}

// 					if (self.canLoadMore) {
// 						self.canLoadMore = false;
// 						self.getData(current_level['name'], current_level['id'], current_level['page'] + 1);
// 					}
// 				}
// 			}
// 		}

// 		//chart option template
// 		this.optionTemplate = {
// 			credits: {
// 				enabled: false
// 			},
// 			chart: {
// 				type: 'column',
// 				zoomType: 'y',
// 				events: {
// 					load: this.chartOnLoad,
// 					redraw: chartOnRedraw
// 				},
// 			},
// 			title: null,
// 			xAxis: null,
// 			yAxis: {
// 				min: 0,
// 				title: {
// 					text: 'Number of goals'
// 				},
// 				stackLabels: {
// 					enabled: true,
// 					style: {
// 						fontWeight: 'bold',
// 						color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
// 					}
// 				}
// 			},
// 			legend: {
// 				align: 'right',
// 				verticalAlign: 'top',
// 				x: -30,
// 				y: 40,
// 				floating: true,
// 				backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
// 				borderColor: '#CCC',
// 				borderWidth: 1,
// 				shadow: false,
// 				itemHoverStyle: {
// 					cursor: 'auto'
// 				}
// 			},
// 			tooltip: {
// 				formatter: formatter,
// 				shared: true
// 			},
// 			plotOptions: {
// 				series: {
// 					cursor: 'pointer',
// 					point: {
// 						events: {
// 							click: chartOnClick
// 						}
// 					}
// 				},
// 				column: {
// 					stacking: 'normal',
// 					dataLabels: {
// 						enabled: false,
// 						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
// 					},
// 					events: {
// 						legendItemClick: function () {
// 							return false;
// 						}
// 					}
// 				}
// 			},
// 			series: null
// 		};



// 		$scope.$watch(function () {
// 			return angular.element(document.getElementById("main")).attr('class');
// 		}, function (newValue) {
// 			var chart = MetricsController.self.chart;

// 			if (chart != null) {
// 				setTimeout(function (c) {
// 					c.reflow();
// 				}, 300, chart);
// 			}
// 		});

// 	}




// 	launch() {
// 		var root = 'Oranj';  // dummy root name, should be returned by Oranj API
// 		var rootId = -1;
// 		this.getData(root, rootId, 0);
// 		this.createDatepicker();
// 		this.canLoadMore = true;// can load more data when scrolling to the right now

// 	}









// 	//------------------------------------datepicker---------------------------------------------------------------

// 	assignYTD() {
// 		this.startDate = new Date(new Date().getFullYear(), 0, 1);
// 		this.endDate = new Date();

// 		this.applyDateFilter();
// 	}

// 	clearDate() {
// 		this.endDate = null;
// 		this.startDate = null;

// 		this.applyDateFilter();

// 	}

// 	checkDate() {
// 		if (this.endDate != null) {
// 			this.endDate = this.startDate > this.endDate ? this.startDate : this.endDate;
// 		}

// 		this.applyDateFilter();
// 	}

// 	applyDateFilter() {
// 		if (!this.validateDate()) {
// 			this.getData(this.level_list[this.current_level]['name'], this.level_list[this.current_level]['id'], 0);
// 		}
// 	}


// 	validateDate() {
// 		var startDate_X = this.level_list[this.current_level + 0]['start'];
// 		startDate_X = startDate_X == null ? null : startDate_X.getTime();

// 		var startDate_Y = this.startDate;
// 		startDate_Y = startDate_Y == null ? null : startDate_Y.getTime();

// 		var endDate_X = this.level_list[this.current_level + 0]['end'];
// 		endDate_X = endDate_X == null ? null : endDate_X.getTime();

// 		var endDate_Y = this.endDate;
// 		endDate_Y = endDate_Y == null ? null : endDate_Y.getTime();

// 		return (startDate_X == startDate_Y && endDate_X == endDate_Y)
// 	}

// 	createDatepicker() {
// 		var ctrl = this.controllerName;
// 		var datePickerHTML = `
// 		<div>
// 			 <div layout="row"  layout-align="center center">
// 				<form name="startForm">
// 				<md-input-container style="margin-bottom: 0px !important;">
// 					<label>Start date</label>
// 					<md-datepicker ng-model="`+ ctrl + `.startDate" name="dateField" md-max-date="` + ctrl + `.today"
// 					ng-change="`+ ctrl + `.checkDate()" md-open-on-focus ng-required="` + ctrl + `.isRequired"></md-datepicker>

// 					<div ng-messages="startForm.dateField.$error">
// 					<div ng-message="valid">The entered value is not a date!</div>
// 					<div ng-message="required">This date is required!</div>
// 					<div ng-message="mindate">Date is too early!</div>
// 					<div ng-message="maxdate">Date is too late!</div>
// 					</div>
// 				</md-input-container>
// 				</form>

// 				<form name="endForm">
// 				<md-input-container style="margin-bottom: 0px !important;">
// 					<label>End date</label>
// 					<md-datepicker ng-model="`+ ctrl + `.endDate" name="dateField" md-min-date="` + ctrl + `.startDate"
// 					md-max-date="`+ ctrl + `.today" ng-change="` + ctrl + `.checkDate()" md-open-on-focus ng-required="` + ctrl + `.isRequired"></md-datepicker>

// 					<div ng-messages="endForm.dateField.$error">
// 					<div ng-message="valid">The entered value is not a date!</div>
// 					<div ng-message="required">This date is required!</div>
// 					<div ng-message="mindate">Date is too early!</div>
// 					<div ng-message="maxdate">Date is too late!</div>
// 					</div>
// 				</md-input-container>
// 				</form>

// 				<md-button class=" md-raised" ng-click="`+ ctrl + `.clearDate()" ng-hide="` + ctrl + `.isRequired">Clear</md-button>
// 				<md-button class="md-primary md-raised" ng-click="`+ ctrl + `.assignYTD()">YTD</md-button>
// 			</div>
//   		</div>
//   		`;

// 		var chartHTML = angular.element(document.getElementById("chart-container"));
// 		chartHTML.append(this.$compile(datePickerHTML)(this.$scope));
// 	}









// 	//----------------------------------chart utilities-----------------------------------------------------------------
// 	// chart onload event
// 	chartOnLoad(event) {
// 		var self = MetricsController.self;
// 		self.baseChartOnLoad(this);
// 	}


// 	baseChartOnLoad(chart) {
// 		console.log(chart);
// 		//debugger;
// 		var xSetMax = this.MAX_COLUMN_NUM;
// 		var xDataMax = chart.xAxis[0].getExtremes().dataMax;
// 		var xMax = xDataMax < xSetMax ? xDataMax : xSetMax;

// 		// var yDataMax = chart.yAxis[0].getExtremes().dataMax;
// 		// var yMax = yDataMax * 1.1;

// 		// if (xMax == xDataMax) {
// 		// 	chart.xAxis[0].update({
// 		// 		scrollbar: {
// 		// 			enabled: false
// 		// 		}
// 		// 	});
// 		// }

// 		chart.xAxis[0].update({
// 			max: xMax
// 		});

// 		// chart.yAxis[0].update({
// 		// 	max: yMax
// 		// });


// 		this.createPathSelector(chart); // create new path selector on top left
// 		chart.renderer.text("Zoom in by drag & select ", 20, 40).css({ fontSize: '10px' }).add();

// 	}

// 	showLoading() {
// 		if (this.chart != null) {
// 			this.chart.showLoading('Loading...');
// 		}
// 	}

// 	hideLoading() {
// 		if (this.chart != null) {
// 			this.chart.hideLoading();
// 		}
// 	}









// 	//----------------------------------path selector-----------------------------------------------------------------


// 	//path selector 
// 	createPathSelector(chart) {
// 		var pathHTML = this.generatePathSelectorHTML();

// 		//TODO: remove hardcoded data
// 		chart.renderer.text(pathHTML, 12, 15).attr({ id: 'path-selector' }).css({ fontSize: '13px' }).add();

// 		var pathBlocks = document.querySelectorAll('#path-selector tspan');

// 		var flag = false;
// 		var i = 0;

// 		pathBlocks.forEach(function (element) {
// 			if (flag == true) {
// 				if (i === MetricsController.self.current_level) {
// 					element.classList.add("curr-path-link");
// 				}
// 				element.setAttribute('data-level', i);
// 				element.classList.add("path-link");
// 				element.onclick = function () {
// 					MetricsController.self.pathOnClick(this);
// 				};
// 				i++;
// 			}

// 			flag = !flag;
// 		});
// 	}

// 	pathOnClick(element) {

// 		var level = parseInt(element.dataset.level);
// 		//drill up 
// 		MetricsController.self.drillToLevel(level);
// 		// shouldn't replace the chart until this onClick function terminates
// 		// it seems that Promise is too faster and still causes error compared to setTimeOut
// 		// could fix later
// 		setTimeout(function () { MetricsController.self.createChart(); }, 10);

// 	}

// 	//TODO: only show levels that the user is authorized to see 
// 	generatePathSelectorHTML() {
// 		var output = "Path:";

// 		this.level_list.forEach(function (element) {
// 			output += '<a>' + element['name'] + '</a>' + '>';
// 		});

// 		return output.slice(0, -1);
// 	}

// 	removeFromLevel(level) {
// 		this.level_list = this.level_list.slice(0, level);
// 	}

// 	drillDown(name, id) {
// 		this.canLoadMore = false;
// 		if (this.current_level >= 2) {
// 			alert('Cannot drilldown anymore!');
// 			return; //level number overflowed, cannot drilldown anymore
// 		}

// 		this.current_level++;

// 		if (this.current_level == this.level_list.length) {
// 			this.getData(name, id, 0);
// 			return;
// 		}

// 		if (name.localeCompare(this.level_list[this.current_level]['name']) != 0) {
// 			this.removeFromLevel(this.current_level);
// 			this.getData(name, id, 0);
// 			return;
// 		}

// 		if (!this.validateDate()) {
// 			this.getData(name, id, 0);
// 			return;
// 		}

// 		this.createChart();

// 	}

// 	drillToLevel(level) {
// 		this.canLoadMore = false;
// 		this.current_level = level;

// 	}









// 	//----------------------------------api calls-----------------------------------------------------------------

// 	getData(name, id, page) {
// 		this.canLoadMore = false;

// 		this.showLoading();

// 		var domain = this.DOMAIN;
// 		var subdomain = this.SUB_DOMAIN;
// 		var baseUrl;
// 		var endDate = this.endDate == null ? null : this.endDate.toISOString().slice(0, 10);
// 		var startDate = this.startDate == null ? null : this.startDate.toISOString().slice(0, 10);

// 		// construct url based on current drilldown level
// 		if (this.current_level == 0) {
// 			baseUrl = domain + subdomain + "/firms?page=" + page;
// 		} else if (this.current_level == 1) {
// 			baseUrl = domain + subdomain + "/advisors?page=" + page + "&firmId=" + id;
// 		} else if (this.current_level == 2) {
// 			baseUrl = domain + subdomain + "/clients?page=" + page + "&advisorId=" + id;
// 		}

// 		baseUrl = startDate == null ? baseUrl : baseUrl + "&startDate=" + startDate;
// 		baseUrl = endDate == null ? baseUrl : baseUrl + "&endDate=" + endDate;

// 		console.log(baseUrl);
// 		this.getDataFromApi(baseUrl, name, id, page);
// 	}

// 	getDataFromApi(newUrl, name, id, page) {
// 		if (this.USE_DUMMY_DATA) {
// 			var type;
// 			if (this.current_level == 0) {
// 				type = this.data1;
// 			} else if (this.current_level == 1) {
// 				type = this.data2;
// 			} else if (this.current_level == 2) {
// 				type = this.data3;
// 			}
// 			if (page == 0) {
// 				this.loadData(type, name, id, page, false);
// 				this.createChart();
// 			} else {
// 				this.loadData(type, name, id, page, false);
// 				this.hideLoading();
// 				this.chart.update(this.level_list[this.current_level]['option']);
// 			}
// 			this.canLoadMore = true;
// 			//console.log(this.chart);
// 			return;
// 		}

// 		this.$http.get(newUrl).then(function mySuccess(response) {
// 			var self = MetricsController.self;
// 			var type;
// 			if (self.current_level == 0) {
// 				type = 'firms';
// 			} else if (self.current_level == 1) {
// 				type = 'advisors';
// 			} else if (self.current_level == 2) {
// 				type = 'clients';
// 			}

// 			var last = response.data['last'];
// 			self.loadData(response.data[type], name, id, page, last);
// 			if (page == 0) { // create new chart	
// 				self.createChart();
// 			} else {// append to existing chart
// 				self.hideLoading();
// 				self.chart.update(self.level_list[self.current_level]['option']);
// 			}
// 			self.canLoadMore = true;
// 		}, function myError(response, error) {
// 			console.log("Error " + response.status + ": " + response.statusText + "!");
// 			//alert("Error " + response.status + ": " + response.statusText + "!");

// 			MetricsController.self.hideLoading();
// 		});
// 	}



// 	//construct categories data for chart template
// 	prepareCategories(input) {
// 		var categories = input.map(function (x) {
// 			var self = MetricsController.self;
// 			var name = x['name'];
// 			if (self.current_level == 0) {
// 				name = x['name'];
// 			} else if (self.current_level == 1) {
// 				//name = x['name'];
// 				name = x['firstName'] + " " + x['lastName'];
// 			} else if (self.current_level == 2) {
// 				//name = x['name'];
// 				name = x['firstName'] + " " + x['lastName'];
// 			}
// 			return name;
// 		});

// 		var output = [];
// 		categories.forEach(function (x) {
// 			output.push(x);
// 		});

// 		return output;
// 	}

// 	//construct series data for chart template
// 	prepareSeries(input) {
// 		var goalMap = {};
// 		input.forEach(function (x, i) {
// 			for (var category in goalMap) {
// 				goalMap[category].push(0);
// 			}
// 			var goals = x['goals'];
// 			for (var key in goals) {
// 				if (goalMap[key] == null) {
// 					goalMap[key] = Array.apply(null, Array(i + 1)).map(Number.prototype.valueOf, 0);
// 				}
// 				goalMap[key][i] = goals[key];
// 			}
// 		});

// 		// combine all points for each series into lists

// 		var series = [];
// 		for (var key in goalMap) {
// 			var dataDrillDown = goalMap[key].map(function (x, i) {
// 				var self = MetricsController.self;
// 				var name = 'firmId';
// 				if (self.current_level == 0) {
// 					name = 'firmId';
// 				} else if (self.current_level == 1) {
// 					name = 'advisorId';
// 				} else if (self.current_level == 2) {
// 					name = 'clientId'
// 				}
// 				return { id: input[i][name], y: x };
// 			});

// 			var points =
// 				{
// 					name: key,
// 					data: dataDrillDown
// 				};
// 			series.push(points);
// 		}

// 		return series;
// 	}

// 	createNewLevel(options, name, id, page, last) {
// 		var startDate = this.startDate == null ? null : new Date(this.startDate);
// 		var endDate = this.endDate == null ? null : new Date(this.endDate);

		

// 		if (page > 0) { // need to merge with existing options
// 			options = this.mergeOption(options);
// 		}
// 		var newLevel = {
// 			option: options,
// 			name: name,
// 			id: id,
// 			start: startDate,
// 			end: endDate,
// 			page: page,
// 			last: last
// 		};


// 		if (this.current_level == this.level_list.length) {
// 			this.level_list.push(newLevel);
// 		} else {
// 			this.level_list[this.current_level] = newLevel;
// 		}
// 	}

// 	mergeOption(options) {
// 		// assume we are expanding the current chart 
// 		var originalCategories = this.level_list[this.current_level]['option']['xAxis']['categories'];

// 		var originalLength = originalCategories.length;
// 		var newLength = options['xAxis']['categories'].length;

// 		options['xAxis']['categories'] = originalCategories.concat(options['xAxis']['categories']);

// 		var originalSeries = this.level_list[this.current_level]['option']['series'];
// 		var newSeries = options['series'];

// 		var seriesMap = {};

// 		// 1. initialize seriesMap with originalSeries
// 		originalSeries.forEach(function (element) {
// 			seriesMap[element['name']] = element;
// 		});

// 		// 2. append newSeries
// 		newSeries.forEach(function (element) {
// 			if (seriesMap[element['name']] == null) {
// 				var zeroPaddings = Array.apply(null, Array(originalLength)).map(Number.prototype.valueOf, 0);
// 				seriesMap[element['name']]['data'] = zeroPaddings.concat(element['data']);
// 			} else {
// 				seriesMap[element['name']]['data'] = seriesMap[element['name']]['data'].concat(element['data']);

// 			}
// 		});

// 		// 3. fill the rest of originalSeries with zeros
// 		originalSeries.forEach(function (element) {
// 			if (seriesMap[element['name']]['data'].length < originalLength + newLength) {
// 				var zeroPaddings = Array.apply(null, Array(newLength)).map(Number.prototype.valueOf, 0);
// 				seriesMap[element['name']]['data'] = seriesMap[element['name']]['data'].concat(zeroPaddings);
// 			}
// 		});

// 		options['series'] = Object.values(seriesMap);


// 		return options;
// 	}

// 	loadData(input, name, id, page, last) {

// 		var currentOptions = Object.assign({}, this.optionTemplate, {
// 			title: {
// 				text: this.TITLE_TEMPLATE + name,
// 				y: 30,
// 				margin: 30
// 			},
// 			series: this.prepareSeries(input),
// 			xAxis: {
// 				scrollbar: {
// 					enabled: true
// 				},
// 				categories: this.prepareCategories(input)
// 			}
// 		});
// 		this.createNewLevel(currentOptions, name, id, page, last); // update drilldown level and prepare chart data
// 	}

// 	createChart() {
// 		this.hideLoading();
// 		this.chart = Highcharts.chart('chart', this.level_list[this.current_level]['option']);
// 		this.applyDateFilter();
// 	}







// 	// activate($timeout, webDevTec) {
// 	// 	this.getWebDevTec(webDevTec);
// 	// 	$timeout(() => {
// 	// 		this.classAnimation = 'rubberBand';
// 	// 	}, 4000);
// 	// }

// 	// getWebDevTec(webDevTec) {
// 	// 	this.awesomeThings = webDevTec.getTec();

// 	// 	angular.forEach(this.awesomeThings, (awesomeThing) => {
// 	// 		awesomeThing.rank = Math.random();
// 	// 	});
// 	// }

// 	// showToastr() {
// 	// 	this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
// 	// 	this.classAnimation = '';
// 	// }
// }