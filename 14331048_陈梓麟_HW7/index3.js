$(function() {
	var Solution = new init();
	Solution.create_nodes();
	Solution.wrapper.append(Solution.pic_frag);
	Solution.begin.bind("click", function() {
		Solution.random_move();
	});
	Solution.solve.bind("click", function() {
		$('.wait').css('visibility', 'visible');
		Solution.find_solution();
	})
});
function init() {
	this.delay = 50;
	this.delay_random;
	this.pic_frag = $(document.createDocumentFragment());
	this.wrapper = $('.wrapper');
	this.begin = $('#begin');
	this.solve = $('#solve');
	this.move = move;
	this.can_move = can_move;
	this.get_blank = get_blank;
	this.success = success;
	this.random_move = random_move;
	this.get_node = get_node;
	this.create_nodes = create_nodes;
	this.find_solution = find_solution;
	this.get_near = get_near;
}
function create_nodes() {
	var that = this;
	that.nodes = [];
	that.scence = [];
	_.times(4, function(i) {
		that.nodes.push([]);
		that.scence.push([]);
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
	that.scence[i][j] = 4*i+j;
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
	if (contor(this.scence) === 0) return true;
	else return false;
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
function get_near(X, Y) {
	var near = [];
	changeX = [-1,1,0,0];
	changeY = [0,0,1,-1];
	for (var k = 0; k < 4; k++) {
		new_X = X + changeX[k];
		new_Y = Y + changeY[k];
		if (new_X >= 0 && new_Y >= 0 && new_X < 4 && new_Y < 4) {
			near.push({X:new_X,Y:new_Y});
		}
	}
	return near;
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
	this.scence[blank.X][blank.Y] = 15;
	this.scence[node.X][node.Y] = node.num;
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
	var cnt = 0;
	setTimeout((function todo(that) {
		return function() {
			var blank = that.get_blank();
			cnt++;
			if (cnt > 1000)
				if (blank.X === 3 && blank.Y === 3)
					return;
			var rand = Math.floor(Math.random()*4);
			var new_X = blank.X + changeX[rand];
			var new_Y = blank.Y + changeY[rand];
			if (new_X >= 0 && new_X < 4 && new_Y >= 0 && new_Y < 4)
				that.move(that.get_node(new_X, new_Y));
			setTimeout(todo(that), that.delay_random);
		}
	})(this), this.delay_random);
}
function get_node(X, Y) {
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			if (this.nodes[i][j][0].X === X && this.nodes[i][j][0].Y === Y)
				return this.nodes[i][j][0];
}

function contor(matrix) {
	var array = [];
	for (var i = 0; i < matrix.length; i++) {
		array = array.concat(matrix[i]);
	}
    var fac = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000];
    var rst = 0, t = 0;
    for (var i = 0; i < array.length; ++i) {
        t = 0;
        for (var j = i + 1; j < array.length; ++j) {
            if (array[j] < array[i])++t;
        }
        rst += t * fac[array.length - i - 1];
    }
    return rst;
}
function statu(scence, steps, depth, X, Y) {
	this.scence = scence;
	this.steps = steps;
	this.depth = depth;
	this.X = X;
	this.Y = Y;
}
function value(statu) {
    var rst = 0;
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            var num = statu.scence[i][j];
            rst += Math.abs((num % 4) - j) + Math.abs(Math.floor(num / 4) - i);
        }
    }
    return -statu.depth - 4 * rst; // Âü¹þ¶Ù¾àÀë³ËÉÏÒ»¶¨ÏµÊýÀ´¸ÄÉÆÆô·¢º¯Êý
}
function followStep(steps, index) {
	if (index < steps.length) {
		setTimeout(function todo(that) {
			return function() {
				that.move(that.get_node(steps[index].X, steps[index].Y));
				if (index+1 < steps.length)
					setTimeout(followStep.call(that,steps, index+1, steps[index+1].X, steps[index+1].Y), that.delay);
			}
		}(this), this.delay);
	}
}
function Astar(sta) {
	var close = new Set();
	var open = new PriorityQueue();
	open.insert(value(sta), sta);
	close.add(contor(sta.scence));
	var cnt = 0;
	while(!open.empty()) {
		var curStatu = open.pop();
		console.log(cnt++);
		// if (cnt > 5) return ;
		var cur = curStatu.entry;
		// console.log(this.get_node(cur.X, cur.Y));
		if (contor(cur.scence) === 0) {
			console.log('!!!!');
			followStep.call(this, cur.steps, 0);
			break;
		}
		near = this.get_near(cur.X, cur.Y);
		for (var i in near) {
			var scence = _.cloneDeep(cur.scence);
			var tem = scence[cur.X][cur.Y];
			scence[cur.X][cur.Y] = scence[near[i].X][near[i].Y]; 
			scence[near[i].X][near[i].Y] = tem;
			contorNumber = contor(scence);
			if (!close.has(contorNumber)) {
				close.add(contorNumber);
				var steps = _.cloneDeep(cur.steps);
				steps.push({X:near[i].X, Y: near[i].Y});
				var nstatu = new statu(scence, steps, cur.depth+1, near[i].X, near[i].Y);
				open.insert(value(nstatu), nstatu);
			}
		}
	}
}
function find_solution() {
	var sta = new statu(this.scence, new Array(), 0, this.get_blank().X, this.get_blank().Y);
	Astar.call(this, sta);
}