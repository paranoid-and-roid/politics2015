var politicsApp = angular.module('politicsApp', ['ui.router', 'ui', 'ngAnimate'])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {	
	
	$urlRouterProvider.otherwise('/home');
	
	$stateProvider
		.state('home', {
			url: '/home',			
			views: {
				'': {
					templateUrl: 'templates/home.html',
					controller: 'HomeCtrl'
				},
				'main@home': {
					templateUrl: 'templates/home.main.html'
				},
			}				
		})
		.state('home.detail', {
			url: '/{constituencyName}',
			templateUrl: 'templates/home.detail.html',
			controller: 'DetailCtrl'
		})
		.state('home.all_constituencies', {
			url: '/all_constituencies',
			templateUrl: 'templates/home.all.html',
			controller: 'HomeCtrl'
		})
		.state('game', {
			url: '/game',
			templateUrl: 'templates/game.html',
			controller: 'GameCtrl'
		});		
}]);
