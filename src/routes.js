angular
  .module('app');
 // .config(routesConfig);

function routesConfig($stateProvider) {
  	$stateProvider
		.state('app', {
			url: '/bi-dashboard',
			templateUrl: 'app/tradeWarrior/tradeWarrior.html',
			controller: 'TradeWarriorController',
			controllerAs: 'vm',
			authRequired: false
		});
};
