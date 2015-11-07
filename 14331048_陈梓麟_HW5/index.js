window.onload = function() {
	var output = document.getElementById('screen');
	var zero = document.getElementById('zero');
	var one = document.getElementById('one');
	var two = document.getElementById('two');
	var three = document.getElementById('three');
	var four = document.getElementById('four');
	var five = document.getElementById('five');
	var six = document.getElementById('six');
	var seven = document.getElementById('seven');
	var eight = document.getElementById('eight');
	var nine = document.getElementById('nine');
	var divide = document.getElementById('divide');
	var times = document.getElementById('times');
	var minus = document.getElementById('minus');
	var plus = document.getElementById('plus');
	var dot = document.getElementById('dot');
	var ce = document.getElementById('ce');
	var backspace = document.getElementById('backspace');
	var lp = document.getElementById('lp');
	var rp = document.getElementById('rp');
	var equal = document.getElementById('equal');
	var warn = document.querySelectorAll('.warn')[0];
	var ch = [];
	ch.push(zero);
	ch.push(one);
	ch.push(two);
	ch.push(three);
	ch.push(four);
	ch.push(five);
	ch.push(six);
	ch.push(seven);
	ch.push(eight);
	ch.push(nine);
	ch.push(dot);
	ch.push(divide);
	ch.push(times);
	ch.push(plus);
	ch.push(minus);
	ch.push(minus);
	ch.push(lp);
	ch.push(rp);
	function click_append(event) {
		output.value += event.target.textContent;
	}
	for (var i in ch) {
		ch[i].addEventListener('click', click_append);
	}
	backspace.addEventListener('click', function() {
		var tem = output.value;
		tem = tem.substr(0,tem.length - 1);
		output.value = tem;
	});
	ce.addEventListener('click', function() {
		output.value = '';
	});
	function calculate() {
		try {
			if (/^[0-9\.\(\)\+\-\*\/]*$/.test(output.value)) {
				eval(output.value);
			} else {
				throw Error('invalid input');
			}
		} catch (err) {
			console.log(err.name + ' : ' + err.message);
			warn.style.display = 'block';
		}
		output.value = eval(output.value);
		warn.style.display = 'none';
	}
	equal.addEventListener('click',calculate);
	output.addEventListener('keydown', function(event) {
		if (event.keyCode == 13) {
			calculate();
		}
	});
};