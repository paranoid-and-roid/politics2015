var app = angular.module('politicsApp', ['ui.router', 'ui'])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {	
	
	$urlRouterProvider.otherwise('/home');
	
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl'				
		})
		.state('home.detail', {
			url: '/:constituencyName',
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
