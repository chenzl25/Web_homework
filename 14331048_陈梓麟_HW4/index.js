window.onload = function() {
	function ajax () {
		var posted = document.querySelectorAll('.posted span')[0];
		var request = new XMLHttpRequest();
		request.open('get', "/path?what=num");
		request.send(null);
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				var type = request.getResponseHeader('Content-Type');
				if (type.match(/.*json/)) {
					var data = JSON.parse(request.responseText);
					posted.textContent = data.num;
				}
			}
		};
	}
	var img_posted = document.querySelectorAll('.posted img')[0];
	img_posted.addEventListener('click', ajax);
};