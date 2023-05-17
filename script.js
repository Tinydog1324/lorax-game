var score = 0;
var gameRunning = false;
var gameInterval;
var playerSize = 30;
var winningScore = 100;


document.addEventListener('keydown', movePlayer);


function movePlayer(event) {
    var player = document.getElementById('player');
    var currentLeft = parseInt(player.style.left) || 0;
    var currentBottom = parseInt(player.style.bottom) || 0;
  
    var moveDistance = 20;
    var gameBoardWidth = 1300;
    var gameBoardHeight = 500;
    var playerWidth = 30;
    var playerHeight = 30;
  
    if (event.key === 'ArrowUp') {
      if (currentBottom + moveDistance + playerHeight <= gameBoardHeight) {
        player.style.bottom = currentBottom + moveDistance + 'px';
      }
    } else if (event.key === 'ArrowDown') {
      if (currentBottom - moveDistance >= 0) {
        player.style.bottom = currentBottom - moveDistance + 'px';
      }
    } else if (event.key === 'ArrowLeft') {
      if (currentLeft - moveDistance >= 0) {
        player.style.left = currentLeft - moveDistance + 'px';
      }
    } else if (event.key === 'ArrowRight') {
      if (currentLeft + moveDistance + playerWidth <= gameBoardWidth) {
        player.style.left = currentLeft + moveDistance + 'px';
      }
    }

    // Check for collision with bad guy
  var badGuys = document.getElementsByClassName('bad-guy');
  for (var i = 0; i < badGuys.length; i++) {
    if (checkCollision(player, badGuys[i])) {
      var points = getRandomNumber(-10, -5);
      updateScore(points);
      badGuys[i].remove();
    }
  }
  }



// Function to update the score
function updateScore(points) {
  score += points;
  if (score < 0) {
    score = 0; // Set score to 0 if it goes below 0
  }
  
  document.getElementById('score').textContent = 'Score: ' + score;
  if (score >= winningScore) {
    stopGame();
    showWinningText();
  }
}

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check collision between the player and tree images
function checkCollision(player, tree) {
  var playerRect = player.getBoundingClientRect();
  var treeRect = tree.getBoundingClientRect();
 

  return (
    playerRect.left < treeRect.right &&
    playerRect.right > treeRect.left &&
    playerRect.top < treeRect.bottom &&
    playerRect.bottom > treeRect.top 
  
  );
}

// Function to handle hitting a bad guy
function hitBadGuy() {
    var player = document.getElementById('player');
    var badGuys = document.getElementsByClassName('bad-guy');
  
    for (var i = 0; i < badGuys.length; i++) {
      if (checkCollision(player, badGuys[i])) {
        var points = getRandomNumber(-10, -5);
        updateScore(points);
        badGuys[i].remove();
      }
    }
  }

  // Function to randomly generate bad guy images
function generateBadGuys() {
    if (!gameRunning) return;
  
    var playerArea = document.getElementById('game-board');
    var playerAreaRect = playerArea.getBoundingClientRect();
    var badGuyImage = 'badguy.png';
  
    for (var i = 0; i < 2; i++) {
      var badGuy = document.createElement('img');
      badGuy.src = badGuyImage;
      badGuy.className = 'bad-guy';
      badGuy.style.position = 'absolute';
      badGuy.style.width = '130px';
      badGuy.style.height = '130px';
      badGuy.style.left =
        getRandomNumber(playerAreaRect.left, playerAreaRect.right - 30) + 'px';
      badGuy.style.bottom =
        getRandomNumber(playerAreaRect.bottom, playerAreaRect.top - 30) + 'px';
      playerArea.appendChild(badGuy);
    }
  }
  

// Function to handle hitting a tree image
function hitTree() {
  var player = document.getElementById('player');
  var trees = document.getElementsByClassName('tree');

  for (var i = 0; i < trees.length; i++) {
    if (checkCollision(player, trees[i])) {
      var points = getRandomNumber(10, 20);
      updateScore(points);
      trees[i].remove();
    }
  }
}

// Function to randomly generate tree images
function generateTrees() {
  if (!gameRunning) return;

  var playerArea = document.getElementById('game-board');
  var playerAreaRect = playerArea.getBoundingClientRect();
  var treeImage =
    'tree.png';

  var tree1 = document.createElement('img');
  tree1.src = treeImage;
  tree1.className = 'tree';
  tree1.style.position = 'absolute';
  tree1.style.width = '100px';
  tree1.style.height = '100px';
  tree1.style.left =
    getRandomNumber(playerAreaRect.left, playerAreaRect.right - 30) + 'px';
  tree1.style.bottom =
    getRandomNumber(playerAreaRect.bottom, playerAreaRect.top - 30) + 'px';
  playerArea.appendChild(tree1);

  var tree2 = document.createElement('img');
  tree2.src = treeImage;
  tree2.className = 'tree';
  tree2.style.position = 'absolute';
  tree2.style.width = '100px';
  tree2.style.height = '100px';
  tree2.style.left =
    getRandomNumber(playerAreaRect.left, playerAreaRect.right - 30) + 'px';
  tree2.style.bottom =
    getRandomNumber(playerAreaRect.bottom, playerAreaRect.top - 30) + 'px';
  playerArea.appendChild(tree2);
}

// Function to start the game
function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  gameInterval = setInterval(generateTrees, 4000);
  gameInterval2= setInterval(generateBadGuys,2000);
}

// Function to stop the game
function stopGame() {
  clearInterval(gameInterval);
  gameRunning = false;
}


// Function to restart the game
function restartGame() {
  var gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  score = 0;
  gameRunning = false;
  clearInterval(gameInterval);
  document.getElementById('score').textContent = 'Score: ' + score;

  startGame();
}


// Event listener for hitting a tree
document.addEventListener('keydown', hitTree);

// Event listener for hitting a bad guy
document.addEventListener('keydown', hitBadGuy);

// Event listener for start game button
document.getElementById('start-button').addEventListener('click', startGame);

// Event listener for stop game button
document.getElementById('stop-button').addEventListener('click', stopGame);
