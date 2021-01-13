console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const imgDiv = document.querySelector('#dog-image-container');
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
const dogList = document.querySelector("#dog-breeds");
const breedDropdown = document.querySelector("#breed-dropdown");
let allBreedList = []

//challenge 1: on page load, fetch images and add each to DOM
fetch(imgUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        for (i of json.message) { //json is the object and want to call message array out of it
            imgDiv.innerHTML += `<img src="${i}"></img>`
        }
        
    });

//challenge 2: on page load, all of the breed names are parsed and added into <ul>
fetch(breedUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        for (const name in json.message ) {
            dogList.innerHTML += `<li>${name}</li>`
        }
        allBreedList = [...dogList.children];
    })

//challenge 3: when user clicks on a dog breed list item the color changes
dogList.addEventListener('click', function(event){
    event.target.style.color = "pink"
})

//challege 4: user can filter breeds using dropdown
breedDropdown.addEventListener('change', function() {
    const selectedFilter = breedDropdown.value; //figure out what letter was selected from change event
    
    let ulChild = dogList.lastElementChild;
    while (ulChild) { // this is to remove all dog breeds
        dogList.removeChild(ulChild); //remove last child 
        ulChild = dogList.lastElementChild;  //grab the next child to delete
    }

    for (i = 0; i < allBreedList.length; i++) { //use that letter to apply filter, make new array of breed names that begin with that letter
        if (allBreedList[i].innerText.charAt(0) == selectedFilter) {
            dogList.appendChild(allBreedList[i]); //this is to add in filtered dog breeds
        }
    }
    
});
