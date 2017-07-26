angular
    .module('app')
    .service('SessionService', SessionService);

function SessionService() {
    var access_token = "Bearer 18df8fdf-bae0-453d-b3aa-dca4dd4a7674";
    var roles = ["Metrics_SummaryGoalsAll_Enable", "Metrics_SummaryGoalsFirm_Enable", "Metrics_SummaryGoalsManaged_Enable"];
    
    // this.level = 2;
    // this.name = 'John Doe';
    // this.id = 1347;

    //


    this.level = 0;
    this.name = 'Oranj';
    this.id = -1;

    this.hasPermission = function (permission) {
        return roles.includes(permission);
    }
}