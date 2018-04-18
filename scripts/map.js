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

timerDisplay.innerHTML = sec;
round.innerHTML = "Level " + level;

$('#bpimg').click(function() {
  window.open('https://blueplanetfoundation.org/', '_blank' );
});

let xCoord = () => {
    return Math.floor(Math.random() * $("#map").height())
}

let yCoord = () => {
    return Math.floor(Math.random() * $("#map").width())
}

let images = ["styles/bad.png", "styles/oil-rig.png", "styles/leaf-plus-lightning.jpg", "styles/solar.png"];
var tempStore = [];

let randomImg = () => {
  let genImg = images;
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

let increaseEnergy = 264;
let increaseEnergyP = 10;
let increasePollution = 264;

let checkGame = () => {
    if ((pollutionLose * increasePollution) >= 265) {
      gameActive = 0;
      energyWin = 0;
      pollutionLose = 0;
      clearInterval(bubbleGenerate);
      clearInterval(timer);
      gameStart = 0;
      $("#map").remove();
      gamePollutionFail();
      console.log('You polluted the world!')
    } else if ((energyWin * increaseEnergy) + (pollutionEnergy * increaseEnergyP) >= 265 || (energyWin * increaseEnergy) >= 265) {
      gameActive = 0;
      energyWin = 0;
      pollutionLose = 0;
      clearInterval(bubbleGenerate);
      clearInterval(timer);
      gameStart = 0;
      $("#map").remove();
      gameWin();
      var next;
      next = map.zoom;
      var incr;
      incr = next + 1;
      console.log('You acquired enough energy!');
      document.getElementById('levelContinue').addEventListener('click', function(event) {
          smoothZoom(map, incr, map.getZoom()); // call smoothZoom, parameters map, final zoomLevel, and starting zoom level
      });
    }
}

var energyPercent = 0;
var pollutionPercent = 0;

let addBarGood = () => {
    $('#renewableProgress').css('height', $('#renewableProgress').height() + increaseEnergy);
    energyWin++;
    bubbleGoodStat++;
    renewableGoodStat += increaseEnergy;
    bubblesClick++;
    let calculateEnergy = (energyWin * increaseEnergy) * 100;
    let finalEnergyPercent = (calculateEnergy / 265).toFixed(1);
    energyPercent = finalEnergyPercent;
    $(".title")[0].innerText = "ENERGY: " + energyPercent + "%";
    // console.log(renewableProgress.style.height, 'goodBar height');
    // console.log(energyWin * 5);
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
    let calculatePollution = (pollutionLose * increasePollution) * 100;
    let calculateEnergyP = ((pollutionEnergy * increaseEnergyP) + (energyWin * increaseEnergy)) * 100;
    let finalPollutionPercent = (calculatePollution / 265).toFixed(1);
    let finalEnergyP = (calculateEnergyP / 265).toFixed(1);
    pollutionPercent = finalPollutionPercent;
    energyPercent = finalEnergyP;
    $(".title")[1].innerText = "POLLUTION: " + pollutionPercent + "%";
    $(".title")[0].innerText = "ENERGY " + energyPercent + "%";
    // console.log(renewableProgress.style.height, "goodBar height");
    // console.log(nonRenewableProgress.style.height, "badBar height");
    // console.log(energyWin);
    // console.log(pollutionLose * 15);
    checkGame();
};

let checkImg = ["styles/bad.png", "styles/oil-rig.png", "styles/leaf-plus-lightning.jpg", "styles/solar.png"];

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
    } else {
        addBarGood()
        event.target.onclick = null;
    }
}

let timeNum = () => {
    return (Math.floor(Math.random() * 8) + 4)
}

var remaining = document.getElementById('map').children;

