var click = 0;
var background = document.getElementById('background')
var settings = document.getElementById('settingsButton');
var settingsMenu = document.getElementById('settingsMenu');
var information = document.getElementById('informationButton');
var informationMenu = document.getElementById('informationMenu');

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
