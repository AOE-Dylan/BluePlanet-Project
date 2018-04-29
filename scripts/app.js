
let sec = 25;

let gameWin = () => {
    duringGame.pause();
    quizMusic.play();
    let randomQuiz = quizzes.splice(Math.floor(Math.random() * quizzes.length), 1);
    renewableProgress.style.height = "0px";
    levelSuccess.style.display = "block";
    pauseButton.style.display = "none";
    notMap.style.display = "none";
    background.style.filter = "blur(60px)";
    $('#youPassed').text("CONGRATULATIONS, YOU BEAT LEVEL " + level);
    level++
    round.innerHTML = "LEVEL " + level;
    levelContinue.innerHTML = "CONTINUE TO LEVEL " + level;
    if (level < 6){
      randomQuiz[0][0].style.display = "block";
    }
    if (level == 6){
      $('#youPassed').text("CONGRATULATIONS, YOU BEAT THE GAME ");
      levelContinue.style.display = "block";
      levelContinue.innerHTML = "CONTINUE TO INFINITE MODE";
      $('#infiniteStatistics').css("display", "block");
      totalEnergyGen = renewableGoodStat + pollutionBadStat;
      $('.totalEnergyGen').text(totalEnergyGen);
      $('.totalClicked').text(bubblesClick);
      $('.goodClicked').text(bubbleGoodStat);
      $('.renewableGenerated').text(renewableGoodStat);
      $('.pollutionGenerated').text(pollutionBadStat)
      $('.badClicked').text(bubbleBadStat);
      $('.totalEnergyGen').text(totalEnergyGen);
      $('.levelsPassed').text(level - 1);
      $('.timeElapsed').text(timeElapsed + " seconds");
    }

    if (level > 6){
     $('#youPassed').text("CONGRATULATIONS, YOU BEAT LEVEL " + level);
     levelContinue.style.display = "block";
     levelContinue.innerHTML = "CONTINUE TO LEVEL " + level;
     $('#infiniteStatistics').css("display", "block");
     totalEnergyGen = renewableGoodStat + pollutionBadStat;
     $('.totalEnergyGen').text(totalEnergyGen);
     $('.totalClicked').text(bubblesClick);
     $('.goodClicked').text(bubbleGoodStat);
     $('.renewableGenerated').text(renewableGoodStat);
     $('.pollutionGenerated').text(pollutionBadStat)
     $('.badClicked').text(bubbleBadStat);
     $('.levelsPassed').text(level - 1);
     $('.timeElapsed').text(timeElapsed + " seconds");
   }
    // if(level == 3){
    //   document.getElementById('level2Quiz').style.display = "block";
    // } else if (level == 4) {
    //   document.getElementById('level3Quiz').style.display = "block";
    // } else if (level == 5) {
    //   document.getElementById('level4Quiz').style.display = "block";
    // } else if (level == 6) {
    // } else if (level > 6){
    //   $('#youPassed').text("CONGRATULATIONS, YOU BEAT LEVEL " + level);
    //   levelContinue.style.display = "block";
    //   levelContinue.innerHTML = "CONTINUE TO LEVEL " + level;
    // }
};

let gameTimerFail = () => {
    renewableProgress.style.height = "0px";
    nonRenewableProgress.style.height = "0px";
    timerFail.style.display = "block";
    pauseButton.style.display = "none";
    notMap.style.display = "none";
    background.style.filter = "blur(60px)";
    duringGame.pause();
    loseGame.play();
};

let gamePollutionFail = () => {
    renewableProgress.style.height = "0px";
    nonRenewableProgress.style.height = "0px";
    gameFail.style.display = "block";
    pauseButton.style.display = "none";
    notMap.style.display = "none";
    background.style.filter = "blur(60px)";
    duringGame.pause();
    loseGame.play();
};

let countdown = () =>  {
  timeElapsed++
  if (sec === 0) {
    gameActive = 0;
    clearInterval(bubbleGenerate);
    clearInterval(timer);
    gameStart = 0;
    $("#map").remove();
    gameTimerFail();
    console.log('Timer Ran out');
  } else if (sec === 0) {
    sec = 15;
    document.getElementById('timer').innerHTML = sec + " seconds left";
  } else if (sec < 10) {
      sec = sec - 1;
      document.getElementById('timer').innerHTML = sec + " seconds left";
  } else if (sec < 10) {
      sec = sec - 1;
      document.getElementById('timer').innerHTML = sec + " seconds left";
  } else {
    sec = sec - 1;
    document.getElementById('timer').innerHTML = sec + " seconds left";
  }
  checkGame();
};

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