let randomButton = () => {
    let randX = xCoord();
    let randY = yCoord();
    let randGen = randomImg();
    let randTime = timeNum();
    let absTime = [randTime];
    let nonRenewableFade = (absTime[0] * ((level * .1)));
    let renewableFade = (absTime[0] / (level / 2));
    $('#map').append($(`<img class="bubble" id="${remaining.length}" onclick="dictateBar()" src="${randGen}" style="top:` + randX + `px; left:` + randY + `px; opacity: 1;" >`));
    let currBubble = $(`#` + `${remaining.length - 1}`)[0];
    let nonInteractible = () => {
        currBubble.style.pointerEvents = "none";
        currBubble.style.pointer = "default";
    }
    if (currBubble.src == images[0]) {
      setTimeout(nonInteractible, (nonRenewableFade * 1000));
      currBubble.style.WebkitAnimation = "fading " + nonRenewableFade + "s linear";
      currBubble.style.animationFillMode = "forwards";
    } else {
      if (bubbleFadeUpgrade == true) {
        setTimeout(nonInteractible, ((renewableFade + 1.2) * 1000))
        currBubble.style.WebkitAnimation = "fading " + (renewableFade + 1.2) + "s linear";
        currBubble.style.animationFillMode = "forwards";
      } else {
        setTimeout(nonInteractible, (renewableFade * 1000))
        currBubble.style.WebkitAnimation = "fading " + renewableFade + "s linear";
        currBubble.style.animationFillMode = "forwards";
      }
    }
};

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
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
}

function currentInfoSlide(n) {
    showInfoSlides(infoIndex = n);
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
    $('#beforeStart').addClass('animated bounceOutDown');
    $('#zoomAnimation').addClass('addZoom');
    let startMenuClose = 1;
    notMap.style.display = "block";
    beforeStart.style.display = "none";
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

    console.log('Game Started');
    console.log('gameActive is', gameActive);
});

pauseButton.addEventListener("click", function() {
    pause();
    gamePaused.style.display = "block";
});

resumeButton.addEventListener("click", function() {
    resume();
    gamePaused.style.display = "none";
});

settings.addEventListener("click", function() {
    pause();
    gamePaused.style.display = "none";
    credits.style.display = "none";
    settingsMenu.style.display = "block";
    informationMenu.style.display = "none";
});

gameTitle.addEventListener("click", function() {
    pause();
    gamePaused.style.display = "none";
    settingsMenu.style.display = "none";
    credits.style.display = "block";
    informationMenu.style.display = "none";
});

information.addEventListener("click", function() {
    pause();
    gamePaused.style.display = "none";
    credits.style.display = "none";
    informationMenu.style.display = "block";
    settingsMenu.style.display = "none";

    $('.totalClicked').text(bubblesClick);
    $('.goodClicked').text(bubbleGoodStat);
    $('.renewableGenerated').text(renewableGoodStat);
    $('.pollutionGenerated').text(pollutionBadStat)
    $('.badClicked').text(bubbleBadStat);
    $('.levelsPassed').text(level - 1);
    $('.timeElapsed').text(timeElapsed + " seconds");
});

let pause = () => {
    if (gameActive == 1 & gameStart == 1) {
        clearInterval(bubbleGenerate);
        clearInterval(timer);
        console.log('game paused')
        gameActive = 0;
        background.style.filter = "blur(60px)";
        pauseButton.style.display = "none";
        resumeButton.style.display = "block";
        var myArray = ['1', '2', '3', '4', '5', '6', '7', '8'];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];
        document.getElementById('randomFact').textContent = "FUN FACT: " + rand;
        for (var i = 0; i < remaining.length; i++) {
            remaining[i].style.webkitAnimationPlayState = "paused";
            remaining[i].style.pointerEvents = "none";
        }
    }
};

let resume = () => {
    if (gameStart == 1 & gameActive == 0) {
        bubbleGenerate = setInterval(randomButton, difficultyCorrection);
        gameActive = 1;
        console.log('game resumed')
        background.style.filter = "blur(0px)";
        settingsMenu.style.display = "none";
        informationMenu.style.display = "none";
        resumeButton.style.display = "none";
        pauseButton.style.display = "block";
        timer = setInterval(countdown, 1000);
        for (var i = 0; i < remaining.length; i++) {
            remaining[i].style.webkitAnimationPlayState = "running";
            remaining[i].style.pointerEvents = "auto";
        }
    }
};

