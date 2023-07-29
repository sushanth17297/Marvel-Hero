const container = document.getElementById("container");
const favDataRaw = localStorage.getItem("favRecords");

const favData = JSON.parse(favDataRaw);
if (favData!=null){
    putFavData();
}
// gets the list of fav records from local and addes it to the fav page
function putFavData(){
    favData.forEach(element => {
        let imgLink = element.imageLink;
        let name = element.name;
        let div = document.createElement("div");
        div.setAttribute("class", "fav-rec");
        let divImg = document.createElement("div");
        divImg.setAttribute("class", "img-div");
        let img = document.createElement("img");
        img.setAttribute("src", imgLink);
        divImg.appendChild(img);
        let divName = document.createElement("div");
        divName.setAttribute("class", "hero-name");
        let heroDetail = document.createElement("a");
        heroDetail.setAttribute("href", `hero.html?name=${name}`);
        heroDetail.innerHTML = name;
        divName.appendChild(heroDetail);
        div.appendChild(divImg);
        div.appendChild(divName);
        container.appendChild(div);
        console.log("fav Data listed");
    });
}