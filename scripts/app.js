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