$('.menuClose').click(function() {
    if (gameStart == 1 & gameActive == 0) {
        bubbleGenerate = setInterval(randomButton, difficultyCorrection);
        timer = setInterval(countdown, 1000);
        console.log('Menu Closed, Starting Generating');
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
    } else {
        background.style.filter = "blur(0px)";
        informationMenu.style.display = "none";
        settingsMenu.style.display = "none";
        credits.style.display = "none";
    }
});

// the smooth zoom function
function smoothZoom(map, max, cnt) {
    if (cnt >= max) {
        return;
    } else {
        if (cnt == 20) {
          map.zoom = 2;
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
}

function restart() {
    level = 1;
    energyWin = 0;
    bubbleGoodStat = 0;
    bubbleBadStat = 0;
    bubblesClick = 0;
    timeElapsed = 0;
    pollutionLose = 0;
    round.innerHTML = "Level " + level;
    timerFail.style.display = "none";
    gameFail.style.display = "none";
    background.style.filter = "blur(0px)";
    startButton.style.display = "block";
    notMap.style.display = "block";

    let div = document.createElement("DIV");
    div.id = "map";
    let newMap = document.getElementById('background').appendChild(div);
    remaining = document.getElementById('map').children;
    sec = 60;
    document.getElementById('timer').innerHTML = sec;
    $('#startButton').addClass('animated infinite rubberBand');
    randomQuiz = quizzes.splice(Math.floor(Math.random() * quizzes.length), 1);
    energyPercent = 0;
    let calculatePollution = (pollutionLose * increasePollution) * 100;
    let finalPollutionPercent = (calculatePollution / 265);
    pollutionPercent = finalPollutionPercent;
    $(".title")[0].innerText = "ENERGY: " + energyPercent.toFixed(1) + "%";
    $(".title")[1].innerText = "POLLUTION: " + pollutionPercent.toFixed(1) + "%";
    bubbleFadeUpgrade = false;
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
    sec = 60;
    $('#startButton').addClass('animated infinite rubberBand');
    $("#level1Quiz").css("display", "none");
    $("#level2Quiz").css("display", "none");
    $("#level3Quiz").css("display", "none");
    $("#level4Quiz").css("display", "none");
    $('.upgradeText').text("ANSWER CORRECTLY FOR AN UPGRADE");
    $('.upgradeText').css("color", "white");
    $("#upgradeCongrats").css("display", "none");
    pollutionLose - 1;
    console.log(pollutionLose)
    $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() - increasePollution);
    energyPercent = 0;
    let calculatePollution = (pollutionLose * increasePollution) * 100;
    let finalPollutionPercent = (calculatePollution / 265);
    pollutionPercent = finalPollutionPercent;
    $(".title")[0].innerText = "ENERGY: " + energyPercent.toFixed(1) + "%";
    $(".title")[1].innerText = "POLLUTION: " + pollutionPercent.toFixed(1) + "%";


    if(upgrades.includes("20sec") === true){
      sec = sec + 20;
    } else if(upgrades.includes("slowerDecay") === true){

    } else if(upgrades.includes("moreGoodBubbles") === true){

    }
    document.getElementById('timer').innerHTML = sec;
});

let availableUpgrades = ["20sec", "slowerDecay", "moreGoodBubbles"];
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
    $("#upgradeReward").text("RENEWABLE BUBBLES GENERATE FASTER");
    upgrades.push(upgradeItem[0])
  }
}





let quizzes = [$("#level4Quiz"), $("#level3Quiz"), $("#level2Quiz"), $("#level1Quiz")]

