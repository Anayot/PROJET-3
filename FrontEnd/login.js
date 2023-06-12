const emailConnexion = document.getElementById('email');
const passwordConnexion = document.getElementById('password');
const formulaireConnexion = document.getElementById("login");



formulaireConnexion.addEventListener("submit", (event) => {
    let messages = []
    if (emailConnexion.value === '' || emailConnexion == null) {
        messages.push ("Erreur dans l’identifiant ou le mot de passe")
    }
    if (messages.length > 0) {
        event.preventDefault()
        errorElement.innerText = messages.join('')
    }
});