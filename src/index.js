const baseURL = 'http://localhost:3000/pups'

document.addEventListener("DOMContentLoaded", () => {
    fetchAllDogs().then(addDogNamesToBar)
})

function addDogNamesToBar(data){
    const dogBar = document.querySelector("#dog-bar")
    data.forEach(dog => {
        let span = document.createElement("span")
        span.innerHTML = dog.name 
        span.id = dog.id 
        span.addEventListener("click", handleDogClick) 
        dogBar.appendChild(span)
    })
}

function handleDogClick(event){
    let dogId = parseInt(event.target.id)
    fetchOneDog(dogId).then(addDogInfoToDom)
}

function addDogInfoToDom(dog){
    const dogInfo = document.querySelector("#dog-info")

    let img = document.createElement("img")
    img.src = dog.image

    let name = document.createElement("h2")
    name.innerText = dog.name

    let button = document.createElement("button")
    button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    button.dataset.id = dog.id
    button.addEventListener("click", handleGoodDogClick)

    dogInfo.append(img, name, button)
}

function handleGoodDogClick(event){
    console.log(event.target.dataset)
    let newStatus
    if (event.target.innerText.includes("Good")) {
        event.target.innerText = "Bad Dog!"
        newStatus = false
    } else {
        event.target.innerText = "Good Dog!"
        newStatus = true 
    }
    toggleDogStatus(event.target.dataset.id, newStatus)
}

function toggleDogStatus(dogId, status){
    const options = {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          isGoodDog: status
        })
    }
    return fetch(baseURL + `/${dogId}`, options)
    .then(response => response.json())
}

function fetchAllDogs(){
    return fetch(baseURL)
    .then(response => response.json())
}

function fetchOneDog(dogId){
    return fetch(`http://localhost:3000/pups/${dogId}`)
    .then(r => r.json()) 
}