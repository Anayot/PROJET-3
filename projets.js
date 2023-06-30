import { fetchGallery, fetchCategories } from "./api.js"
import { openModal } from "./modal.js";



// get dat category
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


const user = localStorage.getItem("user")
console.log(user ? "connecté" : "non connecté")

// Création de logout
const enTete = document.querySelector("#en-tete")
const login = document.querySelector('#login');
const logout = document.createElement('li');
logout.innerHTML = `<li><a href="index.html">logout</li>`

if (user !== null) {
    // change login to logout // Méthode d'instance .replaceChild (new, ancien)
    enTete.appendChild(logout)
    enTete.replaceChild(logout, login)

    // logout eventlistener -> {
    //      empty "user" in localStorage -> removeItem
    //      reload index.html -> window.location.href = "index.html"
    // }
    // Evenement pour se déconnecter
    logout.addEventListener('click', e => {
        e.preventDefault()
        localStorage.removeItem("user");
        window.location.href = "index.html" //Permet de rediriger la déconnexion sur la page souhaitée
    })

    // Remove filters
    const categoryElement = document.querySelector("#filtres");
    categoryElement.remove()

    // Création du bandeau 
    const bandeauEnTete = document.querySelector('#bandeau')
    const editionMode = document.createElement('p')
    editionMode.innerHTML = `<p><i class="fa-regular fa-pen-to-square"></i> Mode édition</p>`
    const published = document.createElement('button')
    published.textContent = "publier les changements"    
    //Ajout de la barre noire en haut de la page
    bandeauEnTete.appendChild(editionMode)
    bandeauEnTete.appendChild(published) 

    // Création boutons des modales
    const addButtonModals = [...document.querySelectorAll('.button-modal')]
    addButtonModals.forEach( addButtonModal => {
        const buttonModal = document.createElement('a')
        buttonModal.innerHTML = `<a href="#modal" class="js-modal"><i class="fa-regular fa-pen-to-square"></i> modifier</a>`,
        addButtonModal.appendChild(buttonModal)
    })
    
    
    // Afficher les boutons "modifier"
    
 

    // enable modals
    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener('click', openModal)
    });
}

