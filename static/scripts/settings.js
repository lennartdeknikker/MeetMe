var remove = document.getElementById("js-remove");

if (remove) {
	remove.addEventListener("click", onremove);
}

function onremove(ev) {
	var node = ev.target;
	var username = node.dataset.username;
	console.log(username);

	var res = new XMLHttpRequest();

	res.open("DELETE", "settings/" + username);
	res.onload = onload;
	res.send();

	function onload() {
		if (res.status !== 200) {
			throw new Error("Could not delete!");
		}
		window.location = "/";
	}
}

var logout = document.getElementById("js-logout");

if (logout) {
	logout.addEventListener("click", onlogout);
}

function onlogout() {
	window.location = "/logout";
}