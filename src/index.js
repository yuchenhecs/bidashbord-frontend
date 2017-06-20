// dependencies for whole module
const requiredModules = [
	'ui.router',
	'oranjNavigation',
	'oranjHighcharts'
	//'kendo.directives'
];

angular
	.module('app', requiredModules);
