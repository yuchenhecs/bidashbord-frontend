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

    var useDummyData = true;

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
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }
    };

    $scope.kpiApi('http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/gamification/advisors/510');

    $scope.changeScope = function (scope) {
        //this.apiCallFunctionToBeWritten (this only affects pat on the back text and ranking)
        $scope.highlightButton(scope);
    };


    //have the default scope set to state
    $scope.changeScope('state');

    //change once apis are exposed
    // if (useDummyData) {
    //     $scope.kpi = {
    //         aum: 1357385,
    //         networth: 12100000,
    //         hnis: 9,
    //         conversionRate: 56,
    //         avgConversionTime: 17,
    //         retentionRate: 95,
    //         logins: 45,
    //         aumGrowth: 4.8,
    //         clientGrowth: 5,
    //         networthGrowth: 15
    //     };
    //     $scope.kpi.aum = $scope.shortenNumber($scope.kpi.aum);
    //     $scope.kpi.networth = $scope.shortenNumber($scope.kpi.networth);
    // } else {
    //     $scope.kpiApi('');
    // }
}
