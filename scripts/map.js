xCoord = () => {
  return Math.floor(Math.random() * window.innerWidth)
}

yCoord = () => {
  return Math.floor(Math.random() * window.innerHeight)
}

randomButton = () => {
  let randX = xCoord();
  let randY = yCoord();
  $('#map').append($('<img src="styles/lightningBallBad.gif" style="position:absolute; top:' + randX + 'px; left:' + randY + 'px; width: 20px; height: 20px; border-radius: 30px;" >'));
}

setInterval(randomButton, 1000)
