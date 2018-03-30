let xCoord = () => {
    return Math.floor(Math.random() * $("#map").height() - 20)
}

let yCoord = () => {
    return Math.floor(Math.random() * $("#map").width() - 120)
}

let images = ["styles/redbubble.jpg", "styles/greenbubble.jpg", "styles/greenbubble.jpg", "styles/greenbubble.jpg"];

let randomImg = () => {
    return (Math.floor(Math.random() * images.length) + 0)
};

let addBarGood = () => {
    $('#renewableProgress').css('height', $('#renewableProgress').height() + 5);
};

let addBarBad = () => {
    $('#renewableProgress').css('height', $('#renewableProgress').height() + 15)
    $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() + 15);
};

dictateBar = () => {
    event.target.style.WebkitAnimation = null;
    event.target.style.display = "none";
    if (event.target.getAttribute("src") !== images[0]) {
        addBarGood()
        event.target.onclick = null;
    } else {
        addBarBad()
        event.target.onclick = null;
    }
}

let timeNum = () => {
    return (Math.floor(Math.random() * 8) + 4)
}

var timePassed = [];
var remaining = document.getElementById('map').children;


let randomButton = () => {
    let randX = xCoord();
    let randY = yCoord();
    let randNum = randomImg();
    let randTime = timeNum();
    $('#map').append($(`<img class="bubble" id="${remaining.length}" onclick="dictateBar()" src="${images[randNum]}" style="top:` + randX + `px; left:` + randY + `px; opacity: 1;" >`));
    let currBubble = $(`#` + `${remaining.length - 1}`)[0];
    // timePassed.push(parseInt(currBubble.id));
    if (currBubble.src !== images[0]) {
        currBubble.style.WebkitAnimation = "fading " + (randTime) + "s linear";
        currBubble.style.animationFillMode = "forwards";
    } else {
        currBubble.style.WebkitAnimation = "fading " + ((randTime) * 2) + "s linear";
        currBubble.style.animationFillMode = "forwards";
    }
};
//   for (var i = 0; i < timePassed.length; i++){
//     timePassed[i]++
//     if (remaining[i].src !== images[0] && timePassed[i] >= parseInt(remaining[i].id) + randTime){
//       $("#" + i)[0].style.opacity = 0;
//       $("#" + i)[0].onclick = null;
//     } else if (remaining[i].src == images[0] && timePassed[i] >= parseInt(remaining[i].id) + (randTime * 2)){
//       $("#" + i)[0].style.opacity = 0;
//       $("#" + i)[0].onclick = null;
//     }
//   }
// };


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
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


let bubbleGenerate;
let timer;
let gameStart = 0;
let gameActive = 0;
let background = document.getElementById('background');
let startButton = document.getElementById('startButton');
let pauseButton = document.getElementById('pauseButton');
let resumeButton = document.getElementById('resumeButton');
let settings = document.getElementById('settingsButton');
let settingsMenu = document.getElementById('settingsMenu');
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


zoomAnimation.addEventListener("animationend", AnimationListener, false);

$("#startZoom").click(function() {
    startZoom.style.display = "none";
    $('#beforeStart').addClass('animated zoomOut');
    $('#zoomAnimation').addClass('addZoom');
});

function AnimationListener() {
    notMap.style.display = "block";
    beforeStart.style.display = "none";
    $('#beforeStart').removeClass('animated zoomOut');
}

startButton.addEventListener("click", function() {
    $('#startButton').removeClass('animated infinite rubberBand');

    bubbleGenerate = setInterval(randomButton, 1000);
    timer = setInterval(countdown, 1000);

    gameStart = 1;
    gameActive = 1;

    startButton.style.display = "none";
    pauseButton.style.display = "block";
    settingsMenu.style.display = "none";
    informationMenu.style.display = "none";

    console.log('Game Started');
    console.log('gameActive is', gameActive);
    console.log(timer, "Timer countdown started");
    console.log(bubbleGenerate, "bubbleGeneration started");
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
    settingsMenu.style.display = "block";
    if (informationMenu.style.display == "block") {
        informationMenu.style.display = "none";
    }
});

information.addEventListener("click", function() {
    pause();
    gamePaused.style.display = "none";
    informationMenu.style.display = "block";
    if (settingsMenu.style.display == "block") {
        settingsMenu.style.display = "none";
    }
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
        for (var i = 0; i < remaining.length; i++) {
            remaining[i].style.webkitAnimationPlayState = "paused";
        }
    }
};

let resume = () => {
    if (gameStart == 1 & gameActive == 0) {
        bubbleGenerate = setInterval(randomButton, 1000);
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
        }
    }
};

$('.menuClose').click(function() {
    if (gameStart == 1 & gameActive == 0) {
        bubbleGenerate = setInterval(randomButton, 1000);
        timer = setInterval(countdown, 1000);
        console.log('Menu Closed, Starting Generating');
        pauseButton.style.display = "block";
        resumeButton.style.display = "none";
        background.style.filter = "blur(0px)";
        informationMenu.style.display = "none";
        settingsMenu.style.display = "none";
        gameActive = 1;
    } else {
      background.style.filter = "blur(0px)";
      informationMenu.style.display = "none";
      settingsMenu.style.display = "none";
    }
});

restart.addEventListener("click", function() {
    timerFail.style.display = "none";
    background.style.filter = "blur(0px)";
    startButton.style.display = "block";
    notMap.style.display = "block";

    let div = document.createElement("DIV");
    div.id = "map";
    let newMap = document.getElementById('background').appendChild(div);
    remaining = document.getElementById('map').children;
    sec = 5;
    document.getElementById('timer').innerHTML = sec;
    $('#startButton').addClass('animated infinite rubberBand');
});
