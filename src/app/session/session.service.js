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
//         }
//     }

    this.access_token = "Bearer p-GvCGqZlvbDrRkqc-bXTkq13TBafcCBT7wuAKGmzGNrKLaWcl4WPV6BdgOQLFtMvCE9FLSW8friXu4SJrFttB9kCc0K4mkvHzRqhkIHW8wpBWgBIIalHQp6i0leqHFgpQZWWKmzCvE0UMxm40vGbiWzgSQz3ebZucYOmL8n0ofRleye-lFa_KOEKP9xPscUY6y2T6CxeZ4p9q3LSzBC8NjG4OCm6Awstj7mHE4HcB2EP8nGWCDjP6EI_Uz_WQ0JLYGBYlKR-_hbpNHof_wY78zlK7oFXVGb7Bu29J-MqNSyej1bNNGK1Uxp6IjpCKjwVMMRvt9TnBKmt8xEYtz2c96pSqvpxJJ4IcWHQJTsVFg5cPyAj3-ma6o1Gmcopd3U8JazBw";
    this.roles = ["Metrics_SummaryGoalsAll_Enable", "Metrics_SummaryGoalsFirm_Enable", "Metrics_SummaryGoalsManaged_Enable"];
    this.level = 0;
    this.name = 'Oranj';
    this.firm = 'mattfirm';
    this.id = -1;

    this.hasPermission = function (permission) {
        return roles.includes(permission);
    }
}