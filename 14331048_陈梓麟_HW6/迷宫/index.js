window.onload = function() {
	document.onselectstart = function() {
		return false;
	};
	var start = document.querySelectorAll('.start')[0];
	var end = document.querySelectorAll('.end')[0];
	var walls = document.querySelectorAll('.wall');
	var result = document.querySelectorAll('.result')[0];
	var test_wall = document.querySelectorAll('.test_wall')[0];
	var over = true;
	var cheat = false;
	result.style.opacity = '0';
	for (var i = 0; i < walls.length; i++) {
		walls[i].addEventListener('mouseover', function(event) {
			if (!over) {
				result.textContent = 'You Lose';
				result.style.opacity = '1';
				event.target.classList.add('warn');
				over = true;
			}
		});
		walls[i].addEventListener('mouseout', function(event) {
			event.target.classList.remove('warn');
		});
	}
	start.addEventListener('mouseover', function(event) {
		result.style.opacity = '0';
		// result.textContent = '';
		over = false;
		cheat = false;
	});
	end.addEventListener('mouseover', function(event) {
		if (!over && !cheat) {
			result.textContent = 'You Win';
			result.style.opacity = '1';
			over = true;
		} else if (!over && cheat) {
			result.textContent = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
			result.style.opacity = '1';
			over = true;
		}
	});
	test_wall.addEventListener('mouseover', function(event) {
		if(!over) {
			cheat = true;
		}
	});
};