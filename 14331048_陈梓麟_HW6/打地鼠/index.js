window.onload = function() {
	'use strict';
	document.onselectstart = function() {
		return false;
	};
	var radios = document.querySelectorAll('input[type=radio]');
	var button = document.querySelectorAll('button')[0];
	var time = document.querySelectorAll('.time span')[0];
	var score = document.querySelectorAll('.score span')[0];
	var state = document.querySelectorAll('.state')[0];
	var over = true;
	var stop = true;
	var random = Math.floor(Math.random()*60);
	var interval_id;
	var timeout_id;
	radios[random].checked = true;
	radios[random].parentNode.classList.add('shadow');
	button.addEventListener('click', function(event) {
		if (time.textContent == '0') {
			stop = false;
			over = false;
			state.textContent = 'Playing';
			time.textContent = '30';
			score.textContent = '0';
			interval_id = setInterval(function() {
				time.textContent = parseInt(time.textContent)-1;
			},1000);
			timeout_id = setTimeout(function(interval_id){
				over = true;
				clearInterval(interval_id);
				time.textContent = '0';
				stop = true;
				alert('Game Over\nYour score is: '+score.textContent);
			},30100,interval_id);
		} else if (!stop){
			state.textContent = 'Stoping';
			clearTimeout(timeout_id);
			clearInterval(interval_id);
			stop = true;
		} else if (stop) {
			stop = false;
			state.textContent = 'Playing';
			interval_id = setInterval(function() {
				time.textContent = parseInt(time.textContent)-1;
			},1000);
			timeout_id = setTimeout(function(interval_id){
				over = true;
				clearInterval(interval_id);
				time.textContent = '0';
				stop = true;
				alert('Game Over\nYour score is: '+score.textContent);
			},(parseInt(time.textContent)*1000+100),interval_id);
		}
	});
	for (var i = 0; i < radios.length; i++) {
		radios[i].my_num = i;
		radios[i].addEventListener('click', function(event) {
			if (event.target.my_num == random && !over && !stop) {
				radios[random].checked = false;
				radios[random].parentNode.classList.remove('shadow');
				random = Math.floor(Math.random()*60);
				radios[random].checked = true;
				score.textContent = parseInt(score.textContent) + 1;
				radios[random].parentNode.classList.add('shadow');
			} else if (!over && !stop) {
				event.target.checked = false;
				score.textContent = parseInt(score.textContent) - 1;
			} else {
				event.target.checked = false;
				radios[random].checked = true;
			}
		});
	}
};