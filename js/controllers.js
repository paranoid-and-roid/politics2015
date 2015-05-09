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

.controller('GameCtrl', ['$scope', 'PoliticsService', function($scope, PoliticsService) {
	PoliticsService.list(function(response) {
		$scope.constituencies = response;	
		
		$scope.selectedParty = "-- Political Party --";

$scope.score = 0;
var score, seconds = 60;

var playGame = function() {

    var counter=setInterval(timer, 1000);

    function timer() {
        //Once the button is pressed, the 60-second countdown begins, and the clock appears on the right side.
        
        seconds=seconds-1;
        if (seconds <= 0){
            clearInterval(counter);
            var name = prompt("Please enter your name", " "); //The game ends with the appearance of a prompt box.
            
            $("#centre").css("display", "none");
            $("#scores").css("visibility", "hidden");
            $("#scoreTable").slideDown(); //The details of the game appear in a table which drops down.
            
            localStorage.name = name;
            localStorage.$scope.score = score;

            //Below are the details contained in the score table.
            var currentDate = new Date();
            var dateTime = currentDate.getDate() + "-"
                + (currentDate.getMonth()+1)  + "-"
                + currentDate.getFullYear() + " at "
                + currentDate.getHours() + "."
                + currentDate.getMinutes();

            var scoringTable = document.getElementById("scoreTable");
            scoreRow = document.createElement("tr");
            var newRow = scoringTable.appendChild(scoreRow);
            newRow.innerHTML += "<td>"+""+"</td><td>"+localStorage.name+"</td><td>"+localStorage.score+"</td><td>"+dateTime+"</td>";
            $("#keepScore").empty();
            $("#countDown").empty();
            return;
        }
        $("#countDown").html(seconds);
    }

    var num1, num2;
    
    //This function checks that the option selected from each menu matches the correct details for each TD.
    $scope.chosenName= [];	
    
    var chooseRandom = function() { 
    		
    		//Randomly generate two numbers
        num1 = Math.floor(Math.random()*($scope.constituencies.length));
        num2 = Math.floor(Math.random()*($scope.constituencies[num1].details.length));
     
     		// Use the random numbers to generate a random politician's image and name
        $scope.face = $scope.constituencies[num1].details[num2].image;        
        $scope.name = $scope.constituencies[num1].details[num2].tdName; 
    };    
    
    $scope.choice = function() {    	
    	
        $scope.selectedConstituency="-- Constituency --";
    	$scope.selectedParty = "-- Political Party --"; 
    	
    	// Once a TD has been selected, his/her name is added to the chosenName array        
        $scope.chosenName.push($scope.name);
        console.log($scope.chosenName);                   	     
        
        //If the details are correct, the player scores points
        if($("#parties option:selected").text() == $scope.constituencies[num1].details[num2].party) {
            $scope.score = $scope.score + (seconds / 2);
        }
        
        if($("#cons option:selected").text() == $scope.constituencies[num1].constituency_name) {
            $scope.score = $scope.score + (seconds / 2);
        }
              
        // The chooseRandom() function will only be called if the chosen name is not in the chosenName array.
        for(var i=0;i<=$scope.chosenName.length;i++) {
        	if($scope.name != $scope.chosenName[i]) {
        		chooseRandom();
        	}
        }
    };
    chooseRandom();
   
	}();
  });	 
}]);