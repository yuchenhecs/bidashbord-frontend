angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController)
    .service('LeaderBoardService', LeaderBoardService);

function LeaderBoardService(LeaderBoardDialogService) {
    this.init = function () {
    };

}


function LeaderBoardController($scope, $mdDialog, LeaderBoardService, LeaderBoardDialogService) {
    this.showChart = function (ev) {
        LeaderBoardDialogService.showChart(ev);
    };
}