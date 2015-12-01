// forgive me not to use jquery, thanks.
window.onload = function() {
	document.onselectstart = function() {return false};
	var reset = document.getElementById('reset');
	var message = document.getElementById('message');
	var submit = document.getElementById('submit');
	var name = document.getElementById('name');
	var student_id = document.getElementById('student_id');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');
	var form = document.getElementById('form');
	hideMessage();
	reset.onclick = function() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/reset');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				console.log(xhr.response);
				var result = JSON.parse(xhr.response);
				if (result.error === false) {
					showMessage(result.data, true);
				}
			}
		}
		xhr.send(null);
	}
	submit.onclick = function(e) {
		e.preventDefault();
		if (!validate_name(name.value) ||
			!validate_student_id(student_id.value) ||
			!validate_phone(phone.value) ||
			!validate_email(email.value)) {
			return;
		}
		var xhr = new XMLHttpRequest();
		// var fd = new FormData(document.getElementById('form'));
		var fd = {name:name.value,
				  student_id:student_id.value,
				  phone: phone.value,
				  email: email.value};
		xhr.open('POST', '/signin');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var result = JSON.parse(xhr.response);
				if (result.error === true) {
					showMessage(result.data, false);
				} else {
					document.getElementsByTagName('html')[0].innerHTML = result.data;
				}
			}
		}
		xhr.send(JSON.stringify(fd));
	}
	form.addEventListener('blur', function(e) {
		if (e.target === name) {
			if (!validate_name(name.value)) {
				showMessage('用户名6~18位英文字母、数字或下划线，必须以英文字母开头', false);
				form.insertBefore(message, e.target.nextSibling);
			} else {
				hideMessage();
			}
		}
		if (e.target === student_id) {
			if(!validate_student_id(student_id.value)) {
				showMessage('学号8位数字，不能以0开头', false);
				form.insertBefore(message, e.target.nextSibling);	
			} else {
				hideMessage();
			}
		}
		if (e.target === phone) {
			if(!validate_phone(phone.value)) {
				showMessage('电话11位数字，不能以0开头', false);
				form.insertBefore(message, e.target.nextSibling);	
			} else {
				hideMessage();
			}
		}
		if (e.target === email) {
			if(!validate_email(email.value)) {
				showMessage('邮箱格式不对', false);
				form.insertBefore(message, e.target.nextSibling);	
			} else {
				hideMessage();
			}
		}
	}, true);
}
function showMessage(m, success) {
	if (success) {
		message.classList.add('success');
		message.classList.remove('warning');
	} else {
		message.classList.add('warning');
		message.classList.remove('success');
	}
	message.style.display = 'block';
	message.textContent = m;
}
function hideMessage() {
	message.style.display = 'none';
}
function validate_name(name) {
	return /^[a-zA-Z][a-zA-Z_0-9]{5,18}$/.test(name);
}
function validate_student_id(student_id) {
	return /^[1-9]\d{7}$/.test(student_id)
}
function validate_phone(phone) {
	return /^[1-9]\d{10}$/.test(phone)
}
function validate_email(email) {
	return /^[a-zA-Z_\-\d]+@(([a-zA-Z_\-\d])+\.)+[a-zA-Z]{2,4}$/.test(email);
}