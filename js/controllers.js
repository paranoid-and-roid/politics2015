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
}])

.controller('GameCtrl', ['$scope', 'PoliticsService', function($scope, PoliticsService) {
	PoliticsService.list(function(response) {
		$scope.constituencies = response;	

$scope.score = 0;
var seconds = 200;

playGame = function() {

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
            localStorage.score = score;

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
    var chooseRandom = function() {
    		//Randomly generate two numbers
        num1 = Math.floor(Math.random()*($scope.constituencies.length));
        num2 = Math.floor(Math.random()*($scope.constituencies[num1].details.length));
     
     		// Use the random numbers to generate a random politician
        $scope.face = $scope.constituencies[num1].details[num2].image;        
        $scope.name = $scope.constituencies[num1].details[num2].tdName;
    };

    var d, e;
    //This function checks that the option selected from each menu matches the correct details for each TD.
    $scope.choice = function() {
    	
    	$scope.selectedConstituency="-- Constituency --";
    	$scope.selectedParty = "-- Political Party --";
    	
        var a = document.getElementById("parties").selectedIndex;
        var b = document.getElementById("cons").selectedIndex;
        c = document.getElementById("parties");
        d = document.getElementById("cons");
        e = c.getElementsByTagName("option")[a].text;
        f = d.getElementsByTagName("option")[b].text;
        //If the details are correct, the player scores points
        if(e == $scope.constituencies[num1].details[num2].party) {
            $scope.score = $scope.score + (seconds / 2);
        }
        
        if(f == $scope.constituencies[num1].constituency_name) {
            $scope.score = $scope.score + (seconds / 2);
        }
        
        $("#parties").val("Political Parties");

        chooseRandom();

    };
    chooseRandom();
    
    //This is the end of the game
	};
	$scope.$on('$viewContentLoaded', function() {
	    playGame();
	});
  });
	 
}]);