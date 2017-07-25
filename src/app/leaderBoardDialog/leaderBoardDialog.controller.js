angular
    .module('app')
    .service('LeaderBoardDialogService', LeaderBoardDialogService);

function LeaderBoardDialogService($mdDialog, $http, $q, $rootScope) {
    LeaderBoardDialogService.self = this;

    //var DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
    var DOMAIN = "http://10.1.15.177:8080";
    var SUB_DOMAIN = "/bi/gamification";
    var advisorId = 9714;
    var USE_DUMMY_DATA = false;
    var $scope;

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
            <md-dialog style="width:1000px;overflow: visible">
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
                        <div layout="row" layout-align="end center"  layout-padding>
                            <div>
                                <h1 style="margin:0" ng-bind-html="kpi_details.advisorKpi"></h1>
                            </div>
                        </div>
                        
                        <div layout="row" layout-align="space-between center"  layout-padding>
 
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

    var unitWrapper = function (unit) {
        return '<small>' + unit + '</small>';
    }

    var shortenNumber = function (num) {
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
            colors: ["#00a4d3", "#72bb53", "#CDC114"]
        };

        //    colors: ["#14A2CD", "#48B312", "#CDC114"]
        //007E6A

        Highcharts.setOptions(colorTheme);

        $scope.tagColors = ["tag-one", "tag-two", "tag-three"];

        $scope.tabInfo = [
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
                KPI_DOMAIN: "/aum"
            },
            {
                title: "Number of HNIs", colorId: 0,
                formatter: (num) => { return num },
                text_worst: 'least', text_best: 'most',
                KPI_DOMAIN: "/aum"
            },
            {
                title: "Convertion Rate", colorId: 1,
                formatter: (num) => { return (num / 1).toFixed(2) + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/aum"
            },
            {
                title: "Average Convertion Time", colorId: 1,
                formatter: (num) => { return (num / 24).toFixed(2) + unitWrapper('days') },
                text_worst: 'longest', text_best: 'shortest',
                KPI_DOMAIN: "/aum"
            },
            {
                title: "Retention Rate", colorId: 1,
                formatter: (num) => { return (num / 1).toFixed(2) + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/aum"
            },
            {
                title: "Weekly Client Logins", colorId: 1,
                formatter: (num) => { return num },
                text_worst: 'least', text_best: 'most',
                KPI_DOMAIN: "/aum"
            },
            {
                title: "Annualized AUM Growth", colorId: 2,
                formatter: (num) => { return num + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/aum"
            },
            {
                title: "Annualized Clientele Growth", colorId: 2,
                formatter: (num) => { return num + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/aum"
            },
            {
                title: "Annualized Worth Growth", colorId: 2,
                formatter: (num) => { return num + unitWrapper('%') },
                text_worst: 'lowest', text_best: 'highest',
                KPI_DOMAIN: "/aum"
            }
        ];

        $scope.STATE_NAMES = {
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

        $scope.tabOnSelected = function (tab) {
            $scope.currentTab = tab;

            var loading = document.getElementById("dialog-loading");
            loading.style['visibility'] = "";

            var self = LeaderBoardDialogService.self;
            self.getData(self.currentTab);
        };

    }

    this.getData = function (tab) {
        var url = DOMAIN + SUB_DOMAIN + $scope.tabInfo[$scope.currentTab].KPI_DOMAIN + "?advisorId=" + advisorId;

        this.getDataFromApi(url);
    }


    this.getDataFromApi = function (url) {

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


                LeaderBoardDialogService.self.loadData(overall, state, firm, stateCode);
            }, 1000);

            return;
        }

        return $http.get(url, { timeout: $rootScope.canceller.promise }).then(function mySuccess(response) {
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

            LeaderBoardDialogService.self.loadData(overall, state, firm, stateCode);

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
