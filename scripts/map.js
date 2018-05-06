let bubbleGenerate;
let timer;
var map;
let gameStart = 0;
let gameActive = 0;
let background = document.getElementById('background');
let startButton = document.getElementById('startButton');
let pauseButton = document.getElementById('pauseButton');
let resumeButton = document.getElementById('resumeButton');
let settings = document.getElementById('settingsButton');
let settingsMenu = document.getElementById('settingsMenu');
let gameTitle = document.getElementById('gameTitle')
let information = document.getElementById('informationButton');
let bubble = document.getElementsByClassName('bubble');
let informationMenu = document.getElementById('informationMenu');
let gamePaused = document.getElementById('gamePaused');
let zoomAnimation = document.getElementById('zoomAnimation');
let notMap = document.getElementById('notMap');
let startZoom = document.getElementById('startZoom');
let beforeStart = document.getElementById('beforeStart');
let gameRestart = document.getElementById('restart');
let timerFail = document.getElementById('timerFail');
let renewable = document.getElementById('renewableProgress');
let nonRenewable = document.getElementById('nonRenewableProgress');
let credits = document.getElementById('credits');
let levelSuccess = document.getElementById('levelSuccessPopUp');
let levelContinue = document.getElementById('levelContinue');
let upgradeContinue = document.getElementById('upgradeContinue');
let upgradeAndContinue = document.getElementById('upgradeAndContinue');
let levelDisplay = document.getElementById('round');
let timerDisplay = document.getElementById('timer');
let gameFail = document.getElementById('gameFail');
let level = 1;
let bubbleGoodStat = 0;
let renewableGoodStat = 0;
let bubbleBadStat = 0;
let pollutionBadStat = 0;
let bubblesClick = 0;
let timeElapsed = 0;
let totalEnergyGen = renewableGoodStat + pollutionBadStat;
var pollutionLose = 0;
var pollutionEnergy = 0;
var energyWin = 0;
var difficultyCorrection = 1000 / level;

var bubbleFadeUpgrade = false;
var increaseRenewableUpgrade = false;
var initialEnergy = false;

var loseGame = $("#gameLose")[0];
var gameWinSound = $("#gameWin")[0];
var infiniteWin = $("#infiniteWin")[0];
var duringGame = $("#duringGame")[0];
duringGame.loop = true;
var beforeGame = $("#menuSound")[0];
beforeGame.loop = true;
var quizMusic = $("#quizMusic")[0];
quizMusic.loop = true;
var quizCorrect = $("#quizCorrect")[0];
var quizWrong = $("#quizWrong")[0];
beforeGame.play();

timerDisplay.innerHTML = sec + " seconds left";
round.innerHTML = "LEVEL " + level;

$('.radioContainer').click(function() {
  let menuClickAudio = $("#menuClick")[0];
  var menuClone = menuClickAudio.cloneNode();
  menuClone.play();
});


$('#bpimg').click(function() {
  window.open('https://blueplanetfoundation.org/', '_blank' );
  let menuClickAudio = $("#menuClick")[0];
  var menuClone = menuClickAudio.cloneNode();
  menuClone.play();
});

$('.mark').click(function() {
  window.open('https://github.com/MarkIsNotTaken', '_blank' );
  let menuClickAudio = $("#menuClick")[0];
  var menuClone = menuClickAudio.cloneNode();
  menuClone.play();
});

$('.kyle').click(function() {
  window.open('https://github.com/kylelingat', '_blank' );
  let menuClickAudio = $("#menuClick")[0];
  var menuClone = menuClickAudio.cloneNode();
  menuClone.play();
});

$('.dylan').click(function() {
  window.open('https://github.com/AOE-Dylan', '_blank' );
  let menuClickAudio = $("#menuClick")[0];
  var menuClone = menuClickAudio.cloneNode();
  menuClone.play();
});

let xCoord = () => {
    return Math.floor(Math.random() * $("#map").height())
}

let yCoord = () => {
    return Math.floor(Math.random() * $("#map").width())
}

