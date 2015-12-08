$(document).ready(function() {
	cnt = 0;
	var Solution = {};
	init.call(Solution);
	Solution.$icon = $('.icon');
	Solution.$icon.bind('click', function() {
		Solution.$buttons.trigger('click');
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
	self.$info.find('.total').text('');
	self.$buttons.removeClass('sleep').addClass('active unfinish').find('.unread').hide();
	self.$buttons.bind('click', five_click_generator(self));
	self.$info.bind('click', function() {
		if (self.cnt == 5) {
			var buttons = Array.prototype.slice.call(self.$buttons.find('.unread'), 0);
			var total = buttons.reduce(function(pre,now) {
				return pre += parseInt(now.textContent);
			}, 0);			
			self.$info.find('.total').text(total);
			self.$info.addClass('sleep');
		}
	})
	self.$button.bind('mouseleave', function() {
		self.cnt = 0;
		self.$info.removeClass('sleep active').find('.total').text('');
		self.$buttons.removeClass('sleep').addClass('active unfinish').find('.unread').hide();
		self.$icon.bind('click', function() {
			self.$buttons.trigger('click');
			self.$icon.unbind('click');
		})
	})
}
function five_click_generator(self) {
	return function five_click(e) {
		var that = this;
		$(that).find('.unread').show();
		$(that).find('.unread').text('...');
		getNumber(function(num) {
			$(that).find('.unread').text(num);
			$(that).removeClass('active unfinish').addClass('sleep');
			self.cnt++;
			console.log(self.cnt);	
			if (self.cnt == 5) {
				self.$info.addClass('active');
				setTimeout(function() {
					self.$info.trigger('click');
				}, 1500);
			}
		});
	}
}
haha = 0;
function getNumber(callback) {
	var request = new XMLHttpRequest();
	request.open('get', "/"+haha++);
	request.send(null);
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			callback(request.responseText);
			return;
		}
	};
	// $.ajax({
	//   method: "GET",
	//   url: "/",
	//   data: { name: "John", location: "Boston" }
	// })
	// .done(callback);
}
