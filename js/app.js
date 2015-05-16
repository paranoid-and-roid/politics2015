var politicsApp = angular.module('politicsApp', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {	
	
	$stateProvider
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
		})		
		.state('game', {
			url: '/game',
			templateUrl: 'templates/game.html'
		})
		.state('play', {
			url: '/play',
			templateUrl: 'templates/play.html',
			controller: 'GameCtrl'
		});
		
		$urlRouterProvider.otherwise('/');
}]);
