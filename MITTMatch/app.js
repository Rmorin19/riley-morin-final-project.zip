// Shuffle function from http://stackoverflow.com/a/2450976
// let shuffle = function (array) {
//   let currentIndex = array.length,
//     temporaryValue,
//     randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// };

const images = [
  "fa-atom",
  "fa-frog",
  "fa-feather-alt",
  "fa-cogs",
  "fa-anchor",
  "fa-fan",
  "fa-bolt",
  "fa-hat-wizard",
  "fa-apple-alt",
  "fa-bell",
  "fa-bomb",
  "fa-brain",
];
function shuffle(array) {
  let shuffled = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
}

const matchingCard = shuffle(images);
const cardImages = shuffle(images);

// // reset the game when the reset button is hit
// // reveal card when clicked: only revel one at a time
// // add to score when card is clicked, don't add when a revealed card or matched card is clicked
// // card turns back over after a set period if it doesn't match
// // once all the cards have been matched send an alert

const gameState = {
  boxes: [
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
    {
      image: 0,
      shown: false,
      match: false,
    },
  ],
  nextCard: [1, 12],
  score: 0,
  finished: 0,
};

function render(gameState) {
  const newImage = document.querySelectorAll(".card i");
  const cardState = document.querySelectorAll("li");
  const cardForMatch = document.getElementById("next-cards");

  for (let i = 0; i < gameState.boxes.length; i++) {
    for (let x = 0; i < gameState.boxes.length; i++) {
      newImage[i].classList.remove(cardImages[x]);
    }
  }
  for (let i = 0; i < gameState.boxes.length; i++) {
    newImage[i].classList.add(cardImages[i]);
    if (gameState.boxes[i].shown === true) {
      cardState[i].classList.add("show");
    } else {
      cardState[i].classList.remove("show");
    }
    if (gameState.boxes[i].match === true) {
      cardState[i].classList.add("matched");
    }

    if (gameState.boxes[i].match === true) {
      finished++;
    }
  }

  document.getElementById("score").textContent = gameState.score;

  if (gameState.finished === 12) {
    handleWin();
  }
}

function restart() {
  for (let i = 0; i < gameState.boxes.length; i++) {
    gameState.boxes.image = 0;
    gameState.boxes.shown = false;
    gameState.boxes.matched = false;
  }
  gameState.nextCard = 1;
  gameState.score = 0;
  finished = false;

  render(gameState);
}

function handleWin() {
  alert(`You won the game in ${gameState.score} clicks`);
}

function handleClick(event) {
  const currentBox = event.target;
  currentBox.classList.add("show");

  const remove = setTimeout(() => {
    removeShow(currentBox);
  }, 500);

  gameState.score++;
}

function removeShow(click) {
  click.classList.remove("show");

  render(gameState);
}

function match(event) {
  event.target.classList.add("matched");
  gameState.boxes[event.target].match = true;
}

render(gameState);

document.querySelector("div.restart").addEventListener("click", restart);
document.getElementById("cards").addEventListener("click", handleClick);
document.getElementById("cards").addEventListener("dblclick", match);
document.addEventListener("keypress", handleWin);
restart();
