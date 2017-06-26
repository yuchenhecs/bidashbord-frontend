
angular
  .module('app')
  .run(runBlock);


function runBlock($location, $rootScope) {

	function environmentDetection() {
		var host = $location.host();
		var protocol = $location.protocol();
		var port = $location.port();

		if (host.indexOf('local') > -1) {
			$rootScope.domain = protocol + '://' + host + ':' + port + '/bibackend';
		} else if (host.indexOf('dev') > -1 || host.indexOf('uat') > -1) {
			$rootScope.domain = protocol + '://' + host + ':' + port + '/bibackend';
		} else {
			$rootScope.domain = protocol + '://' + host + ':' + port + '/bibackend';
		}
		//console.log('Environment:', $rootScope.environment);
	};

	environmentDetection();	


	// configuration obj for <oranj-navigation></oranj-navigation> directive
	$rootScope.sideNavConfig = [
		{
			name: 'Home',
			iconClass: 'glyphicon glyphicon-home',
			state: 'home',
			options: [
				{
					name: 'Temp 1',
					state: 'goals'
				},
			]
		},
		{
			name: 'Goals',
			iconClass: 'glyphicon glyphicon-globe',
			state: 'goals',
			options: [
				{
					name: 'Goals',
					state: 'goals'
				},
				{
					name: 'Services',
					state: 'aum'
				}
			]
		},
		{
			name: 'Metrics',
			iconClass: 'glyphicon glyphicon-stats',
			state: 'home',
			options: [
				{
					name: 'Goals',
					state: 'goals'
				},
				{
					name: 'AUM',
					state: 'aum'
				}
			]
		}
	];
}