let energyValue = {
  "bad" : 50,
  "oilrig" : 30,
  "waste" : 20,
  "leafpluslightning" : 30,
  "solar" : 40,
  "wind" : 30
}

let pollutionValue = {
  "bad" : 50,
  "oilrig" : 50,
  "waste" : 50
}

let images = ["styles/bad.png", "styles/oilrig.png", "styles/waste.png", "styles/leafpluslightning.png", "styles/solar.png", "styles/wind.png"];
let randUpgrade = (Math.floor(Math.random() * images.length) + 0);
let imagesUpgraded = ["styles/bad.png", "styles/oilrig.png", "styles/waste.png", "styles/leafpluslightning.png", "styles/solar.png", images[randUpgrade]];
var tempStore = [];

let randomImg = () => {
  let genImg = (increaseRenewableUpgrade ? imagesUpgraded : images);
  if (genImg.length == 0) {
    tempStore.map(img => {
      genImg.push(img)
    })
    tempStore = [];
  }
  let ranImg = (Math.floor(Math.random() * genImg.length) + 0);
  let imgChose = genImg.splice(ranImg, 1);
  tempStore.push(imgChose[0]);
  return imgChose[0];
};

let increaseEnergy = 50;
let increaseEnergyP = 30;
let increasePollution = 50;

let checkGame = () => {
    if ((pollutionLose * increasePollution) >= 265) {
      gameActive = 0;
      energyWin = 0;
      pollutionEnergy = 0;
      clearInterval(bubbleGenerate);
      clearInterval(timer);
      gameStart = 0;
      $("#map").remove();
      gamePollutionFail();
    } else if ((energyWin * increaseEnergy) + (pollutionEnergy * increaseEnergyP) >= 265 || (energyWin * increaseEnergy) >= 265) {
      gameActive = 0;
      pollutionEnergy = 0;
      clearInterval(bubbleGenerate);
      clearInterval(timer);
      gameStart = 0;
      $("#map").remove();
      gameWin();
      var next;
      next = map.zoom;
      var incr;
      incr = next + 1;
      document.getElementById('levelContinue').addEventListener('click', function(event) {
          smoothZoom(map, incr, map.getZoom()); // call smoothZoom, parameters map, final zoomLevel, and starting zoom level
      });
    }
}

var energyPercent = 0;
var pollutionPercent = 0;
$(".title")[0].innerText = "ENERGY: " + energyPercent.toFixed(1) + "%";
$(".title")[1].innerText = "POLLUTION: " + pollutionPercent.toFixed(1) + "%";

let checkInitialUpgrade = () => {
  if (initialEnergy == true) {
    energyWin = 1.5;
    $('#renewableProgress')[0].style.height = increaseEnergy * energyWin + "px";
    let calculateEnergy = (increaseEnergy * energyWin) * 100;
    let finalEnergyPercent = (calculateEnergy / 265);
    energyPercent = finalEnergyPercent;
    $(".title")[0].innerText = "ENERGY: " + energyPercent.toFixed(1) + "%";
  } else {
    energyWin = 0;
    energyPercent = 0;
    $(".title")[0].innerText = "ENERGY: " + energyPercent.toFixed(1) + "%";
    $('#renewableProgress')[0].style.height = "0px";
  }
}

let goodAudio = () => {
  let energyAudio = $("#goodClick")[0];
  var energyClone = energyAudio.cloneNode();
  let effectVolume = $("#effectSlider")[0].value;
  energyClone.volume = (parseInt(effectVolume) / 100);
  energyClone.play();
}

let badAudio = () => {
  let pollutionAudio = $("#badClick")[0];
  var pollutionClone = pollutionAudio.cloneNode();
  let effectVolume = $("#effectSlider")[0].value;
  pollutionClone.volume = (parseInt(effectVolume) / 100);
  pollutionClone.play();
}

