import { fetchGallery, fetchCategories, deletedFetch, addFetch } from "./api.js"
import { openModal, closeModal, enableModal } from "./modal.js";


// get data category
const categories = [{id:0, name:"Tous"}, ...await fetchCategories()]; // Cas où on insert un nouvel élément au tableau existant
console.log(categories)

// je suis sympa, je te laisse cette fonction

const getCategoryIdByName = (name) => {
    const cat = categories.find(c=> c.name === name)
    if (cat) return cat.id
    return -1
}

const createProjectCard = (projet) => {
    const projetElement = document.createElement('figure');
    projetElement.setAttribute("id", "projet_"+projet.id)
    projetElement.setAttribute("categoryId", projet.categoryId)
    projetElement.className = 'projet';
    projetElement.innerHTML = `
    <img src="${projet.imageUrl}" alt="${projet.title}">
    <figcation>${projet.title}</figcaption>`
    return projetElement
}

const createModalmageDeleteProject = (projet) => {
    const imageElement = document.createElement('div');
    imageElement.setAttribute("id", "edition_"+projet.id)
    imageElement.setAttribute("imageUrl", projet.imageUrl)
    imageElement.className = 'images';
    imageElement.innerHTML = `
    <div>
        <i class="fa-solid fa-up-down-left-right"></i>
        <i class="fa-solid fa-trash-can project-delete" data-id="${projet.id}"></i>
    </div>
    <img src="${projet.imageUrl}" alt="${projet.title}">
    <p>éditer</p>`
    return imageElement
}

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
    console.log(galleryElement)

    for (let i=0; i < projets.length; i++) {
        const card = createProjectCard(projets[i])
        galleryElement.appendChild(card)
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
            if (id ==='0') {
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
            const imageCard = createModalmageDeleteProject(projets[i])
            imageGallery.appendChild(imageCard)
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
    document.getElementById("edit-projects").addEventListener('click', () => {
        openModal("modal-edition")
    })
    enableModal("modal-edition")
    enableModal("modal-new")

    const modalButton = document.querySelector('#modal-edition .new-picture')
    modalButton.addEventListener('click', () => {
        closeModal("modal-edition")
        openModal("modal-new")
    })

    const modalBack = document.querySelector('#modal-new .modal-back')
    modalBack.addEventListener('click', () => {
        closeModal("modal-new")
        openModal("modal-edition")
    })

 
    // Action du bouton de suppression du projet
    const deletedButtons = [...document.querySelectorAll('.project-delete')]

    for (let button of deletedButtons) {
        button.addEventListener('click', e => {
            console.log(button)
            e.preventDefault()
            const id = button.dataset.id
            removeProject(id)
        })
    }

// TRAITEMENT MODALE 1
    // Supprimer un projet => Action de la modale
    const removeProject = (id) => {
        deletedFetch(id)
        modalRemoveProject(id)
        pageRemoveProject(id)
    }

    // Supprimer un élément de la modal
    function modalRemoveProject(id) {
        document.getElementById("edition_"+id).remove()
    }

    //Supprimer le projet    
    function pageRemoveProject (id) {
        document.getElementById("projet_"+id).remove()
    }

// TRAITEMENT MODALE 2
const newProject = document.getElementById("new-project")
const newPicture = newProject.querySelector("#add-picture")
const inputFile = document.getElementById("input-file-unloaded")
const previewFile = document.getElementById("input-file-preview")
const newTitle = newProject.querySelector("#new-title")
const chosenCategory = document.getElementById("categories")
const errorDisplay = newProject.querySelector(".missing-spot")
const buttonSubmit = newProject.querySelector(".confirm-form")
    
    // Ajout du nouveau projet
    newProject.addEventListener("submit", async(e) => {
        e.preventDefault()
        if(!validateNewProject()) {
            return
        }
        const formData = new FormData()
        formData.append("image", newPicture.files[0]),
        formData.append("title", newTitle.value),
        formData.append("category", getCategoryIdByName(chosenCategory.value))
        const project = await addFetch(formData)
        if (project) {
            const card = createProjectCard(project)
            galleryElement.appendChild(card)
            const imageCard = createModalmageDeleteProject(project)
            imageGallery.appendChild(imageCard)
            closeModal("modal-new")
        } else {
            setError("something's went wrong !")
        }
    })

    function validateNewProject (){
        setError("")
        buttonSubmit.disabled = true
        if(!modalLoadedImage()) return false
        if(!modalNewTitle()) return false
        if(!modaleChosenCategory()) return false
        buttonSubmit.disabled = false
        return true
    }

    newTitle.addEventListener("change", () => {
        validateNewProject()
    })

    chosenCategory.addEventListener("change", () => {
        validateNewProject()
    })

    // Ajouter une image
    // Modification de l'icône par l'image
    newPicture.addEventListener("change", () => {
        const loadedPicture = newPicture.files[0];
        if (loadedPicture) {
            previewFile.src=URL.createObjectURL(loadedPicture)
            previewFile.classList.remove("hidden")
            inputFile.classList.add("hidden")

        } else {
            previewFile.classList.add("hidden")
            inputFile.classList.remove("hidden")
        }

        validateNewProject()
    })

    //Crétation de la fonction image
   
    function modalLoadedImage () {
        if(!newPicture.files.length > 0 && newPicture.files[0] === "") {
            setError("* Veuillez mettre une photo")
        } else {
            return true
        }        
    }

    // Ajouter un titre au projet
    function modalNewTitle () {
        const verifyTitle = newTitle.value.trim();
        if (verifyTitle === "") {
            setError("* Veuillez mettre un titre")
        } else {
            return true
        }
    }

    // Définir une catégorie au projet
    // Récupération des catégorie Modale 2
    const selectedCategories = document.querySelector(".complete-form select");
    const option = document.createElement('option');
    option.textContent = `--`
    selectedCategories.appendChild(option)
    console.log(selectedCategories)
        
        for(let i=1; i < categories.length; i++) {
            const category = categories[i]
            const optionCategory = document.createElement('option');
            optionCategory.setAttribute("id", category.name)
            optionCategory.textContent = `${category.name}`;
            selectedCategories.appendChild(optionCategory)
        }
    
    function modaleChosenCategory () { 
        console.log(chosenCategory.value, chosenCategory.options)
        if (chosenCategory.value === "--") {
            setError("* Veuillez sélectionner une catégorie")
        } else {
            return true
        }
    }
   
    function setError(error) {
        errorDisplay.textContent = error;
    }


// Evenement pour se déconnecter
    logbutton.addEventListener('click', e => {
        e.preventDefault()
        localStorage.removeItem("user");
        window.location.href = "index.html" //Permet de rediriger la déconnexion sur la page souhaitée
    })
}
