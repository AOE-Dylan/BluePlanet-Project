      document.getElementById('settings').addEventListener("click", function(){
      document.getElementById('box').style.display = "block";
      document.getElementById('background').style.filter = "blur(3px)";
});


    $('#boxclose').click(function(){
      document.getElementById('box').style.display = "none";
      document.getElementById('background').style.filter = "blur(0px)";
});
