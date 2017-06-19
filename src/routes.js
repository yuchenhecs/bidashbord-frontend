angular
  .module('app')
  .config(routesConfig);

// function routesConfig($stateProvider) {
//   	$stateProvider
// 		.state('app', {
// 			url: '/bi-dashboard',
// 			templateUrl: 'app/tradeWarrior/tradeWarrior.html',
// 			controller: 'TradeWarriorController',
// 			controllerAs: 'vm',
// 			authRequired: false
// 		});
// };

function routesConfig($stateProvider) {
  	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'app/home/home.html',
			controller: 'HomeController',
			controllerAs: 'home',
			authRequired: false
		})
        .state('goals', {
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
		})
		.state('netWorth', {
			url: '/netWorth',
			templateUrl: 'app/netWorth/netWorth.html',
			controller: 'NetWorthController',
			controllerAs: 'netWorth'
		});
};
