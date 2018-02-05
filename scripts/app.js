let autoPower = 0;
let clickValue = 0;
let counter = () => {
  clickValue++
  document.getElementById('count').innerHTML = clickValue;
};

let on = () => {
    document.getElementById("overlay").style.display = "block";
};

let off = () => {
    document.getElementById("overlay").style.display = "none";
};
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

let auto = () => {
  return(clickValue + autoPower);
  console.log(clickValue);
};

let pps = setInterval(auto, 1000);

let addPower = () => {
  autoPower++
  document.getElementById('pps').innerHTML = "Power Per Second:" + autoPower;
  console.log(autoPower);
};

$(".service-title").on("click", ".service", function(e) {
    $(".service-container")
        .has($(".content:visible").add(this))
        .find(".service").toggle().end()
        .find(".content").slideToggle();

    e.preventDefault();
});
