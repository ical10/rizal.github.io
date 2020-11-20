let score = 0;

function openGameArea() {
  document.getElementById("splash").style.visibility = "hidden" // hide splash screen
  document.getElementsByClassName("container").style.visibility = "visible" // make game area visible
  document.getElementById("StartButton").addEventListener("click", countdown)
}

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function randomizeBinary() {
  return Math.round(Math.random())
}

function hover(element) {
  element.setAttribute('src', 'img/oscar-anim3.png')
}

function unhover(element) {
  element.setAttribute('src', 'img/oscar-anim1.png')
}

function setFallingTrash() {
  if (randomizeBinary()) {
    return "img/Sneaker.png"
  } else {
    return "img/paperTrash.png"
  }
}

// Function to handle the trash (declaration, randomisation, animation, removal)
function fallingTrash() {
  let length = random(10, ($(".container").width() - 100))
  size = 50
  let velocity = random(700, 9000)
  let theBox = $("<div/>", { // create a new div box with randomised spawn position and speed
    class: "box",
    style: "width:" + size + "px; height:" + size + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
  })

  // set background image inside the div-box with trash sprites
  theBox.data("test", randomizeBinary())
  if (theBox.data("test")) {
    theBox.css({
      "background": "url('img/Sneaker.png')",
      "background-size": "contain"
    })
  } else {
    theBox.css({
      "background": "url('img/paperTrash.png')",
      "background-size": "contain"
    })
  }

  // insert the div-box element into container
  $(".container").append(theBox)

  // random y-direction animation for the div-box element
  setTimeout(function () {
    theBox.addClass("move")
  }, random(0, 5000))

  console.log($(".container"))

  // remove div-box element when animation is over
  theBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
    function () {
      $(this).remove()
    })
}

for (let i = 0; i < 10; i++) {
  fallingTrash()
}

$(document).on('click', '.box', function () {

  if ($(this).data("test")) {
    score -= 1  // score -1 if you click on the expensive sneakers!
  } else {
    score += 1 // score +1 if you click on the trash
  }
  $(".score").html(score)
  $(this).remove()
})

//start game by making trash falling every 5000 ms over 10 loops

document.getElementById("StartButton").addEventListener("click", countdown)
let startGame = setInterval(function () {
  for (let i = 0; i < 10; i++) {
    fallingTrash()
  }
}, 5000)

// start countdown

//let seconds = 60
//let counters = setInterval(countdown, 1000)

function countdown() {
  let seconds = 60
  function tick() {
    let counter = document.getElementById("counter")
    seconds--
    counter.innerHTML = (seconds < 10 ? "0" : "") + seconds.toString() + "S"
    if (seconds > 0) {
      setTimeout(tick, 1000)
    } else {
      alert(`Time is over! Your score is ${score}. Thank you for playing!`)
      clearInterval(startGame)
    }
  }
  tick()
}



// Problem: counter runs automatically
// Features to add: music when game starts and don't repeat
// showing your score in a refreshed page with stylised h1
// 

//trash randomly changes y - position as it falls to the ground
//function fallingTrash() {
//let trash = document.getElementById("animatedTrash")
//let spaceH = screen.width - trash.width
//trash.style.left = Math.round(Math.random() * spaceH) + "px"
//}


