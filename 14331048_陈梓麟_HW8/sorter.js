$(document).ready(function() {
	document.onselectstart = function() {
		return false;
	};
	$("tr:even").addClass("even");
	$("#todo th").each(function(index) {
		$(this)[0].my_index = index;
	});
	$("#staff th").each(function(index) {
		$(this)[0].my_index = index;
	});
	var todo_tr = Array.prototype.slice.call($("#todo tr"), 1);
	var staff_tr = Array.prototype.slice.call($("#staff tr"), 1);
	$("th").click(function() {
		if ($(this).hasClass("up")) {
			$(this).addClass("down");
			$(this).removeClass("up");
			my_sort(this, todo_tr, staff_tr, false);
		} else if ($(this).hasClass("down")) {
			$(this).addClass("up");
			$(this).removeClass("down");
			my_sort(this, todo_tr, staff_tr,true);
		} else {
			$(this).addClass("up");
			my_sort(this, todo_tr, staff_tr,true);
		}
		$(this).parent().children().not(this).removeClass("up");
		$(this).parent().children().not(this).removeClass("down");
		$(this).parent().children().not(this).addClass("blue");
		$(this).removeClass("blue");
	});

});
function my_sort(that, todo_tr, staff_tr, up) {
	var tr = [];
	if ($(that).parent().parent().parent().attr("id") == 'todo') {
		tr = todo_tr;
	} else {
		tr = staff_tr;
	}
	var index = $(that)[0].my_index;
	var text_to_sort = [];
	for (var i = 0; i < tr.length; i++) {
		text_to_sort.push([]);
		$(tr[i]).children().each(function() {
			text_to_sort[i].push($(this).text());
		})
	}

	text_to_sort.sort(function(a, b) {
		if (up === true) {
			return a[index] > b[index]? 1: -1;
		} else {
			return a[index] < b[index]? 1: -1;
		}
	});

	for (var i = 0; i < tr.length; i++) {
		for (var j = 0; j < $(tr[i]).children().length; j++) {
			$(tr[i]).children()[j].textContent = text_to_sort[i][j];
		}
	}	
}