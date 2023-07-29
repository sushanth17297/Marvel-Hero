let ts = "12398753426719";
let publicKey = "82fa40f2a41b562fbf0299d1509f82fd";
let hashVal = "f584b29695cfc066439ed91aeb432231";
//has set the values as part of constant for the project in real cases these ll be dynamically generated
let input = document.getElementById("input-box");
let button = document.getElementById("search");
let show = document.getElementById("show-container");
let listContainer = document.querySelector(".list"); // will give us selected tag info for options
let charecter = null;

const [timeStamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function removeElements() {
    listContainer.innerHTML="";
}

function displayWords(value) {
    input.value = value;
    removeElements();
}
//using async function to call the API
input.addEventListener("keyup", async() => {// API call for to give possible options for the partially typed input in search
    removeElements();
    if (input.value.trim().length < 4){
        return false;
    }
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
    console.log(url);// builded url
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((result) => {
        let name = result.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomeplete-item");
        div.setAttribute("onclick", "displayWords('" + name + "')");
        let word = "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        div.innerHTML = `<p class="item">${word}</p>`;
        listContainer.appendChild(div);
    });
});

button.addEventListener("click", getResult = async () => {// api call to get all details to display image and description of hero
    if (input.value.trim().length < 1){
        alert("The input cannot be blank");
        show.innerHTML = "";
    }
    else {
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
        console.log(url);
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.data["results"].forEach(element => {
            console.log(element.thumbnail["path"] + "." + element.thumbnail["extension"]);
            show.innerHTML = `
                <div class="card-container">
                    <div class="container-charecter-image">
                        <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}"/>
                    </div>
                    <div class="charecter-name">
                        <a href="hero.html?name=${element.name}">${element.name}</a>
                    </div>
                    <div class="charecter-description">${element.description}</div>
                </div>`;
        });
    }
});
