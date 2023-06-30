import { fetchLogin } from "./api.js";

    // Récupération des éléments
    const formulaireConnexion = document.querySelector("#login");
    const emailConnexion = document.querySelector('#email');
    const passwordConnexion = document.querySelector('#password');
    const errorElement = document.querySelector('.error');
    console.log(formulaireConnexion, emailConnexion, passwordConnexion)
    
    errorElement.textContent = ""
    // Evenements

    formulaireConnexion.addEventListener('submit', e => {
        e.preventDefault()
        errorElement.textContent = ""
        console.log(formulaireConnexion)
        console.log("onsubmit")
        form_verify()
    });

    // Fonctions
    function form_verify(){
        const emailValue = emailConnexion.value.trim();
        const passwordValue = passwordConnexion.value.trim();

        if (emailValue === "" || passwordValue === "") {
            onError("* Erreur dans l’identifiant ou le mot de passe");
        }else{
            errorElement.textContent = ""
            onSuccess(emailValue, passwordValue)
        }
    }



const onError = (message) => {
    errorElement.textContent = message
}

const onSuccess = async (a, b) => {
    const login = await fetchLogin (a, b);
    if (login.error) {
        onError(login.error)
        return false
    }
    console.log(login)
    window.location.href = "index.html"
}