let addBarGood = () => {
    $('#renewableProgress').css('height', $('#renewableProgress').height() + increaseEnergy);
    energyWin++;
    bubbleGoodStat++;
    renewableGoodStat += increaseEnergy;
    bubblesClick++;
    let calculateEnergy = increaseEnergy * 100;
    let finalEnergyPercent = (calculateEnergy / 265);
    energyPercent += finalEnergyPercent;
    $(".title")[0].innerText = "ENERGY: " + energyPercent.toFixed(1) + "%";
    // Starter code for Griff info values
    // let clickedString = event.target.src;
    // let startString = clickedString.replace('styles/', '');
    // let midString = clickedString.replace('.png', '');
    // let endString = midString.replace(/^.*[\\\/]/, '');
    // $('#renewableProgress').css('height', $('#renewableProgress').height() + energyValue[endString]);
    goodAudio();
    checkGame();
};

let addBarBad = () => {
    $('#renewableProgress').css('height', $('#renewableProgress').height() + increaseEnergyP);
    $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() + increasePollution);
    pollutionLose++;
    pollutionEnergy++;
    bubbleBadStat++
    pollutionBadStat += increasePollution;
    renewableGoodStat += increaseEnergyP;
    bubblesClick++;
    let calculatePollution = increasePollution * 100;
    let calculateEnergyP = increaseEnergyP * 100;
    let finalPollutionPercent = (calculatePollution / 265);
    let finalEnergyP = (calculateEnergyP / 265);
    pollutionPercent += finalPollutionPercent;
    energyPercent += finalEnergyP;
    $(".title")[1].innerText = "POLLUTION: " + pollutionPercent.toFixed(1) + "%";
    $(".title")[0].innerText = "ENERGY: " + energyPercent.toFixed(1) + "%";
    // Starter code for Griff info values
    // let clickedString = event.target.src;
    // let startString = clickedString.replace('styles/', '');
    // let midString = clickedString.replace('.png', '');
    // let endString = midString.replace(/^.*[\\\/]/, '');
    // $('#renewableProgress').css('height', $('#renewableProgress').height() + energyValue[endString]);
    // $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() + pollutionValue[endString]);
    badAudio();
    checkGame();
};

let checkImg = ["styles/bad.png", "styles/oilrig.png", "styles/waste.png"];

dictateBar = () => {
  var type = event.target.getAttribute("src");
    event.target.style.WebkitAnimation = null;
    event.target.style.display = "none";
    if ( type == checkImg[0]) {
        addBarBad()
        event.target.onclick = null;
    } else if (type == checkImg[1]) {
        addBarBad()
        event.target.onclick = null;
    } else if (type == checkImg[2]) {
        addBarBad()
        event.target.onclick = null;
    }else{
        addBarGood()
        event.target.onclick = null;
    }
}

let timeNum = () => {
    return (Math.floor(Math.random() * 5) + 2)
}

var remaining = document.getElementById('map').children;

let randomButton = () => {
    let randX = xCoord();
    let randY = yCoord();
    let randGen = randomImg();
    let randTime = timeNum();
    let absTime = [randTime];
    let nonRenewableFade = (absTime[0] + (level + (level / 10)));
    let renewableFade = (absTime[0] / (level / 2));
    $('#map').append($(`<img class="bubble" id="${remaining.length}" onclick="dictateBar()" src="${randGen}" style="top:` + randX + `px; left:` + randY + `px; opacity: 1;" >`));
    let currBubble = $(`#` + `${remaining.length - 1}`)[0];
    let bubbleSrc = currBubble.src;
    let actualSrc = "styles/" + bubbleSrc.replace(/^.*[\\\/]/, '');
    let nonInteractible = () => {
        currBubble.style.pointerEvents = "none";
        currBubble.style.pointer = "default";
    }
    for (var i = 0; i < checkImg.length; i++){
      if (actualSrc !== checkImg[i]) {
        setTimeout(nonInteractible, (nonRenewableFade * 1000));
        currBubble.style.WebkitAnimation = "fading " + nonRenewableFade + "s linear";
        currBubble.style.animationFillMode = "forwards";
      } else if (currBubble.src !== checkImg[i]){
       if (bubbleFadeUpgrade == true) {
         setTimeout(nonInteractible, ((renewableFade * 1.5) * 1000))
         currBubble.style.WebkitAnimation = "fading " + (renewableFade + 1.2) + "s linear";
         currBubble.style.animationFillMode = "forwards";
       } else {
         setTimeout(nonInteractible, (renewableFade * 1000))
         currBubble.style.WebkitAnimation = "fading " + renewableFade + "s linear";
         currBubble.style.animationFillMode = "forwards";
        }
      }
    }
};

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides1");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

}

