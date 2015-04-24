politicsApp

.controller("MainController", ["$scope", function($scope) {
	$scope.hideMain = function() {
		$("#main").slideUp();
	};
	$scope.showMain = function() {
		$("#main").slideDown();
	};
}])

.controller('HomeCtrl', ['$scope', 'PoliticsService', function($scope, PoliticsService) {
	PoliticsService.list(function(response) {
		$scope.constituencies = response;
	});
}])

.controller('DetailCtrl', ['$scope', '$stateParams', 'PoliticsService', function($scope, $stateParams, PoliticsService) {
	PoliticsService.detail($stateParams.constituencyName, function(response) {
		$scope.constituency = response;
	});
}]);

