document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("enter your name");

  if (yourName == null || yourName == "") {
    document.querySelector(".info-container span").innerHTML = `Unkown`;
  } else {
    document.querySelector(".info-container span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
  window.localStorage.setItem("name",yourName)
  starttimer();
};
let win = document.querySelector(".wining");
let lossing = document.querySelector(".loss");
let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocksGm = Array.from(blocksContainer.children);

const playAgain1 = document.querySelector(".play-again1");
const playAgain2 = document.querySelector(".play-again2");
playAgain1.addEventListener("click", restart);
playAgain2.addEventListener("click", restart);

let orderRang = [...Array(blocksGm.length).keys()];
shuffel(orderRang);

blocksGm.forEach((block, index) => {
  block.style.order = orderRang[index];
  block.addEventListener("click", function () {
    flipBlock(block);
    winingbord();
  });
});

function flipBlock(slectedblock) {
  slectedblock.classList.add("is-flipped");

  let filppedBlocks = blocksGm.filter((fillped) =>
    fillped.classList.contains("is-flipped")
  );

  if (filppedBlocks.length == 2) {
    stopclicking();
    checkmatch(filppedBlocks[0], filppedBlocks[1]);
  }
}

function stopclicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkmatch(firstblock, secondblock) {
  let tries = document.querySelector(".tries span");

  if (firstblock.dataset.technology === secondblock.dataset.technology) {
    firstblock.classList.remove("is-flipped");
    secondblock.classList.remove("is-flipped");
    firstblock.classList.add("has-match");
    secondblock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    setTimeout(() => {
      firstblock.classList.remove("is-flipped");
      secondblock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    window.localStorage.setItem("tries",tries.innerHTML)
  }
}

function shuffel(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }
  return array;
}
// timer
let mytimer = document.querySelector(".timer");
let minuts = 3;
let seconds = 60;

function winingbord() {
  let i = 0;
  let y = 0;
  for (; i < blocksGm.length; i++) {
    if (blocksGm[i].classList.contains("has-match")) {
      y += 1;
      if (y === blocksGm.length) {
        console.log("the game is finished");
        win.classList.add("finish");
      }
    }
  }
}

function starttimer(settimefun) {
  settimefun = setInterval(function getstart() {
    seconds--;
    if (parseInt(seconds) < 0) {
      seconds = 59;
      minuts--;
    }
    function stoptimer() {
      clearInterval(settimefun);
    }
    seconds <= 9 ? (seconds = "0" + seconds) : seconds;
    mytimer.innerHTML = `${minuts}:${seconds}`;
    if (+seconds == 0 && minuts == 0) {
      stoptimer();
      lossing.classList.add("finish");
    }
    if (win.classList.contains("finish")) {
      stoptimer();
    }
  }, duration);
}

function restart() {
location.reload();
}