var infoIndex = 1;
showInfoSlides(infoIndex);

function plusInfoSlides(n) {
    showInfoSlides(infoIndex += n);
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
}

function currentInfoSlide(n) {
    showInfoSlides(infoIndex = n);
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
}

function showInfoSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides2");
    var dots = document.getElementsByClassName("dot2");
    if (n > slides.length) {
        infoIndex = 1
    }
    if (n < 1) {
        infoIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[infoIndex - 1].style.display = "block";
    dots[infoIndex - 1].className += " active";
}

/*zoomAnimation.addEventListener("animationend", AnimationListener, false);*/

let startMenuClose = 0;
$("#startZoom").click(function() {
    startZoom.style.display = "none";
    background.style.filter = "blur(0px)";
    beforeStart.style.display = "none";
    $('#zoomAnimation').addClass('addZoom');
    let startMenuClose = 1;
    $('#notMap').css("display", "block");
    menuClick.play();
});

/*function AnimationListener() {
    notMap.style.display = "block";
    beforeStart.style.display = "none";
    $('#beforeStart').removeClass('animated zoomOut');
}*/

startButton.addEventListener("click", function() {
    $('#startButton').removeClass('animated infinite rubberBand');

    bubbleGenerate = setInterval(randomButton, difficultyCorrection);
    timer = setInterval(countdown, 1000);

    gameStart = 1;
    gameActive = 1;

    startButton.style.display = "none";
    pauseButton.style.display = "block";
    settingsMenu.style.display = "none";
    informationMenu.style.display = "none";
    credits.style.display = "none";
    background.style.filter = "blur(0px)";

    beforeGame.pause();
    beforeGame.currentTime = 0;
    duringGame.play();

    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
});

pauseButton.addEventListener("click", function() {
    pause();
    gamePaused.style.display = "block";
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
});

$('.pauseOrResume').click(function() {
  resume();
  gamePaused.style.display = "none";
  let menuClickAudio = $("#menuClick")[0];
  var menuClone = menuClickAudio.cloneNode();
  menuClone.play();
});



resumeButton.addEventListener("click", function() {
    resume();
    gamePaused.style.display = "none";
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
});
  var menuOpen = 0;
settings.addEventListener("click", function() {
    pause();
    gamePaused.style.display = "none";
    credits.style.display = "none";
    informationMenu.style.display = "none";
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
    menuOpen = 1;
    if (settingsMenu.style.display === "block") {
        settingsMenu.style.display = "none";
        background.style.filter = "blur(0px)";
        resume();
    } else {
        settingsMenu.style.display = "block";
        background.style.filter = "blur(10px)";
    }
});

gameTitle.addEventListener("click", function() {
    pause();
    gamePaused.style.display = "none";
    settingsMenu.style.display = "none";
    informationMenu.style.display = "none";
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
    if (credits.style.display === "block") {
        credits.style.display = "none";
        background.style.filter = "blur(0px)";
        resume();
    } else {
        credits.style.display = "block";
        background.style.filter = "blur(10px)";
    }
});

