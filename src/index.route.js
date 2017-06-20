angular
  .module('app')
  .config(routesConfig);



function routerConfig($stateProvider, $urlRouterProvider) {
	
	$stateProvider
		.state('app', {
			url: '/bi-dashboard',
			templateUrl: 'app/tradeWarrior/tradeWarrior.html',
			controller: 'TradeWarriorController',
			controllerAs: 'tw',
			authRequired: false
		})
		.state('home', {
			url: '/home',
			templateUrl: 'app/home/home.html',
			controller: 'HomeController',
			controllerAs: 'home'
		}).state('goals', {
			url: '/goals',
			templateUrl: 'app/goals/goals.html',
			controller: 'GoalsController',
			controllerAs: 'goals'
		})
		.state('aum', {
			url: '/aum',
			templateUrl: 'app/aum/aum.html',
			controller: 'AUMController',
			controllerAs: 'aum'
		});

	$urlRouterProvider.otherwise('/bi-dashboard');

}
