randomButton = () => {
  let image = $('<div><img src=clicker.gif></div>');
  let yCoord = Math.floor((Math.random() * $(window).height) + 0);
  let xCoord = Math.floor((Math.random() * $(window).width) + 0);
  document.getElementById('map').append(image);
  image.css("left", xCoord);
  image.css("top", yCoord);
}

// setInterval(randomButton, 1000)