function submitAnswer() {
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
      $(".wrongLevel1").remove();
      $('.wrongLevel1').find('.checkmark').remove();
      $('#level1Quiz').find('.submitAnswer').remove();
      $('#correctLevel1').find('.checkmark').css("background-color", "#97ca3d");
      $('#correctLevel1').addClass('animated pulse');
      $("#upgradeCongrats").css("display", "block");
      levelContinue.style.display = "block";
      upgradeGenerator();
    } else if (userAnswer === "e" && document.getElementById('level2Quiz').style.display == "block" ) {
      $(".wrongLevel2").remove();
      $('.wrongLevel2').find('.checkmark').remove();
      $('#level2Quiz').find('.submitAnswer').remove();
      $('#correctLevel2').find('.checkmark').css("background-color", "#97ca3d");
      $('#correctLevel2').addClass('animated pulse');
      $("#upgradeCongrats").css("display", "block");
      levelContinue.style.display = "block";
      upgradeGenerator();
    } else if (userAnswer === "k" && document.getElementById('level3Quiz').style.display == "block" ) {
      $(".wrongLevel3").remove();
      $('.wrongLevel3').find('.checkmark').remove();
      $('#level3Quiz').find('.submitAnswer').remove();
      $('#correctLevel3').find('.checkmark').css("background-color", "#97ca3d");
      $('#correctLevel3').addClass('animated pulse');
      $("#upgradeCongrats").css("display", "block");
      levelContinue.style.display = "block";
      upgradeGenerator();
    } else if (userAnswer === "o" && document.getElementById('level4Quiz').style.display == "block" ) {
      $(".wrongLevel4").remove();
      $('.wrongLevel4').find('.checkmark').remove();
      $('#level4Quiz').find('.submitAnswer').remove();
      $('#correctLevel4').find('.checkmark').css("background-color", "#97ca3d");
      $('#correctLevel4').addClass('animated pulse');
      $("#upgradeCongrats").css("display", "block");
      levelContinue.style.display = "block";
      upgradeGenerator();
    } else if (userAnswer != "d" && document.getElementById('level1Quiz').style.display == "block") {
        $(".wrongLevel1").css("opacity", 0.5);
        $('.wrongLevel1').find('.checkmark').remove();
        $('#level1Quiz').find('.submitAnswer').remove();
        levelContinue.style.display = "block";
        $('.upgradeText').text("OOPS, YOU CHOSE THE WRONG ANSWER");
        $('.upgradeText').css("color", "#ff6666");
        $('#correctLevel1').find('.checkmark').css("background-color", "#97ca3d");
        $('#correctLevel1').addClass('animated pulse');
    } else if (userAnswer != "e" && document.getElementById('level2Quiz').style.display == "block") {
        $(".wrongLevel2").css("opacity", 0.5);
        $('.wrongLevel2').find('.checkmark').remove();
        $('#level2Quiz').find('.submitAnswer').remove();
        levelContinue.style.display = "block";
        $('.upgradeText').text("OOPS, YOU CHOSE THE WRONG ANSWER");
        $('.upgradeText').css("color", "#ff6666");
        $('#correctLevel2').find('.checkmark').css("background-color", "#97ca3d");
        $('#correctLevel2').addClass('animated pulse');
    } else if (userAnswer != "k" && document.getElementById('level3Quiz').style.display == "block") {
        $(".wrongLevel3").css("opacity", 0.5);
        $('.wrongLevel3').find('.checkmark').remove();
        $('#level3Quiz').find('.submitAnswer').remove();
        levelContinue.style.display = "block";
        $('.upgradeText').text("OOPS, YOU CHOSE THE WRONG ANSWER");
        $('.upgradeText').css("color", "#ff6666");
        $('#correctLevel3').find('.checkmark').css("background-color", "#97ca3d");
        $('#correctLevel3').addClass('animated pulse');
    } else if (userAnswer != "o" && document.getElementById('level4Quiz').style.display == "block") {
        $(".wrongLevel4").css("opacity", 0.5);
        $('.wrongLevel4').find('.checkmark').remove();
        $('#level4Quiz').find('.submitAnswer').remove();
        levelContinue.style.display = "block";
        $('.upgradeText').text("OOPS, YOU CHOSE THE WRONG ANSWER");
        $('.upgradeText').css("color", "#ff6666");
        $('#correctLevel4').find('.checkmark').css("background-color", "#97ca3d");
        $('#correctLevel4').addClass('animated pulse');
    }
}



document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        plusSlides(-1);
        plusInfoSlides(-1);
    } else if (e.keyCode == '39') {
        plusSlides(1);
        plusInfoSlides(1);
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('backing'), {
        center: {
            lat: -34.397,
            lng: 150.644
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
            console.log(pos);
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

