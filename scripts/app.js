let on = () => {
    document.getElementById("overlay").style.display = "block";
};

let off = () => {
    document.getElementById("overlay").style.display = "none";
};

let disappear = (id) => {

  document.getElementById(id).style.display = "none";
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
let min = 2;
let sec = 0;


let timer = () =>  {
  if (min === 0 && sec === 0) {
    document.getElementById('timer').innerHTML = 0;
    clearInterval(bubbleGenerate);
    clearInterval(timer);
    on();
  } else if (sec === 0) {
    min = min - 1;
    sec = 59;
    document.getElementById('timer').innerHTML = min + ":" + sec;
  } else if (min === 0) {
    sec = sec - 1;
    document.getElementById('timer').innerHTML = ":" + sec;
  } else {
    sec = sec - 1;
    document.getElementById('timer').innerHTML = min + ":" + sec;
  }
};
