angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController)
    .service('LeaderBoardService', LeaderBoardService);

function LeaderBoardService(LeaderBoardDialogService) {
    this.init = function () {

    };
}


function LeaderBoardController($scope, $http, LeaderBoardService, LeaderBoardDialogService, LeaderBoardPercentileService) {
    // var percentileService = LeaderBoardPercentileService.init();
    // percentileService.launch();

    $scope.showChart = function (ev, tab) {
        LeaderBoardDialogService.show(ev, tab, $scope);
    };

    $scope.showPOTB = true;
    var advisorId = 332;
    var kpiUrl = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/gamification/advisors/" + advisorId + "/summary";
    var POTBUrlBase = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/gamification/advisors/" + advisorId + "/patOnTheBack?region="

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
                $scope.showPOTB= true;
                textList[0].active = "active";
            }else{
                $scope.showPOTB=false;
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
        return $http.get(url).then(function mySuccess(response) {
            $scope.kpi = response["data"]["data"];
            preprocessing($scope.kpi, "kpi");
            $scope.changeScope('state'); //have the default scope set to state
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }
    };

    var POTBApi = function (url) {
        return $http.get(url).then(function mySuccess(response) {
            preprocessing(response["data"]["data"], "POTB");
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }
    };

    kpiApi(kpiUrl);
}
