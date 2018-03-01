// let autoPower = 0;
// let clickValue = 0;

// let counter = () => {
//   clickValue++
//   document.getElementsByClassName('count')[0].innerHTML = 'Total Power: ' + clickValue;
// };

let on = () => {
    document.getElementById("overlay").style.display = "block";
};

let off = () => {
    document.getElementById("overlay").style.display = "none";
};

let disappear = (id) => {

  document.getElementById(id).style.display = "none";
};

let month = 1;
let year = 2017;
let timer = 120;

let monthCount = () => {
   if (month === 12) {
      month = 1,
      year  = year + 1;
   } else {
     month = month + 1;
   }
   document.getElementById('date').innerHTML = month + " - " + year;
};

setInterval(monthCount, 1000);

// timer--,
// document.getElementById('timer').innerHTML = timer;,
