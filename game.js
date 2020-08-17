// Array of the colors of the buttons that a user clicked
let userClickedPattern = [];

// Array of the colors as a game pattern
let gamePattern = [];

// Array of the colors of the buttons
let buttonColors = ["red", "blue", "green", "yellow"];

// Starting Level
let level = 0;
// If the game started or not (Default = false)
let started = false;

// Press any key to start the game
$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  } else {
  }
});

function nextSequence() {
  userClickedPattern = [];
  // Create a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Selects a random color from the buttonColors array
  var randomChosenColor = buttonColors[randomNumber];
  // Adds the color string to the gamePattern array
  gamePattern.push(randomChosenColor);
  $("#level-title").text("Level " + level);
  level++;

  // Adds a flash animation to the button in the randomly chosen color
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

// Lets a user click a button and push the color string to the userClickedPattern array
$(".btn").click(function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// A function that plays an appropirate sound for each color
function playSound(name) {
  // Plays an audio file which contains a name of the randomly chosen color
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// A function that animates a button when pressed using .pressed class
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// A function that checks if a user gets the answer right or not
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// Restart the game
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
