var politicsApp = angular.module('politicsApp', ['ui.router'])

.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {	
	
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	.state('game', {
			url: '/game',
			templateUrl: 'templates/game.html'
		})
		.state('play', {
			url: '/play',
			templateUrl: 'templates/play.html',
			controller: 'GameCtrl'
		})
		.state('home', {	
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl'
		})
		.state('home.main', {
			url: '/',
			templateUrl: 'templates/home.main.html'			
		})
		.state('home.all_constituencies', {
			url: '/all_constituencies',
			templateUrl: 'templates/home.all.html'
		})
		.state('home.detail', {
			url: '/{constituencyName}',
			templateUrl: 'templates/home.detail.html',
			controller: 'DetailCtrl'
		});		
		
		$locationProvider.html5Mode(true);
}]);
