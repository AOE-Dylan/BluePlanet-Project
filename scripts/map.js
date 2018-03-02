xCoord = () => {
  return Math.floor(Math.random() * $(".test").height() - 20)
}

yCoord = () => {
  return Math.floor(Math.random() * $(".test").width() - 20)
}

let images = ["styles/lightningBallBad.gif", "styles/lightningBallGood.gif"];

randomImg = () => {
  return (Math.floor(Math.random() * images.length) + 0)
}

randomButton = () => {
  let randX = xCoord();
  let randY = yCoord();
  let randNum = randomImg();
  console.log( $("#container").availHeight)
  $('#map').append($(`<img class="bubble" src="${images[randNum]}" style="top:` + randX + `px; left:` + randY + `px;" >`));
}

startGame = () => {
  setInterval(randomButton, 300)
}
