$(document).ready(function () {
  window.cards = [10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  definePlayers();
  updateDisplay();
});

function definePlayers(){
  window.user = {
    cards: [],
    score: 0,
    bank: 100
  }
  window.dealer = {
    cards: [],
    score: 0
  }
  window.game = {
    status: "idle",
    bet: 0
  }
}

function placeBet(bet){
  if (window.game.state !== "idle"){
    resetBoard();
  }
  window.user.bank = window.user.bank - bet
  window.game.bet = bet
  dealFirstCards();
  startGame();
}

function dealFirstCards(){
  window.user.cards.push(drawCard())
  window.user.cards.push(drawCard())
  window.dealer.cards.push(drawCard())
};

function drawCard(){
  return window.cards.random()
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function updateScores(){
  window.dealer.score = window.dealer.cards.reduce(add)
  window.user.score = window.user.cards.reduce(add)
}

function add(accumulator, currentValue){
  return accumulator + currentValue
}

function updateState(){
  updateScores()
  updateDisplay()
  updateActions()
}

function updateDisplay() {
  $("#dealer-cards").html(window.dealer.cards.join(" · "));
  $("#dealer-score").html(window.dealer.score);
  $("#user-cards").html(window.user.cards.join(" · "));
  $("#user-score").html(window.user.score);
  $("#user-bank").html(window.user.bank);
  updateStatusBar();
}

function updateStatusBar() {
  hash = {
    idle: {class: "alert alert-dark", text: "faites vos jeux"},
    ongoing: {class: "alert alert-primary", text: "jeu en cours"},
    dealer: {class: "alert alert-primary", text: "le dealer joue"},
    won: {class: "alert alert-success", text: "gagné !"},
    lost: {class: "alert alert-danger", text: "perdu"},
    tie: {class: "alert alert-warning", text: "égalité"}
  };

  $("#status-bar").removeClass();
  $("#status-bar").addClass(hash[window.game.status].class);
  $("#status-bar").html(hash[window.game.status].text);
}

function updateActions(){
  if (window.game.status == 'ongoing'){
    $("#user-draws-card").removeClass("d-none")
    $("#user-skips").removeClass("d-none");
    $("#place-bet").addClass("d-none");
  } else {
    $("#user-draws-card").addClass("d-none");
    $("#user-skips").addClass("d-none");
    $("#place-bet").removeClass("d-none");
  }
}

function startGame() {
  window.game.status = "ongoing";
  updateState();
}

function userDrawsCard(){
  window.user.cards.push(drawCard());
  updateScores()
  if (hasLost(window.user)){
    userLoses();
  }
  updateState();
}

function userSkips(){
  window.game.status = "dealer"
  console.log("start dealer actions")
  startDealerActions()
}

function startDealerActions() {
  console.log('user score')
  console.log(user.score)
  console.log('dealer score')
  console.log(dealer.score)
  while (dealerShouldDraw()) {
    console.log("dealer should draw");
    dealerDraws();
    console.log("dealer has drawn");
    updateState();
    console.log(window.dealer.score)
    sleep(500);
  }
  if (user.score < dealer.score){
    userLoses()
  } else if (user.score > dealer.score){
    userWins
    payUser;
  } else {
    userHasTie()
    payUser;
  }
  updateState()
}

function dealerShouldDraw(){
  return (
    window.dealer.score < 17 ||
    !hasLost(window.dealer)
  )
}

function dealerDraws(){
  window.dealer.cards.push(drawCard());
  updateScores();
  updateState()
}

function hasLost(user){
  return user.score > 21
}

function userWins(){
  window.game.status = "won";
}

function userHasTie() {
  window.game.status = "tie";
}

function userLoses(){
  window.game.status = "lost";
}

function payUser(){
  if (window.game.status === "won"){
    user.bank += 2* game.bet;
  } else {
    user.bank += game.bet;
  }
}

function resetBoard(){
  window.user.cards =  []
  window.user.score = 0
  window.dealer.cards =  []
  window.dealer.score = 0
  window.game.bet = 0
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
