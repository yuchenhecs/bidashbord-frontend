angular
    .module('app')
    .service('SessionService', SessionService);

function SessionService($http, $q, $rootScope) {
    // Advisor
    // FirmAdmin
    // SuperAdmin

    SessionService.self = this;

    //this.curr_page;
    //this.access_token = "Bearer p-GvCGqZlvbDrRkqc-bXTkq13TBafcCBT7wuAKGmzGNrKLaWcl4WPV6BdgOQLFtMvCE9FLSW8friXu4SJrFttB9kCc0K4mkvHzRqhkIHW8wpBWgBIIalHQp6i0leqHFgpQZWWKmzCvE0UMxm40vGbiWzgSQz3ebZucYOmL8n0ofRleye-lFa_KOEKP9xPscUY6y2T6CxeZ4p9q3LSzBC8NjG4OCm6Awstj7mHE4HcB2EP8nGWCDjP6EI_Uz_WQ0JLYGBYlKR-_hbpNHof_wY78zlK7oFXVGb7Bu29J-MqNSyej1bNNGK1Uxp6IjpCKjwVMMRvt9TnBKmt8xEYtz2c96pSqvpxJJ4IcWHQJTsVFg5cPyAj3-ma6o1Gmcopd3U8JazBw";

    // super admin
    this.access_token = "Bearer dNVshzVijHGDt8B030l87dYt_pc8cFrTZYQDVrKT5kL4YorCcqcVMh0ohiYYsEFvEqW6jYPsiodySqfINboo7ALG6hlNiGkP5rNEDZJVwyFwToJN9LyJdQPKuwWaQJQwyHEQHzIjx1e3z2cUCYUzV8kjdDYckRoC-8E5hNt39N45pxmwN5oiIJhbgPKy3f_D1DIMtRQPWcxLPLJFU5WCT7FhZswLolmvWK20qRJMnSJxKtYW7lfaiMPt7XumdS_baFavV4uNltgQnWre_aKCHUBJCcMlZBWy8t_3nOQTxP6luFRxZLcfbDK3Tc6SigLMigGI4A-v3WSsLNCalt_kV_ZswMPq2OLrtZZxCy6dbdS7eDDuGAFVyPOGSbKxrr1SlhxwOy-EHsL9HA1F3HSqUWxRa15xT3GxNCc9PjXZiXkKQHKQ";
    // firm admin
    //this.access_token = "Bearer mry0TIYnM-y-ij-ltOLlXAtUT_TGDSK3mM2WCcyYG0P4ApdYt_41kA_B83qHXqedMWhJScuOz0DnQoX-op0sVR9vbf_fOutyIzL2EKnATjxtmk_MQ4J7ve7mrAR__2LxYIKFdYBprUGfDjb5bR-Tr6tD83YurhHmwGwQFI6szHsd61k7TglDbUF0bBMdPT4GV_UHWAW9Vg0c26bwoStV_O7EyMdAQFLq5TjJcK5BotJ55yk8sOg0ngSOBLWcWzjGDp4ThukcSJcQnDi_c_JSqsTz_a2lCBLDscKMrJ41hVt7ZcshNEFwEfcVDws7MF5RcGlBTYA5bAZj47AxII2DVE4EexXhp9QD9CCfYOthYHvN4q_cjWwiTvvp0EGvBUmFR8A-yQ";
    // advisor
    //this.access_token = "Bearer bcOaAWoMeeHjC9FTKrFt44uAjYKCPDjldeaGeHrmQlsfT3bZvSfa7U9dkPgvemEpOKlYvjC8a1BvHTkHiSF0wPvD5YRehJiKA0ShFC7sqVA9Ds__Fv0rtbjJvqLUSuidaJnN6EHYbkBLLYk2_9e37gNa7pL_nHQhe-0g1stsFFM2YMTNAVq5alwUt0HEPPfR8w2wHQhMsCk0dc3xwzaS75PqDteketq7rvnndcWkmdKU0X2EcPJj1uS2L6RLVmXqRQpcfMg53XFG2Dg2zB1xy_IHHueTP8bJXytrL3hbfFo3H7OXxEkNQytKzMSxf_zIMzLJI3gAld7w_-Lp3CRrFGYRxtVXiwzLVmEcuREEfqoRBpEMzZPfHl0GUIhLFkxzqqn2IQ";
    this.level = 0;
    this.id = -1;


    this.name = 'Home';
    this.firm = 'mattfirm';

    this.roles = ["Metrics_SummaryGoalsAll_Enable", "Metrics_SummaryGoalsFirm_Enable", "Metrics_SummaryGoalsManaged_Enable"];
    this.role_promise = $http.get("https://dev-oauth.oranjsites.com/user/oranj", { headers: { 'Authorization': this.access_token } });
    this.role_promise.then(function mySuccess(response) {
        var self = SessionService.self;
        self.roles = response.data.authorities;
        self.user_id = response.data.user_id;

        self.applyPermission();
    });

    this.canceller = $q.defer();
    this.refreshCanceller = function () {
        if (this.canceller) { // cancel previous pending api calls
            this.canceller.resolve();
        }
        this.canceller = $q.defer();
    }

    this.applyPermission = function (){
        var self = SessionService.self;
        
        self.level = self.hasPermission('SuperAdmin') ? 0 : (self.hasPermission('FirmAdmin') ? 1 : 2);
        if(!self.hasPermission('Advisor')){
            $rootScope.sideNavConfig.splice(2, 1);
        }
        $rootScope.appReady = true;
    }
    this.hasPermission = function (permission) {
        return this.roles.includes(permission);
    }
}
