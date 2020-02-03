let addToy = false;
const toysURL = "http://localhost:3000/toys/";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});


///////////// fetch the toys in the db ///////////////////////////
//access the div where they will be stored
const toyDiv = document.querySelector("#toy-collection");
//fetch the data
function fetchToys(){
  fetch(toysURL)
    // .then(response => response.json())
    // .then(json => showToys(json)) //it knows it's calling itself, so you don't need to give an argument, same as (response => showToys)
    .then(function(response){
      return response.json()
    })
    .then(function(json) {
      showToys(json);
    })
}
//show the data

function showToys(toys){
  // for (let i = 0; i < toys.length; i++) {
  //   showToy(toys[i])
  toys.forEach ( toy =>
    showToy(toy)
  )
}


function showToy(toy) {
  
    let singleToyDiv = document.createElement('div')
    singleToyDiv.classList = "card";

    singleToyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img class="toy-avatar" src=${toy.image}>
    `
    // let likes = document.createElement('p')
    // likes.innerText = "Likes: " + toy.likes

    const likes = document.createElement('p')
    likes.innerText = toy.likes

    const likeBtn = document.createElement('button')
    likeBtn.classList = "like-btn";
    likeBtn.innerText = "Like ❤️"

    const deleteBtn = document.createElement('button')
    deleteBtn.classList = "delete-btn";
    deleteBtn.innerText = "Delete 🔫"

    singleToyDiv.append(likes, likeBtn, deleteBtn);
    toyDiv.append(singleToyDiv);


    likeBtn.addEventListener('click', () => {
      let newLike = ++likes.innerText
     
      fetch(toysURL + toy.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          likes: newLike
        })
      });
    });

    
    deleteBtn.addEventListener('click', (e) => {
     
     
      fetch(toysURL + toy.id, {
        method: "DELETE"})
        .then(function(response){
          return response.json()
        }).then(function(){
          e.target.parentNode.remove()
        })
      });
    ;



  

}
//////////////// Like button ////////////////




///////////// add a new Toy ///////

///find the form
  const newToyForm = document.querySelector('.add-toy-form');
  newToyForm.addEventListener('submit', function(e){
    e.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const image = document.querySelector('input[name="image"]').value
    const toy = {
      name: name,
      image: image,
      likes: 0
    }

    createToy(toy)
      .then(function(newToy){
        showToys(newToy)
      })
  })

function createToy(toy) {
    
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
    }

    return fetch(toysURL, configurationObject)
    .then(function(response){
      return response.json()
    })
    .then(showToy);
    newToyForm.reset();
  
} ///create toy closing 




  


fetchToys()
