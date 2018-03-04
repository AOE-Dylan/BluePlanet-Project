xCoord = () => {
  return Math.floor(Math.random() * $(".test").height() - 20)
}

yCoord = () => {
  return Math.floor(Math.random() * $(".test").width() - 20)
}

let images = ["styles/lightningBallBad.gif", "styles/lightningBallGood.gif"];

randomImg = () => {
  return (Math.floor(Math.random() * images.length) + 0)
}

randomButton = () => {
  let randX = xCoord();
  let randY = yCoord();
  let randNum = randomImg();
  $('#map').append($(`<img class="bubble" src="${images[randNum]}" style="top:` + randX + `px; left:` + randY + `px;" >`));
}

var bubbleGenerate;
var gameStart = 0;
var background = document.getElementById('background')
var startButton = document.getElementById('startButton')
var settings = document.getElementById('settingsButton');
var settingsMenu = document.getElementById('settingsMenu');
var information = document.getElementById('informationButton');
var informationMenu = document.getElementById('informationMenu');

startButton.addEventListener("click", function() {
    var bubbleGenerate =  setInterval(randomButton, 1000);
    console.log('Game Started');
    var gameStart = 1;

    settings.addEventListener("click", function() {
      clearInterval(bubbleGenerate);
      console.log('Stopped Generating');
    });

    $('.menuClose').click(function() {
      if(gameStart == 1){
        var bubbleGenerate = setInterval(randomButton, 1000);
        console.log('Menu Closed, Starting Generating');
      };

    });

    information.addEventListener("click", function() {
      clearInterval(bubbleGenerate);
      console.log('Information Menu Opeened, Stopped Generating');
    });

    });

settings.addEventListener("click", function() {
    settingsMenu.style.display = "block";
    background.style.filter = "blur(15px)";

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
    background.style.filter = "blur(15px)";

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
    settingsMenu.style.display = "none";
  });

$('.menuClose').click(function() {
    background.style.filter = "blur(0px)";
    informationMenu.style.display = "none";
});

$('#changeatt').click(function(){
    $('#renewableProgress').css('height', $('#renewableProgress').height() + 5);
    $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() + 5);
});
