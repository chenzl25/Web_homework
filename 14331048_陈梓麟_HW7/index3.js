$(function() {
	var Solution = new init();
	Solution.create_nodes();
	Solution.wrapper.append(Solution.pic_frag);
	Solution.button.bind("click", function() {
		Solution.random_move();
	});
});
function init() {
	this.pic_frag = $(document.createDocumentFragment());
	this.wrapper = $('.wrapper');
	this.button = $('button');
	this.move = move;
	this.can_move = can_move;
	this.get_blank = get_blank;
	this.success = success;
	this.random_move = random_move;
	this.get_node = get_node;
	this.create_nodes = create_nodes;
}
function create_nodes() {
	var that = this;
	that.nodes = [];
	_.times(4, function(i) {
		that.nodes.push([]);
		_.times(4, function(j) {
			create_node(that, i, j)
		});
	});
}
function create_node(that, i, j) {
	that.nodes[i][j] = $(document.createElement('div'));
	that.nodes[i][j][0].X = i;
	that.nodes[i][j][0].Y = j;
	that.nodes[i][j][0].num = 4*i+j;
	that.nodes[i][j].addClass('picture');
	that.nodes[i][j].addClass('pos'+i+j);
	that.nodes[i][j].addClass('movex'+i);
	that.nodes[i][j].addClass('movey'+j);
	that.nodes[i][j].bind("click", node_listener(that));
	that.pic_frag.append(that.nodes[i][j]);
}
function node_listener(that) {
	return function() {
		if (that.can_move(this) === true) {
			that.move(this);
			if (that.success() === true) {
				alert('success');
			}
		}
	}
}
function success() {
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			if (this.nodes[i][j][0].X !== i || this.nodes[i][j][0].Y !== j)
				return false;
	return true;
}
function can_move(node) {
	changeX = [-1,1,0,0];
	changeY = [0,0,1,-1];
	var blank = this.get_blank();
	for (var k = 0; k < 4; k++)
		if (blank.X === node.X + changeX[k] && blank.Y === node.Y + changeY[k])
			return true;
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
	blank.classList.remove('movex' + blank.X);
	blank.classList.remove('movey' + blank.Y);
	blank.X = X;
	blank.Y = Y;
	blank.classList.add('movex' + X);
	blank.classList.add('movey' + Y);
}
function get_blank() {
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			if (this.nodes[i][j][0].num === 15)
				return this.nodes[i][j][0];
}
function random_move() {
	var n = 100000;
	changeX = [-1,1,0,0];
	changeY = [0,0,1,-1];
	for (var i = 0; i < n; i++) {
		var blank = this.get_blank();
		if (i > 1000)
			if (blank.X === 3 && blank.Y === 3)
				break;
		var rand = Math.floor(Math.random()*4);
		var new_X = blank.X + changeX[rand];
		var new_Y = blank.Y + changeY[rand];
		if (new_X >= 0 && new_X < 4 && new_Y >= 0 && new_Y < 4)
			this.move(this.get_node(new_X, new_Y));
	}
}
function get_node(X, Y) {
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			if (this.nodes[i][j][0].X === X && this.nodes[i][j][0].Y === Y)
				return this.nodes[i][j][0];
}
