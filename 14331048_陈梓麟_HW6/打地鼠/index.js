window.onload = function() {
	'use strict';
	document.onselectstart = function() {
		return false;
	}
	var radios = document.querySelectorAll('input[type=radio]');
	var button = document.querySelectorAll('button')[0];
	var time = document.querySelectorAll('.time span')[0];
	var score = document.querySelectorAll('.score span')[0];
	var state = document.querySelectorAll('.state')[0];
	var over = true;
	var random = Math.floor(Math.random()*60);
	radios[random].checked = true;
	radios[random].parentNode.classList.add('shadow');
	button.addEventListener('click', function(event) {
		over = false;
		state.textContent = 'Playing';
		time.textContent = '30';
		score.textContent = '0';
		var id = setInterval(function() {
			time.textContent = parseInt(time.textContent)-1;
		},1000);
		setTimeout(function(id){
			over = true;
			clearInterval(id);
			time.textContent = '0';
			alert('Game Over\nYour score is: '+score.textContent);
		},30100,id);

	});
	for (var i = 0; i < radios.length; i++) {
		radios[i].my_num = i;
		radios[i].addEventListener('click', function(event) {
			if (event.target.my_num == random && !over) {
				radios[random].checked = false;
				radios[random].parentNode.classList.remove('shadow');
				random = Math.floor(Math.random()*60);
				radios[random].checked = true;
				score.textContent = parseInt(score.textContent) + 1;
				radios[random].parentNode.classList.add('shadow');
			} else if (!over) {
				event.target.checked = false;
				score.textContent = parseInt(score.textContent) - 1;
			}
		});
	}
};