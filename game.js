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
    $("#level-title").text("Level " + level);
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
  checkAnswer(level);
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
  if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else if (userClickedPattern.length === gamePattern.length) {
    console.log("failure");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  } else {
    console.log("You can do this!");
  }
}

// Restart the game
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