information.addEventListener("click", function() {
    pause();
    gamePaused.style.display = "none";
    credits.style.display = "none";
    settingsMenu.style.display = "none";

    totalEnergyGen = renewableGoodStat + pollutionBadStat;
    $('.totalEnergyGen').text(totalEnergyGen);
    $('.totalClicked').text(bubblesClick);
    $('.goodClicked').text(bubbleGoodStat);
    $('.renewableGenerated').text(renewableGoodStat);
    $('.pollutionGenerated').text(pollutionBadStat)
    $('.badClicked').text(bubbleBadStat);
    $('.levelsPassed').text(level - 1);
    $('.timeElapsed').text(timeElapsed + " seconds");
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();

    if (informationMenu.style.display === "block") {
        informationMenu.style.display = "none";
        background.style.filter = "blur(0px)";
        resume();
    } else {
        informationMenu.style.display = "block";
        background.style.filter = "blur(10px)";
    }
});


let pause = () => {
    if (gameActive == 1 & gameStart == 1) {
        clearInterval(bubbleGenerate);
        clearInterval(timer);
        gameActive = 0;
        background.style.filter = "blur(15px)";
        pauseButton.style.display = "none";
        resumeButton.style.display = "block";
        var myArray = [
          'Renewable energy sources come from natural sources and can be replenished.',
          'More than 150 years ago, wood supplied up to 90 percent of the nation’s energy needs.',
         'More than half of renewable energy sources are devoted to producing electricity.',
         'Natural Gas is a form of methane',
         'Burning unlocks the energy locked in fossil fuels',
         'Renewable Energy creates 5 times more jobs than fossil fuels',
         'Just 1 wind turbine can generate enough electricity to power 1,400 homes.'];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];
        document.getElementById('randomFact').textContent = "FUN FACT: " + rand;
        for (var i = 0; i < remaining.length; i++) {
            remaining[i].style.webkitAnimationPlayState = "paused";
            remaining[i].style.pointerEvents = "none";
        }
        duringGame.pause();
        duringGame.currentTime = 0;
    }
};

let resume = () => {
    if (gameStart == 1 & gameActive == 0) {
        bubbleGenerate = setInterval(randomButton, difficultyCorrection);
        gameActive = 1;
        background.style.filter = "blur(0px)";
        settingsMenu.style.display = "none";
        informationMenu.style.display = "none";
        credits.style.display = "none";
        resumeButton.style.display = "none";
        pauseButton.style.display = "block";
        timer = setInterval(countdown, 1000);
        for (var i = 0; i < remaining.length; i++) {
            remaining[i].style.webkitAnimationPlayState = "running";
            remaining[i].style.pointerEvents = "auto";
        }
        beforeGame.pause();
        beforeGame.currentTime = 0;
        duringGame.play();
        menuClick.play();
    }
};

$('.menuClose').click(function() {
    if (gameStart == 1 & gameActive == 0) {
        bubbleGenerate = setInterval(randomButton, difficultyCorrection);
        timer = setInterval(countdown, 1000);
        pauseButton.style.display = "block";
        resumeButton.style.display = "none";
        background.style.filter = "blur(0px)";
        informationMenu.style.display = "none";
        settingsMenu.style.display = "none";
        credits.style.display = "none";
        gameActive = 1;
        for (var i = 0; i < remaining.length; i++) {
            remaining[i].style.webkitAnimationPlayState = "running";
            remaining[i].style.pointerEvents = "auto";
        }
        beforeGame.pause();
        beforeGame.currentTime = 0;
        duringGame.play();
    } else {
        background.style.filter = "blur(0px)";
        informationMenu.style.display = "none";
        settingsMenu.style.display = "none";
        credits.style.display = "none";
    }
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
});

// the smooth zoom function
function smoothZoom(map, max, cnt) {
    if (cnt >= max) {
        return;
    } else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event) {
        google.maps.event.removeListener(z);
        smoothZoom(map, max, cnt + 1);
    });
    setTimeout(function() {
        map.setZoom(cnt + 1)
    }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
  }
}

let availableUpgrades = ["20sec", "slowerDecay", "moreGoodBubbles", "energyHeadstart"];
let upgrades = [];

