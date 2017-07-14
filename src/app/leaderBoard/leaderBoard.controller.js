angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController)
    .service('LeaderBoardService', LeaderBoardService);

function LeaderBoardService(LeaderBoardDialogService) {
    this.init = function () {

    };

}


function LeaderBoardController($scope, $mdDialog, LeaderBoardService, LeaderBoardDialogService) {
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
            return (num/1000) + 'k';
        } else if (num >= 1000000 && num <1000000000) {
            return (num/1000000) + 'M';
        } else if (num >= 1000000000) {
            return (num/1000000000) + 'B';
        } else return num;
    };

    $scope.changeScope = function (scope) {
        //this.apiCallFunctionToBeWritten (this only affects pat on the back text and ranking)
        $scope.highlightButton(scope);
    };

    $scope.kpiApi = function (url) {
        return $http.get(url).then(function mySuccess(response) {
            $scope.kpi = response["data"]["data"];
        }), function myError(response) {
            $log.error("Error " + response.status + ": " + response.statusText + "!");
        }
    };

    //have the default scope set to state
    $scope.changeScope('state');

    //change once apis are exposed
    if (useDummyData) {
        $scope.kpi = {
            aum: 1000000,
            networth: 12100000,
            hnis: 9,
            conversionRate: 56,
            avgConversionTime: 17,
            retentionRate: 95,
            logins: 45,
            aumGrowth: 4.8,
            clientGrowth: 5,
            networthGrowth: 15
        };
        $scope.kpi.aum = $scope.shortenNumber($scope.kpi.aum);
        $scope.kpi.networth = $scope.shortenNumber($scope.kpi.networth);
    } else {
        $scope.kpiApi('');
    }
}
