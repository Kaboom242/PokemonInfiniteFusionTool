const searchDiv = document.getElementById("search");
const searchBoxDiv = document.getElementById("searchBox");
searchDiv.addEventListener("keyup", () => {
    populateSearchBox();
});
function populateSearchBox() {
    searchBoxDiv.innerHTML = "";
    //console.log(ids);
    let lowerIDsArray = [];
    ids.forEach(e => {
        let newValue = [e[0].toLowerCase(), e[1]];
        lowerIDsArray.push(newValue);
    });
    let foundIDS = lowerIDsArray.filter(element => element[0].includes(searchDiv.value.toLowerCase()));
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
        let pokeIndex = String(value[1]).padStart(3, '0')
        image.style.background = `url("./icons/icon${pokeIndex}.png")`; //`/icons/icon001.png`;
        image.style.margin = "auto";
        image.className = "sprite";
        node.appendChild(image);
        let text = document.createElement("div");
        text.innerHTML = capitalizeFirstLetter(value[0]);
        node.appendChild(text);
    });
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}