/*global Card */
'use strict';

$(document).ready(init);

function init() {
  createCards();
  paintCards();
  $('#start').click(gameStart);
  $('.flipper').click(flippyFlip);
}

var cards = [];
var flipped = [];
var timer = 60;
var intervalID;

function flippyFlip() {
  if (!intervalID) {
    alert('You must press start before you can flip cards!');
    return;
  }
  if (flipped.length === 2) { //reset if you have 2 cards flipped
    $('.flipped').removeClass('flipped') // unflip unmatched cards
    flipped = [];
  }

  if (!$(this).hasClass('flipped')) { //if the card is unflipped, flip it and add to flipped array
    this.classList.add('flipped');
    flipped.push($(this).find('.name').text());
  } else {
    console.log('this card is flipped');
  }
  checkMatches();
}

function checkMatches() {
  if (flipped.length === 2) { // check if 2 cards are flipped
    if (flipped[0] === flipped[1]) { //check if the 2 cards match
        $('.flipped').addClass('matched'); // change cards from flipped to matched
        $('.flipped').removeClass('flipped');
      }
  }
  checkVictory();
}

function checkVictory() {
  if ($('.matched').length === 20) { // If you match 20 cards, you win
    window.clearInterval(intervalID);
    alert('Congratulations! You won! Tweet me #TreMagnifique @Spinaldash! You took: ' + eval(60 - timer) + 'seconds. \n\n Thank you for playing!');

  }
}

function gameStart() {
  $('#start').attr('disabled');
  intervalID = setInterval(timerTime, 1000)

}

function timerTime() {
  timer--;
  console.log(timer);
  $('#timer').text(timer);
  if (timer === 0) {
    alert("Time's up! You did great, but there is still room for improvement!")
    $('.flipped').removeClass('flipped') // unflip unmatched cards
    $('.matched').removeClass('matched') // unflip matched cards


    window.clearInterval(intervalID);
  }
}

function createCards() {
  var w1 = new Card('Sorin', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=249985&type=card');
  var w2 = new Card('Sarkhan', 'http://www.mythicspoiler.com/ktk/cards/sarkhanthedragonspeaker.jpg');
  var w3 = new Card('Garruk', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=383251&type=card');
  var w4 = new Card('Chandra', 'http://www.planeswalkerslibrary.com/images/m14/132.jpg?9.01.2014');
  var w5 = new Card('Jace', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=195297&type=card');
  var w6 = new Card('Elspeth', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=373649&type=card');
  var w7 = new Card('Fire_&_Ice', 'http://8e8460c4912582c4e519-11fcbfd88ed5b90cfb46edba899033c9.r65.cf1.rackcdn.com/sales/cardscans/MTG/MMA/en/nonfoil/SwordOfFireAndIce.jpg');
  var w8 = new Card('Godsend', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=380426&type=card');
  var w9 = new Card('Tatsumasa', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=75291&type=card');
  var w10 = new Card('Unscyth', 'http://mythicspoiler.com/arb/cards/unscythekillerofkings.jpg');

  cards.push(w1, w2, w3, w4, w5, w6, w7, w8, w9, w10);
  cards.push(w1, w2, w3, w4, w5, w6, w7, w8, w9, w10);
  cards = _.shuffle(cards);
}

function paintCards() {

  cards.forEach(function(card) {

    var $flipContainer = $('<div>');
    $flipContainer.addClass('flip-container');

    var $flipper =  $('<div>');
    $flipper.addClass('flipper');

    var $front = $('<div>');
    $front.addClass('front');

    var $outer = $('<div>');
    $outer.addClass('back card');
    $outer.css('background-image', 'url("' + card.image + '")');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + card.image + '")');

    var $name = $('<div>');
    $name.text(card.name);
    $name.addClass('name title');

    $outer.append($img, $name);
    $flipper.append($front, $outer);
    $flipContainer.append($flipper);
    $('.gameMat').append($flipContainer);

  });
}
