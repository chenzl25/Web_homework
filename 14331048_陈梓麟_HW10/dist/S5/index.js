var Solution = {};
$(document).ready(function() {
	cnt = 0;
	init.call(Solution);
	Solution.$icon = $('.icon');
	Solution.$icon.bind('click', function() {
		start(Solution.array, bubbleHandler);
		Solution.$icon.unbind('click');
	})
});
function init() {
	var self = this;
	self.cnt = 0;
	self.$info = $('.info');
	self.$total = $('.total');
	self.$buttons = $('.button');
	self.$button = $('#button');
	self.$talk = $('#talk');
	self.array = randomArray();
	self.$info.find('.total').text('');
	self.$buttons.removeClass('sleep').addClass('active unfinish').find('.unread').hide();
	self.$button.bind('mouseleave', function() {
		self.cnt = 0;
		self.$talk.text('');
		self.array = randomArray();
		self.$info.removeClass('sleep active').find('.total').text('');
		self.$buttons.removeClass('sleep').addClass('active unfinish').find('.unread').hide();
		self.$icon.bind('click', function() {
			start(Solution.array, bubbleHandler);
			Solution.$icon.unbind('click');
		})
	})
}
function getNumber(callback) {
	var request = new XMLHttpRequest();
	request.open('get', "/");
	request.send(null);
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			callback(request.responseText);
			return;
		}
	};
}
function randomArray() {
	var to = [];
	var from = ['A', 'B', 'C', 'D', 'E'];
	while(from.length !== 0)
		to.push(from.splice(Math.floor(Math.random()*from.length),1)[0])
	return to;
}

var map = {
			A: aHandler,
		   	B: bHandler,
		   	C: cHandler,
		    D: dHandler,
			E: eHandler};
function start(array, done) {
	var callbacks = [];
	for (var i = 0; i < array.length - 1; i++) {
		(function(i) {
			callbacks[i] = function(err, sum) {
				setTimeout((function(i) {
					return function() {
						map[array[i+1]](err, sum, callbacks[i+1]);
					}
				})(i), 1000);
			} 
		})(i);
	}
	callbacks[array.length-1] = function(err, sum) {
		Solution.$info.addClass('active');
		setTimeout(function() {
			done(err, sum);
		}, 1500);
	}
	map[array[0]](null, 0, callbacks[0]);
}

function bubbleHandler(err, currentSum) {
	var buttons = Array.prototype.slice.call(Solution.$buttons.find('.unread'), 0);
	var total = buttons.reduce(function(pre,now) {
		return pre += parseInt(now.textContent);
	}, 0);	
	Solution.$info.find('.total').text(total);
	Solution.$talk.text('楼主异步调用战斗力感人，目测不超过'+total);
	Solution.$info.addClass('sleep');
}
function aHandler(err, currentSum, callback) {
	var that = $('.button').filter(function() {
		return $(this).find('.alpha').text() === 'A';
	})[0];
	console.log('a!!!');
	$(that).find('.unread').show();
	$(that).find('.unread').text('...');
	Solution.$buttons.addClass('sleep');
	$('#talk').text('这是个天大的秘密');
	getNumber(function(num) {
		$(that).siblings().filter('.unfinish').removeClass('sleep').addClass('active')//.bind('click', five_click_generator(self));
		$(that).find('.unread').text(num);
		$(that).removeClass('active unfinish').addClass('sleep');
		callback(err, currentSum+num);
	});
}
function bHandler(err, currentSum, callback) {
	var that = $('.button').filter(function() {
		return $(this).find('.alpha').text() === 'B';
	})[0];
	console.log('b!!!');
	$(that).find('.unread').show();
	$(that).find('.unread').text('...');
	Solution.$buttons.addClass('sleep');
	$('#talk').text('我不知道');
	getNumber(function(num) {
		$(that).siblings().filter('.unfinish').removeClass('sleep').addClass('active')//.bind('click', five_click_generator(self));
		$(that).find('.unread').text(num);
		$(that).removeClass('active unfinish').addClass('sleep');
		callback(err, currentSum+num);
	});
}
function cHandler(err, currentSum, callback) {
	var that = $('.button').filter(function() {
		return $(this).find('.alpha').text() === 'C';
	})[0];
	console.log('c!!!');
	$(that).find('.unread').show();
	$(that).find('.unread').text('...');
	Solution.$buttons.addClass('sleep');
	$('#talk').text('你不知道');
	getNumber(function(num) {
		$(that).siblings().filter('.unfinish').removeClass('sleep').addClass('active')//.bind('click', five_click_generator(self));
		$(that).find('.unread').text(num);
		$(that).removeClass('active unfinish').addClass('sleep');
		callback(err, currentSum+num);
	});
}
function dHandler(err, currentSum, callback) {
	var that = $('.button').filter(function() {
		return $(this).find('.alpha').text() === 'D';
	})[0];
	console.log('d!!!');
	$(that).find('.unread').show();
	$(that).find('.unread').text('...');
	Solution.$buttons.addClass('sleep');
	$('#talk').text('他不知道');
	getNumber(function(num) {
		$(that).siblings().filter('.unfinish').removeClass('sleep').addClass('active')//.bind('click', five_click_generator(self));
		$(that).find('.unread').text(num);
		$(that).removeClass('active unfinish').addClass('sleep');
		callback(err, currentSum+num);
	});
}
function eHandler(err, currentSum, callback) {
	var that = $('.button').filter(function() {
		return $(this).find('.alpha').text() === 'E';
	})[0];
	console.log('e!!!');
	$(that).find('.unread').show();
	$(that).find('.unread').text('...');
	Solution.$buttons.addClass('sleep');
	$('#talk').text('才怪');
	getNumber(function(num) {
		$(that).siblings().filter('.unfinish').removeClass('sleep').addClass('active')//.bind('click', five_click_generator(self));
		$(that).find('.unread').text(num);
		$(that).removeClass('active unfinish').addClass('sleep');
		callback(err, currentSum+num);
	});
}