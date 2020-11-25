document.addEventListener('DOMContentLoaded', ()=> {
    getPups()
})


const getPups = () => {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then((pups) => {
        pups.forEach(pup => renderPup(pup))
    })
}

const showMoreInfo = (pup) => {
    
    const pupImg = document.createElement('img')
    pupImg.src = pup.image

    const pupName = document.createElement('h2')
    pupName.innerText = pup.name

    const pupGoodBad = document.createElement('button')
    if(pup.isGoodDog){
        pupGoodBad.innerText = "Good Dog!"
    }
    else{
        pupGoodBad.innerText = "Bad Dog!"
    }
    // click to toggle -- will trigger patch request
    pupGoodBad.addEventListener('click', (e) => {
        toggleBehavior(e, pup)
    })

    const doggoDiv = document.querySelector('#dog-info')
    doggoDiv.innerHTML = ""

    doggoDiv.appendChild(pupImg)
    doggoDiv.appendChild(pupName)
    doggoDiv.appendChild(pupGoodBad)       


}



const toggleBehavior = (e, pup) => {

    if(pup.isGoodDog){
        pup.isGoodDog = false
    }
    else{
        pup.isGoodDog = true
    }
    console.log(pup.isGoodDog)
    goodBadUpdate(pup)

}

const goodBadUpdate = (pup) => {

    const newLocal = pup.isGoodDog
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "isGoodDog": newLocal  })
    })
        .then(res => res.json())
        .then(pup => showMoreInfo(pup))

}

// const renderPup = (pup) => {

//     const pupButton = document.createElement('span')
//     pupButton.innerText = pup.name

//     pupButton.addEventListener('click', (e) =>{ 
//         showMoreInfo(pup)
//     })

//     const pupDiv = document.querySelector('#dog-bar')
//     pupDiv.appendChild(pupButton)
    
// }



const renderPup = (pup) => {



    const pupButton = document.createElement('span')
    pupButton.innerText = pup.name

    pupButton.addEventListener('click', (e) =>{ 
        showMoreInfo(pup)
    })

    const pupDiv = document.querySelector('#dog-bar')
    pupDiv.appendChild(pupButton)


    
}
