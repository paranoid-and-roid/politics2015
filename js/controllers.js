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

var score = 0;
var seconds = 200;

// $scope.selectedItem="-- Constituency --";

$scope.playGame = function() {
    //The game begins with the appearance on the page of the central panel, which contains the image and the select boxes
       
    $("#game_sidebar img").slideUp();
    $("#intro").slideUp(); 
    $("#scores").css("visibility", "visible");
    $("#centre").slideDown();
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
    //Randomly generate two numbers
    var chooseRandom = function() {
        num1 = Math.floor(Math.random()*($scope.constituencies.length));
        num2 = Math.floor(Math.random()*($scope.constituencies[num1].details.length));
        //Find the image
        var aMugShot = document.getElementById("mugShot");
        var mug = aMugShot.setAttribute("src", ($scope.constituencies[num1].details[num2].image));

        $("#image").html(mug);
        $("#tdName").html($scope.constituencies[num1].details[num2].tdName);
    };

    var d, e;
    //This function checks that the option selected from each menu matches the correct details for each TD.
    $scope.choice = function() {
    	
        var a = document.getElementById("parties").selectedIndex;
        var b = document.getElementById("cons").selectedIndex;
        c = document.getElementById("parties");
        d = document.getElementById("cons");
        e = c.getElementsByTagName("option")[a].text;
        f = d.getElementsByTagName("option")[b].text;
        //If the details are correct, the player scores points
        if(e == $scope.constituencies[num1].details[num2].party) {
            score = score + (seconds / 2);
        }
        
        if(f == $scope.constituencies[num1].constituency_name) {
            score = score + (seconds / 2);
        }
        $("#keepScore").html(score); //The points are stored here.
        
        $("#parties").val("Political Parties");
        $("#cons").val("Constituencies");

        chooseRandom();

    };
    chooseRandom();
    
    //This is the end of the game
	};
	});
}]);