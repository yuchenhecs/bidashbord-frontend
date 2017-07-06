

describe('Goals Controller:', function() {
    var $scope, GoalsController, GoalsService, $q, $httpBackend;
    var url = 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/goals';

    var data1 = {
            "firms": [{
                "name": "firm 1",
                "total": 40,
                "goals": {
                    "custom": 3,
                    "college": 8,
                    "retirement": 15,
                    "insurance": 4,
                    "home": 10
                }
            },
            {
                "total": 25,
                "name": "firm 2",
                "goals": {
                    "custom": 3,
                    "college": 8,
                    "retirement": 0,
                    "insurance": 4,
                    "home": 10
                }
            },
            {
                "total": 34,
                "name": "firm 3",
                "goals": {
                    "custom": 3,
                    "College": 2,
                    "retirement": 15,
                    "insurance": 4,
                    "home": 10
                }
            }]
        };

    //Before each test load our app module
    beforeEach(angular.mock.module('app'));

    //Inject the $controller service to create instances of the controller (HomeController) we want to test,
    //Injecting _chartData_ for our factory
    beforeEach(inject(function($controller, $rootScope, _GoalsService_, _$q_, _$httpBackend_){
        GoalsService = _GoalsService_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
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



    //testing api call
    describe('getDataFromApi()', function() {
        var result;
        var name = "asd";
        var id = 123;
        var page;
        var level = 0;
        var args = [];
        var data;
        var service;

        beforeEach(function() {
            result = {};
            service = GoalsService.init();
            data = null;
            page = 0;
            //spyOn() takes in the directive + method name, the specified method's code will not be run
            spyOn(service, "getDataFromApi").and.callThrough();
            spyOn(service, "loadData");
        });

        it('should return a json object with data', function() {
            $httpBackend.whenGET(url).respond(200, $q.when(data1));

            expect(service.getDataFromApi).not.toHaveBeenCalled();
            expect(result).toEqual({});

            service.getDataFromApi(url, name, id, page, level, args, data)
            .then(function(res) {
                console.log(res);
                result = res;
            });


            $httpBackend.flush();

            expect(service.getDataFromApi).toHaveBeenCalledWith(url, name, id, page, level, args, data);
            expect(result[0].type).toEqual("COLLEGE");
        });
    });

});
