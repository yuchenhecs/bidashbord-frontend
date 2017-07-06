

describe('Goals Controller:', function() {
    var $scope, GoalsController, GoalsService, $q, $httpBackend;

    //Before each test load our app module
    beforeEach(angular.mock.module('app'));

    //Inject the $controller service to create instances of the controller (HomeController) we want to test,
    //Injecting _chartData_ for our factory
    beforeEach(inject(function($controller, $rootScope, _GoalsService_, _$q_, _$httpBackend_){
        GoalsService = _GoalsService_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
        
        GoalsService.init = function(){
            var base = {};
            base.launch = function(){

            };

            return base;
        };
// console.log(GoalsService);
// console.log(GoalsService._prototype);

//         spyOn(GoalsService, "launch");
        //spyOn(GoalsService, "createOptions");
        GoalsController = function() {
            return $controller('GoalsController', {
                $scope: $scope,
                GoalsService: GoalsService
            });
        };
       
    }));

    //Verify our controller exists
    it('GoalsController should exist', function() {
        var goals = GoalsController();
        expect(goals).toBeDefined();
    });

    //Verify our factory is defined
    it('GoalsService should be defined', function() {
        expect(GoalsService).toBeDefined();
    });

});
