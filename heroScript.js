let ts = "12398753426719";
let publicKey = "82fa40f2a41b562fbf0299d1509f82fd";
let hashVal = "f584b29695cfc066439ed91aeb432231";
const heroImg = document.getElementById("hero-img");
const heroName = document.getElementById("hero-name");
const heroDesc = document.getElementById("hero-desc");
const comicTag = document.getElementById("comics");
const seriesTag = document.getElementById("series");
const storiesTag = document.getElementById("stories");
const addFavButton = document.getElementById("add-favourites");
const searchParams = new URLSearchParams(window.location.search); //gets the url parameters passed by previous page
const nameHero = searchParams.get('name');
const xhr = new XMLHttpRequest();
const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&name=${nameHero}`;
console.log(url);
xhr.open('GET', url, true);
var jsonData = null;

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        jsonData = JSON.parse(xhr.responseText);
        dataAddition();
        console.log("called the API in hero details."); 
    } else {
        console.error('Error:', xhr.status, xhr.statusText);
    }
};
xhr.onerror = function () {
    // An error occurred while making the request
    console.error('Network error');
};
xhr.send();
var favDataRaw = localStorage.getItem("favRecords");
var favData = JSON.parse(favDataRaw);
console.log(JSON.stringify(favData));
var comics = null;
var series = null;
var stories = null;
var hName = "";
var imgLink = "";
var isFav = false;
var isFavDataNull = false;

function dataAddition(){// data is added to the page by adding required data in html
    jsonData.data["results"].forEach(element => {
        hName = element.name;
        imgLink = element.thumbnail["path"] + "." +  element.thumbnail["extension"];
        console.log(imgLink);
        let img = document.createElement("img");
        img.setAttribute("src", imgLink);
        heroImg.appendChild(img);
        heroName.innerHTML = hName;
        heroDesc.innerHTML = element.description
        console.log(hName);
        comics = element.comics;
        series = element.series;
        stories = element.stories;
    });
    comics.items.forEach(element => {
        let lidata = document.createElement("li");
        lidata.innerHTML = element.name;
        comicTag.appendChild(lidata);
    });
    series.items.forEach(element => {
        let lidata = document.createElement("li");
        lidata.innerHTML = element.name;
        seriesTag.appendChild(lidata);
    });
    stories.items.forEach(element => {
        let lidata = document.createElement("li");
        lidata.innerHTML = element.name;
        storiesTag.appendChild(lidata);
    });
}
if (favData !== null){
    favData.forEach(element => {
        if (element.name == nameHero){
            isFav = true;
        }
    });
}else{
    isFavDataNull = true;
}
function addFav(){// operates when the fav button is clicked 
    // we store the fav records in local
    if (isFav){
        let i = 0;
        while (i<favData.length){
            if (favData[i].name === hName){
                favData.splice(i, 1);
                isFav = false;
                localStorage.setItem("favRecords", JSON.stringify(favData));
                favButton();
            }
            i++;
        }
    }else{
        let record = {name:hName, imageLink:imgLink};
        if (!isFavDataNull){
            favData.push(record);
            localStorage.setItem("favRecords", JSON.stringify(favData));
        }else{
            let record = [{name:hName, imageLink:imgLink}];
            localStorage.setItem("favRecords", JSON.stringify(record));
        }
        isFav = true;
        favDataRaw = localStorage.getItem("favRecords");
        favData = JSON.parse(favDataRaw);
        favButton();
    }
    console.log(JSON.stringify(favData));
    
}

function favButton(){// to change the fav button style and content 
    if (isFav){
        addFavButton.style.color = `rgb(196, 17, 17)`;
        addFavButton.innerHTML = "Remove from Favourites"
    }else {
        addFavButton.style.color = "white";
        addFavButton.innerHTML = "Add to Favourites"
    }
}
favButton();