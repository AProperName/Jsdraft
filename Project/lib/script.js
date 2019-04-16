//DOM variables
let gameName = document.getElementById("gameName");
    author = document.getElementById("author"),
    intro = document.getElementById("intro"),
    startButton = document.getElementById("startButton"),
    hitButton = document.getElementById("hitButton"),
    stayButton = document.getElementById("stayButton"),
    rulesButton = document.getElementById("rulesButton");
    backButton = document.getElementById("backButton");
    //settingButton = document.getElementById("settingButton");

//Cards variables
let suits = ['Heart', 'Diamonds', 'Clubs', 'Spades'],
    values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    playerDraw = false,
    playerPerfect = false,
    dealerPerfect = false,
    playerCharlie = false,
    dealerCharlie = false,
    dealerCards =[],
    playerCards =[],
    dealerScore = 0,
    playerScore = 0,
    deck = [];


function createDeck(){
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length;suitIdx++)
  {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++)
    {
      let card = {
        suit : suits[suitIdx],
        value : values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}
function getCardString(card){
  return card.value + " of " + card.suit;
}
function shuffleDeck(deck){
  for (let i = 0; i < deck.length; i++)
  {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let temp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = temp;
  }
}

function getNextCard(){
  return deck.shift();
}
function updateScore(){
  playerScore = getScore(playerCards);
  dealerScore = getScore(dealerCards);
}
function getScore(cardsDealt){
  let score = 0, hasAce = false;
  for ( let i = 0 ; i < cardsDealt.length; i++)
  {
    let card = cardsDealt[i];
    score += getCardNumericValue(card);
    if (card.value === "Ace")
    hasAce = true;
  }
  if (hasAce && score + 10 <= 21)
  return score + 10;
  return score;
}
function getCardNumericValue(card){
  switch (card.value){
      case "Ace":
      return 1;
      break;
      case "Two":
      return  2;
      break;
      case "Three":
      return 3;
      break;
      case "Four":
      return 4;
      break;
      case "Five":
      return 5;
      break;
      case "Six":
      return 6;
      break;
      case "Seven":
      return 7;
      break;
      case "Eight":
      return 8;
      break;
      case "Nine":
      return 9;
      break;
      default:
      return 10;
    }
}
function checkForGameOver(){
  updateScore();
  if (gameOver)
  while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21)
  {
    dealerCards.push(getNextCard());
    updateScore();
    if (dealerCards.length === 5 && dealerScore === 21)
    {
      dealerCharlie = true;
      playerWon = false;
    }
  }
  if (playerScore > 21)
  {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21)
  {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver)
  {
    if (playerScore > dealerScore)
    playerWon = true;
    else if (playerScore < dealerScore)
    playerWon = false;
    else
    playerDraw = true;
  }
}
function showStatus(){
  if (!gameStarted)
  {
    intro.innerText = "Welcome to Black Jack!";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
    startButton.style.display = "inline";
    return;
  }
    let dealerCardString = '';
    for ( let i = 0; i < dealerCards.length; i++)
      dealerCardString += getCardString(dealerCards[i]) + '\n';
    let playerCardString = '';
    for ( let i = 0; i < playerCards.length; i++)
      playerCardString += getCardString(playerCards[i]) + '\n';
    updateScore();
    intro.innerText = 
    'Dealer has :\n' + dealerCardString
    + '(total score: '+ dealerScore + ')\n\n' +
    'Player has :\n' + playerCardString
    + '(total score: ' + playerScore + ')\n\n';
    if (playerCards.length === 2 && playerScore === 21){
      playerPerfect = true;
      gameOver = true;
    }
    if (dealerCards.length === 2 && dealerScore === 21)
    {
      dealerPerfect = true;
      gameOver = true;
    }
    if (playerCards.length === 5 && playerScore <= 21)
    {
      playerCharlie = true;
      playerWon = true;
      gameOver = true;
    }
    if (gameOver)
    {
      if (playerPerfect && dealerPerfect)
      intro.innerText += "\n\nTwo perfect hands. A rare draw!";
      else if (playerPerfect)
      intro.innerText += "\n\nPERFECT HAND!!! YOU WIN!";
      else if (dealerPerfect)
      intro.innerText += "\n\nDEALER WINS BY PERFECT HAND!!!";
      else if (playerCharlie){
      intro.innerText += "\n\nYou win by Charlie rule! Congratulation!"
      }
      else if (dealerCharlie)
      {
        intro.innerText += "\n\nCharlie rule favors the dealer, unfortunately."
      }
      else if (playerWon)
      intro.innerText += "\n\nCongratulation! You win!";
      else if (!playerWon && !playerDraw)
      intro.innerText += "\n\nDealer wins! Better luck next time!";
      else
      intro.innerText += "\n\nIt's a draw! You might want a rematch."
      startButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';
      gameStarted = false;
    }
}

hitButton.style.display = "none";
stayButton.style.display = "none";
backButton.style.display = "none";
showStatus();
startButton.addEventListener('click', function()
{
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  playerDraw = false;
  playerPerfect = false;
  dealerPerfect = false;
  playerCharlie = false;
  dealerCharlie = false;
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  intro.innerText = "Started...";
  startButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  backButton.style.display = "none";
  showStatus();
});
hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForGameOver();
  showStatus();
});
stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForGameOver();
  showStatus();
});
rulesButton.addEventListener('click', function(){
  let goal = "finish with a higher total than the dealer, without exceeding 21";
  intro.innerText = " In standard blackjack casino rules, all players face off against the dealer. Two cards are dealt to each player and two to the dealer. Each player can then choose to receive extra cards or accept the hand as it is. In order to win a hand, players must "+goal.bold()+" – or \“busting\”. Another way for the player to win is to have a hand of 21 or less, while the dealer busts. A perfect hand, combining an ace with a 10, Jack, Queen or King, scores 21 and is known as blackjack."
  rulesButton.style.display = "none";
  backButton.style.display = "inline";
  startButton.style.display = "none";
  hitButton.style.display = "none";
  stayButton.style.display = "none";
  
});
backButton.addEventListener('click', function(){
  rulesButton.style.display = "inline";
  backButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  showStatus();
});

