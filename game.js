$(document).ready(() => {
    let buttonColors = ["red", "blue", "green", "yellow"];
    let randomChosenColor;
    let gamePattern = [];
    let userClickedPattern = [];
    let gameStarted = false;
    let level = 1;
    function nextSequence() {
        let newNumber = Math.floor(Math.random() * (4 - 0)) + 0;
        randomChosenColor = buttonColors[newNumber];
        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
        
        playSound(randomChosenColor);
        $("h1").text("Level " + level);
        level = ++level;
        

    }

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel]  === userClickedPattern[currentLevel]) {
            
            if (currentLevel === gamePattern.length - 1) {
                setTimeout(function () {
                    nextSequence();
                  }, 1000);
                userClickedPattern = [];
            }
        }
        else {
            playSound("wrong.mp3");
            $('body').addClass("game-over");
        window.setTimeout(function () {
            $('body').removeClass("game-over");
        }, 100);
            $("h1").text("Game Over, Press Any Key to Restart");
            gameStarted = false;
        }
    }
    function playSound(name) {
        var soundFile = 'sounds/' + name + '.mp3';
        var audio = new Audio(soundFile);
        audio.play();
    }

    $('.btn').on("click", (e) => {
        if (gameStarted === true) {
            let userChosenColor = e.target.id;
            // let currentColor = e.target.id;
            animatePress(userChosenColor);
            playSound(userChosenColor);
            userClickedPattern.push(userChosenColor);
            checkAnswer(userClickedPattern.length - 1);
        }
    })
    
    function animatePress(currentColor) {
        $("." + currentColor).addClass("pressed");
        window.setTimeout(function () {
            $("." + currentColor).removeClass("pressed");
        }, 100);
    }

    $(document).on("keypress", (event) => {
        if (gameStarted != true) {
            gamePattern = [];
            userClickedPattern = [];
            level = 0;
            gameStarted = true;
            nextSequence();        
        }
    })
});