function upgradeGenerator() {
  let upgradeItem = availableUpgrades.splice(Math.floor(Math.random() * availableUpgrades.length), 1);
  if(upgradeItem == "20sec"){
    $("#upgradeReward").text("+20 SECONDS TO THE TIMER");
    upgrades.push(upgradeItem[0])
  } else if(upgradeItem == "slowerDecay"){
    $("#upgradeReward").text("RENEWABLE BUBBLES DECAY SLOWER");
    bubbleFadeUpgrade = true;
    upgrades.push(upgradeItem[0])

  } else if(upgradeItem == "moreGoodBubbles"){
    $("#upgradeReward").text("MORE RENEWABLE BUBBLES GENERATE");
    increaseRenewableUpgrade = true;
    upgrades.push(upgradeItem[0])
  } else if(upgradeItem == "energyHeadstart"){
    $("#upgradeReward").text("START WITH MORE ENERGY");
    initialEnergy = true;
    upgrades.push(upgradeItem[0])
  }
}

let quizzes = [$("#level4Quiz"), $("#level3Quiz"), $("#level2Quiz"), $("#level1Quiz")]


function submitAnswer() {
    quizMusic.pause();
    quizMusic.currentTime = 0;
    var radios = document.getElementsByName("radio");
    var i = 0,
        len = radios.length;
    var checked = false;
    var userAnswer;

    for (; i < len; i++) {
        if (radios[i].checked) {
            checked = true;
            userAnswer = radios[i].value;
        }
    }
    if (userAnswer === "d" && document.getElementById('level1Quiz').style.display == "block" ) {
      $(".wrongLevel1").css("display", "none");
      $('.wrongLevel1').find('.checkmark').css("display", "none");
      $('#level1Quiz').find('.submitAnswer').css("display", "none");
      $('#correctLevel1').addClass('animated pulse');
      $("#upgradeCongrats").css("display", "block");
      levelContinue.style.display = "block";
      upgradeGenerator();
      quizCorrect.play();
    } else if (userAnswer === "e" && document.getElementById('level2Quiz').style.display == "block" ) {
      $(".wrongLevel2").css("display", "none");
      $('.wrongLevel2').find('.checkmark').css("display", "none");
      $('#level2Quiz').find('.submitAnswer').css("display", "none");
      $('#correctLevel2').addClass('animated pulse');
      $("#upgradeCongrats").css("display", "block");
      levelContinue.style.display = "block";
      upgradeGenerator();
      quizCorrect.play();
    } else if (userAnswer === "k" && document.getElementById('level3Quiz').style.display == "block" ) {
      $(".wrongLevel3").css("display", "none");
      $('.wrongLevel3').find('.checkmark').css("display", "none");
      $('#level3Quiz').find('.submitAnswer').css("display", "none");
      $('#correctLevel3').addClass('animated pulse');
      $("#upgradeCongrats").css("display", "block");
      levelContinue.style.display = "block";
      upgradeGenerator();
      quizCorrect.play();
    } else if (userAnswer === "o" && document.getElementById('level4Quiz').style.display == "block" ) {
      $(".wrongLevel4").css("display", "none");
      $('.wrongLevel4').find('.checkmark').css("display", "none");
      $('#level4Quiz').find('.submitAnswer').css("display", "none");
      $('#correctLevel4').addClass('animated pulse');
      $("#upgradeCongrats").css("display", "block");
      levelContinue.style.display = "block";
      upgradeGenerator();
      quizCorrect.play();
    } else if (userAnswer != "d" && document.getElementById('level1Quiz').style.display == "block") {
        $(".wrongLevel1").css("opacity", 0.5);
        $('.wrongLevel1').find('.checkmark').css("display", "none");
        $('#level1Quiz').find('.submitAnswer').css("display", "none");
        levelContinue.style.display = "block";
        $('.upgradeText').text("OOPS, YOU CHOSE THE WRONG ANSWER");
        $('.upgradeText').css("color", "#ff6666");
        $('#correctLevel1').addClass('animated pulse');
        quizWrong.play();
    } else if (userAnswer != "e" && document.getElementById('level2Quiz').style.display == "block") {
        $(".wrongLevel2").css("opacity", 0.5);
        $('.wrongLevel2').find('.checkmark').css("display", "none");
        $('#level2Quiz').find('.submitAnswer').css("display", "none");
        levelContinue.style.display = "block";
        $('.upgradeText').text("OOPS, YOU CHOSE THE WRONG ANSWER");
        $('.upgradeText').css("color", "#ff6666");
        $('#correctLevel2').addClass('animated pulse');
        quizWrong.play();
    } else if (userAnswer != "k" && document.getElementById('level3Quiz').style.display == "block") {
        $(".wrongLevel3").css("opacity", 0.5);
        $('.wrongLevel3').find('.checkmark').css("display", "none");
        $('#level3Quiz').find('.submitAnswer').css("display", "none");
        levelContinue.style.display = "block";
        $('.upgradeText').text("OOPS, YOU CHOSE THE WRONG ANSWER");
        $('.upgradeText').css("color", "#ff6666");
        $('#correctLevel3').addClass('animated pulse');
        quizWrong.play();
    } else if (userAnswer != "o" && document.getElementById('level4Quiz').style.display == "block") {
        $(".wrongLevel4").css("opacity", 0.5);
        $('.wrongLevel4').find('.checkmark').css("display", "none");
        $('#level4Quiz').find('.submitAnswer').css("display", "none");
        levelContinue.style.display = "block";
        $('.upgradeText').text("OOPS, YOU CHOSE THE WRONG ANSWER");
        $('.upgradeText').css("color", "#ff6666");
        $('#correctLevel4').addClass('animated pulse');
        quizWrong.play();
    }
}

