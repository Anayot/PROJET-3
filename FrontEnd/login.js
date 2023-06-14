/*// Récupération des données
const url = "http://localhost:5678/api/users/login";
const identifiant = {"email": "", "password": ""};

    fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify (identifiant),
    });*/
const
    email = "sophie.bluel@test.tld",
    password = "S0phie"

// Récupération des éléments
const formulaireConnexion = document.querySelector("#login");
const emailConnexion = document.querySelector('#email');
const passwordConnexion = document.querySelector('#password');

// Evenements

formulaireConnexion.addEventListener('submit', e => {
    e.preventDefault();

    form_verify();
    console.log(formulaireConnexion)
});

// Fonctions
function form_verify(){
    const emailValue = emailConnexion.value.trim();
    const passwordValue = passwordConnexion.value.trim();

    if (emailValue === "") {
        let message = "Erreur dans l’identifiant ou le mot de passe";
        setError(emailConnexion, message);
    }else if (!email_verify(emailValue)){ 
        let message = "Email non valide";
        setError(emailConnexion, message);
    }else{
        setSuccess(emailConnexion)
    }
}

function setError(elem, message) {
    const formControl = elem.parentElement;
    const error = formControl.querySelector('.error');

    // Ajout du message d'erreur
    error.innerText = message
}

function setSuccess(elem) {
    const formControl = elem.parentElement;

}

function email_verify(email) {
    return email
}

/*
const url = "http://localhost:5678/api/users/login";
const identifiant = {"email": "", "password": ""};

    fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify (identifiant),
    });


const erreurConnexion = document.querySelector('.error');

emailConnexion.addEventListener("input", function(e) {
    if (emailConnexion.validity.valid) {
        error.innerHTML = "";
        error.className = "error";
    }
}, false);
passwordConnexion.addEventListener("input", function(e) {
    if (passwordConnexion.validity.valid) {
        error.innerHTML = "";
        error.className = "error";
    }
}, false);

formulaireConnexion.addEventListener("submit", function(e) {
    if (!emailConnexion.validity.valid === '' && passwordConnexion.validity.valid === '') {
        error.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
        error.className = "error active";
        e.preventDefault();
    }
}, false);
/*document.getElementById("login").addEventListener("submit", function(e) {
    e.preventDefault();

    const xhr = new XMLHttpRequest ();
    xhr.onreadystatechange = function() {
        console.log(this);
    };

    xhr.open("GET", "http://localhost:5678/api/users/login", true )
    xhr.send();

    return false;
});



/*const identifiant = {
    email: "sophie.bluel@test.tld",
    password: "S0phie"
}

fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    body: JSON.stringify (identifiant),
    headers: {'Content-type': 'application/json'}
});


const formulaireConnexion = document.getElementById("login");
formulaireConnexion.addEventListener("submit", function(event) {

    const erreur = false;

    const emailConnexion = document.getElementById('email');
    const passwordConnexion = document.getElementById('password');
    for (let i=0; i <formulaireConnexion.clientHeight; i++) {
        if (!formulaireConnexion[i].value) {
            erreur = "Erreur dans l’identifiant ou le mot de passe";
        } else {

        }
    }
    
});

const emailConnexion = document.getElementById('email');
const passwordConnexion = document.getElementById('password');
const formulaireConnexion = document.querySelector("login");

formulaireConnexion.addEventListener("submit", (event) => {
    let messages = [];
    if (emailConnexion.value === '' && passwordConnexion.value === '') {
        messages.push ("Erreur dans l’identifiant ou le mot de passe")
    }

});
*/