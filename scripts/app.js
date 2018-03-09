let popUp = () => {
    document.getElementById("overlay").style.display = "block";
};

let min = 2;
let sec = 0;

let countdown = () =>  {
  if (min === 0 && sec === 0) {
    document.getElementById('timer').innerHTML = STOP;
    clearInterval(bubbleGenerate);
    clearInterval(countdown);
    popUp();
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
