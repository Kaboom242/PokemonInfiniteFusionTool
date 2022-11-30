let mainDiv = document.getElementById("main");
let loadingDiv = document.getElementById("loading");
let optionDiv = document.getElementById("pokeID");
let foundDiv = document.getElementById("foundNum");

ids.forEach(id => {
	let option = document.createElement("option");
	option.value = id[1];
	option.innerHTML = id[0];
	optionDiv.appendChild(option);
});

let workers = [];
window.onbeforeunload = function (event) {
	//return confirm("Confirm refresh");
	workers.forEach(worker => {
		worker.terminate();
	});
};
let loadCount = 0;
let foundCount = 0;

function startSearch() {
	mainDiv.innerHTML = "";
	loadingDiv.style.width = "0%";
	console.log("starting");
	foundCount = 0;
	loadCount = 0;
	heavycomp(0);
	LoadingBar();
}

let url = new URL(window.location.href);
// searchParams property is URLSearchParams object
let search_params = url.searchParams;
let _id = search_params.get('id');
if (typeof _id !== 'undefined' || _id != '') {
	_id = parseInt(_id)
	if (_id > 0 && _id <= 420) {
		document.getElementById("pokeID").value = _id;
		startSearch();
	}
}


function LoadingBar() {
	setTimeout(() => {

		loadingDiv.style.width = Math.round(loadCount / 840) * 100 + "%";
		console.log(loadCount);
		//loadCount++;
		if (loadCount < 840)
			LoadingBar();
	}, 500);
}
function heavycomp(progress) {
	var date = new Date();
	var curDate = null;
	do {
		progress++;
		curDate = new Date();
		searchPokemon(progress);
		if (progress >= 420) {
			//loadingDiv.style.width = "100%";
			//killWorkers();
			return;
		}
	}
	while (curDate - date < 100);
	console.log(progress);
	//loadingDiv.style.width = Math.round( (progress / 420) * 100 ) + "%";
	setTimeout(() => {
		console.log('progress:' + progress);
		//render()
		heavycomp(progress);
	}, 100);
}
function killWorkers() {

}
//heavycomp( 0 );
function searchPokemon(index) {
	let firstID = document.getElementById("pokeID").value;

	//let url1 = "./CustomBattlers/" + firstID + "." + index + ".png";
	let url1 = "https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/" + firstID + "." + index + ".png";
	//let url2 = "./CustomBattlers/" + index + "." + firstID + ".png";

	let url1worker = new Worker("htmlRequest.js");
	workers.push(url1worker);
	url1worker.postMessage(url1)
	url1worker.onmessage = function (d) {
		if (d.data == 200)
			createImgDiv(url1, firstID, index);
		loadCount++;
		url1worker.terminate();
	}
	if (index != firstID) {
		let url2 = "https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/" + index + "." + firstID + ".png";
		let url2worker = new Worker("htmlRequest.js");
		workers.push(url2worker);
		url2worker.postMessage(url2)
		url2worker.onmessage = function (d) {
			if (d.data == 200)
				createImgDiv(url2, index, firstID);
			loadCount++;
			url2worker.terminate();
		}
	}
	//console.log(url1worker);
	//UrlExists(url1, firstID, index);
	//UrlExists(url2, index, firstID);
	function createImgDiv(URL, id1, id2) {
		let imgcontainer = document.createElement("div");
		let node = document.createElement("img");
		node.src = URL;
		node.alt = index + "." + firstID;
		imgcontainer.appendChild(node);
		let nameText = document.createElement("div");
		nameText.style = "text-align: center; font-weight: 900; font-size: 24px;";
		let name1 = getName(id1);
		let name2 = getName(id2);
		let host = window.location.href;
		host = host.split('?')[0];
		nameText.innerHTML = `<a href='${host}?id=${id1}'>${name1}</a>/<a href='${host}?id=${id2}'>${name2}</a>`;
		imgcontainer.appendChild(nameText);
		mainDiv.appendChild(imgcontainer);
		foundCount++;
		foundDiv.innerHTML = foundCount;
	}
	function getName(index) {
		name = "";
		ids.forEach(id => {
			if (id[1] == index) { name = id[0]; }
		});
		return name;
	}

}