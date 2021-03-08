let score = 0;
let oscarHeySound;
let isTrash = true;

function openGameArea() {
  document.getElementById("splash").style.visibility = "hidden" // hide splash screen
  //document.getElementByClassName("container").style.visibility = "visible" // make game area visible
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
  oscarHeySound = new oscarHey("wav/Hello.wav")
  oscarHeySound.play() //make Oscar says hello!
}

function unhover(element) {
  element.setAttribute('src', 'img/oscar-anim1.png')
}

function oscarHey(src) {
  this.sound = document.createElement("audio")
  this.sound.src = src
  this.sound.setAttribute("preload", "auto")
  this.sound.setAttribute("controls", "none")
  this.sound.style.display = "none"
  document.body.appendChild(this.sound)
  this.play = function () {
    this.sound.play()
  }
  this.stop = function () {
    this.sound.pause()
  }
}

//function setFallingTrash() {
//if (randomizeBinary()) {
//return "img/goldbarSuisse.jpeg"
//} else {
//return "img/paperTrash.png"
//}
//}

// helper function for setting several attributes
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}

// Function to handle the trash (declaration, randomisation, animation, removal)
function fallingTrash() {
  let length = String(random(10, (document.querySelector(".container").offsetWidth - 100))) + "px"
  size = "20px"
  let velocity = String(random(700, 9000)) + "ms"

  let theBox = document.createElement('div') // create a new div element

  theBox.classList.add("box") // adding class="box" to div

  setAttributes(theBox, {"position": "relative", "width": size, "height": size, "left": length, "transition-property": "all", "transition-duration": velocity, "transition-timing-function": "linear"})
  // how to add `transform `

  // set several attributes at once
  //theBox.setAttribute("width", size)
  //theBox.setAttribute("height", size)
  //let theBox = $("<div/>", { // create a new div box with randomised spawn position and speed
  //class: "box",
  //style: "width:" + size + "px; height:" + size + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
  //})

  // set background image inside the div-box with trash sprites
  let ranVar = randomizeBinary()
  if (ranVar) {
    theBox.style.backgroundImage = "url(img/goldbarSuisse.png)"
    setAttributes(theBox, {
      //"background-image": "url(img/goldbarSuisse.jpeg)",
      "background-size": "100 % 100 %",
      "background-repeat": "no-repeat"
    })
  } else {
    theBox.style.backgroundImage = "url(img/paperTrash.png)"
    setAttributes(theBox, {
      //"background-image": "url(img/paperTrash.png)",
      "background-size": "100 % 100 %",
      "background-repeat": "no-repeat"
    })
  }

  // jQuery part
  //theBox.data("test", randomizeBinary())
  //if (theBox.data("test")) {
  //theBox.css({
  //"background": "url('img/goldbarSuisse.jpeg')",
  //"background-size": "contain"
  //})
  //} else {
  //theBox.css({
  //"background": "url('img/paperTrash.png')",
  //"background-size": "contain"
  //})
  //}

  // insert the div-box element into container
  document.querySelector(".container").appendChild(theBox)

  // jQuery equivalent
  //$(".container").append(theBox)

  // random y-direction animation for the div-box element
  setTimeout(function () {
    theBox.classList.add("move")
  }, random(0, 5000))

  // remove div-box element when animation is over
  theBox.addEventListener("transitionend",
    function () {
      theBox.remove()
    })

  //theBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
  //function () {
  //$(this).remove()
  //})
}

for (let i = 0; i < 10; i++) {
  fallingTrash()
}

document.getElementById("container").addEventListener('click', function (e) {

  if (e.target && e.target.className === "box") {
    score += 1  // score +1 if you click on the paper trash
  } else {
    score -= 1 // score -1 if you click on the gold bar (n.a. yet) 
  }
  document.getElementById("score").innerHTML = score
  theBox.remove()
})

//$(document).on('click', '.box', function () {
//if ($(this).data("test")) {
//score -= 1  // score -1 if you click on the expensive sneakers!
//} else {
//score += 1 // score +1 if you click on the trash
//}
//$(".score").html(score)
//$(this).remove()
//})

//start game by making trash falling every 5000 ms over 10 loops

document.getElementById("StartButton").addEventListener("click", countdown)
let startGame = setInterval(function () {
  for (let i = 0; i < 10; i++) {
    fallingTrash()
  }
}, 5000)

// start countdown
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