function restart() {
    level = 1;
    bubbleGoodStat = 0;
    bubbleBadStat = 0;
    bubblesClick = 0;
    timeElapsed = 0;

    energyWin = 0;
    pollutionEnergy = 0;
    pollutionLose = 0;

    round.innerHTML = "Level " + level;
    timerFail.style.display = "none";
    gameFail.style.display = "none";
    background.style.filter = "blur(0px)";
    startButton.style.display = "block";
    notMap.style.display = "block";

    $(".wrongLevel1").css("display", "block");
    $(".wrongLevel2").css("display", "block");
    $(".wrongLevel3").css("display", "block");
    $(".wrongLevel4").css("display", "block");
    $('#level1Quiz').find('.submitAnswer').css("display", "block");
    $('#level2Quiz').find('.submitAnswer').css("display", "block");
    $('#level3Quiz').find('.submitAnswer').css("display", "block");
    $('#level4Quiz').find('.submitAnswer').css("display", "block");
    // $('#correctLevel1').find('.checkmark').css("background-color", "#0098a4");
    // $('#correctLevel2').find('.checkmark').css("background-color", "#0098a4");
    // $('#correctLevel3').find('.checkmark').css("background-color", "#0098a4");
    // $('#correctLevel4').find('.checkmark').css("background-color", "#0098a4");
    $(".wrongLevel1").css("opacity", 1.0);
    $(".wrongLevel2").css("opacity", 1.0);
    $(".wrongLevel3").css("opacity", 1.0);
    $(".wrongLevel4").css("opacity", 1.0);
    $('#correctLevel1').removeClass('animated pulse');
    $('#correctLevel2').removeClass('animated pulse');
    $('#correctLevel3').removeClass('animated pulse');
    $('#correctLevel4').removeClass('animated pulse');

    let div = document.createElement("DIV");
    div.id = "map";
    let newMap = document.getElementById('background').appendChild(div);
    remaining = document.getElementById('map').children;
    sec = 15;
    document.getElementById('timer').innerHTML = sec + " seconds left";
    $('#startButton').addClass('animated infinite rubberBand');
    randomQuiz = quizzes.splice(Math.floor(Math.random() * quizzes.length), 1);
    energyPercent = 0;
    pollutionPercent = 0;
    $(".title")[0].innerText = "ENERGY: " + energyPercent.toFixed(1) + "%";
    $(".title")[1].innerText = "POLLUTION: " + pollutionPercent.toFixed(1) + "%";
    bubbleFadeUpgrade = false;
    increaseRenewableUpgrade = false;
    initialEnergy = false;
    difficultyCorrection = 1000 / level;
    quizzes = [$("#level4Quiz"), $("#level3Quiz"), $("#level2Quiz"), $("#level1Quiz")];
    images = ["styles/bad.png", "styles/oilrig.png", "styles/waste.png", "styles/leafpluslightning.png", "styles/solar.png", "styles/wind.png"];
    loseGame.pause();
    loseGame.currentTime = 0;
    beforeGame.pause();
    beforeGame.currentTime = 0;
    beforeGame.play();
    duringGame.pause();
    beforeGame.currentTime = 0;
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();
    $('#infiniteStatistics').css("display", "none");
    $("#timer").css("color", "white");
    $('#timer').removeClass('animated pulse 0.3s infinite');
};

