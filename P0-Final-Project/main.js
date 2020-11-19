let score = 0;

function startGame() {
  document.getElementById("splash").style.visibility = "hidden" // hide splash screen
  document.getElementById("container").style.visibility = "visible" // make game area visible
  setInterval(fallingTrash, 500)
}

// trash randomly changes y-position as it falls to the ground
//function fallingTrash() {
//let trash = document.getElementById("animatedTrash")
//let spaceH = screen.width - trash.width
//trash.style.left = Math.round(Math.random() * spaceH) + "px"
//}


function hover(element) {
  element.setAttribute('src', 'img/oscar-anim3.png')
}

function unhover(element) {
  element.setAttribute('src', 'img/oscar-anim1.png')
}
