let buttonColors = ["green", "red", "yellow", "blue"];

let gamePattern = [];
let userClickedPattern = [];


// Variable to inform that game has started //
let started = false;

// Variable to record game level //
let level = 0;

// Key Pressed //
$(document).keypress(function() {
  if (!started) {
// Change H1 into Level Text //
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

  //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".



/********              BUTTONS CLICKED                       ********/
$('.btn').click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

    console.log(gamePattern + " Game Pattern");
    console.log(userClickedPattern + " Game Pattern");

});


//  Check User's Answer  //

function checkAnswer(currentLevel) {
  //Check if the most recent user answer is the same the game pattern //
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // call nextSequence() to get a new random color?
    console.log("success");
    // If the user got the most recent answer right, check if they finished their sequence //
 if (userClickedPattern.length === gamePattern.length) {
    //Call nextSequence() after 1000 milliseconds delay //
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }

} else {
    // restart the game --- Play Wrong Sound //
    playSound('wrong');
    console.log("wrong");
    // Apply background when answer is wrong //
    $('body').addClass('game-over');
    // Remove background after 200 Millisecs //
    setTimeout(function(){
    $('body').removeClass('game-over');
  }, 200);
  $('#level-title').text('Game Over, Press Any Key to Restart');
  startOver();
  }
}
/********            GENERATE RANDOM NUMBER/COLOR            ********/
function nextSequence() {
  // Reset the userClickedPattern to an empty array once nextSequence is run //
  userClickedPattern = [];
  // Increase Level by 1 everytime sequence is called //
  level++;
  // updated the html Level by value //
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  /********              BUTTONS FADE IN AND OUT                       ********/
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  console.log(randomNumber);
}
/********               DETECT SOUND                 ********/
// the purpose of this func is to play audio from the sounds folders
//
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
/********                  ANIMATION                      ********/
                       // add click fade //
function animatePress(currentColor) {
  $("#" + currentColor).addClass('pressed');

                    // remove clicked fade  //
  setTimeout(function(){
    $("#" + currentColor).removeClass('pressed');
  }, 100);
}

/********            Restart The Game           ********/
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
