app

.controller('MainCtrl', ['$scope', function($scope) {
	$scope.toggleMain = function() {
		$('#intro').slideToggle();
	};
}])

.controller('HomeCtrl', ['$scope', 'PoliticsService', function($scope, PoliticsService) {
	PoliticsService.list(function(response) {
		$scope.constituencies = response;
	});
}])

.controller('DetailCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
	$scope.constituency_name = $stateParams.constituencyName;
	
	$http.get('constituencies.json').success(function(data) {
		$scope.constituency = data.filter(function(entry) {
			return entry.constituency_name = $scope.constituency_name;
		})[0];
	});
}])

.controller('GameCtrl', ['$scope', 'PoliticsService', function($scope, PoliticsService) {
	
	
}]);