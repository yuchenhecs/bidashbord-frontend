angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController)
    .service('LeaderBoardService', LeaderBoardService);

function LeaderBoardService(LeaderBoardDialogService) {
    this.init = function () {

    };

}


function LeaderBoardController($scope, $http, $mdDialog, LeaderBoardService, LeaderBoardDialogService) {
    $scope.showChart = function (ev) {
        LeaderBoardDialogService.showChart(ev);
    };

    var testData = {
        "id": 3,
        "advisorId": 510,
        "region": "firm",
        "aumAchievement": "You are Ranked 1st in AUM among all advisors in the firm",
        "netWorthAchievement": "Your NET WORTH is above the firm average",
        "hniAchievement": null,
        "conversionRateAchievement": null,
        "avgConversionRateAchievement": null,
        "retentionRateAchievement": "Your RETENTION RATE is above the firm average",
        "weeklyClientLoginsAchievement": null,
        "aumGrowthAchievement": null,
        "netWorthGrowthAchievement": null,
        "clienteleGrowthAchievement": null
    };

    var preprocessing = function(data) {
        var textList = [];
        var i = 0;
        for (var key in data) {
            if (key === "id" || key === "advisorId" || key === "region") { continue; }
            if (data[key] !== null) {
                textList.push({text:data[key], index:i});
                i++;
            }
        }
        //set one to be the active slide to show
        textList[0].active = "active";
        $scope.textList = textList;
    };

    $scope.highlightButton = function (scope) {
        $scope.lbOverall = 'offFocus';
        $scope.lbState = 'offFocus';
        $scope.lbFirm = 'offFocus';

        if (scope === 'overall') {
            $scope.lbOverall = 'onFocus';
            $scope.scope = scope;
        } else if (scope === 'state') {
            $scope.lbState = 'onFocus';
            $scope.scope = scope;
        } else {
            $scope.lbFirm = 'onFocus';
            $scope.scope = scope;
        }
    };

    $scope.shortenNumber = function (num) {
        if (num >= 1000 && num < 1000000) {
            return (num/1000).toFixed(2) + 'k';
        } else if (num >= 1000000 && num <1000000000) {
            return (num/1000000).toFixed(2) + 'M';
        } else if (num >= 1000000000 && num < 1000000000000) {
            return (num/1000000000).toFixed(2) + 'B';
        } else if (num >= 1000000000000) {
            return (num/1000000000000).toFixed(2) + 'T';
        } else return num.toFixed(2);
    };

    $scope.kpiApi = function (url) {
        return $http.get(url).then(function mySuccess(response) {
            console.log(response);
            $scope.kpi = response["data"]["data"];
            $scope.kpi.aum = $scope.shortenNumber($scope.kpi.aum);
            $scope.kpi.netWorth = $scope.shortenNumber($scope.kpi.netWorth);
            $scope.kpi.avgConversionTime = ($scope.kpi.avgConversionTime/24).toFixed(2);
            $scope.kpi.retentionRate = ($scope.kpi.retentionRate/1).toFixed(2);
            $scope.kpi.conversionRate = ($scope.kpi.conversionRate/1).toFixed(2);
            $scope.changeScope('state'); //have the default scope set to state
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }
    };

    $scope.changeScope = function (scope) {
        if (scope == 'overall') {
            $scope.rank = $scope.kpi.percentileOverall;
        } else if (scope === 'state') {
            $scope.rank = $scope.kpi.percentileState;
        } else {
            $scope.rank = $scope.kpi.percentileFirm;
        }
        $scope.highlightButton(scope);
    };

    $scope.kpiApi('http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/gamification/advisors/510/summary');
    preprocessing(testData);
}
