// ** THIS FILE WILL NOT BE INCLUDED IN BOWER DISTRIBUTION **
angular
	.module('app')
	.config(devConfig);

function devConfig($urlRouterProvider) {
	$urlRouterProvider.otherwise('/bi-dashboard');
};
