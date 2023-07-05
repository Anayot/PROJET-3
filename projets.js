import { fetchGallery, fetchCategories } from "./api.js"
import { openModal } from "./modal.js";



// get data category
const categories = [{id:0, name:"Tous"}, ...await fetchCategories()]; // Cas où on insert un nouvel élément au tableau existant
console.log(categories)

// #region build category element - DOM 
    const categoryElement = document.querySelector("#filtres");
    
    for (let i=0; i < categories.length; i++) {
        const category = categories[i]
        const buttonElement = document.createElement("button");
        buttonElement.setAttribute("id", category.id);
        buttonElement.className = 'btn';
        buttonElement.textContent = `${category.name}`;
        categoryElement.appendChild(buttonElement)
    }
// #endregion

// get gallery data
const projets = [...await fetchGallery ()];
console.log(projets)

// build gallery element
    const galleryElement = document.querySelector('#gallery');

    for (let i=0; i < projets.length; i++) {
        const projet = projets[i]
        const projetElement = document.createElement('figure');
        projetElement.setAttribute("id", projet.id)
        projetElement.setAttribute("categoryId", projet.categoryId)
        projetElement.className = 'projet';
        projetElement.innerHTML = `
        <img src="${projet.imageUrl}" alt="${projet.title}">
        <figcation>${projet.title}</figcaption>`
        galleryElement.appendChild(projetElement)
    }

//add categories listeners
    const selectedButtons = [...document.querySelectorAll("#filtres button")];
    console.log(selectedButtons)
    for (let button of selectedButtons) {
        button.addEventListener('click', (event) => {
            const element = event.target
            const id = element.getAttribute("id")
            const figures = [...document.querySelectorAll('#gallery figure')];

            // TOUS
            if (id==='0') {
                for (let figure of figures)  {
                    figure.classList.remove('hidden')
                }
            } else {

                for (let figure of figures)  {
                    // figure of categoryId
                    const figureCategoryId = figure.getAttribute("categoryId")
                    if( id ===  figureCategoryId ) {
                        // show figure
                        figure.classList.remove('hidden')
                    } else {
                        // hide figure
                        figure.classList.add('hidden')
                    }
                }
            }
        })
    }

    const imageGallery = document.querySelector("#edition-photo");
    console.log(imageGallery)

    for (let i=0; i < projets.length; i++) {
        const image = projets[i]
        const imageElement = document.createElement('div');
        imageElement.setAttribute("imageUrl", image.imageUrl)
        imageElement.className = 'images';
        imageElement.innerHTML = `
        <div>
            <i class="fa-solid fa-up-down-left-right"></i>
            <i class="fa-solid fa-trash-can"></i>
        </div>
        <img src="${image.imageUrl}" alt="${image.title}">
        <p>éditer</p>`
        imageGallery.appendChild(imageElement)
    }


const user = localStorage.getItem("user")
console.log(user ? "connecté" : "non connecté")

// Création de logout
const logbutton = document.querySelector('#login');

if (user !== null) {
    // change login to logout
    logbutton.innerHTML = `<a href="#">logout</a>`
    // OU login.textContent = "logout"
    //     login.setAttribute("href", "#") => Sans oublier de corriger le HTML 
    

    // Remove filters
    const categoryElement = document.querySelector("#filtres");
    categoryElement.remove()

    // Création du bandeau 
    const bandeauEnTete = document.querySelector('#bandeau')
    bandeauEnTete.classList.remove('hidden')

    // Création boutons des modales
    const addButtonModals = [...document.querySelectorAll('.button-modal')]
    addButtonModals.forEach( addButtonModal => {
        const buttonModal = document.createElement('a')
        buttonModal.classList.add("js-modal")
        buttonModal.setAttribute("href", "#modal")
        buttonModal.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`,
        addButtonModal.appendChild(buttonModal)
    })    
 

    // enable modals
    document.querySelectorAll("#edit-projects .js-modal").forEach(a => {
        a.addEventListener('click', openModal) 
    });

    // Evenement pour se déconnecter
    logbutton.addEventListener('click', e => {
        e.preventDefault()
        localStorage.removeItem("user");
        window.location.href = "index.html" //Permet de rediriger la déconnexion sur la page souhaitée
    })
}
