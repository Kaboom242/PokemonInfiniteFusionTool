onmessage = function (e) {
	//url, id1, id2
	//console.log(e.data);
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == 4) {//&& request.status == 200
			//callback(request.responseText); // Another callback here
			postMessage(request.status);
		}
	}
	request.open('HEAD', e.data, false);
	request.send();
}