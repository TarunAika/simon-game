var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("button").on("click", function() {
  $ ("button").addClass("get-small");
    setTimeout(() => {
        $("button").removeClass("get-small");
    }, 100);
    myGame();
});

function myGame() {
    if (!started) {
        setTimeout(() => {
            $("button").css("display", "none");
            $(".box").on("click", function() {
                var userChosenColour = $(this).attr("id");
                userClickedPattern.push(userChosenColour);
              
                makeSound(userChosenColour);
                animateEffect(userChosenColour);
              
                checkAnswer(userClickedPattern.length - 1);
              });
        }, 1000);
        nextSequence();
        started = true;  
    } 
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    makeSound("wrong");
    $("body").addClass("body-red");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("body-red");
    }, 200);

    startOver();
    $(document).on("keypress", myGame);
  
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  setTimeout(() => {
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    makeSound(randomChosenColour);
    animateEffect(randomChosenColour);
  }, 1000);
}

function animateEffect(currentColor) {
  $("#" + currentColor).addClass("press");
  setTimeout(function () {
    $("#" + currentColor).removeClass("press");
  }, 100);
}

function makeSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}