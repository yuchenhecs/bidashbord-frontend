angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController)
    .service('LeaderBoardService', LeaderBoardService);

function LeaderBoardService(LeaderBoardDialogService) {
    this.init = function () {

    };
}


function LeaderBoardController($scope, $http, LeaderBoardDialogService, SessionService, $log) {
    SessionService.refreshCanceller();

    //SessionService.curr_page = "LeaderBoard";
    //var DOMAIN = $scope.domain;

    var DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend"

    $scope.showChart = function (ev, tab) {
        LeaderBoardDialogService.show(ev, tab, $scope);
    };

    $scope.showPOTB = true;
    //var advisorId = 332;
    //var advisorId = 5098;


    var kpiUrl = DOMAIN + "/bi/gamification/advisors/summary";
    var POTBUrlBase = DOMAIN + "/bi/gamification/advisors/patOnTheBack?region="
    var avatarUrl = "https://" + SessionService.firm + ".oranjsites.com/oranj/" + SessionService.firm + "/profile/get/avatar";

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

    function shortenNumber(num){
        num = num ? num : 0 ;
        
        if (num >= 1000 && num < 1000000) {
            return (num / 1000).toFixed(2) +'k';
        } else if (num >= 1000000 && num < 1000000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000000000 && num < 1000000000000) {
            return (num / 1000000000).toFixed(2) + 'B';
        } else if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(2) + 'T';
        } else return (num).toFixed(2);
    }

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
        console.log(url);         
        //if(!(SessionService.curr_page === "LeaderBoard")) return;
        
        
        // var response = {
        //     "data": {
        //         "id": 80,
        //         "advisorId": 510,
        //         "aum": 46189396,
        //         "netWorth": 1406872689582.8,
        //         "hni": 5,
        //         "conversionRate": 40.2778,
        //         "avgConversionTime": 1304.43,
        //         "retentionRate": 90.2778,
        //         "weeklyLogins": 2,
        //         "aumGrowth": 1,
        //         "netWorthGrowth": 0.206,
        //         "clienteleGrowth": 2300,
        //         "updateDate": 1499981783000,
        //         "name": "Some Body",
        //         "points": 89283,
        //         "percentileOverall": 88,
        //         "percentileState": 90,
        //         "percentileFirm": 95
        //     }
        // }
        // $scope.kpi = response["data"];
        // preprocessing($scope.kpi, "kpi");
        // $scope.changeScope('state'); //have the default scope set to state

        return $http.get(url, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
            
            console.log(response.data);
            $scope.kpi = response.data;
            preprocessing($scope.kpi, "kpi");
            $scope.changeScope('state'); //have the default scope set to state
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }
    };

    var POTBApi = function (url) {
        console.log(url);         
        //if(!(SessionService.curr_page === "LeaderBoard")) return;
        
        // var response = 
        // {
        //     "data": {
        //         "id": 3,
        //         "advisorId": 510,
        //         "region": "firm",
        //         "aumAchievement": "You are Ranked 1st in AUM among all advisors in the firm",
        //         "netWorthAchievement": "Your NET WORTH is above the firm average",
        //         "hniAchievement": null,
        //         "conversionRateAchievement": null,
        //         "avgConversionRateAchievement": null,
        //         "retentionRateAchievement": "Your RETENTION RATE is above the firm average",
        //         "weeklyClientLoginsAchievement": null,
        //         "aumGrowthAchievement": null,
        //         "netWorthGrowthAchievement": null,
        //         "clienteleGrowthAchievement": null
        //     }
        // }

        // preprocessing(response["data"], "POTB");

        return $http.get(url, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
            preprocessing(response.data, "POTB");
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }
    };

    var avatarApi = function (url) {   
        //if(!(SessionService.curr_page === "LeaderBoard")) return;
        console.log(url);         
        
        return $http.get(url, { timeout: SessionService.canceller.promise, headers: { 'Authorization': SessionService.access_token } }).then(function mySuccess(response) {
            if (response.data.data) {
                $scope.avatar = response.data.data.avatarCompleteUrl;
            } else {
                $scope.avatar = $scope.logo;
            }
        }, function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        });

    };

    kpiApi(kpiUrl);
    avatarApi(avatarUrl);
}
