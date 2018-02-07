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

let auto = () => {
  clickValue = clickValue + autoPower;
  document.getElementsByClassName('count')[0].innerHTML = 'Total Power: ' + clickValue;
  console.log(clickValue);
};

setInterval(auto, 1000);

let addPower = () => {
  autoPower++
  document.getElementsByClassName('pps')[0].innerHTML = "Power Per Second: " + autoPower;
  console.log(autoPower);
};

let month = 1;
let year = 2017;

setInterval(monthCount, 8000);

let monthCount = () => {
  month++;
  if (month === 12) {
    month = 0;
  };
  document.getElementById('month').innerHTML = month;
};
