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
startGame = () => {
  var bubbleGenerate =  setInterval(randomButton, 2000);
}

startGame();


var background = document.getElementById('background')
var settings = document.getElementById('settingsButton');
var settingsMenu = document.getElementById('settingsMenu');
var information = document.getElementById('informationButton');
var informationMenu = document.getElementById('informationMenu');

settings.addEventListener("click", function() {
    settingsMenu.style.display = "block";
    background.style.filter = "blur(15px)";
    clearInterval(bubbleGenerate);

    if(informationMenu.style.display == "block"){
      informationMenu.style.display = "none";
    }

    background.addEventListener('click', function() {
        settingsMenu.style.display = "none";
        background.style.filter = "blur(0px)";
    });

});


$('.menuClose').click(function() {
    background.style.filter = "blur(0px)";
    settingsMenu.style.display = "none";
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
    informationMenu.style.display = "none";
});

$('#changeatt').click(function(){
    $('#renewableProgress').css('height', $('#renewableProgress').height() + 5);
    $('#nonRenewableProgress').css('height', $('#nonRenewableProgress').height() + 5);
});
