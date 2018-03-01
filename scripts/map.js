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
  $('#map').append($(`<img src="${images[randNum]}" style="position:absolute; top:` + randX + `px; left:` + randY + `px; width: 20px; height: 20px; border-radius: 30px;" >`));
}

startGame = () => {
  setInterval(randomButton, 0000)
}

startGame();
