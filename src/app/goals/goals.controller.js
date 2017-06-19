import { MetricsController } from '../metrics/metrics.controller';

export class GoalsController extends MetricsController {
	constructor($http, $scope) {
		'ngInject';
		super($http, $scope);

		// constants
		//this.DOMAIN = "http://buisness-intelligence-1347684756.us-east-1.elb.amazonaws.com/bibackend";
		this.SUB_DOMAIN = "/goals";
		this.USE_DUMMY_DATA = false;


		this.data1 = [{
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
		}];


		this.data2 = [{
			"name": "advisor 1",
			"total": 23,
			"goals": {
				"custom": 10,
				"college": 4,
				"retirement": 6,
				"insurance": 2,
				"home": 1
			}
		},
		{
			"total": 24,
			"name": "advisor 2",
			"goals": {
				"custom": 1,
				"college": 14,
				"retirement": 6,
				"insurance": 2,
				"home": 1
			}
		},
		{
			"total": 14,
			"name": "advisor 3",
			"goals": {
				"custom": 1,
				"college": 4,
				"retirement": 6,
				"insurance": 2,
				"home": 1
			}
		}];


		this.data3 = [{
			"name": "client 1",
			"total": 14,
			"goals": {
				"custom": 1,
				"college": 4,
				"retirement": 6,
				"insurance": 2,
				"home": 1
			}
		},
		{
			"total": 14,
			"name": "client 2",
			"goals": {
				"custom": 1,
				"college": 4,
				"retirement": 6,
				"insurance": 2,
				"home": 1
			}
		},
		{
			"total": 8,
			"name": "client 3",
			"goals": {
				"custom": 1,
				"college": 4,
				"retirement": 0,
				"insurance": 2,
				"home": 1
			}
		}];


		this.launch();

	}

}








	// activate($timeout, webDevTec) {
	// 	this.getWebDevTec(webDevTec);
	// 	$timeout(() => {
	// 		this.classAnimation = 'rubberBand';
	// 	}, 4000);
	// }

	// getWebDevTec(webDevTec) {
	// 	this.awesomeThings = webDevTec.getTec();

	// 	angular.forEach(this.awesomeThings, (awesomeThing) => {
	// 		awesomeThing.rank = Math.random();
	// 	});
	// }

	// showToastr() {
	// 	this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
	// 	this.classAnimation = '';
	// }