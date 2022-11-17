onmessage = function (e) {
	//url, id1, id2
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			//callback(request.responseText); // Another callback here
			postMessage(request.responseText);
			
		}
	}
	request.open('HEAD', e[0], false);
	request.send();
	
}