
let buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;


$(document).on("keydown",function(){


    if(!gameStarted){
        $("#level-title").text("Level "+level);
        nextSequence();
        gameStarted = true;
    }
});


$(".btn").on("click",function(){

    let userChosenColor = $(this).attr("id");
    //console.log("user chosen--->> "+ userChosenColor);
    //$("btn")
    userClickedPattern.push(userChosenColor);
    //console.log("user chosen PATTERN--->> "+ userClickedPattern);
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    // setTimeout(function(){
    //     nextSequence();
    // },800);
   
});

function playSound(name){

        let sound = new Audio("sounds/"+name+".mp3");
        sound.play();

}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
       
    }
    else{
        console.log("failed");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();
    }
    
};

function nextSequence(){

    userClickedPattern = []; 
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(50).fadeIn(50).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    console.log("LEVEL-> "+level);
    
};

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
  }