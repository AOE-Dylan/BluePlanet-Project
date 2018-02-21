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

let random_imglink = () => {
  let myimages=new Array()
  //specify random images below. You can have as many as you wish
  myimages[1]="image1.gif"
  myimages[2]="image2.gif"
  myimages[3]="image3.gif"
  myimages[4]="image4.gif"
  myimages[5]="image5.gif"
  myimages[6]="image6.gif"

  let ry=Math.floor(Math.random()*myimages.length)
  if (ry==0)
  ry=1
  document.write('<img src="'+myimages[ry]+'" border=0>')
}
random_imglink();
