let min = 0;
let sec = 5;

let popUp = () => {

    renewableProgress.style.height = "0px";
    nonRenewableProgress.style.height = "0px";

    timerFail.style.display = "block";
    pauseButton.style.display = "none";
    notMap.style.display = "none";
    background.style.filter = "blur(60px)";

    let div = document.createElement("DIV");
    div.id = "map";
    let newMap = document.getElementById('background').appendChild(div);
};

let countdown = () =>  {
  if (min === 0 && sec === 0) {
    gameActive = 0;
    clearInterval(bubbleGenerate);
    clearInterval(timer);
    $("#map").remove();
    popUp();
    console.log('Timer Ran out');
  } else if (sec === 0) {
    min = min - 1;
    sec = 59;
    document.getElementById('timer').innerHTML = min + ":" + sec;
  } else if (min === 0) {
    sec = sec - 1;
    document.getElementById('timer').innerHTML = ":" + sec;
  } else if (min === 1 && sec < 10) {
      sec = sec - 1;
      document.getElementById('timer').innerHTML = min + ":0" + sec;
  } else if (min === 0 && sec < 10) {
      sec = sec - 1;
      document.getElementById('timer').innerHTML = ":0" + sec;
  } else {
    sec = sec - 1;
    document.getElementById('timer').innerHTML = min + ":" + sec;
  }
};

// let month = 1;
// let year = 2017;
//
//
// let monthCount = () => {
//    if (month === 12) {
//       month = 1,
//       year  = year + 1;
//    } else {
//      month = month + 1;
//    }
//    document.getElementById('date').innerHTML = month + " - " + year;
// };
//
// setInterval(monthCount, 1000);
