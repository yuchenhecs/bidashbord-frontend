angular
    .module('app')
    .service('SessionService', SessionService);

function SessionService($http, $q, $rootScope) {
    // Advisor
    // FirmAdmin
    // SuperAdmin

    SessionService.self = this;

    //this.access_token = "Bearer p-GvCGqZlvbDrRkqc-bXTkq13TBafcCBT7wuAKGmzGNrKLaWcl4WPV6BdgOQLFtMvCE9FLSW8friXu4SJrFttB9kCc0K4mkvHzRqhkIHW8wpBWgBIIalHQp6i0leqHFgpQZWWKmzCvE0UMxm40vGbiWzgSQz3ebZucYOmL8n0ofRleye-lFa_KOEKP9xPscUY6y2T6CxeZ4p9q3LSzBC8NjG4OCm6Awstj7mHE4HcB2EP8nGWCDjP6EI_Uz_WQ0JLYGBYlKR-_hbpNHof_wY78zlK7oFXVGb7Bu29J-MqNSyej1bNNGK1Uxp6IjpCKjwVMMRvt9TnBKmt8xEYtz2c96pSqvpxJJ4IcWHQJTsVFg5cPyAj3-ma6o1Gmcopd3U8JazBw";

    // super admin
    //this.access_token = "Bearer dNVshzVijHGDt8B030l87dYt_pc8cFrTZYQDVrKT5kL4YorCcqcVMh0ohiYYsEFvEqW6jYPsiodySqfINboo7ALG6hlNiGkP5rNEDZJVwyFwToJN9LyJdQPKuwWaQJQwyHEQHzIjx1e3z2cUCYUzV8kjdDYckRoC-8E5hNt39N45pxmwN5oiIJhbgPKy3f_D1DIMtRQPWcxLPLJFU5WCT7FhZswLolmvWK20qRJMnSJxKtYW7lfaiMPt7XumdS_baFavV4uNltgQnWre_aKCHUBJCcMlZBWy8t_3nOQTxP6luFRxZLcfbDK3Tc6SigLMigGI4A-v3WSsLNCalt_kV_ZswMPq2OLrtZZxCy6dbdS7eDDuGAFVyPOGSbKxrr1SlhxwOy-EHsL9HA1F3HSqUWxRa15xT3GxNCc9PjXZiXkKQHKQ";
    // firm admin
    //this.access_token = "Bearer mry0TIYnM-y-ij-ltOLlXAtUT_TGDSK3mM2WCcyYG0P4ApdYt_41kA_B83qHXqedMWhJScuOz0DnQoX-op0sVR9vbf_fOutyIzL2EKnATjxtmk_MQ4J7ve7mrAR__2LxYIKFdYBprUGfDjb5bR-Tr6tD83YurhHmwGwQFI6szHsd61k7TglDbUF0bBMdPT4GV_UHWAW9Vg0c26bwoStV_O7EyMdAQFLq5TjJcK5BotJ55yk8sOg0ngSOBLWcWzjGDp4ThukcSJcQnDi_c_JSqsTz_a2lCBLDscKMrJ41hVt7ZcshNEFwEfcVDws7MF5RcGlBTYA5bAZj47AxII2DVE4EexXhp9QD9CCfYOthYHvN4q_cjWwiTvvp0EGvBUmFR8A-yQ";
    // advisor
    //this.access_token = "Bearer bcOaAWoMeeHjC9FTKrFt44uAjYKCPDjldeaGeHrmQlsfT3bZvSfa7U9dkPgvemEpOKlYvjC8a1BvHTkHiSF0wPvD5YRehJiKA0ShFC7sqVA9Ds__Fv0rtbjJvqLUSuidaJnN6EHYbkBLLYk2_9e37gNa7pL_nHQhe-0g1stsFFM2YMTNAVq5alwUt0HEPPfR8w2wHQhMsCk0dc3xwzaS75PqDteketq7rvnndcWkmdKU0X2EcPJj1uS2L6RLVmXqRQpcfMg53XFG2Dg2zB1xy_IHHueTP8bJXytrL3hbfFo3H7OXxEkNQytKzMSxf_zIMzLJI3gAld7w_-Lp3CRrFGYRxtVXiwzLVmEcuREEfqoRBpEMzZPfHl0GUIhLFkxzqqn2IQ";
    
    
    
    //Admin/Advisor - Jalo
    //this.access_token = "Bearer hNVLcA3uOQw3yLYsGAk8P6gGTleNYo5EpmRB3HxOllYq4yTLa-I1wavs78CdI3r2XTJ3CuC95DYbMKOBOSLGEtgdaQImn08vfE5Ab5_ingb78pIHATgzh2Rjo8zHlGboJDWuTNbgXgYYDa-Y6b4sHnKubFEZ8Apv54qL-8O2k7EpGNKRCAk23eLVO1OctPCEnDDl9__leU-nvXl8akoHAsqzvxTQK_55QpdyHBgAU-aIl9bWxxg0aG8KWcv6yMPSCoSPZJ3ZVd-eQ7qYs0HGlfzT1fSOqaZn_oWGiJapDtirWaMX6jRfimBigg6VbXwuF8ukMc8qi0XDHnun7LHX0pU54EWidhi0idXhy1yKOAxcPRcRLOz4c79pAnUn9dx3uOqvcg";

    //Advisor - Robert
    //this.access_token = "Bearer n3ggpq4uD5ze_qrOp2XBaFeC7G4B_oXZ28nAVwqPCQXJ5kQ8hBg3Hr2qoNKPsVWyrFtcTZQkbfymciaUwNykgVYHcblFe49x5Y38L35iO2JgLDZMINYaX3cj_MncgToDqVXUvV0zAR7TsglfBI1faH8EwS8Deu8zA50ChiJ2uR_0QDj-mYU5lKk3wrl4u7QMPZ-tKJvCwjE6uhLS5WFkb3F-eDwy1BLOwjzRoitBKrUSdCbRMs5QQhkq_gR4jjMN6wi5RbjYFgZD_82JeO0K_trksvjC_Ew-EYxAX_IsOLQiuJidLs2jLH1w0WGpAzpRI1d9C9nz9hXrykcn0eAJ99kTbgwS7WirBk9AH_rNBwtVSiZXUxoF7srordtcCNjc2aA01A";

    //Advisor - Harsh
    //this.access_token = "Bearer AVkwt3cTgU-XB-63hRXexnjrDxTXllckcrF_Ta6l8RtgNzkg0wytY3wcOelclGsgeK_x0EmL8OG3FV3E0RpTgmEO3qDIbnlAlgtxbYUugZgvI7od8ZkYYCTTQ86V_7Ia7qUP_8RSiVii6WDUwQVcded4LmUWYDKMbPhT9PJQe9GOGh9h7iJGDTvMHeCnrlo0aKxeX8_PR1fywHUh5R5RD28vUe0ZgrZI6x0dy-D0UaD8Nslmq3Vcdanmj_hJcSyNfgI4hpmdqWZPC4NkIL0486uZ1oiQxBkkUujj60W5nC-ihOvo9kERkw8ChR3ZdO6QFJrV632LRpJjWAfIzk5J5zrLOLvXbNqTdn0KWaPIPqLIjxVOp1GA-pJq4hJK-QakDt1BbQ";

    //Advisor - Guru
    //this.access_token = "Bearer 67kgra-2RFPuT9H3CdDD3WPGoaKbD2LMUWS2gkBslTePdEaDoXC9YbOTlGBU3P4faFMcO9cOVP2m4rJLbV0Dp_6i9-1GMe2zgfiZyjGwVbtoydAGUPaafWAYko0sEdRoMp4sahUGzuILilRZSYESQOFTXBVETD5mIPV2CMMxqnr7dzC_KwjvOPxjrPfynkmuzI6H3OLPtXwJjak3Z84P-AMTzY-ITX5UJ0LbwdwnvYyWrcnWehVlIagc57qkQPtxXftopL9tiG9bJveNxUwNw5eP88ZiP7-TD9a4CSuvtD0fPwN0HutO5psPtKpRuxdcI-aQo5kU9sOsL_xxXmUj1ElUzBsOSY-RzFJiNSQU8f7eUH6Gz3wRoP0Sl9GECu9Y7IAxvw";

    //Advisor - Lauri
    //this.access_token = "Bearer F3idMgq9oWGp9Dxmz6xxTYJP3XgrBbaQyTHdYMPyd_X8rAfyQayX_s--9vc5NlGEjTuROrXhc0H0X5XvcpcKAYEeXT6co7jsRTPQKTok_MVffWNB8lqRYh2qc7Ijy1i074AQD437EhQajNE6rKlqRSYd_T5Jd7yziiOSFvbtM0-P5KaqtwpeYPTJgokv6KQHc_oNWlIeuu16eGAcUsSBIh-UaPU2bKYLdswcl1-y8Oex9TiS4jRvNEOA1fr2KdQgLguMdf9QGeqjkKrFWeFdhSwVMbA_Wb_T0EZuEHSsLr39NPCfjH3N9ecwMlCxY3Wcrt_Ojk3MqHYRGiUuhtqxEWGQIbXBE1S-v0Ki4ttOHDeplxjp6FYs7sX47XTD9Hh1IJtIIQ";

    //Advisor - Yuchen
    //this.access_token = "Bearer tiZ61vG-t0Xo5FTtDQn1lQn3hC1XxV4Oe7TLxESJi9-R63maAIF55qgS04eQtPZMVv7JrX2YcHO8XVLZNR8FMPMug7g1h6tibsMlTpjvZPAJ-ayu-_JkHQh6dEx6XOafI33Ab6zYgmw6Dx2-9z3mXhhZkKgX-boZAqlHPvD3CzzDe5mhCbRNfOWv3EvM40Q2EM57v4H4W5WkMcLZQOFwBc7W5Ze3hsc2yZATLmKz0KM7yTifncxak9a5RptsxwgN4oJLZIFPHQY-bhn8SyDZLI440Sd1tinCNerNxj-2zOE851sdpMRtXhL3X1WC1itP58MTvSiq-Nj6dPJ8bKMj-SxkpJgmR0QjoKq6F4-vw93OKOGUbfc6cJS6TMvpz6IB2aPgAw";
    
    
    
    
    // Final Demo
    
    // Firm Admin 
    this.access_token = "Bearer 86ZLKDksw9Yydrp5H2AVMn4ayqAfZaXvngeHgXUgUPvVT7JXJiCMGzUro_8QZH-GXpRVrdaKIygAZ1_y1vDx17x4xxlE5ZPT635PwnfMhftbRD3Tt6BhryS5xnT_1hTdAmz3QxBrd22Y0tWVLJS7HPMbWdoeJLhmEo4vA8ATE6dTCQ1ibWM1J2AByub9DKh8-1Q8jYXN7eua74vKm0wLM0OQkzYvceo7tfdDJNHnIJhcHRYOxDcNU2D2MgYdJo8wBQor_W9bNGu0QXd4xvcU824vF5r6qwhfgWtkXqrHZz3c0gv4cfGtZ7CCCsUqFNULdgeLdQj7vNQ1C-hfdqD2Oug7gmpGMfOufyukov7nW4T7obUaEhO3fWba_pmnrx_nEuj1QA";
    
    // Advisor 
    // this.access_token = "Bearer 4Im3f4RFvT0rwD-izYNdy3hXTm6REsZgOPj27ea7rPDsNiqrL_bdsJ1ZQr28n_OPszYgndNQbCLWIEDWV-fPx3FkEGfkMxSZ5HpMw7lxJH9YcuPXHd_1D_UFKYmb3zMe5O9WKWfO5aKpzV-1sci1kc_HIqJwK3WT4BMr1ZMsuyu3ABBzUIJ1l5Qdw8IksJkCpvPY9uSD7btT-QLMnkVbrUilmOeaW80CsW_keyZZl_lnq8i69iAbVmdXDFEaTpg6osKC-FZpCuIEJElRMTEnxq7BcrkbDHk19e949n-SbGMFxnJ5T8v0_FioWS79DICyelMShkFWf9pdOx0c--qipiEGSaZ83Pw1SaAZe11zY3p9_YZp0CjZ7E6Jvr4TaLZ0-8GGNw";
    
    // Super Admin 
    //this.access_token = "Bearer iy10lSHqLy6ILue_9-B1lFQs5Xe15eEl73NDDbOlC0MLVGjt8_AOJMbSUF-dQBUCURXOUYi31NwC3byyKWcy_wPaw5nVpwXD-qkY4IUMh_tXnvdL5hq9hfYj9p8f3sUAvPz00G-85R_H5iw7244lGFveTto3WfOMv8EEIq57FMaRZ8DGatpjfD6qm3eTxoqbMwGzP9GS3BPXoeoUFaRDoGVcpc-5MNrAYRt4IaH01lC-wFD-QPBSNVGAMiWztrHFTalbvp29-IE6z55vaYjNlYdEtx6aSDHUt43bJo_NKv5OdpeP9ALd0lOAlZ9JjVuqI2FMNQTUfjv3qP7ahRk_bUc2E_s4cDZhvCNle_ply2ZWsFjnWzhGvfbmQ67QunPCq9UZ1lAx3bL-O6zlChOCGkd1MVolG6YjKeYcjNFq4D5lJHyT";
    
    
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


        $rootScope.appReady = true;
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
        console.log('Level: ' + self.level);
        if(!self.hasPermission('Advisor')){
            $rootScope.sideNavConfig.splice(2, 1);
        }
    }
    this.hasPermission = function (permission) {
        return this.roles.includes(permission);
    }
}
