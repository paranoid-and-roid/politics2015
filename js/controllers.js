politicsApp

.controller('HomeCtrl', ['$scope', 'PoliticsService', function($scope, PoliticsService) {
	PoliticsService.list(function(response) {
		$scope.constituencies = response;
	});
}])

.controller('DetailCtrl', ['$scope', '$stateParams', 'PoliticsService', function($scope, $stateParams, PoliticsService) {
	PoliticsService.detail($stateParams.constituencyName, function(response) {
		$scope.constituency = response;
	});
}])

.controller('GameCtrl', ['$scope', 'PoliticsService', '$rootScope', '$location', function($scope, PoliticsService, $rootScope, $location) {
	PoliticsService.list(function(response) {
		$scope.constituencies = response;	
		
		$scope.selectedParty = "-- Political Party --";

var seconds = 60;
$scope.score=0;
$scope.rank=0;

var playGame = function() {

    var num1, num2;
    
    //This function checks that the option selected from each menu matches the correct details for each TD.
    $scope.chosenName = ["blank"];	
    
    var chooseRandom = function() {
    		
    		//Randomly generate two numbers
        num1 = Math.floor(Math.random()*($scope.constituencies.length));
        num2 = Math.floor(Math.random()*($scope.constituencies[num1].details.length));
     
     		// Use the random numbers to generate a random politician's image and name
        var tdFace = $scope.constituencies[num1].details[num2].image;        
        var tdName = $scope.constituencies[num1].details[num2].tdName; 
                      
        // The chooseRandom() function will only be called if the chosen name is not in the chosenName array.
   		for(var i=0;i<$scope.chosenName.length;i++) {
   			if(tdName != $scope.chosenName[i]) {
   				$scope.face = tdFace;
   				$scope.name = tdName;
   			} else {
   				console.log(tdName);
   				chooseRandom();
   			}
   		} 
        // Once a TD has been selected, his/her name is added to the chosenName array  
          $scope.chosenName.push($scope.name);
          console.log($scope.chosenName);   
    };
    
    $scope.choice = function() {    	
    	
        $scope.selectedConstituency= "-- Constituency --";
      	$scope.selectedParty = "-- Political Party --"; 

        //If the details are correct, the player scores points
        if($("#parties option:selected").text() == $scope.constituencies[num1].details[num2].party) {
            $scope.score = $scope.score + (seconds / 2);
        }
        
        if($("#cons option:selected").text() == $scope.constituencies[num1].constituency_name) {
            $scope.score = $scope.score + (seconds / 2);
        }

        chooseRandom();
    };    
    
        var counter=setInterval(function timer() {
        //Once the button is pressed, the 60-second countdown begins, and the clock appears on the right side.

        seconds=seconds-1;
        if (seconds <= 0){

        	 clearInterval(counter);

        	 $scope.yourName = prompt("Please enter your name", " "); //The game ends with the appearance of a prompt box.
        	 
        	 $("#playGame").css("display", "none");
        	 $("#scoreTable").slideDown();

		      $rootScope.$apply(function() {
		        $scope.rank++;
		        $scope.yourName;
		        $scope.score;
		        $scope.date=moment(new Date()).format('DD/MM/YYYY h:mm a');
		      });
        }

        $("#countDown").html(seconds);
    },1000);
		chooseRandom();
	}();
  });	 
}]);