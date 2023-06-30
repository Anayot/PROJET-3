let modal = null
/*const focusableSelector = 'button, a, input, textarea'
let foucusables = []
let previouslyFocusedElement = null*/

export const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    //foucusables = Array.from(modal.querySelector(focusableSelector))
    //previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null
    //foucusables[0].focus()
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector(".js-modal-close").addEventListener('click', closeModal)
    modal.querySelector(".js-modal-stop").addEventListener('click', stopPropagation)

};

export const closeModal = function (e) {
    if(modal === null) return
    //if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector(".js-modal-close").removeEventListener('click', closeModal)
    modal.querySelector(".js-modal-stop").removeventListener('click', stopPropagation)
    modal = null
};

const stopPropagation = function (e) {
    e.stopPropagation()
}

/*const focusInModal = function (e) {
    e.preventDefault()

    let index = foucusables.findIndex(f => f === modal.querySelector(':focus'))
    if (shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= foucusables.length) {
        index = 0
    }
    if (index < 0){
        index = foucusables.length -1
    }
    foucusables[index].focus()
}*/


/*
window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
});*/