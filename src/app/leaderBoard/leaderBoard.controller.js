angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController)
    .service('LeaderBoardService', LeaderBoardService);

function LeaderBoardService(MetricsService) {
    this.init = function () {
        // most code is written in MetricsController
        var base = new MetricsService();
        // constants
        base.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
        base.SUB_DOMAIN = "/bi/goals";
        base.USE_DUMMY_DATA = false;
        base.controllerName = "leaderBoard";

        return base;
    }
}


function LeaderBoardController($scope, $mdDialog, LeaderBoardService) {
    var service = LeaderBoardService.init();

    this.showChart = function (ev) {
        $mdDialog.show({
            contentElement: '#myDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    service.launch($scope);
}










// Highcharts.chart('container', {
//     chart: {
//         type: 'area',
//         margin: [0, 0, 0, 0]

//     },
//     title: {
//         text: 'US and USSR nuclear stockpiles'
//     },
//      legend: {
//         enabled: false
//     },
//     credits: {
//                 enabled: false
//             },
//     xAxis: {
//                 labels: {
//                   reserveSpace: false,
//                   y: -5
//         				},
//         				tickWidth: 0,
//                 type: 'datetime'
//             },
//     yAxis: { 
//     					  labels: {
//             align: 'left',
//             x: 0,
//             y: -2
//         },
//         title: {
//                     text: null
//                 }
//     },
//     tooltip: {
//         pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
//     },
//     plotOptions: {
//         area: {
//             pointStart: 1940,
//             marker: {
//                 enabled: false
//             }
//         }
//     },
//     series: [{
//         name: 'USA',
//         stickyTracking: false,
//         data: [
//             [Date.UTC(1970, 9, 21), 0],
//             [Date.UTC(1970, 10, 4), 0.28],
//             [Date.UTC(1970, 10, 9), 0.25],
//             [Date.UTC(1970, 10, 27), 0.2],
//             [Date.UTC(1970, 11, 2), 0.28],
//             [Date.UTC(1970, 11, 26), 0.28],
//             [Date.UTC(1970, 11, 29), 0.47],
//             [Date.UTC(1971, 0, 11), 0.79],
//             [Date.UTC(1971, 0, 26), 0.72],
//             [Date.UTC(1971, 1, 3), 1.02],
//             [Date.UTC(1971, 1, 11), 1.12],
//             [Date.UTC(1971, 1, 25), 1.2],
//             [Date.UTC(1971, 2, 11), 1.18],
//             [Date.UTC(1971, 3, 11), 1.19],
//             [Date.UTC(1971, 4, 1), 1.85],
//             [Date.UTC(1971, 4, 5), 2.22],
//             [Date.UTC(1971, 4, 19), 1.15],
//             [Date.UTC(1971, 5, 3), 0]
//         ]
//     }]
// });