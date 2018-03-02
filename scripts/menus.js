$(function() {
    $('#settings').click(function(){
      document.getElementById('settings').addEventListener("click", function(){
      document.getElementById('box').style.display = "block";
});
        });
        return false;
    });

    $('#boxclose').click(function(){
      document.getElementById('box').style.display = "none";
});
