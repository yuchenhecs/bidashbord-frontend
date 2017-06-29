
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
	$rootScope.logo = 'https://s3.amazonaws.com/imagesso/logo_262987_635774065687042408-1111111111111111111111111111111111111111111111111111111111111111.png'; 
    $rootScope.user = {
        name : 'Matt Frosty',
        id   : 234526424
    };
    $rootScope.userNavConfig = [
        {
            name: 'Profile',
            state: 'profile'
        },
        {
            name: 'Another state',
            state: 'profile'
        },
        {
            name: 'Yet another state',
            state: 'profile'
        }
    ];
    $rootScope.topNavConfig = [
        {
            name: 'Support',
            iconClass: 'fa fa-question-circle-o',
            class: 'link',
            href: 'https://support.oranjadvisor.com/hc/en-us'
        },
        {
            name: 'Feed',
            state: 'feed',
            iconClass: 'fa fa-bell-o',
            alertCount: 2,
            menuItems: [
                '<a class="link">Ashwin updated his thing at Yesterday at 2:30</a>',
                '<a>Ashwin updated his thing at Yesterday at 2:30</a>',
                '<a class="link">Ashwin updated his thing at Yesterday at 2:30</a>',
                '<a class="link">Ashwin updated his thing at Yesterday at 2:30</a>',
                '<a>Ashwin updated his thing at Yesterday at 2:30</a>'
            ]
        },
        {
            name: 'Messages',
            iconClass: 'fa fa-comments-o',
            alertCount: 4,
            menuItems: [
                '<a>Hey man, got a question about..</a>',
                '<a>Did you get around to talking looking into that thing about.. testing long message..</a>',
                '<a>Hey man, got a question about..</a>'
            ]
        }
    ];
    $rootScope.sideNavConfig = [
        {
            name: 'Home',
            iconClass: 'fa fa-home',
            state: 'home',
            options: [
                {
                    name: 'Temp 1',
                    state: 'goals'
                },
            ]
        },
        {
            name: 'Metrics',
            iconClass: 'fa fa-globe',
            state: 'home',
            options: [
                {
                    name: 'Goals',
                    state: 'goals'
                },
                {
                    name: 'AUM',
                    state: 'aum'
                },
                {
                    name: 'Net Worth',
                    state: 'netWorth'
                },
                {
                    name: 'Login Stats',
                    state: 'logins'
                }
            ]
        },
        {
            name: 'Contacts',
            iconClass: 'fa fa-users',
            state: 'advisor',
        },
        {
            name: 'Accounts',
            iconClass: 'fa fa-dollar',
            state: 'accounts',
        },
        {
            name: 'Models',
            iconClass: 'fa fa-bullseye',
            state: 'accounts',
            alertCount: 2,
            options: [
                {
                    name: 'Sub-Advised Models',
                    state: 'goals'
                },
                {
                    name: 'Strategist Models',
                    state: 'services'
                },
                {
                    name: 'Clients',
                    state: 'clients'
                },
                {
                    name: 'Contact',
                    state: 'contact'
                }
            ]
        },
        {
            name: 'Rebalance',
            iconClass: 'fa fa-balance-scale',
            state: 'vault',
            alertCount: 4,
            options: [
                {
                    name: 'Trade Settings',
                    state: 'goals'
                }
            ]
        },
        {
            name: 'Admin',
            iconClass: 'fa fa-user',
            state: 'disclaimer',
            options: [
                {
                    name: 'Firm Info',
                    state: 'goals'
                },
                {
                    name: 'Advisor Lists',
                    state: 'services'
                },
                {
                    name: 'Integration Settings',
                    state: 'clients'
                },
                {
                    name: 'Questionnaire',
                    state: 'contact'
                },
                {
                    name: 'Permission Settings',
                    state: 'contact'
                }
            ]
        }
    ];





    
}
