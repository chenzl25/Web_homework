window.onload = function() {
	var Solution = {};
	Solution.pic_frag = document.createDocumentFragment();
	Solution.wrapper = document.querySelectorAll('.wrapper')[0];
	Solution.button = document.querySelectorAll('button')[0];
	Solution.nodes = [];
	Solution.move = move;
	Solution.can_move = can_move;
	Solution.get_blank = get_blank;
	Solution.success = success;
	Solution.random_move = random_move;
	for (var i = 0; i < 4; i++) {
		Solution.nodes.push([]);
		for (var j = 0; j < 4; j++) {
			Solution.nodes[i][j] = document.createElement('div');
			Solution.nodes[i][j].X = i;
			Solution.nodes[i][j].Y = j;
			Solution.nodes[i][j].onclick = function(event) {
				var X = event.target.X;
				var Y = event.target.Y;
				if (Solution.can_move(X, Y) === true) {
					Solution.move(X, Y);
					if (Solution.success() === true) {
						alert('success');
					}
				}
			}
			Solution.nodes[i][j].num = i*4+j;
			Solution.nodes[i][j].classList.add('picture');
			Solution.nodes[i][j].classList.add('pos'+i+j);
			Solution.pic_frag.appendChild(Solution.nodes[i][j]);
		}
	}
	Solution.wrapper.appendChild(Solution.pic_frag);
	Solution.button.onclick = function() {
		Solution.random_move();
	}
}
function success() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (this.nodes[i][j].num !== 4*i+j) {
				return false;
			}
		}
	}
	return true;
}
function can_move(X, Y) {
	changeX = [-1,1,0,0];
	changeY = [0,0,1,-1];
	var blank = this.get_blank();
	console.log('blank', blank);
	for (var k = 0; k < 4; k++) {
		if (blank.X === X + changeX[k] && blank.Y === Y + changeY[k]) {
			return true;
		}
	}
	return false;
}
function move(X, Y) {
	var blank = this.get_blank();
	this.nodes[blank.X][blank.Y].num = this.nodes[X][Y].num;
	var tem_class = this.nodes[X][Y].classList[1];
	this.nodes[blank.X][blank.Y].classList.remove('pos33');
	this.nodes[blank.X][blank.Y].classList.add(tem_class);
	this.nodes[X][Y].classList.remove(tem_class);
	this.nodes[X][Y].classList.add('pos33');
	this.nodes[X][Y].num = 15;
}
function get_blank() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (this.nodes[i][j].num === 15) {
				return {X:i, Y:j};
			}
		}
	}
}
function random_move() {
	var n = 100000;
	changeX = [-1,1,0,0];
	changeY = [0,0,1,-1];
	for (var i = 0; i < n; i++) {
		var blank = this.get_blank();
		if (i > 1000) {
			if (blank.X === 3 && blank.Y === 3) {
				break;
			}
		}
		var rand = Math.floor(Math.random()*4);
		var new_X = blank.X + changeX[rand];
		var new_Y = blank.Y + changeY[rand];
		if (new_X >= 0 && new_X < 4 && new_Y >= 0 && new_Y < 4) {
			this.move(new_X, new_Y);
		}
	}
}