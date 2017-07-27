;(function() {
"use strict";

// dependencies for whole module
const requiredModules = [
	'ui.router',
	'oranjNavigation',
	'ngMessages',
	'ngMaterial'
];

angular.module('app.biDashboard', requiredModules);
//angular.module('app.biDashboard', []);
angular
  .module('app.biDashboard')
  .config(routesConfig);

function routesConfig($stateProvider) {
  	$stateProvider
		.state('home', {
			url: '/home',
			template:'<div id="main-container"><div class="page"><div layout="row"><div flex="33" layout-padding><div class="tile-outer"><div class="tile-inner"><div layout="row" class="tile-header"><div flex="75">Goals</div><div flex="25"><div class="more"><a href="/#/goals">More</a></div></div></div><div id="goalsContainer"></div></div></div></div><div flex="66" layout-padding><div class="tile-outer"><div class="tile-inner"><div layout="row" class="tile-header"><div flex="75">Assets Under Management</div><div flex="25"><div class="more"><a href="/#/aum">More</a></div></div></div><div id="aumContainer"></div></div></div></div></div><div layout="row"><div class="tile" flex="100"><div class="tile-outer"><div class="tile-inner"><div class="row tile-header"><div class="col-md-9">Net Worth</div><div class="col-md-3"><div class="more"><a href="/#/networth">More</a></div></div></div><div id="netWorthContainer"></div></div></div></div></div><div layout="row"><div class="tile" flex="100"><div class="tile-outer"><div class="tile-inner"><div layout="row" class="tile-header"><div flex="75">Login</div><div flex="25"><div class="more"><a href="/#/login">More</a></div></div></div><div layout="row"><div class="subtitle" flex="100">Login Metrics from the Last 7 Days</div></div><div layout="row"><div layout="column" flex="33" layout-align="center center"><div layout="row" class="loginNum">{{ showData[\'totalLogins\'] }}</div><div layout="row"><strong class="{{ totalSign }}">{{ showData[\'changeInTotalLogins\'] }}</strong> from previous week</div><div layout="row" class="loginText">Total Logins</div></div><div layout="column" flex="33" layout-align="center center"><div layout="row" class="loginNum">{{ showData[\'uniqueLogins\'] }}</div><div layout="row"><strong class="{{ uniqueSign }}">{{ showData[\'changeInUniqueLogins\'] }}</strong> from previous week</div><div layout="row" class="loginText">Unique Logins</div></div><div layout="column" flex="33" layout-align="center center"><div layout="row" class="loginNum">{{ showData[\'avgSessionTime\'] }}</div><div layout="row"><strong class="{{ timeSign }}">{{ showData[\'changeInAvgSessionTime\'] }}</strong> from previous week</div><div layout="row" class="loginText">Average User Session (min)</div></div></div><div layout="row"><div class="oranj-toggle medium-one-color"><input id="login" type="checkbox" ng-model="ngModel" ng-change="toggleLoginData()"> <label for="login"><div class="toggle-switch" data-unchecked="Clients" data-checked="Prospects"></div></label></div></div></div></div></div></div></div></div>',
			controller: 'HomeController',
			controllerAs: 'home',
			authRequired: false
		})
        .state('goals', {
			url: '/goals',
			template:'<div id="main-container"><div class="page"><div class="row" id="top-row"><div class="col-md-12" style="overflow:auto"><div class="tile-outer"><div class="tile-inner" id="chart-container"><div id="chart" layout="row" layout-align="center center"><div class="loader no-animate primary-loader loader--style3"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background: new 0 0 50 50;" xml:space="preserve"><path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"></path><animatetransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animatetransform></svg></div></div></div></div></div></div></div></div>',
			controller: 'GoalsController',
			controllerAs: 'goals'
		})
		.state('aum', {
			url: '/aum',
			template:'<div id="main-container"><div class="page"><div class="row" id="top-row"><div class="col-md-12" style="overflow:auto"><div class="tile-outer"><div class="tile-inner" id="chart-container"><div id="chart" layout="row" layout-align="center center"><div class="loader no-animate primary-loader loader--style3"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background: new 0 0 50 50;" xml:space="preserve"><path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"></path><animatetransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animatetransform></svg></div></div></div></div></div></div></div></div>',
			controller: 'AUMController',
			controllerAs: 'aum'
		})
		.state('netWorth', {
			url: '/netWorth',
			template:'<div id="main-container"><div class="page"><div class="row" id="top-row"><div class="col-md-12" style="overflow:auto"><div class="tile-outer"><div class="tile-inner" id="chart-container"><div id="chart" layout="row" layout-align="center center"><div class="loader no-animate primary-loader loader--style3"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background: new 0 0 50 50;" xml:space="preserve"><path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"></path><animatetransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animatetransform></svg></div></div></div></div></div></div></div></div>',
			controller: 'NetWorthController',
			controllerAs: 'netWorth'
		})
		.state('logins', {
			url: '/logins',
			template:'<div id="main-container"><div class="page"><div class="row" id="top-row"><div class="col-md-12 tile" style="overflow:auto"><div class="tile-outer"><div class="tile-inner" id="chart-container"><div id="chart" layout="row" layout-align="center center"><div class="loader no-animate primary-loader loader--style3"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background: new 0 0 50 50;" xml:space="preserve"><path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"></path><animatetransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animatetransform></svg></div></div></div></div></div></div></div></div>',
			controller: 'LoginsController',
			controllerAs: 'logins'
		})
		.state('leaderBoard', {
			url: '/leaderBoard',
			template:'<div id="main-container"><div class="page"><div layout="row" id="top-row"><div flex="100" style="overflow:auto"><div class="tile-outer"><div class="lb-tile-inner"><div layout="row" layout-align="space-between center" class="lb-header"><div layout="row"><div class="avatar-wrapper"><img class="avatar-image" ng-src="{{ avatar }}" alt="avatar image"></div><div layout="column"><div class="lb-upper-row">{{ kpi.name }}</div><div class="lb-lower-row">{{ kpi.points }} Points <i class="fa fa-info-circle"><md-tooltip>Points shown are calculated by ...</md-tooltip></i></div></div></div><div layout="row"><div layout="column"><div class="lb-upper-row"><div class="lb-right-text">{{ rank }}</div></div><div class="lb-lower-row"><div class="lb-right-text">Percentile in {{ scope }}</div></div></div></div></div><div layout="row" layout-align="end none" id="button-group"><div id="horizontal-line"></div><div class="btn-group btn-group-justified md-whiteframe-2dp scope"><div class="btn-group"><button type="button" class="btn btn-secondary lb-btn {{ lbOverall }}" ng-click="changeScope(\'overall\')" style="border-right-color:white">Overall</button></div><div class="btn-group"><button type="button" class="btn btn-secondary lb-btn {{ lbState }}" ng-click="changeScope(\'state\')" style="border-right-color:white; border-left-color:white">State</button></div><div class="btn-group"><button type="button" class="btn btn-secondary lb-btn {{ lbFirm }}" ng-click="changeScope(\'firm\')" style="border-left-color:white">Firm</button></div></div></div><div id="leaderboardCarousel" class="carousel slide" data-ride="carousel" data-interval="7000" ng-if="showPOTB"><ol class="carousel-indicators"><li ng-repeat="kpi in textList" data-target="#leaderboardCarousel" data-slide-to="{{ kpi.index }}" class="{{ kpi.active }}"></li></ol><div class="carousel-inner" role="listbox"><div id="text" layout="row" ng-repeat="kpi in textList" class="carousel-item {{ kpi.active }}"><div flex="15"></div><div class="POTBText" flex="70" style="text-align:center;"><p><strong>{{ kpi.text }}</strong></p></div><div flex="15"></div></div></div></div><div layout="row" layout-sm="column" class="lb-body"><div flex="33" layout="column" layout-align="none center" class="lb-one-third"><div class="sup-cat-icon"><i class="fa fa-usd lb-icon1"></i> <i class="fa fa-circle icon-background1"></i></div><md-button layout="row" layout-align="space-between center" class="kpi financials md-whiteframe-4dp" ng-click="showChart($event , 0)"><div flex="70" class="kpi-text kpi-name">Assets Under Management</div><div flex="30" class="kpi-text">{{ kpi.aum }}</div></md-button><md-button layout="row" layout-align="space-between center" class="kpi financials md-whiteframe-4dp" ng-click="showChart($event , 1)"><div flex="70" class="kpi-text kpi-name">Net Worth</div><div flex="30" class="kpi-text">{{ kpi.netWorth }}</div></md-button><md-button layout="row" layout-align="space-between center" class="kpi financials md-whiteframe-4dp" ng-click="showChart($event , 2)"><div flex="70" class="kpi-text kpi-name">Number of HNIs</div><div flex="30" class="kpi-text">{{ kpi.hni }}</div></md-button></div><div flex="33" layout="column" layout-align="none center" class="lb-one-third"><div class="row sup-cat-icon"><i class="fa fa-handshake-o lb-icon2"></i> <i class="fa fa-circle icon-background2"></i></div><md-button layout="row" layout-align="space-between center" class="kpi client-management md-whiteframe-4dp" ng-click="showChart($event , 3)"><div flex="70" class="kpi-text kpi-name">Conversion Rate</div><div flex="30" class="kpi-text">{{ kpi.conversionRate }} %</div></md-button><md-button layout="row" layout-align="space-between center" class="kpi client-management md-whiteframe-4dp" ng-click="showChart($event , 4)"><div flex="70" class="kpi-text kpi-name">Average Conversion Time</div><div flex="30" class="kpi-text">{{ kpi.avgConversionTime }} Days</div></md-button><md-button layout="row" layout-align="space-between center" class="kpi client-management md-whiteframe-4dp" ng-click="showChart($event , 5)"><div flex="70" class="kpi-text kpi-name">Retention Rate</div><div flex="30" class="kpi-text">{{ kpi.retentionRate }} %</div></md-button><md-button layout="row" layout-align="space-between center" class="kpi client-management md-whiteframe-4dp" ng-click="showChart($event , 6)"><div flex="70" class="kpi-text kpi-name">Weekly Client Logins</div><div flex="30" class="kpi-text">{{ kpi.weeklyLogins }}</div></md-button></div><div flex="33" layout="column" layout-align="none center" class="lb-one-third"><div class="row sup-cat-icon"><i class="fa fa-line-chart lb-icon3"></i> <i class="fa fa-circle icon-background3"></i></div><md-button layout="row" layout-align="space-between center" class="kpi growth md-whiteframe-4dp" ng-click="showChart($event , 7)"><div flex="70" class="kpi-text kpi-name">Annualized AUM Growth</div><div flex="30" class="kpi-text">{{ kpi.aumGrowth }} %</div></md-button><md-button layout="row" layout-align="space-between center" class="kpi growth md-whiteframe-4dp" ng-click="showChart($event , 8)"><div flex="70" class="kpi-text kpi-name">Annualized Clientele Growth</div><div flex="30" class="kpi-text">{{ kpi.clienteleGrowth }} %</div></md-button><md-button layout="row" layout-align="space-between center" class="kpi growth md-whiteframe-4dp" ng-click="showChart($event , 9)"><div flex="70" class="kpi-text kpi-name">Annualized Net Worth Growth</div><div flex="30" class="kpi-text">{{ kpi.netWorthGrowth }} %</div></md-button></div></div></div></div></div></div></div></div>',
			controller: 'LeaderBoardController',
			controllerAs: 'leaderBoard'
		});
};


angular
  .module('app.biDashboard')
  .run(runBlock);


function runBlock($location, $rootScope) {

	function environmentDetection() {
		var host = $location.host();
		var protocol = $location.protocol();
		var port = 8080;

		if (host.indexOf('local') > -1) {
			$rootScope.domain = protocol + '://' + host + '/bibackend';
		} else if (host.indexOf('dev') > -1 || host.indexOf('uat') > -1) {
			$rootScope.domain = protocol + '://' + host + '/bibackend';
		} else {
			$rootScope.domain = protocol + '://' + host + '/bibackend';
		}
		//console.log('Environment:', $rootScope.environment);
	};

	environmentDetection();


	// configuration obj for <oranj-navigation></oranj-navigation> directive
	$rootScope.logo = 'https://s3.amazonaws.com/imagesso/logo_262987_635774065687042408-1111111111111111111111111111111111111111111111111111111111111111.png'; 
    $rootScope.user = {
        name : 'Matt Frosty',
        id   : 234526424
    };
    $rootScope.userNavConfig = [
        {
            name: 'Profile',
            state: 'profile'
        },
        {
            name: 'Another state',
            state: 'profile'
        },
        {
            name: 'Yet another state',
            state: 'profile'
        }
    ];
    $rootScope.topNavConfig = [
        {
            name: 'Support',
            iconClass: 'fa fa-question-circle-o',
            class: 'link',
            href: 'https://support.oranjadvisor.com/hc/en-us'
        },
        {
            name: 'Feed',
            state: 'feed',
            iconClass: 'fa fa-bell-o',
            alertCount: 2,
            menuItems: [
                '<a class="link">Ashwin updated his thing at Yesterday at 2:30</a>',
                '<a>Ashwin updated his thing at Yesterday at 2:30</a>',
                '<a class="link">Ashwin updated his thing at Yesterday at 2:30</a>',
                '<a class="link">Ashwin updated his thing at Yesterday at 2:30</a>',
                '<a>Ashwin updated his thing at Yesterday at 2:30</a>'
            ]
        },
        {
            name: 'Messages',
            iconClass: 'fa fa-comments-o',
            alertCount: 4,
            menuItems: [
                '<a>Hey man, got a question about..</a>',
                '<a>Did you get around to talking looking into that thing about.. testing long message..</a>',
                '<a>Hey man, got a question about..</a>'
            ]
        }
    ];
    $rootScope.sideNavConfig = [
        {
            name: 'Home',
            iconClass: 'fa fa-home',
            state: 'home',
            options: [
                {
                    name: 'Temp 1',
                    state: 'goals'
                },
            ]
        },
        {
            name: 'Metrics',
            iconClass: 'fa fa-globe',
            state: 'home',
            options: [
                {
                    name: 'Goals',
                    state: 'goals'
                },
                {
                    name: 'AUM',
                    state: 'aum'
                },
                {
                    name: 'Net Worth',
                    state: 'netWorth'
                },
                {
                    name: 'Login Stats',
                    state: 'logins'
                }
            ]
        },
        {
            name: 'Leader Board',
            iconClass: 'fa fa-trophy',
            state: 'leaderBoard'
        },
        {
            name: 'Contacts',
            iconClass: 'fa fa-users',
            state: 'advisor',
        },
        {
            name: 'Accounts',
            iconClass: 'fa fa-dollar',
            state: 'accounts',
        },
        {
            name: 'Models',
            iconClass: 'fa fa-bullseye',
            state: 'accounts',
            alertCount: 2,
            options: [
                {
                    name: 'Sub-Advised Models',
                    state: 'goals'
                },
                {
                    name: 'Strategist Models',
                    state: 'services'
                },
                {
                    name: 'Clients',
                    state: 'clients'
                },
                {
                    name: 'Contact',
                    state: 'contact'
                }
            ]
        },
        {
            name: 'Rebalance',
            iconClass: 'fa fa-balance-scale',
            state: 'vault',
            alertCount: 4,
            options: [
                {
                    name: 'Trade Settings',
                    state: 'goals'
                }
            ]
        },
        {
            name: 'Admin',
            iconClass: 'fa fa-user',
            state: 'disclaimer',
            options: [
                {
                    name: 'Firm Info',
                    state: 'goals'
                },
                {
                    name: 'Advisor Lists',
                    state: 'services'
                },
                {
                    name: 'Integration Settings',
                    state: 'clients'
                },
                {
                    name: 'Questionnaire',
                    state: 'contact'
                },
                {
                    name: 'Permission Settings',
                    state: 'contact'
                }
            ]
        }
    ];





    
}

angular
    .module('app.biDashboard')
    .controller('AUMController', AUMController)
    .service('AUMService', AUMService);

function AUMService(MetricsService) {
    this.init = function () {
        var base = new MetricsService();
        // constants
        base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
        base.SUB_DOMAIN = "/bi/aums";
        base.USE_DUMMY_DATA = false;
        base.COLOR_ARRAY = Highcharts.getOptions().colors;
        base.controllerName = "aum";
        base.isRequired = true; //datepicker date required
        base.startDate = new Date(new Date().getFullYear(), 0, 1);
        base.endDate = new Date();
        base.TITLE_TEMPLATE = "Asset Under Management by ";

        base.data1 = {
            "firms": [
                {
                    "firmId": 283,
                    "name": "mattfirm",
                    "previous": {
                        "date": "2017-06-12",
                        "total": null,
                        "assetClass": {
                            "US Bond": 17292,
                            "Non US Stock": 20529.6,
                            "US Stock": 24773.06,
                            "Cash": 28150.9,
                            "Other": 9543.31
                        }
                    },
                    "current": {
                        "date": "2017-06-12",
                        "total": 304229.27,
                        "assetClass": {
                            "US Bond": 7292.4,
                            "Non US Stock": 20529.6,
                            "US Stock": 247713.06,
                            "Cash": 18150.9,
                            "Other": 10543.31
                        }
                    }
                },
                {
                    "firmId": 509,
                    "name": "auto",
                    "previous": {
                        "date": "2017-06-12",
                        "total": null,
                        "assetClass": {}
                    },
                    "current": {
                        "date": "2017-06-12",
                        "total": 133576.06,
                        "assetClass": {
                            "US Stock": 114459.75,
                            "Cash": 1031.1,
                            "Other": 18085.21
                        }
                    }
                },
                {
                    "firmId": 509,
                    "name": "auto",
                    "previous": {
                        "date": "2017-06-12",
                        "total": null,
                        "assetClass": {}
                    },
                    "current": {
                        "date": "2017-06-12",
                        "total": 133576.06,
                        "assetClass": {
                            "US Stock": 114459.75,
                            "Cash": 1031.1,
                            "Other": 18085.21
                        }
                    }
                },
                {
                    "firmId": 509,
                    "name": "auto",
                    "previous": {
                        "date": "2017-06-12",
                        "total": null,
                        "assetClass": {}
                    },
                    "current": {
                        "date": "2017-06-12",
                        "total": 133576.06,
                        "assetClass": {
                            "US Stock": 114459.75,
                            "Cash": 1031.1,
                            "Other": 18085.21
                        }
                    }
                }
            ]
        };


        base.data2 = {
            "advisors": [
                {
                    "firmId": 283,
                    "name": "mattfirm",
                    "previous": {
                        "date": "2017-06-12",
                        "total": null,
                        "assetClass": {
                            "US Bond": 222.4,
                            "Non US Stock": 33.6,
                            "US Stock": 232.06,
                            "Cash": 77.9,
                            "Other": 88.31
                        }
                    },
                    "current": {
                        "date": "2017-06-12",
                        "total": 304229.27,
                        "assetClass": {
                            "US Bond": 123.4,
                            "Non US Stock": 312.6,
                            "US Stock": 411.06,
                            "Cash": 11.9,
                            "Other": 33.31
                        }
                    }
                },
                {
                    "firmId": 509,
                    "name": "auto",
                    "previous": {
                        "date": "2017-06-12",
                        "total": null,
                        "assetClass": {
                            "US Bond": 1222.4,
                            "Non US Stock": 233.6,
                            "US Stock": 232.06,
                            "Cash": 177.9,
                            "Other": 188.31
                        }
                    },
                    "current": {
                        "date": "2017-06-12",
                        "total": 133576.06,
                        "assetClass": {
                            "US Stock": 233.75,
                            "Cash": 444.1,
                            "Other": 777.21
                        }
                    }
                }
            ]
        };

        base.data3 = {
            "clients": [
                {
                    "firmId": 283,
                    "name": "mattfirm",
                    "previous": {
                        "date": "2017-06-12",
                        "total": null,
                        "assetClass": {
                            "US Bond": 89.4,
                            "Non US Stock": 89.6,
                            "US Stock": 78.06,
                            "Cash": 99.9,
                            "Other": 9.31
                        }
                    },
                    "current": {
                        "date": "2017-06-12",
                        "total": 304229.27,
                        "assetClass": {
                            "US Bond": 89.4,
                            "Non US Stock": 111.6,
                            "US Stock": 22.06,
                            "Cash": 33.9,
                            "Other": 88.31
                        }
                    }
                },
                {
                    "firmId": 509,
                    "name": "auto",
                    "previous": {
                        "date": "2017-06-12",
                        "total": null,
                        "assetClass": {}
                    },
                    "current": {
                        "date": "2017-06-12",
                        "total": 99.06,
                        "assetClass": {
                            "US Stock": 99.75,
                            "Cash": 88.1,
                            "Other": 66.21
                        }
                    }
                }
            ]
        };

        base.subtitleSelector = function () {
            var subtitle = {
                text: "Note: lighter bar - previous quarter, darker bar - current quarter"
            };
            return subtitle;
        }


        // tooltip formatter
        base.formatter = function () {
            var s = '<b>' + this.x + '</b>';

            var currentStack = this.series.userOptions['stackId'];

            this.series.chart.series.forEach(function (series) {
                if (currentStack === series.userOptions['stackId'] && series.data[this.point.index].y) {
                    s += '<br/>' + series.name + ': ' + series.data[this.point.index].y;
                }

            }, this);

            return s;

        }


        base.prepareSeries = function (input) {
            var aums = ['previous', 'current'];
            var aumMaps = Array.apply(null, Array(aums.length)).map(function () { return {}; }); // [{prev_map},{curr_map}]
            // for each of firms, advisors or clients
            input.forEach(function (x, i) {
                // for each of the periods
                aums.forEach(function (aum, p) {
                    // add zero paddings to place data on the correct column
                    for (var category in aumMaps[p]) {
                        aumMaps[p][category].push(0);
                    }

                    // each asset
                    var field = 'assetClass';
                    for (var key in x[aum][field]) {
                        if (!aumMaps[p][key]) {
                            aumMaps[p][key] = Array.apply(null, Array(i + 1)).map(Number.prototype.valueOf, 0);
                        }
                        aumMaps[p][key][i] = x[aum][field][key];
                    }
                });

            });

            //make sure legends are complete
            for (var key in aumMaps[0]) {
                if (!aumMaps[1][key]) {
                    aumMaps[1][key] = Array.apply(null, Array(input.length)).map(Number.prototype.valueOf, 0);
                }
            }

            // combine all points for each series into lists
            var series = [];

            aumMaps.forEach(function (aumMap, p) {
                var counter = 0;
                for (var key in aumMap) {
                    var dataDrillDown = aumMap[key].map(function (x, i) {
                        var self = base;
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
                    var points = {
                        name: key,
                        data: dataDrillDown,
                        stack: "stack" + p,
                        color: p === 0 ? lighten(base.COLOR_ARRAY[counter]) : base.COLOR_ARRAY[counter],
                        stackId: p,
                        showInLegend: p === 0 ? false : true
                    };
                    series.push(points);
                    counter++;
                }
            });


            return series;
        }

        var lighten = function (hex) {
            // lighten the color of previous date bar

            var percent = 50;

            // increase brightness
            var colorCode;

            // strip the leading # if it's there
            hex = hex.replace(/^\s*#|\s*$/g, '');

            // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
            if (hex.length === 3) {
                hex = hex.replace(/(.)/g, '$1$1');
            }

            var r = parseInt(hex.substr(0, 2), 16),
                g = parseInt(hex.substr(2, 2), 16),
                b = parseInt(hex.substr(4, 2), 16);

            colorCode = '#' +
                ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
                ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
                ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);

            return colorCode;


        }


        return base;
    }

}


function AUMController($scope, AUMService) {
    var service = AUMService.init();


    this.startDate = service.startDate;
    this.endDate = service.endDate;
    this.today = new Date();
    this.isRequired = service.isRequired;

    this.checkDate = function () {
        service.startDate = this.startDate; // bind data to service
        service.endDate = this.endDate;

        try {
            service.checkDate();
        }
        catch (err) {
            console.log("Error when checking date!");
        }


        this.startDate = service.startDate;
        this.endDate = service.endDate;
    };


    this.assignYTD = function () {
        try {
            service.assignYTD();
        }
        catch (err) {
            console.log("Error when assigning YTD!");
        }

        this.startDate = service.startDate;
        this.endDate = service.endDate;
    }

    this.clearDate = function () {
        try {
            service.clearDate();
        }
        catch (err) {
            console.log("Error when clearing dates!");
        }

        this.startDate = service.startDate;
        this.endDate = service.endDate;

    }

    service.launch($scope);
}

angular
	.module('app.biDashboard')
	.controller('HomeController', HomeController)
	.factory('chartData', chartData);

//factory object with methods
function chartData($http, $log, SessionService) {
	var chartData = {};


	chartData.callApi = function(chartType, chartId, url) {
		if (url === null) {
			chartData.createOptions(chartType, chartId, '');
		} else {
				return $http.get(url , { headers: { 'Authorization': SessionService.access_token }}).then(function mySuccess(response) {
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
		return $http.get(clientUrl, { headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(clientResponse) {
			$scope.clientData = clientResponse["data"]["data"]["client"];
			$scope.clientData['changeInTotalLogins'] = $scope.addSign($scope.clientData['changeInTotalLogins']);
			$scope.clientData['changeInUniqueLogins'] = $scope.addSign($scope.clientData['changeInUniqueLogins']);
			$scope.clientData['changeInAvgSessionTime'] = $scope.addSign($scope.clientData['changeInAvgSessionTime']);
		}).then(function () {
			return $http.get(prospectUrl, { headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess1(prospectResponse) {
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
    beforeEach(angular.mock.module('app.biDashboard'));

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


        //TODO:needs fixing
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
					// formatter: function() {
					// 	return '$' + this.axis.defaultLabelFormatter.call(this);
					// },
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

angular
    .module('app.biDashboard')
    .controller('GoalsController', GoalsController)
    .service('GoalsService', GoalsService);

function GoalsService(MetricsService) {
    this.init = function(){
        // most code is written in MetricsController
        var base = new MetricsService();
        // constants
        base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
        base.SUB_DOMAIN = "/bi/goals";
        base.USE_DUMMY_DATA = false;
        base.controllerName = "goals";

        base.data1 = {
            "firms": [{
                "name": "firm 1",
                "total": 40,
                "goals": {
                    "custom": 3,
                    "college": 8,
                    "retirement": 15,
                    "insurance": 4,
                    "home": 10
                }
            },
            {
                "total": 25,
                "name": "firm 2",
                "goals": {
                    "custom": 3,
                    "college": 8,
                    "retirement": 0,
                    "insurance": 4,
                    "home": 10
                }
            },
            {
                "total": 34,
                "name": "firm 3",
                "goals": {
                    "custom": 3,
                    "College": 2,
                    "retirement": 15,
                    "insurance": 4,
                    "home": 10
                }
            }]
        };


        base.data2 = {
            "advisors": [{
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
            }]
        };


        base.data3 = {
            "clients": [{
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
            }]
        };

        return base;
    }
}


function GoalsController($scope, GoalsService) {
    var service = GoalsService.init();

    this.startDate = service.startDate;
    this.endDate = service.endDate;
    this.today = new Date();
    this.isRequired = service.isRequired;

    this.checkDate = function () {
        service.startDate = this.startDate; // bind data to service
        service.endDate = this.endDate;

        try {
            service.checkDate();
        }
        catch (err) {
            console.log("Error when checking date!");
        }


        this.startDate = service.startDate;
        this.endDate = service.endDate;
    };


    this.assignYTD = function () {


        try {
            service.assignYTD();
        }
        catch (err) {
            console.log("Error when assigning YTD!");
        }

        this.startDate = service.startDate;
        this.endDate = service.endDate;
    }

    this.clearDate = function () {

        try {
            service.clearDate();
        }
        catch (err) {
            console.log("Error when clearing dates!");
        }

        this.startDate = service.startDate;
        this.endDate = service.endDate;
    }
    service.launch($scope);
}



describe('Goals Controller:', function () {
    var $scope, GoalsController, GoalsService, $q, $httpBackend, $http;
    var url = 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/goals/firms?&page=0';

    var data1 = {
        "data": {
            "last": true,
            "firms": [{
                "name": "firm 1",
                "total": 40,
                "goals": {
                    "custom": 3,
                    "college": 8,
                    "retirement": 15,
                    "insurance": 4,
                    "home": 10
                }
            },
            {
                "total": 25,
                "name": "firm 2",
                "goals": {
                    "custom": 3,
                    "college": 8,
                    "retirement": 0,
                    "insurance": 4,
                    "home": 10
                }
            },
            {
                "total": 34,
                "name": "firm 3",
                "goals": {
                    "custom": 3,
                    "College": 2,
                    "retirement": 15,
                    "insurance": 4,
                    "home": 10
                }
            }]
        }
    };

    //Before each test load our app module
    beforeEach(angular.mock.module('app.biDashboard'));

    //Inject the $controller service to create instances of the controller (HomeController) we want to test,
    //Injecting _chartData_ for our factory
    beforeEach(inject(function ($controller, $rootScope, _GoalsService_, _$q_, _$httpBackend_, _$http_) {
        GoalsService = _GoalsService_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
        $http = _$http_;
        GoalsController = function () {
            return $controller('GoalsController', {
                $scope: $scope,
                GoalsService: GoalsService
            });
        };

    }));

    //Verify our controller exists
    it('GoalsController should exist', function () {
        var goals = GoalsController();
        expect(goals).toBeDefined();
    });

    //Verify our factory is defined
    it('GoalsService should be defined', function () {
        expect(GoalsService).toBeDefined();
    });

    describe('getDataForLevel()', function () {

        var name = "asd";
        var id = 123;
        var page = 0;
        var level = 0;
        var args;
        var data;
        var service;

        beforeEach(function () {
            service = GoalsService.init();
            //spyOn() takes in the directive + method name, the specified method's code will not be run
            spyOn(service, "getDataForLevel").and.callThrough();
            spyOn(service, "getDataFromApi");
        });

        it('should return correct url', function () {
             expect(service.getDataForLevel(name, id, page, level, args)).toEqual(url);
        });
    });

    //testing api call
    describe('getDataFromApi()', function () {
        var result = {};
        var name = "asd";
        var id = 123;
        var page = 0;
        var level = 0;
        var args = [];
        var data;
        var service;

        beforeEach(function () {
            service = GoalsService.init();
            //spyOn() takes in the directive + method name, the specified method's code will not be run
            spyOn(service, "getDataFromApi").and.callThrough();
            spyOn(service, "loadData");
        });

        it('should return a json object with data', function () {
            var newUrl = url.slice(0, url.lastIndexOf("=") + 1) + page;
            //  console.log(newUrl);



            $httpBackend.whenGET(newUrl).respond(200, data1);

            expect(service.getDataFromApi).not.toHaveBeenCalled();
            expect(result).toEqual({});

            service.getDataFromApi(url, name, id, page, level, args, data).then(function (data) {
                result = data;
            });


            $httpBackend.flush();

            expect(service.getDataFromApi).toHaveBeenCalledWith(url, name, id, page, level, args, data);
            expect(result.firms[0].total).toEqual(40);
        });
    });

});

angular
    .module('app.biDashboard')
    .controller('LeaderBoardController', LeaderBoardController)
    .service('LeaderBoardService', LeaderBoardService);

function LeaderBoardService(LeaderBoardDialogService) {

    this.init = function () {

    };
}


function LeaderBoardController($scope, $http, LeaderBoardService, LeaderBoardDialogService, SessionService) {

    $scope.showChart = function (ev, tab) {
        LeaderBoardDialogService.show(ev, tab, $scope);
    };

    $scope.showPOTB = true;
    var advisorId = 332;

    var kpiUrl = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/gamification/advisors/" + advisorId + "/summary";
    var POTBUrlBase = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/gamification/advisors/" + advisorId + "/patOnTheBack?region="
    var avatarUrl = "https://" + SessionService.firm + ".oranjsites.com/oranj/" + SessionService.firm + "/profile/avatar/get";

    var preprocessing = function (data, type) {

        if (type === "POTB") {
            var textList = [];
            var i = 0;
            for (var key in data) {
                if (key === "id" || key === "advisorId" || key === "region") { continue; }
                if (data[key] !== null) {
                    textList.push({ text: data[key], index: i });
                    i++;
                }
            }
            //set one to be the active slide to show
            if (textList[0] != null) {
                $scope.showPOTB = true;
                textList[0].active = "active";
            } else {
                $scope.showPOTB = false;
            }
            $scope.textList = textList;
        } else if (type === "kpi") {
            data.aum = shortenNumber(data.aum);
            data.netWorth = shortenNumber(data.netWorth);
            data.avgConversionTime = (data.avgConversionTime / 24).toFixed(2);
            data.retentionRate = (data.retentionRate / 1).toFixed(2);
            data.conversionRate = (data.conversionRate / 1).toFixed(2);
        }
    };

    var highlightButton = function (scope) {
        $scope.lbOverall = 'offFocus';
        $scope.lbState = 'offFocus';
        $scope.lbFirm = 'offFocus';

        if (scope === 'overall') {
            $scope.lbOverall = 'onFocus';
            $scope.scope = scope;
            POTBApi(POTBUrlBase + $scope.scope);
        } else if (scope === 'state') {
            $scope.lbState = 'onFocus';
            $scope.scope = scope;
            POTBApi(POTBUrlBase + $scope.scope);
        } else {
            $scope.lbFirm = 'onFocus';
            $scope.scope = scope;
            POTBApi(POTBUrlBase + $scope.scope);
        }
    };

    var shortenNumber = function (num) {
        if (num >= 1000 && num < 1000000) {
            return (num / 1000).toFixed(2) + 'k';
        } else if (num >= 1000000 && num < 1000000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000000000 && num < 1000000000000) {
            return (num / 1000000000).toFixed(2) + 'B';
        } else if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(2) + 'T';
        } else return num.toFixed(2);
    };

    $scope.changeScope = function (scope) {
        if (scope === 'overall') {
            $scope.rank = $scope.kpi.percentileOverall;
        } else if (scope === 'state') {
            $scope.rank = $scope.kpi.percentileState;
        } else {
            $scope.rank = $scope.kpi.percentileFirm;
        }
        highlightButton(scope);
    };

    var kpiApi = function (url) {
        return $http.get(url, { headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
            $scope.kpi = response["data"]["data"];
            preprocessing($scope.kpi, "kpi");
            $scope.changeScope('state'); //have the default scope set to state
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }
    };

    var POTBApi = function (url) {
        return $http.get(url, { headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
            preprocessing(response["data"]["data"], "POTB");
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }
    };

    var avatarApi = function (url) {
        return $http.get(url, { headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
            if (response.data.data) {
                $scope.avatar = response.data.data.avatar;
            } else {
                $scope.avatar = "https://runoranj-test.s3.amazonaws.com/user/mattfirm/8586267/avatar.jpeg?AWSAccessKeyId=AKIAIHEVGBZU5CTURLAQ&Expires=1501111784&Signature=kslOAeRq9KAhBmU3rg910692aUE%3D";
            }
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }

    };

    kpiApi(kpiUrl);
    avatarApi(avatarUrl);
}

angular
    .module('app.biDashboard')
    .service('LeaderBoardDialogService', LeaderBoardDialogService);

function LeaderBoardDialogService($mdDialog, $http, $q, $rootScope, SessionService) {
    var self = this;

    //var DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
    var $scope;
    var DOMAIN = "http://10.1.15.177:8080";
    var SUB_DOMAIN = "/bi/gamification";
    var advisorId = 9714;
    var USE_DUMMY_DATA = false;
    var tagColors = ["tag-one", "tag-two", "tag-three"];
    var colors = ["#00a4d3", "#72bb53", "#CDC114"];
    var tabInfo = [
            {
                title: "Asset Under Management", colorId: 0,
                formatter: shortenNumber,
                text_worst: 'least', text_best: 'most',
                KPI_DOMAIN: "/aum"
            },
            {
                title: "Net Worth", colorId: 0,
                formatter: shortenNumber,
                text_worst: 'least', text_best: 'most',
                KPI_DOMAIN: "/net_worth"
            },
            {
                title: "Number of HNIs", colorId: 0,
                formatter: (num) => { return num },
                text_worst: 'least', text_best: 'most',
                KPI_DOMAIN: "/hni"
            },
            {
                title: "Conversion Rate", colorId: 1,
                formatter: (num) => { return (num / 1).toFixed(2) + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/conversion_rate"
            },
            {
                title: "Average Conversion Time", colorId: 1,
                formatter: (num) => { return (num / 24).toFixed(1) + unitWrapper('days') },
                text_worst: 'longest', text_best: 'shortest',
                KPI_DOMAIN: "/avg_conversion_time"
            },
            {
                title: "Retention Rate", colorId: 1,
                formatter: (num) => { return (num / 1).toFixed(2) + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/retention_rate"
            },
            {
                title: "Weekly Client Logins", colorId: 1,
                formatter: (num) => { return num },
                text_worst: 'least', text_best: 'most',
                KPI_DOMAIN: "/weekly_logins"
            },
            {
                title: "Annualized AUM Growth", colorId: 2,
                formatter: (num) => { return (num / 1).toFixed(2) + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/aum_growth"
            },
            {
                title: "Annualized Clientele Growth", colorId: 2,
                formatter: (num) => { return (num / 1).toFixed(2) + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/clientele_growth"
            },
            {
                title: "Annualized Net Worth Growth", colorId: 2,
                formatter: (num) => { return (num / 1).toFixed(2)  + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/net_worth_growth"
            }
        ];


    var STATE_NAMES = {
            AL: 'Alabama',
            AK: 'Alaska',
            AZ: 'Arizona',
            AR: 'Arkansas',
            CA: 'California',
            CO: 'Colorado',
            CT: 'Connecticut',
            DE: 'Delaware',
            FL: 'Florida',
            GA: 'Georgia',
            HI: 'Hawaii',
            ID: 'Idaho',
            IL: 'Illinois',
            IN: 'Indiana',
            IA: 'Iowa',
            KS: 'Kansas',
            KY: 'Kentucky',
            LA: 'Louisiana',
            ME: 'Maine',
            MD: 'Maryland',
            MA: 'Massachusetts',
            MI: 'Michigan',
            MN: 'Minnesota',
            MS: 'Mississippi',
            MO: 'Missouri',
            MT: 'Montana',
            NE: 'Nebraska',
            NV: 'Nevada',
            NH: 'New Hampshire',
            NJ: 'New Jersey',
            NM: 'New Mexico',
            NY: 'New York',
            NC: 'North Carolina',
            ND: 'North Dakota',
            OH: 'Ohio',
            OK: 'Oklahoma',
            OR: 'Oregon',
            PA: 'Pennsylvania',
            RI: 'Rhode Island',
            SC: 'South Carolina',
            SD: 'South Dakota',
            TN: 'Tennessee',
            TX: 'Texas',
            UT: 'Utah',
            VT: 'Vermont',
            VA: 'Virginia',
            WA: 'Washington',
            WV: 'West Virginia',
            WI: 'Wisconsin',
            WY: 'Wyoming'
        };
    
    var STATE_RATIOS = {
        SC: 0.799,
        SD: 0.620,
        TN: 0.243,
        VA: 0.433,
        WV: 0.884,
        WY: 0.772,
        NY: 0.763,
        PA: 0.575,
        TX: 0.955,
        WA: 0.655,
        AK: 0.801,
        AR: 0.872,
        CO: 0.722,
        CT: 0.549,
        IA: 0.653,
        KS: 0.516,
        KY: 0.432,
        MA: 0.613,
        MD: 0.528,
        MO: 0.869,
        MT: 0.578,
        NC: 0.382,
        ND: 0.596,
        NE: 0.456,
        OK: 0.492,
        OR: 0.742,
        HI: 0.645
    };


    var dialogHTML = `
            <md-dialog style="width:1100px;overflow: visible">
                <div id="dialog-loading" layout="row"  layout-align="center center">
                    <div class="loader no-animate primary-loader loader--style3" >
                        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    width="40px" height="40px" viewBox="0 0 50 50" style="enable-background: new 0 0 50 50;"
                                    xml:space="preserve">
                            <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"
                                        />
                            </path>
                        </svg>
                    </div>
                </div>

                <div id="dialog-content" style="position: relative;visibility: hidden;">
                
                    <div id="tag" class="md-whiteframe-2dp {{tagColors[tabInfo[currentTab].colorId]}}">
                        <h5 style="margin:0"><b>{{tabInfo[currentTab].title}}</b>
                            <i class="fa fa-info-circle" style="color:white">
                                <md-tooltip>
                                    Points shown are calculated by ...
                                </md-tooltip>
                            </i>
                        
                        </h5>
                    </div>


                    <div layout="column" >
                        <div layout="column" layout-align="center end"  layout-padding>
                                <h1 style="margin:0" ng-bind-html="kpi_details.advisorKpi"></h1>
                                <h6 style="margin:0"> is better than...</h6>
                                
                        </div>
                        
                        <div layout="row" layout-align="space-between none"  layout-padding>
                            
                            <div flex="40" layout="column" layout-align="center center" >
                                <div style="text-align: center">
                                    <h6>Overall</h6>
                                </div>
                                <div id="chart-overall" style="height:200px;width:300px"></div>
                                
                                <div layout="row" layout-align="space-between center"  layout-margin>
                                    <div flex="50" style="text-align: center">
                                        <h3 ng-bind-html="kpi_details.overall.worst"></h3>
                                        <h6>{{tabInfo[currentTab].text_worst}}</h6>
                                    </div>

                                    <div style="height:50px;border-right: thin solid #dfdfdf;">
                                    </div>
                         
                                    <div flex="50" style="text-align: center">
                                        <h3 ng-bind-html="kpi_details.overall.best"></h3>
                                        <h6>{{tabInfo[currentTab].text_best}}</h6>
                                    </div>
                                </div>
                            </div>
                            
                            <div flex="30" layout="column" layout-align="center center" >
                                <div style="text-align: center">
                                    <h6>{{ STATE_NAMES[kpi_details.stateCode] }}</h6>
                                </div>
                                <div id="chart-state" style="height:200px;width:200px"></div>
                                
                                <div layout="row" layout-align="space-between center"  layout-margin>
                                    <div flex="50" style="text-align: center">
                                        <h3 ng-bind-html="kpi_details.state.worst"></h3>
                                        <h6>{{tabInfo[currentTab].text_worst}}</h6>
                                    </div>

                                    <div style="height:50px;border-right: thin solid #dfdfdf;">
                                    </div>
                         
                                    <div flex="50" style="text-align: center">
                                        <h3 ng-bind-html="kpi_details.state.best"></h3>
                                        <h6>{{tabInfo[currentTab].text_best}}</h6>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div flex="30" layout="column" layout-align="center center" >
                                <div style="text-align: center">
                                    <h6>Firm</h6>
                                </div>
                                <div id="chart-firm" style="height:200px;width:200px"></div>
                                
                                <div layout="row" layout-align="space-between center"  layout-margin>
                                    <div flex="50" style="text-align: center">
                                        <h3 ng-bind-html="kpi_details.firm.worst"></h3>
                                        <h6>{{tabInfo[currentTab].text_worst}}</h6>
                                    </div>

                                    <div style="height:50px;border-right: thin solid #dfdfdf;">
                                    </div>
                         
                                    <div flex="50" style="text-align: center">
                                        <h3 ng-bind-html="kpi_details.firm.best"></h3>
                                        <h6>{{tabInfo[currentTab].text_best}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>          

                        <md-tabs md-stretch-tabs="always" md-no-pagination="'true'" md-no-ink="'true'" md-no-ink-bar="'true'" md-selected="currentTab" > 
                            <md-tab label="AUM" md-on-select="tabOnSelected(0)"></md-tab>
                            <md-tab label="Net Worth" md-on-select="tabOnSelected(1)"></md-tab>
                            <md-tab label="# HNIs" md-on-select="tabOnSelected(2)"></md-tab>
                            <md-tab label="Conv. Rate" md-on-select="tabOnSelected(3)"></md-tab>
                            <md-tab label="Avg Conv. Time" md-on-select="tabOnSelected(4)"></md-tab>
                            <md-tab label="Retention Rate" md-on-select="tabOnSelected(5)"></md-tab>
                            <md-tab label="Weekly Client Logins" md-on-select="tabOnSelected(6)"></md-tab>
                            <md-tab label="Annual AUM" md-on-select="tabOnSelected(7)"></md-tab>
                            <md-tab label="Annual Clientele" md-on-select="tabOnSelected(8)"></md-tab>
                            <md-tab label="Annual Net Worth" md-on-select="tabOnSelected(9)"></md-tab>
                        </md-tabs>
                    </div>
                </div>
            </md-dialog>
        `;

    function unitWrapper (unit) {
        return '<small>' + unit + '</small>';
    }

    function shortenNumber (num) {
        if (num >= 1000 && num < 1000000) {
            return (num / 1000).toFixed(2) + unitWrapper('k');
        } else if (num >= 1000000 && num < 1000000000) {
            return (num / 1000000).toFixed(2) + unitWrapper('M');
        } else if (num >= 1000000000 && num < 1000000000000) {
            return (num / 1000000000).toFixed(2) + unitWrapper('B');
        } else if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(2) + unitWrapper('T');
        } else return num.toFixed(2);
    };

    this.init = function ($$scope) {


        $scope = $$scope.$new();

        if ($rootScope.canceller) { // cancel previous pending api calls     
            $rootScope.canceller.resolve();
        }
        $rootScope.canceller = $q.defer();

        var colorTheme = {
            colors: colors
        };

        //    colors: ["#14A2CD", "#48B312", "#CDC114"]
        //007E6A

        Highcharts.setOptions(colorTheme);

        $scope.tagColors = tagColors;
        $scope.tabInfo = tabInfo;
        $scope.STATE_NAMES = STATE_NAMES;

        $scope.tabOnSelected = function (tab) {
            $scope.currentTab = tab;

            var loading = document.getElementById("dialog-loading");
            loading.style['visibility'] = "";

            self.getData(self.currentTab);
        };

    }

    this.getData = function (tab) {
        var url = DOMAIN + SUB_DOMAIN + $scope.tabInfo[$scope.currentTab].KPI_DOMAIN + "?advisorId=" + advisorId;

        this.getDataFromApi(url);
    }


    this.getDataFromApi = function (url) {

        console.log(url);

        if (USE_DUMMY_DATA) {
            setTimeout(function () {
                var overall = 10;
                var state = 70;
                var firm = 80;
                var stateCode = 'OR';
                var advisorKpi = 80000000;

                $scope.$apply(function () {  // async function that is outside angular framework, e.g. setTimeout
                    var formatter = $scope.tabInfo[$scope.currentTab].formatter;
                    $scope.kpi_details = {
                        advisorKpi: formatter(80000000),
                        overall: {
                            percentile: overall,
                            best: formatter(999),
                            worst: formatter(111)
                        },
                        state: {
                            percentile: state,
                            best: formatter(888),
                            worst: formatter(111),
                        },
                        firm: {
                            percentile: firm,
                            best: formatter(777),
                            worst: formatter(333),
                        },
                        stateCode: stateCode
                    };
                });


                self.loadData(overall, state, firm, stateCode);
            }, 1000);

            return;
        }

        return $http.get(url, { timeout: $rootScope.canceller.promise, headers: {'Authorization': SessionService.access_token }  }).then(function mySuccess(response) {
            var formatter = $scope.tabInfo[$scope.currentTab].formatter;
           
            var kpi_details = response.data.data;
           
            kpi_details.advisorKpi = formatter(kpi_details.advisorKpi);
            kpi_details.overall.best = formatter(kpi_details.overall.best);
            kpi_details.overall.worst = formatter(kpi_details.overall.worst);
            kpi_details.state.best = formatter(kpi_details.state.best);
            kpi_details.state.worst = formatter(kpi_details.state.worst);
            kpi_details.firm.best = formatter(kpi_details.firm.best);
            kpi_details.firm.worst = formatter(kpi_details.firm.worst);

            $scope.kpi_details = kpi_details;

            var overall = kpi_details.overall.percentile;
            var state = kpi_details.state.percentile;
            var firm = kpi_details.firm.percentile;
            var stateCode = kpi_details.stateCode;
            var advisorKpi = kpi_details.advisorKpi;

            self.loadData(overall, state, firm, stateCode);

        }, function myError(response, error) {
            console.log("Error " + response.status + ": " + response.statusText + "!");
        });
    }

    this.loadData = function (overall, state, firm, stateCode) {
        var padding = STATE_RATIOS[stateCode] ? 100 * (1 - STATE_RATIOS[stateCode]) : 0;

        this.createAreaChart('chart-overall', overall, 'US', true);
        this.createAreaChart('chart-state', state, 'state_' + stateCode, false, padding, padding);
        this.createAreaChart('chart-firm', firm, 'firm');

        var loading = document.getElementById("dialog-loading");
        loading.style['visibility'] = "hidden";
    }


    this.show = function (ev, tab, $$scope) {


        this.init($$scope);
        $scope.currentTab = tab;

        $mdDialog.show({
            controller: LeaderBoardController,
            template: dialogHTML,
            parent: angular.element(document.getElementById('main-container')),
            targetEvent: ev,
            scope: $scope,
            clickOutsideToClose: true,
            onComplete: () => {
                // assign color to tabs
                document.querySelector("md-tab-item:nth-child(1)").classList.add("tab-one");
                document.querySelector("md-tab-item:nth-child(2)").classList.add("tab-one");
                document.querySelector("md-tab-item:nth-child(3)").classList.add("tab-one");

                document.querySelector("md-tab-item:nth-child(4)").classList.add("tab-two");
                document.querySelector("md-tab-item:nth-child(5)").classList.add("tab-two");
                document.querySelector("md-tab-item:nth-child(6)").classList.add("tab-two");
                document.querySelector("md-tab-item:nth-child(7)").classList.add("tab-two");

                document.querySelector("md-tab-item:nth-child(8)").classList.add("tab-three");
                document.querySelector("md-tab-item:nth-child(9)").classList.add("tab-three");
                document.querySelector("md-tab-item:nth-child(10)").classList.add("tab-three");

                var content = document.getElementById("dialog-content");
                content.style['visibility'] = "";
            }
        });


    };

    this.createAreaChart = function (id, value, img, isRectangle, marginTop, marginBottom) {
        var x = isRectangle ? 300 : 200;
        var y = isRectangle ? 200 : 200;

        var marginTop = marginTop ? marginTop : 0;
        var marginBottom = marginBottom ? marginBottom : 0;

        var currentColor = Highcharts.getOptions().colors[$scope.tabInfo[$scope.currentTab].colorId];

        Highcharts.chart(id, {
            credits: {
                enabled: false
            },
            chart: {
                backgroundColor: Highcharts.Color(currentColor)
                    .setOpacity(0.2)
                    .get(),
                type: 'column',
                margin: [marginTop, 0, marginBottom, 0]
            },
            title: {
                text: null
            },
            legend: {
                enabled: false
            },
            xAxis: {
                visible: false
            },
            yAxis: {
                min: 0,
                max: 100,
                visible: false
            },
            plotOptions: {
                series: {
                    enableMouseTracking: false,
                    borderColor: 'white',
                    borderWidth: 0,
                    pointWidth: x,
                    marker: {
                        enabled: false
                    },
                    color: currentColor
                }
            },
            series: [{
                data: [value]
            }]
        }, function (chart) { // on complete
            // map mask 
            chart.renderer.image('/assets/images/' + img + '.png', 0, 0, x + 1, y + 1).attr({ zIndex: 3 }).add();
            // chart label
            chart.renderer.text(value + '%', x / 2, y / 2).attr({ 'text-anchor': 'middle', zIndex: 4 }).css({ stroke: currentColor, fill: 'white', 'font-size': '3em', 'font-weight': 'bold' }).add();
        });
    }

}

angular
    .module('app.biDashboard')
    .controller('LoginsController', LoginsController)
    .service('LoginsService', LoginsService);

function LoginsService(MetricsService, $compile) {
    this.init = function(){
        var base = new MetricsService();
        // constants
        base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
        //base.DOMAIN = "http://10.1.10.11:8080";
        base.SUB_DOMAIN = "/bi/stats";
        base.USE_DUMMY_DATA = false;
        base.controllerName = "logins";
        base.showDatepicker = false;
        base.startDate = null;
        base.endDate = null;
        base.TITLE_TEMPLATE = "Login Statistics for ";

        base.isWeek = true;
        base.isProspect = true;

        base.unit = 'minute';


        base.data1 = {
            "totalFirms": 599,
            "unit": "minute",
            "Page": 0,
            "hasNext": true,
            "firms": [
                {
                    "firmId": 801,
                    "name": "Yuchen Firm",
                    "totalLogins": 100,
                    "uniqueLogins": 11,
                    "avgSessionTime": 2,
                },
                {
                    "firmId": 801,
                    "name": "Yuchen Firm2",
                    "totalLogins": 100,
                    "uniqueLogins": 20,
                    "avgSessionTime": 3.4,
                },
                {
                    "firmId": 801,
                    "name": "Yuchen Firm3",
                    "totalLogins": 50,
                    "uniqueLogins": 18,
                    "avgSessionTime": 1.4,
                },
                {
                    "firmId": 801,
                    "name": "Yuchen Firm4",
                    "totalLogins": 70,
                    "uniqueLogins": 58,
                    "avgSessionTime": 3,
                }
            ]
        };


        base.data2 = {
            "totalAdvisors": 599,
            "unit": "minute",
            "Page": 0,
            "hasNext": true,
            "advisors": [
                {
                    "advisorId": 801,
                    "name": "Robert",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 2,
                },
                {
                    "advisorId": 801,
                    "name": "Robert2",
                    "totalLogins": 30,
                    "uniqueLogins": 30,
                    "avgSessionTime":0.4,
                },
                {
                    "advisorId": 801,
                    "name": "Robert3",
                    "totalLogins": 50,
                    "uniqueLogins": 20,
                    "avgSessionTime":1,
                }
            ]
        };


        base.data3 = {
            "totalClients": 599,
            "unit": "minute",
            "Page": 0,
            "hasNext": true,
            "clients": [
                {
                    "clientId": 801,
                    "name": "Robert4",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 2
                },
                {
                    "clientId": 801,
                    "name": "Robert5",
                    "totalLogins": 100,
                    "uniqueLogins": 38,
                    "avgSessionTime": 1
                }
            ]
        };


        //---------------------------------- Pipeline -----------------------------------------------------------------

        base.checkRange = function (range) {
            if (this.isWeek != range) {
                setTimeout(function () {
                    var self = base;
                    var name = self.level_list[self.current_level]['name'];
                    var id = self.level_list[self.current_level]['id'];
                    self.getDataForLevel(name, id, 0, self.current_level, [range, self.isProspect]);
                }, 10);
            }
        }

        base.checkUserType = function () {
            setTimeout(function () {
                var self = base;
                var name = self.level_list[self.current_level]['name'];
                var id = self.level_list[self.current_level]['id'];
                self.getDataForLevel(name, id, 0, self.current_level, [self.isWeek, self.isProspect]);
            }, 10);
        }






        base.validateLevel = function (level) {
            if (!this.compareUserType(level) || !this.compareRange(level)) {

                var name = this.level_list[level]['name'];
                var id = this.level_list[level]['id'];
               

                this.getDataForLevel(name, id, 0, level);
                return false;
            }

            return true;
        }

        base.compareRange = function (level) {
            var range_X = this.level_list[level]['isWeek'];
            var range_Y = this.isWeek;

            return (range_X === range_Y)
        }

        base.compareUserType = function (level) {
            var user_X = this.level_list[level]['isProspect'];
            var user_Y = this.isProspect;

            return (user_X === user_Y)

        }

        //---------------------------------- Pipeline helper ---------------------------------------------------------------

        base.yAxisSelector = function () {
            var yAxis = [{
                min: 0,
                title: {
                    text: 'Number of logins',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
                // ,
                // stackLabels: {
                //     style: {
                //         fontWeight: 'bold',
                //         color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                //     },
                //     enabled: true
                // }
            },
            {
                min: 0,
                title: {
                    text: 'Session time',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    },
                    format: '{value} '+ this.unit
                },
                opposite: true

            }];




            return yAxis;
        }


        base.prepareSeries = function (input) {

            // combine all points for each series into lists
            var totalLogins = [];
            var uniqueLogins = [];
            var avgSessionTime = [];

            var series = [];

            var self = base;
            input.forEach(function (obj, p) {
                var name = 'firmId';
                if (self.current_level === 0) {
                    name = 'firmId';
                } else if (self.current_level === 1) {
                    name = 'advisorId';
                } else if (self.current_level === 2) {
                    name = 'clientId'
                }
                totalLogins.push({ id: obj[name], y: obj['totalLogins'] });
                uniqueLogins.push({ id: obj[name], y: obj['uniqueLogins'] });
                avgSessionTime.push({ id: obj[name], y: obj['avgSessionTime'] });

            });


            var totalPoints = {
                name: 'Total Logins',
                data: totalLogins,
                stack: "stack0",
                stackId: 0
            };

            var uniquePoints = {
                name: 'Unique Logins',
                data: uniqueLogins,
                stack: "stack1",
                stackId: 1
            };


            var avgSessionPoints = {
                name: 'Avg Session Time',
                data: avgSessionTime,
                type: 'spline',
                yAxis: 1
            };
            series.push(totalPoints);
            series.push(uniquePoints);
            series.push(avgSessionPoints);

            return series;
        }


        //---------------------------------- Widgets -----------------------------------------------------------------
        base.createWidgets = function (chart) {
            this.createPathSelector(chart);
            this.createRangeSelector(chart);
        }

        //path selector
        base.createRangeSelector = function (chart) {
            var rangeHTML = this.generateRangeSelector();

            var text = chart.renderer.text(rangeHTML).add();
            var textBBox = text.getBBox();


            var x = chart.plotLeft + (chart.plotWidth) - (textBBox.width * 0.75);
            var y = textBBox.height;
            text.attr({ x: "99%", y: y, "text-anchor": "end" });

            var rangeBlocks = text.element.children;

            for (var i = 0; i < rangeBlocks.length; i = i + 2) {
                rangeBlocks[i].setAttribute('data-isWeek', i);
                rangeBlocks[i].classList.add("path-link");
                rangeBlocks[i].classList.add("chart-legend");
                rangeBlocks[i].onclick = function () {
                    base.rangeOnClick(this);
                };
            };

            var tmp = base.isWeek ? 0 : 2;
            rangeBlocks[tmp].classList.add("curr-path-link");
        }

        base.rangeOnClick = function (element) {
            var w = parseInt(element.dataset.isWeek) === 0 ? true : false;

            this.checkRange(w);
        }

        base.generateRangeSelector = function () {
            var output = '<a>Last Week</a> | <a>Last Month</a>';
            return output;
        }

        base.createOffChartWidgets = function (scope) {
            this.createSwitch(scope);
        }


        // prospect/client switch
        base.createSwitch = function (scope) {
            var ctrl = this.controllerName;
            var switchHTML = `
                        <div class="row">
                            <div class="oranj-toggle medium-one-color">
                                <input id="user-switch" type="checkbox"  ng-model="`+ ctrl + `.isProspect" ng-change="` + ctrl + `.checkUserType()">
                                <label for="user-switch">
                                    <div class="toggle-switch" data-unchecked="Clients" data-checked="Prospects"></div>
                                </label>
                            </div>
                        </div>
            `;

            var chartHTML = angular.element(document.getElementById("chart-container"));
            chartHTML.append($compile(switchHTML)(scope));
        }

        base.createNewLevel = function (options, name, id) {

            //var startDate = !this.startDate ? null : new Date(this.startDate);
            //var endDate = !this.endDate ? null : new Date(this.endDate);

            var newLevel = {
                option: options,
                name: name,
                id: id,
                isWeek: this.isWeek,
                isProspect: this.isProspect
            };


            if (this.current_level === this.level_list.length) {
                this.level_list.push(newLevel);
            } else {
                this.level_list[this.current_level] = newLevel;
            }
        }

        return base;
    }
}


function LoginsController($scope, LoginsService) {
    var service = LoginsService.init();

    this.isWeek = service.isWeek;
    this.isProspect = service.isProspect;



    this.checkUserType = function () {
        this.isWeek = service.isWeek;
        service.isProspect = this.isProspect;

        try {
            service.checkUserType();
        }
        catch (err) {
            console.log("Error when clearing dates!");
        }
    }

    service.launch($scope);
}

angular
    .module('app.biDashboard')
    .factory('MetricsService', MetricsService);


function MetricsService($http, $rootScope, $compile, $q, SessionService) {
    return function () {
        var self = this;

        if ($rootScope.canceller) { // cancel previous pending api calls     
            $rootScope.canceller.resolve();
        }
        $rootScope.canceller = $q.defer();


        // constants
        this.DOMAIN = $rootScope.domain;
        this.MAX_COLUMN_NUM = 15;
        this.SUB_DOMAIN = "/bi/goals";
        this.TITLE_TEMPLATE = "Total Goals Created by ";
        this.USE_DUMMY_DATA = true;
        this.controllerName = null;
        this.showDatepicker = true;
        this.chart_id = 'chart';

        var colorTheme = {
            colors: ["#000285", "#11BEDF", "#40B349", "#A1CB39", "#ACE6F9", "#FCCC08"]
        };

        Highcharts.setOptions(colorTheme);

        this.chart = null;

        this.level_list = [];
        this.startDate = null;
        this.endDate = null;
        this.isRequired = false;
        this.current_level = 0;
        this.doUpdate = false;
        this.lastInitial = '';

        //chart option template
        this.optionTemplate = {
            credits: {
                enabled: false
            },
            lang: {
                noData: "No data to display"
            },
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#303030'
                }
            }
        };



        // 1. Initial launch pipeline 
        //      launch -> getData -> loadData -> createChart
        // 2. When-click-on-bars pipeline
        //      drillDown -> getData -> loadData -> createChart  
        //      drillDown -> createChart  (When previous data is available)
        // 3. When-click-on-path-selector pipeline
        //      drillToLevel -> createChart
        // 4. Date-change pipeline
        //      validateLevel -> getData -> loadData -> createChart
        // 5. Week/Month and Prospects/Clients pipeline  (in LoginsController.js)
        //      validateLevel -> getData -> loadData -> createChart





        //------------------------------------ Pipeline ---------------------------------------------------------------
        this.launch = function (scope) {

            var root = SessionService.name;  // dummy root name, should be returned by Oranj API
            var rootId = SessionService.id;

            this.getData(root, rootId, 0);

            this.createOffChartWidgets(scope);

        };

        this.drillDown = function (name, id) {
            if (this.current_level + SessionService.level >= 2) {
                alert('Cannot drilldown anymore!');
                return; //level number overflowed, cannot drilldown anymore
            }

            var new_level = this.current_level + 1;

            if (new_level === this.level_list.length) {
                this.getDataForLevel(name, id, 0, new_level);
                return;
            }

            if (name.toString().localeCompare(this.level_list[new_level]['name']) != 0) {
                this.removeFromLevel(new_level);
                this.getDataForLevel(name, id, 0, new_level);
                return;
            }


            if (!this.validateLevel(new_level)) {
                return;
            }

            this.current_level = new_level;
            this.createChart();

        }

        this.drillToLevel = function (level) {
            // shouldn't replace the chart until this onClick function terminates
            // it seems that Promise is too faster and still causes error compared to setTimeOut
            // could fix later

            setTimeout(function () {

                if (!self.validateLevel(level)) {
                    return;
                }
                self.current_level = level;
                self.createChart();
            }, 10);
        }

        this.validateLevel = function (level) {
            if (!this.compareDate(level)) {
                var name = this.level_list[level]['name'];
                var id = this.level_list[level]['id'];

                this.getDataForLevel(name, id, 0, level);
                return false;
            }

            return true;
        }

        this.getData = function (name, id, page) {

            if (this.controllerName.localeCompare("logins") === 0) {
                this.getDataForLevel(name, id, page, this.current_level, [this.isWeek, this.isProspect]);
            } else {
                this.getDataForLevel(name, id, page, this.current_level);
            }

        }

        this.getDataForLevel = function (name, id, page, level, args) {
            console.time('API');
            this.showLoading();

            var domain = this.DOMAIN;
            var subdomain = this.SUB_DOMAIN;
            var baseUrl;

            var role_level = level + SessionService.level;

            // construct url based on current drilldown level
            if (role_level === 0) {
                baseUrl = domain + subdomain + "/firms?";
            } else if (role_level === 1) {
                baseUrl = domain + subdomain + "/advisors?firmId=" + id;
            } else if (role_level === 2) {
                baseUrl = domain + subdomain + "/clients?advisorId=" + id;
            } else {
                console.log("Invalid level!");
                self.hideLoading();
                return;
            }

            var endDate = !this.endDate ? null : this.endDate.toISOString().slice(0, 10);
            var startDate = !this.startDate ? null : this.startDate.toISOString().slice(0, 10);

            var startName = this.controllerName.localeCompare("aum") === 0 ? "previousDate" : "startDate";
            var endName = this.controllerName.localeCompare("aum") === 0 ? "currentDate" : "endDate";

            // add start/end date
            baseUrl = !startDate ? baseUrl : baseUrl + "&" + startName + "=" + startDate;
            baseUrl = !endDate ? baseUrl : baseUrl + "&" + endName + "=" + endDate;

            // add page number

            if (this.controllerName.localeCompare("logins") === 0) {
                if (!args) {
                    args = [this.isWeek, this.isProspect];
                }
                var isWeek = args[0];
                var isProspect = args[1];
                // add range and user for Logins
                baseUrl = isWeek === undefined ? baseUrl : baseUrl + "&range=" + (isWeek ? "week" : "month");
                baseUrl = isProspect === undefined ? baseUrl : baseUrl + "&user=" + (isProspect ? "prospect" : "client");

                baseUrl = baseUrl + "&page=" + page;

                this.getDataFromApi(baseUrl, name, id, page, level, [isWeek, isProspect]);
            } else {
                baseUrl = baseUrl + "&page=" + page;

                this.getDataFromApi(baseUrl, name, id, page, level);
            }

            return baseUrl;



        }

        this.getDataFromApi = function (newUrl, name, id, page, level, args, data) {
            var type;

            var role_level = level + SessionService.level;
            if (role_level === 0) {
                type = 'firms';
            } else if (role_level === 1) {
                type = 'advisors';
            } else if (role_level === 2) {
                type = 'clients';
            }

            var newUrl = newUrl.slice(0, newUrl.lastIndexOf("=") + 1) + page;
            console.log(newUrl);

            if (this.USE_DUMMY_DATA) {
                var response;

                var role_level = level + SessionService.level;

                if (role_level === 0) {
                    response = this.data1;
                } else if (role_level === 1) {
                    response = this.data2;
                } else if (role_level === 2) {
                    response = this.data3;
                }

                var data = response;
                data['data'] = response[type];
                this.current_level = level;

                if (this.controllerName.localeCompare("logins") === 0) {
                    this.isWeek = args[0];
                    this.isProspect = args[1];
                    this.unit = data['unit'];
                }

                this.loadData(data, name, id);
                return;
            }

            return $http.get(newUrl, { timeout: $rootScope.canceller.promise, headers: {'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
                if (self.controllerName.localeCompare("goals") != 0) {
                    self.PreProcessData(response, type, newUrl, name, id, page, level, args, data);
                    return data;
                }
                else {
                    var hasNext = response.data.data['last'];

                    if (data) {
                        data['data'] = data['data'].concat(response.data.data[type]);
                    } else {
                        data = response.data.data;
                        data['data'] = response.data.data[type];
                    }
                    if (hasNext) {

                        self.current_level = level;
                        self.loadData(data, name, id);
                        return data;
                    } else {
                        self.getDataFromApi(newUrl, name, id, page + 1, level, args, data)
                    }
                }
            }, function myError(response, error) {
                console.log("Error " + response.status + ": " + response.statusText + "!");
                self.hideLoading();
            });
        }



        this.PreProcessData = function (response, type, newUrl, name, id, page, level, args, data) {
            var hasNext = response.data.data['hasNext'];

            if (data) {
                data['data'] = data['data'].concat(response.data.data[type]);
            } else {
                data = response.data.data;
                data['data'] = response.data.data[type];
            }

            if (!hasNext) {

                if (this.controllerName.localeCompare("logins") === 0) {
                    this.isWeek = args[0];
                    this.isProspect = args[1];
                    this.unit = data['unit'];
                }


                this.current_level = level;
                this.loadData(data, name, id);
            } else {
                this.getDataFromApi(newUrl, name, id, page + 1, level, args, data)
            }
        }

        this.loadData = function (input, name, id) {

            console.timeEnd('API');
            var currentOptions = {
                chart: this.chartSelector(input),
                title: this.titleSelector(name),
                subtitle: this.subtitleSelector(input),
                series: this.seriesSelector(input),
                xAxis: this.xAxisSelector(input),
                yAxis: this.yAxisSelector(input),
                tooltip: this.tooltipSelector(input),
                plotOptions: this.plotOptionsSelector(input),
                legend: this.legendSelector(input)
            };

            currentOptions = Object.assign({}, this.optionTemplate, currentOptions);

            this.createNewLevel(currentOptions, name, id); // update drilldown level and prepare chart data
            this.createChart(); // update drilldown level and prepare chart data
        }



        this.createChart = function () {

            console.time('Chart');
            this.lastInitial = '';
            this.hideLoading();
            this.chart = Highcharts.chart(this.chart_id, this.level_list[this.current_level]['option']);
            console.timeEnd('Chart');

        }

        //------------------------------------ Pipeline helper ---------------------------------------------------------------


        this.createNewLevel = function (options, name, id) {

            var startDate = !this.startDate ? null : new Date(this.startDate);
            var endDate = !this.endDate ? null : new Date(this.endDate);

            var newLevel = {
                option: options,
                name: name,
                id: id,
                start: startDate,
                end: endDate
            };


            if (this.current_level === this.level_list.length) {
                this.level_list.push(newLevel);
            } else {
                this.level_list[this.current_level] = newLevel;
            }
        }

        this.showLoading = function () {
            if (this.chart != null) {
                this.chart.showLoading('Loading...');
            }
        }

        this.hideLoading = function () {
            if (this.chart != null) {
                this.chart.hideLoading();
            }
        }

        this.removeFromLevel = function (level) {
            this.level_list = this.level_list.slice(0, level);
        }

        //------------------------------------ Chart Options Constructor ---------------------------------------------------------------
        this.chartSelector = function () {
            var chart = {
                type: 'column',
                zoomType: 'xy',
                events: {
                    load: this.chartOnLoad
                },
                panning: true,
                panKey: 'shift'
            }

            return chart;
        }


        this.titleSelector = function (name) {

            var title = {
                text: this.TITLE_TEMPLATE + name
            };

            return title;
        }

        this.subtitleSelector = function () {
            return null;
        }

        this.seriesSelector = function (input) {
            return this.prepareSeries(input.data);
        }

        this.xAxisSelector = function (input) {
            var xAxis = {
                categories: this.prepareCategories(input.data),
                crosshair: false,
                labels: {
                    formatter: this.xAxisFormatter
                }

            };
            return xAxis;
        }

        this.xAxisFormatter = function () {

            var label = this.axis.defaultLabelFormatter.call(this);

            this.axis.autoRotation = null;

            if (this.axis.tickInterval > 1) {

                var initial = label.charAt(0).toUpperCase();

                if (initial === self.lastInitial) {

                    return '';
                }

                self.lastInitial = initial;

                return initial;
            }

            return label;
        }

        this.yAxisSelector = function () {
            var yAxis = {
                min: 0,
                title: {
                    text: 'Number of goals'
                }
            }

            return yAxis;
        }

        this.tooltipSelector = function () {
            var tooltip = {
                formatter: this.formatter,
                shared: false
            }

            return tooltip;
        }

        this.plotOptionsSelector = function () {
            var plotOptions = {

                line: {
                    marker: {
                        enabled: false
                    },
                    dataLabels: {
                        enabled: false
                    }
                },
                series: {
                    stickyTracking: false,
                    turboThreshold: 0,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: this.chartOnClick
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    events: {
                        legendItemClick: function () {
                            return false;
                        }
                    },
                    animation: true
                },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false
                    },
                    marker: {
                        enabled: false
                    }
                }
            };

            return plotOptions;
        }

        this.legendSelector = function () {
            var legend = {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                shadow: false,
                itemHoverStyle: {
                    cursor: 'auto'
                }
            }
            return legend;
        }

        // chart onload event
        this.chartOnLoad = function () {
            self.createWidgets(this);
        }



        // chart bar onclick event
        this.chartOnClick = function () {
            self.drillDown(this.category, this.id);
        }

        // tooltip formatter
        this.formatter = function () {
            var s = '<b>' + this.x + '</b>';
            var allSeries = this.series.chart.series;

            allSeries.forEach(function (series) {
                if (series.data[this.point.index] && series.data[this.point.index].y) {
                    s += '<br/>' + series.name + ': ' + series.data[this.point.index].y;
                }

            }, this);

            return s;


        }

        //construct categories data for chart template
        this.prepareCategories = function (input) {
            var categories = input.map(function (x) {
                var name = x['name'];
                if (self.current_level === 0) {
                    name = x['name'];
                } else if (self.current_level === 1) {
                    name = x['name'];
                } else if (self.current_level === 2) {
                    name = x['name'];
                }
                return name;
            });

            var output = [];
            categories.forEach(function (x) {
                output.push(x);
            });

            return output;
        }

        //construct series data for chart template
        this.prepareSeries = function (input) {
            var goalMap = {};
            input.forEach(function (x, i) {
                for (var category in goalMap) {
                    goalMap[category].push(0);
                }
                var goals = x['goals'];
                for (var key in goals) {
                    if (!goalMap[key]) {
                        goalMap[key] = Array.apply(null, Array(i + 1)).map(Number.prototype.valueOf, 0);
                    }
                    goalMap[key][i] = goals[key];
                }
            });

            // combine all points for each series into lists

            var series = [];
            for (var key in goalMap) {
                var dataDrillDown = goalMap[key].map(function (x, i) {

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

            return series;
        }
















        //---------------------------------- Widgets -----------------------------------------------------------------

        this.createWidgets = function (chart) {
            this.createPathSelector(chart);
        }



        //path selector
        this.createPathSelector = function (chart) {

            var note = chart.renderer.text("Zoom in by drag & select ").css({ fontSize: '10px' }).add();
            var noteBBox = note.getBBox();
            var x = chart.plotLeft * 0.5;
            var y = noteBBox.height * 3.3;
            note.attr({ x: x, y: y });
            //note.element.classList.add("chart-legend");




            var pathHTML = this.generatePathSelectorHTML();
            var text = chart.renderer.text(pathHTML).add();
            var textBBox = text.getBBox();
            var x = chart.plotLeft * 0.25;
            var y = textBBox.height;
            text.attr({ x: x, y: y });

            var pathBlocks = text.element.children;

            for (var i = 1; i < pathBlocks.length; i = i + 2) {
                pathBlocks[i].setAttribute('data-level', (i - 1) / 2);
                pathBlocks[i].classList.add("path-link");

                pathBlocks[i - 1].classList.add("chart-legend");
                pathBlocks[i].classList.add("chart-legend");

                pathBlocks[i].onclick = function () {
                    self.pathOnClick(this);
                };
            }
            
            pathBlocks[(self.current_level) * 2 + 1].classList.add("curr-path-link");
        }

        this.pathOnClick = function (element) {

            var level = parseInt(element.dataset.level);

            //drill up
            self.drillToLevel(level);

        }

        this.generatePathSelectorHTML = function () {
            var output = "Path:";

            this.level_list.forEach(function (element) {
                output += '<a>' + element['name'] + '</a>' + '>';
            });

            return output.slice(0, -1);
        }

        //---------------------------------- Offchart Widgets -----------------------------------------------------------------


        this.createOffChartWidgets = function (scope) {

            if (this.showDatepicker)
                this.createDatepicker(scope);
        }

        //datepicker
        this.createDatepicker = function (scope) {

            var ctrl = this.controllerName;
            var datePickerHTML = `
                 <div layout="row"  layout-align="center center">
                    <form name="startForm">
                    <md-input-container style="margin-bottom: 0px !important;">
                        <label>Start date</label>
                        <md-datepicker ng-model="`+ ctrl + `.startDate" name="dateField" md-max-date="` + ctrl + `.today"
                        ng-change="`+ ctrl + `.checkDate()" md-open-on-focus ng-required="` + ctrl + `.isRequired"></md-datepicker>

                        <div ng-messages="startForm.dateField.$error">
                        <div ng-message="valid">The entered value is not a date!</div>
                        <div ng-message="required">This date is required!</div>
                        <div ng-message="mindate">Date is too early!</div>
                        <div ng-message="maxdate">Date is too late!</div>
                        </div>
                    </md-input-container>
                    </form>

                    <form name="endForm">
                    <md-input-container style="margin-bottom: 0px !important;">
                        <label>End date</label>
                        <md-datepicker ng-model="`+ ctrl + `.endDate" name="dateField" md-min-date="` + ctrl + `.startDate"
                        md-max-date="`+ ctrl + `.today" ng-change="` + ctrl + `.checkDate()" md-open-on-focus ng-required="` + ctrl + `.isRequired"></md-datepicker>

                        <div ng-messages="endForm.dateField.$error">
                        <div ng-message="valid">The entered value is not a date!</div>
                        <div ng-message="required">This date is required!</div>
                        <div ng-message="mindate">Date is too early!</div>
                        <div ng-message="maxdate">Date is too late!</div>
                        </div>
                    </md-input-container>
                    </form>

                    <md-button class="md-secondary md-raised"  ng-click="`+ ctrl + `.clearDate()" ng-hide="` + ctrl + `.isRequired">Clear</md-button>
                    <md-button class="md-primary md-raised"  ng-click="`+ ctrl + `.assignYTD()">YTD</md-button>
                </div>
            `;

            var chartHTML = angular.element(document.getElementById("chart-container"));
            chartHTML.append($compile(datePickerHTML)(scope));
        }

        this.assignYTD = function () {
            this.startDate = new Date(new Date().getFullYear(), 0, 1);
            this.endDate = new Date();
            this.validateLevel(this.current_level);
        }

        this.clearDate = function () {

            this.endDate = null;
            this.startDate = null;

            this.validateLevel(this.current_level);

        }

        this.checkDate = function () {
            if (this.endDate != null) {
                this.endDate = this.startDate > this.endDate ? this.startDate : this.endDate;
            }

            this.validateLevel(this.current_level);
        }


        this.compareDate = function (level) {

            var startDate_X = this.level_list[level]['start'];
            startDate_X = !startDate_X ? null : startDate_X.getTime();

            var startDate_Y = this.startDate;
            startDate_Y = !startDate_Y ? null : startDate_Y.getTime();

            var endDate_X = this.level_list[level]['end'];
            endDate_X = !endDate_X ? null : endDate_X.getTime();

            var endDate_Y = this.endDate;
            endDate_Y = !endDate_Y ? null : endDate_Y.getTime();

            return (startDate_X == startDate_Y && endDate_X == endDate_Y)
        }


    };

}

angular
  .module('app.biDashboard')
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
  var netWorth = NetWorthService.init();
  netWorth.launch($scope);
}

angular
    .module('app.biDashboard')
    .service('SessionService', SessionService);

function SessionService() {
    
    // this.level = 2;
    // this.name = 'John Doe';
    // this.id = 1347;

    
//     {
//     "status": "success",
//     "data": {
//         "avatar": "https://runoranj-test.s3.amazonaws.com/user/mattfirm/8586267/avatar.jpeg?AWSAccessKeyId=AKIAIHEVGBZU5CTURLAQ&Expires=1501111784&Signature=kslOAeRq9KAhBmU3rg910692aUE%3D"
//     }
// }

    this.access_token = "Bearer dkSBs5YT4swynQXYEdYAuXJcZpaoJgld9xVjX8O92YrMS2nDvv1-p2tn0vCTWGbYQCrKRYdO26TAiv-Snyn-xgG7p81dq7UNv2aEUbwbK0YbhD2wquQr5ryekQ3PGhT0kZN2F5J46yWgsJEizwPSnI8OkPxzJeg6v8OUfwohUCcaaadusVJ99XhWW1cBl-EbeBLiY2r0oyPsc5AhYow38yU5BStPLVMnmkfw_uIiX0nj2wnFiGHL87OoafbDXeOtCHhGUoYlxv8e-5NR7H17yAGTGupjLk1sluCPotiip9f7bcNvaBgM7v3NxoJb14jAngTP7XUveTGe_ZmvpJuJGFXEorCeDj2ag8r8QIj7P7R7bdRQG6eDaqXeGoWX-YcjQFZVcQ";
    this.roles = ["Metrics_SummaryGoalsAll_Enable", "Metrics_SummaryGoalsFirm_Enable", "Metrics_SummaryGoalsManaged_Enable"];
    this.level = 0;
    this.name = 'Oranj';
    this.firm = 'mattfirm';
    this.id = -1;

    this.hasPermission = function (permission) {
        return roles.includes(permission);
    }
}
}());
