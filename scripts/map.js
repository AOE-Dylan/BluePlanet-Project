xCoord = () => {
  return Math.floor(Math.random() * $(".test").height() - 20)
}

yCoord = () => {
  return Math.floor(Math.random() * $(".test").width() - 20)
}

let images = ["styles/redbubble.jpg", "styles/greenbubble.jpg", "styles/greenbubble.jpg", "styles/greenbubble.jpg"];

let randomImg = () => {
  return (Math.floor(Math.random() * images.length) + 0)
}

addBarGood = () => {
  $('#renewableProgress').css('height', $('#renewableProgress').height() + 5);
}

addBarBad = () => {
  $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() + 5);
}

dictateBar = () => {
  if (this.src === "styles/greenbubble.jpg") {
    addBarBad()
  } else {
    addBarGood()
  }
}

let randomButton = () => {
  let randX = xCoord();
  let randY = yCoord();
  let randNum = randomImg();
  let id = document.getElementById('map').children;
  $('#map').append($(`<img class="bubble" id="${id.length}" onclick="dictateBar()" src="${images[randNum]}" style="top:` + randX + `px; left:` + randY + `px;" >`));
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


startButton.addEventListener("click", function() {
    bubbleGenerate = setInterval(randomButton, 1000);
    timer = setInterval(countdown, 1000);
    console.log('Game Started');
    gameStart = 1;
    gameActive = 1;
    startButton.style.display = "none";
    pauseButton.style.display = "block";

    pauseButton.addEventListener("click", function() {
      clearInterval(bubbleGenerate);
      clearInterval(timer);
      gameActive = 0;
      console.log('Pause Button Clicked, Stopped Generating');
      pauseButton.style.display = "none";
      resumeButton.style.display = "block";
    });

    resumeButton.addEventListener("click", function() {
      bubbleGenerate = setInterval(randomButton, 1000);
      gameActive = 1;
      console.log('Resume Button Clicked, Starting Generating');
      resumeButton.style.display = "none";
      gamePaused.style.display = "none";
      pauseButton.style.display = "block";
      background.style.filter = "blur(0px)";
    });


    settings.addEventListener("click", function() {
      clearInterval(bubbleGenerate);
      clearInterval(timer);
      gameActive = 0;
      console.log('Settings Menu Opened, Stopped Generating');
    });

    information.addEventListener("click", function() {
      clearInterval(bubbleGenerate);
      clearInterval(timer);
      gameActive = 0;
      console.log('Information Menu Opened, Stopped Generating');
    });

    background.addEventListener('click', function() {
      if(gameActive == 0 && gameStart == 1){
        bubbleGenerate = setInterval(randomButton, 1000);
        console.log('Menu closed upon background click, Starting Generating');
      }
    });

    $('.menuClose').click(function() {
      if(gameStart == 1){
        bubbleGenerate = setInterval(randomButton, 1000);
        console.log('Menu Closed, Starting Generating');
        gameActive = 1;
      };
    });
});

settings.addEventListener("click", function() {
    settingsMenu.style.display = "block";
    background.style.filter = "blur(40px)";

    if(informationMenu.style.display == "block"){
      informationMenu.style.display = "none";
    }

    background.addEventListener('click', function() {
        settingsMenu.style.display = "none";
        background.style.filter = "blur(0px)";
    });
});

information.addEventListener("click", function() {
    informationMenu.style.display = "block";
    background.style.filter = "blur(40px)";

    if(settingsMenu.style.display == "block"){
      settingsMenu.style.display = "none";
    }

    background.addEventListener('click', function() {
        informationMenu.style.display = "none";
        background.style.filter = "blur(0px)";
    });
});

$('.menuClose').click(function() {
    background.style.filter = "blur(0px)";
    informationMenu.style.display = "none";
    settingsMenu.style.display = "none";
});

$('#changeatt').click(function(){
    $('#renewableProgress').css('height', $('#renewableProgress').height() + 5);
    $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() + 5);
});
