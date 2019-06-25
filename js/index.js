/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');

init();

var lastDice;

//kostka
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1; //ramdom cislo od 1 - 6 a floor - zaokrouhli na cele cislo
        var dice2 = Math.floor(Math.random() * 6) + 1;
        


        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';



        if (dice1 !== 1 && dice2 !== 1) {
            hideRolledMsg();
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else { 
            disableBtn(btnRoll,1000);
            hideRolledMsg();
            document.querySelector('.player-'+activePlayer+'-rolled-1').style.visibility = 'visible';
            nextPlayer();
        }
    }    
});

//hold
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        disableBtn(btnRoll,1000);   
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];     
        var input = document.querySelector('.final-score').value;
        var winningScore;

        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
    if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

// panely
document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-rules').addEventListener('click', function(){
	    var games = document.getElementsByClassName('game-panel');
		for(i=0;i<games.length;i++){
			games[i].style.display = 'none';
		}
	    
	    document.querySelector('.btn-back').style.display = 'block';
		var rules = document.getElementsByClassName('rules-panel');
		for(i=0;i<rules.length;i++){
			rules[i].style.display = 'block';
		}
	
});

document.querySelector('.btn-back').addEventListener('click', function(){
	    var games = document.getElementsByClassName('game-panel');
		for(i=0;i<games.length;i++){
			games[i].style.display = 'block';
		}
	    
	    document.querySelector('.btn-back').style.display = 'none';
		var rules = document.getElementsByClassName('rules-panel');
		for(i=0;i<rules.length;i++){
			rules[i].style.display = 'none';
		}
	
});




//další hráč
function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';

}

function disableBtn(btn, time){
    btn.disable = true;
    setTimeout(function(){btn.disable = false;}, time);
}

function hideRolledMsg(){
    
	document.querySelector('.player-0-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';
}