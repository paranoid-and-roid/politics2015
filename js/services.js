politicsApp

.factory('PoliticsService', function($http) {
	var cachedData;
	
	function listData(callback) {
		if(cachedData) {
			callback(cachedData);
		} else {
			$http.get('constituencies.json').success(function(data) {
				cachedData = data;
				callback(data);
			});
		}
	}
	 
	return {
		list: listData,
		detail: function(constituency_name, callback) {
			listData(function(data) {
				var constituency = data.filter(function(entry) {
					return entry.constituency_name === constituency_name;
				})[0];
				callback(constituency);
			});
		}
	};
});
