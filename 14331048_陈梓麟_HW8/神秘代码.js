// http://soj.sysu.edu.cn/
// http://acm.hust.edu.cn/vjudge/toIndex.action
// http://bookshadow.com/leetcode/
// http://acm.sjtu.edu.cn/OnlineJudge/problems
var th_q = $('tr').first();
// use to disable the original sort function
el = th_q[0];
elClone = el.cloneNode(true);
el.parentNode.replaceChild(elClone, el);
var th_q = $(elClone).first();

var tr_q = $('tr').slice(1);
var tr = [tr_q.length];
tr_q.each(function(n) {
	tr[n] = tr_q[n];
});
th_q.children().each(function(n) {
	this.my_index = n;
});
function sort() {
	var up = 1;
	return function() {
		var index = this.my_index;
		tr.sort(function(a, b) {
			if ($(a).children()[index].textContent) {
				if (isNumeric($(a).children()[index].textContent)) {
					return up*(parseFloat($(a).children()[index].textContent) - 
						   	   parseFloat($(b).children()[index].textContent)); 
				}
				if ($(a).children()[index].textContent ==
					$(b).children()[index].textContent) return 0;
				return $(a).children()[index].textContent >
				 	   $(b).children()[index].textContent ? up : -up;
			}
			else {
				if (isNumeric($($(a).children()[index]).find('a').first().text())) {
					return up*(parseFloat($($(a).children()[index]).find('a').first().text()) - 
						   	   parseFloat($($(b).children()[index]).find('a').first().text())); 
				}
				if ($($(a).children()[index]).find('a').first().text() ==
					$($(b).children()[index]).find('a').first().text()) return 0;
				return $($(a).children()[index]).find('a').first().text() > 
					   $($(b).children()[index]).find('a').first().text() ? up : -up;
			}
		});
		$('tbody').children().remove();
		$('tbody').append(tr);
		up *= -1;
	}
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

th_q.children().bind("click", sort());