let autoPower = 0;
let clickValue = 0;

let counter = () => {
  clickValue++
  document.getElementsByClassName('count')[0].innerHTML = 'Total Power: ' + clickValue;
};

let on = () => {
    document.getElementById("overlay").style.display = "block";
};

let off = () => {
    document.getElementById("overlay").style.display = "none";
};

let pulse = () => {
  document.getElementById('bubble').style.opacity = 1;
};

setInterval(pulse, 1000);

let pulse1 = () => {
  document.getElementById('bubble').style.opacity = 0.8;
};

setTimeout(pulse1, 1000);
setInterval(pulse1, 1000);

 let appear = () => {



 };

setInterval(appear, 2000);

let disappear = () => {



};

setInterval(disappear, 5000);

let amnt = 0;

 let addPower = () => {
   amnt = amnt + 20;
   document.getElementById('pb').style.backgroundSize = "50px" + amnt + "px";
   console.log(amnt);
 };

// let month = 1;
// let year = 2017;
//
// setInterval(monthCount, 8000);
//
// let monthCount = () => {
//   month++;
//   if (month === 12) {
//     month = 0;
//   };
//   document.getElementById('month').innerHTML = month;
// };
