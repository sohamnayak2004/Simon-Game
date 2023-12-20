gamePattern=[]

userClickedPattern=[]

buttonColors=["red", "blue", "green", "yellow"]

var started=false

var level=0

function restart() {
    $("#level-title").text("Game over, Press A Key to Start")
    level=0
    started=false
    gamePattern=[]
}

$(document).on("keypress", function(){
    if(!started){
        $("#level-title").text("level "+level)
        nextSequence()
        started=true
    }
})

function nextSequence(){
    userClickedPattern=[]
    var randomNumber=Math.floor(Math.random()*4)
    randomChosenColor=buttonColors[randomNumber]   
    gamePattern.push(randomChosenColor)
    animatePress("."+randomChosenColor)
    playSound(randomChosenColor)
    level+=1
    $("#level-title").text("level "+level)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }
    else{
        gameOver()
    }
}

$(".btn").on("click", function(event){
    var userChosenColor=event.target.id
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress("."+ userChosenColor)
    checkAnswer(userClickedPattern.length-1)
})



function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3")
    audio.play()
}
 
function animatePress(currentColor) {
    $(currentColor).addClass("pressed")
    setTimeout(function() {
        $(currentColor).removeClass("pressed")
    }, 100)
}

function gameOver() {
    $("body").addClass("game-over")
    var audio=new Audio("./sounds/wrong.mp3")
    audio.play()
    setTimeout(function() {
        $("body").removeClass("game-over")
    }, 200);
    restart()
}
