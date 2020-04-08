//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

//5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

var userClickPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
  if (started != true) {
    started = true;
    gameStart();
    nextSequence();
  }
});

function gameStart() { 
  $("body").removeClass("game-over");
}

//1. Inside game.js create a new function called nextSequence()
function nextSequence() {
  $("#level-title").text("game level : " + level);
  level++;
  userClickPattern = [];
  //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);
  signal(randomChosenColour);
}

function signal(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function(){
    $("#" + color).removeClass("pressed");
  }, 100);
}

$(".btn").on("click" , function () {
  console.log($(this).attr("id"));
  var curSelected = $(this).attr("id");

  userClickPattern.push(curSelected);
  console.log(userClickPattern);
  animatePress(curSelected);
  makeSound(curSelected);
  check(userClickPattern.length - 1);
});


function check(curLevel) {
  if (gamePattern[curLevel] === userClickPattern[curLevel]) {
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function () { 
        nextSequence();
      },300);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("body").addClass("game-over");
  makeSound("wrong");
  started = false;
  gamePattern = [];
  level = 0;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function makeSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
