(function(){
  $('.card-back').addClass('inactive');
})();


let cashBalance = null;
let bet = 10;


$('.play').click(function() {
  $('.game-rules').addClass('inactive');
  $('.rg_item').css('pointer-events', 'none');
  $('.shuffle').css('pointer-events', 'none');
});

$('.shuffle').click(function () {
   $('.card').addClass('active');
   $('.card-back').removeClass('inactive');
  $('.bet').css('pointer-events', 'none');
  $('.rg_item').css('pointer-events', 'auto');
   
});

$('.bet').click(function() {
  $('h2').text(' ');
  $('h2').css('animation', 'none')
  $('.cash').css('display', 'block');
  
  $('.rg_item').css('pointer-events', 'none')
  $('.shuffle').css('pointer-events', 'auto')
  $('.bet').css('pointer-events', 'none');
    
   updateBalance();
  
});

$('.rg_item').click(function () {
  let card = $(this).children('.card');
  card.parent().find('.card-back').addClass('inactive');
  card.removeClass('active'); 
   $('.rg_item').css('pointer-events', 'none')
  $('.shuffle').css('pointer-events', 'none')
  $('.bet').css('pointer-events', 'none')
});

$('#joker').click(function(){
  youLose();
  
})

$('#queen').click(function(){
  youWin();
  
})

$('#spade').click(function(){
  youLose();
  
})
 


function youWin(){
  $('.note').text('');
  let message = 'Must be your lucky day!'
   $('.note').append(message);
    $('.message').addClass('active');
  $('.messages').addClass('active')
  
addCash();
};

function youLose(){
  $('.note').text('');
  let message = 'Sorry, maybe next time kid...'
   $('.note').append(message);
   $('.message').addClass('active');
  $('.messages').addClass('active')
  
  takeCash();
  
};


function updateBalance() {
  
  if(cashBalance == null){
    cashBalance = 100;
  }
  let newBalance = cashBalance - bet;       
cashBalance = newBalance; 
  
 $('h2').append('Cash Balance' + ':' + ' '+ '$' + cashBalance).css('color', '#85bb65');

return cashBalance;

  
};

function addCash(){
  $('h2').text(' ');
  let win = cashBalance + 20;
  $('h2').append('Cash Balance' + ':' + ' '+ '$' + win).css('color', '#85bb65');
   cashBalance = win;
 
};

function takeCash() {
  $('h2').text(' ');
  let lose = cashBalance;
  $('h2').append('Cash Balance' + ':' + ' '+ '$' + lose).css('color', '#85bb65');
}

$('.playagain').click(function playAgain(){
  event.preventDefault();
  $('.message').removeClass('active')
   $('.messages').removeClass('active')
  
  $('.cash').css('display', 'none');
  $('.rg_item').children('.card').removeClass('active')
  $('.card-back').addClass('inactive');
  $('.rg_item').css('pointer-events', 'auto')
  $('.shuffle').css('pointer-events', 'auto')
  $('.bet').css('pointer-events', 'auto')
  $('.rg_item').css('pointer-events', 'none')
   $('.shuffle').css('pointer-events', 'none');
 
   gameOver(); 
});

function gameOver() {

   
 if(cashBalance == 0){
   $('h2').text('');
   let message = "Game Over! House Wins!";
   $('h2').append(message).css('color', 'red');
     $('.shuffle').css('pointer-events', 'none')
  $('.bet').css('pointer-events', 'none')
   $('.newGame').addClass('active');
    
 }

};

function restartGame() {
   $('.newGame').removeClass('active');
  $('h2').text('');
   $('.shuffle').css('pointer-events', 'none')
  $('.bet').css('pointer-events', 'auto')
  $('.grid .card').css('pointer-events', 'none')
  
  cashBalance = 110;
   updateBalance(); 
  
  
  
};

  
const grid = document.querySelector(".grid");
const items = gsap.utils.toArray(".rg_item");

let numberOfShuffles = 6;
let loopNumber = 0;

function Animate(){
  // check if we've hit the number of loops and if so return
  if(loopNumber === numberOfShuffles) {
    loopNumber = 0
    return;
  }
  
  // increment loop number
  loopNumber++
  
  // Get the state
  const state = Flip.getState(items);
   
  // Do the actual shuffling
  for(let i = items.length; i >= 0; i--) {
      grid.appendChild(grid.children[Math.random() * i | 0]);
  }
  
  // Animate the change
  Flip.from(state, {
    absolute: true,
    delay: .6,
    duration: .3,
    onComplete: Animate // call the function again
  })  

  
}

document.querySelector(".shuffle").addEventListener("click", Animate);



