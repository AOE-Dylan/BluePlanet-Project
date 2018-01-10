let clickValue = 0;
let counter = () => {
  clickValue++
  console.log(clickValue);
  document.getElementById('count').innerHTML = clickValue;
};
