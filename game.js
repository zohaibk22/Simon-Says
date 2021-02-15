let gamePattern = new Array();
let userClickedPattern = new Array();
let level = 0;

let buttonColors = ["red", "blue", "green", "yellow"];

/*Grabbing a Random num to attach to simon Says sequence */

const nextSequence = () => {
  let randomNum = Math.floor(Math.random() * 4);
  // level += 1;
  return randomNum;
};

/*Adding Click events to each button*/

let chosenColor;

buttonColors.forEach((element, index) => {
  $(`#${element}`).click(function () {
    chosenColor = $(`#${element}`).attr("id");
    // chosenColor = element;
    animatePress(chosenColor);
    let clickedSound = new Audio(`./sounds/${element}.mp3`);
    clickedSound.play();
    console.log(`${chosenColor} was Chosen`);
    userClickedPattern.push(chosenColor);
    console.log(userClickedPattern);
  });
});

let animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 500);
};

/*Adding Game Functionality */

let simonGame = () => {
  let userAnswer = true;

  do {
    let randomChosenColor = buttonColors[nextSequence()];

    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);

    let simonDiv = $(`#${randomChosenColor}`);

    let audioColor = new Audio(`./sounds/${randomChosenColor}.mp3`);
    animatePress(randomChosenColor);
    audioColor.play();

    console.log(audioColor);

    simonDiv.fadeOut(100).fadeIn(100);

    checkAnswer(randomChosenColor, level, userAnswer);

    console.log(`GameLevel is ${level}`);

    $("h1").text(`Level ${level}`);
  } while (userAnswer === false);
};

let checkAnswer = (chosenColor, level, userAnswer) => {
  $(".container").click(function (e) {
    if (e.target.id === chosenColor) {
      level += 1;
      console.log(`Check Answer Level is ${level}`);
      console.log("correct Answer");
    } else {
      userAnswer === false;
    }

    return userAnswer;
  });
};

/*Adding the start trigger so that when the user clicks the first button, the game starts */

let count = 0;
$(document).on("keypress", function (e) {
  count += 1;
  // console.log(e);
  if (count === 1) {
    simonGame();
  }
  console.log(count);
});
