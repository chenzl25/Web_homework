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
	Solution.get_node = get_node;
	for (var i = 0; i < 4; i++) {
		Solution.nodes.push([]);
		for (var j = 0; j < 4; j++) {
			Solution.nodes[i][j] = document.createElement('div');
			Solution.nodes[i][j].X = i;
			Solution.nodes[i][j].Y = j;
			Solution.nodes[i][j].onclick = function(event) {
				if (Solution.can_move(event.target) === true) {
					Solution.move(event.target);
					if (Solution.success() === true) {
						alert('success');
					}
				}
			}
			Solution.nodes[i][j].num = 4*i+j;
			Solution.nodes[i][j].classList.add('picture');
			Solution.nodes[i][j].classList.add('pos'+i+j);
			Solution.nodes[i][j].classList.add('movex'+i);
			Solution.nodes[i][j].classList.add('movey'+j);
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
			if (this.nodes[i][j].X !== i || this.nodes[i][j].Y !== j) {
				return false;
			}
		}
	}
	return true;
}
function can_move(node) {
	changeX = [-1,1,0,0];
	changeY = [0,0,1,-1];
	var blank = this.get_blank();
	for (var k = 0; k < 4; k++) {
		if (blank.X === node.X + changeX[k] && blank.Y === node.Y + changeY[k]) {
			return true;
		}
	}
	return false;
}
function move(node) {
	var X = node.X;
	var Y = node.Y;
	var blank = this.get_blank();
	node.X = blank.X;
	node.Y = blank.Y;
	node.classList.remove('movex' + X);
	node.classList.remove('movey' + Y);
	node.classList.add('movex' + blank.X);
	node.classList.add('movey' + blank.Y);
	// this.nodes[blank.X][blank.Y].num = this.nodes[X][Y].num;
	blank.classList.remove('movex' + blank.X);
	blank.classList.remove('movey' + blank.Y);
	blank.X = X;
	blank.Y = Y;
	blank.classList.add('movex' + X);
	blank.classList.add('movey' + Y);

	// this.nodes[X][Y].num = 15;
	

	// var tem_class = this.nodes[X][Y].classList[1];
	// this.nodes[blank.X][blank.Y].classList.remove('pos33');
	// this.nodes[blank.X][blank.Y].classList.add(tem_class);
	// this.nodes[X][Y].classList.remove(tem_class);
	// this.nodes[X][Y].classList.add('pos33');
}
function get_blank() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (this.nodes[i][j].num === 15) {
				return this.nodes[i][j];
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
			this.move(this.get_node(new_X, new_Y));
		}
	}
}
function get_node(X, Y) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (this.nodes[i][j].X === X && this.nodes[i][j].Y === Y) {
				return this.nodes[i][j];
			}
		}
	}
}
