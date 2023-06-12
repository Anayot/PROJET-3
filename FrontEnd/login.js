fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    body: JSON.stringify (""),
    headers: {'Content-type': 'application/json'}
});

const formulaireConnexion = document.querySelector("form");
const emailConnexion = document.getElementById('email');
const passwordConnexion = document.getElementById('password');
formulaireConnexion.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("formulaire envoyé")
    if (emailConnexion.value === '' && passwordConnexion.value === '') {
        return;
    }
    formulaireConnexion.submit();
});
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