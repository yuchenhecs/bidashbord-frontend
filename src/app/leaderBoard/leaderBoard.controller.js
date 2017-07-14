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

    $scope.changeScope = function (scope) {
        //this.apiCallFunctionToBeWritten
        $scope.highlightButton(scope);
    };

    //have the default scope set to state
    $scope.changeScope('state');

}
