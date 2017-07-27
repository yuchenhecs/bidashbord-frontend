angular
    .module('app')
    .service('SessionService', SessionService);

function SessionService() {
    
    // this.level = 2;
    // this.name = 'John Doe';
    // this.id = 1347;

    
//     {
//     "status": "success",
//     "data": {
//         "avatar": "https://runoranj-test.s3.amazonaws.com/user/mattfirm/8586267/avatar.jpeg?AWSAccessKeyId=AKIAIHEVGBZU5CTURLAQ&Expires=1501111784&Signature=kslOAeRq9KAhBmU3rg910692aUE%3D"
//     }
// }

    this.access_token = "Bearer dkSBs5YT4swynQXYEdYAuXJcZpaoJgld9xVjX8O92YrMS2nDvv1-p2tn0vCTWGbYQCrKRYdO26TAiv-Snyn-xgG7p81dq7UNv2aEUbwbK0YbhD2wquQr5ryekQ3PGhT0kZN2F5J46yWgsJEizwPSnI8OkPxzJeg6v8OUfwohUCcaaadusVJ99XhWW1cBl-EbeBLiY2r0oyPsc5AhYow38yU5BStPLVMnmkfw_uIiX0nj2wnFiGHL87OoafbDXeOtCHhGUoYlxv8e-5NR7H17yAGTGupjLk1sluCPotiip9f7bcNvaBgM7v3NxoJb14jAngTP7XUveTGe_ZmvpJuJGFXEorCeDj2ag8r8QIj7P7R7bdRQG6eDaqXeGoWX-YcjQFZVcQ";
    this.roles = ["Metrics_SummaryGoalsAll_Enable", "Metrics_SummaryGoalsFirm_Enable", "Metrics_SummaryGoalsManaged_Enable"];
    this.level = 0;
    this.name = 'Oranj';
    this.firm = 'mattfirm';
    this.id = -1;

    this.hasPermission = function (permission) {
        return roles.includes(permission);
    }
}