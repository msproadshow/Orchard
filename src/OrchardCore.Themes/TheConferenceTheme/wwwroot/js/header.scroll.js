// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
    $("#ts-int").css("margin-top","92px");
//    $("#ts-int").css("margin-top","80px");
    
  } else {
    
    header.classList.remove("sticky");
    $("#ts-int").css("margin-top","0px");
    
  }
}