const buttonColors = ["green", "red", "yellow", "blue"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let gameStarted = false;

$(document).keypress(() => {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  setTimeout(() => {
    $("#" + randomColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);

    playSound(randomColor);
  }, 200);
}
$(".btn").click(function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animateButton(userChosenColor);

  checkSequence(userClickedPattern.length - 1);
});

function checkSequence(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    level = 0;
    gamePattern = [];
    gameStarted = false;
  }
}

function playSound(color) {
  const audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
function animateButton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 100);
}
