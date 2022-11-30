const searchDiv = document.getElementById("search");
const searchBoxDiv = document.getElementById("searchBox");
searchDiv.addEventListener("keyup", (event) => {
    let searchValue = searchDiv.value;
    searchBoxDiv.innerHTML = "";
    //console.log(ids);
    let foundIDS = ids.filter(element => element[0].includes(searchDiv.value.toLowerCase()));
    if (foundIDS.length == 0) { return; }
    console.log(foundIDS);
    foundIDS.forEach((value) => {
        let node = document.createElement("a");
        let image = document.createElement("div");
        let host = window.location.href;
        host = host.split('?')[0];
        node.href = `${host}?id=${value[1]}`;
        node.style = "text-align: center; width: 100px; background: white; padding: 2px; border-radius: 5px; box-sizing: border-box; ";
        searchBoxDiv.appendChild(node);
        let pokeIndex = String(value[1]).padStart(3,'0')
        image.style.background = `url("/icons/icon${pokeIndex}.png")`; //`/icons/icon001.png`;
        image.style.margin = "auto";
        image.className = "sprite";
        node.appendChild(image);
        let text = document.createElement("div");
        text.innerHTML = value[0];
        node.appendChild(text);
    });
});