levelContinue.addEventListener("click", function() {
    levelContinue.style.display = "none";
    levelSuccess.style.display = "none";
    background.style.filter = "blur(0px)";
    startButton.style.display = "block";
    notMap.style.display = "block";

    let div = document.createElement("DIV");
    div.id = "map";
    let newMap = document.getElementById('background').appendChild(div);
    remaining = document.getElementById('map').children;
    sec = 15;
    $('#startButton').addClass('animated infinite rubberBand');
    $("#level1Quiz").css("display", "none");
    $("#level2Quiz").css("display", "none");
    $("#level3Quiz").css("display", "none");
    $("#level4Quiz").css("display", "none");
    $('.upgradeText').text("ANSWER CORRECTLY FOR AN UPGRADE");
    $('.upgradeText').css("color", "white");
    $("#upgradeCongrats").css("display", "none");
    pollutionEnergy = 0;

    checkInitialUpgrade();
    let calculatePollution = increasePollution * 100;
    let finalPollutionPercent = (calculatePollution / 265);
    if (pollutionLose > 0) {
      pollutionLose--;
      $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() - increasePollution);
      pollutionPercent -= finalPollutionPercent;
    }
    $(".title")[0].innerText = "ENERGY: " + energyPercent.toFixed(1) + "%";
    $(".title")[1].innerText = "POLLUTION: " + pollutionPercent.toFixed(1) + "%";
    if(upgrades.includes("20sec") === true){
      sec = sec + 20;
    }
    document.getElementById('timer').innerHTML = sec + " seconds left";
    difficultyCorrection = 1000 / level;
    let menuClickAudio = $("#menuClick")[0];
    var menuClone = menuClickAudio.cloneNode();
    menuClone.play();

    if(level == 6){gameWinSound.pause(); gameWinSound.currentTime = 0;}
    if(level > 6){infiniteWin.pause(); infiniteWin.currentTime = 0;}
      $("#timer").css("color", "white");
      $('#timer').removeClass('animated pulse 0.3s infinite');
});

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

if(document.getElementById('beforeStart').style.display === "block" || informationMenu.style.display === "block"){
    if (e.keyCode == '37') {
        plusSlides(-1);
        plusInfoSlides(-1);
    } else if (e.keyCode == '39') {
        plusSlides(1);
        plusInfoSlides(1);
    }
}
}

function initMap() {
    map = new google.maps.Map(document.getElementById('backing'), {
        center: {
            lat: 21.3882887,
            lng: -157.9885406
        },
        zoom: 10,
        mapTypeId : "satellite",
        disableDefaultUI: true,
        gestureHandling: 'none',
        styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8ec3b9"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1a3646"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#4b6878"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#64779e"
                }]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#4b6878"
                }]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#334e87"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#023e58"
                }]
            },
            {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#283d6a"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#6f9ba5"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#023e58"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#3C7680"
                }]
            },
            {
                "featureType": "road",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#304a7d"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#98a5be"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#2c6675"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#255763"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#b0d5ce"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#023e58"
                }]
            },
            {
                "featureType": "transit",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#98a5be"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#283d6a"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#3a4762"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#0e1626"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#4e6d70"
                }]
            }
        ]
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent('You are here');
    infoWindow.open(map);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
