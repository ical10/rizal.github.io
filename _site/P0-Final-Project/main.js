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

  // insert the div-box element into container
  document.querySelector(".container").appendChild(theBox)

  // random y-direction animation for the div-box element
  setTimeout(function () {
    theBox.classList.add("move")
  }, random(0, 5000))

  // remove div-box element when animation is over
  theBox.addEventListener("transitionend",
    function () {
      theBox.remove()
    })
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



// Problem: hard to implement some functionality using pure vanilla JS (e.g. click on object, random spawn)
// Features to add: music when game starts and don't repeat
// 



