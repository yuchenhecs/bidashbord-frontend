

describe('Goals Controller:', function () {
    var $scope, GoalsController, GoalsService, $q, $httpBackend, $http;
    var url = 'http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend/bi/goals/firms?&page=0';

    var data1 = {
        "data": {
            "last": true,
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
        }
    };

    //Before each test load our app module
    beforeEach(angular.mock.module('app'));

    //Inject the $controller service to create instances of the controller (HomeController) we want to test,
    //Injecting _chartData_ for our factory
    beforeEach(inject(function ($controller, $rootScope, _GoalsService_, _$q_, _$httpBackend_, _$http_) {
        GoalsService = _GoalsService_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
        $http = _$http_;
        GoalsController = function () {
            return $controller('GoalsController', {
                $scope: $scope,
                GoalsService: GoalsService
            });
        };

    }));

    //Verify our controller exists
    it('GoalsController should exist', function () {
        var goals = GoalsController();
        expect(goals).toBeDefined();
    });

    //Verify our factory is defined
    it('GoalsService should be defined', function () {
        expect(GoalsService).toBeDefined();
    });

    describe('getDataForLevel()', function () {

        var name = "asd";
        var id = 123;
        var page = 0;
        var level = 0;
        var args;
        var data;
        var service;

        beforeEach(function () {
            service = GoalsService.init();
            //spyOn() takes in the directive + method name, the specified method's code will not be run
            spyOn(service, "getDataForLevel").and.callThrough();
            spyOn(service, "getDataFromApi");
        });

        it('should return correct url', function () {
             expect(service.getDataForLevel(name, id, page, level, args)).toEqual(url);
        });
    });

    //testing api call
    describe('getDataFromApi()', function () {
        var result = {};
        var name = "asd";
        var id = 123;
        var page = 0;
        var level = 0;
        var args = [];
        var data;
        var service;

        beforeEach(function () {
            service = GoalsService.init();
            //spyOn() takes in the directive + method name, the specified method's code will not be run
            spyOn(service, "getDataFromApi").and.callThrough();
            spyOn(service, "loadData");
        });

        it('should return a json object with data', function () {
            var newUrl = url.slice(0, url.lastIndexOf("=") + 1) + page;
            //  console.log(newUrl);



            $httpBackend.whenGET(newUrl).respond(200, data1);

            expect(service.getDataFromApi).not.toHaveBeenCalled();
            expect(result).toEqual({});

            service.getDataFromApi(url, name, id, page, level, args, data).then(function (data) {
                result = data;
            });


            $httpBackend.flush();

            expect(service.getDataFromApi).toHaveBeenCalledWith(url, name, id, page, level, args, data);
            expect(result.firms[0].total).toEqual(40);
        });
    });

});
