var politicsApp = angular.module('politicsApp', ['ui.router'])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {	
	
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		.state('home', {
			abstract: true,		
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl'
		})
		.state('home.main', {
			url: '/',
			templateUrl: 'templates/home.main.html'			
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
			templateUrl: 'templates/game.html'
		})
		.state('play', {
			url: '/play',
			templateUrl: 'templates/play.html',
			controller: 'GameCtrl'
		});
}]);
