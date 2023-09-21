const HOST = "http://localhost:5678"; 
const apiUrl = HOST+"/api";

const auth = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return {
        userId: user.id,
        token: user.token
    }
}

// fetch api/works
export async function fetchGallery () {
    const projectsUrl = apiUrl+"/works";
    const projets = await fetch(projectsUrl).then(gallery => gallery.json())
    return projets
}

// fetch api categories
export async function fetchCategories () {
    const categoriesUrl = apiUrl+"/categories";
    const categories = await fetch(categoriesUrl).then(response => response.json())
    return categories
}

// fetch api login
export async function fetchLogin (pEmail, pPass) {
    const loginUrl = apiUrl+"/users/login";
    const options = { 
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify ({"email": pEmail, "password": pPass}),
    }
    return (await fetch(loginUrl, options)
    .then(response => {
        if(response.status === 401) {
            throw "Utilisateur non autorisé"
        } else if (response.status === 404) {
            throw "Utilisateur non trouvé"
        }
        if (response.ok) {
            return response.json()
        } else {
            throw "* Erreur dans l’identifiant ou le mot de passe"
        }
    })
    .then(userInfo => {
        const result = {id:userInfo.userId, token:userInfo.token}
        localStorage.setItem("user", JSON.stringify(result))
        localStorage.setItem("token", userInfo.token)
        return result
    })
    .catch( err => {
        console.log("erreur : ", err)
        return {id:-1, token: "", error: err}
    }))
}


// fetch api/works delete
export async function deletedFetch (id) {
    const deletedProjectUrl = apiUrl+"/works/"+id
    const {token, userId}  = auth()
    console.log(token)
    console.log(userId)
    const settings = {
        method: "DELETE",
        headers: { 'authorization': `bearer ${token}`},
        body: JSON.stringify({userId: userId})
    }
    return (await fetch(deletedProjectUrl, settings)
    .then(response => {
        if (response.ok) {
        } else if(response.status === 401) {
            throw "Non autorisé"
        }
        return true
    })
    .catch( err =>  {
        console.log(err)
        return false
    }));
}

export async function addFetch (formData) {
    const projectUrl = apiUrl+"/works"
    const {token, userId}  = auth()

    formData.append("userId", userId)

    const settings = {
        method: "POST",
        headers: { 'authorization': `bearer ${token}`},
        body: formData
    }
    return (await fetch(projectUrl, settings)
    .then(response => {
        if (!response.ok) {
            if(response.status === 401) {
                throw "Non autorisé"
            }
            if(response.status === 500) {
                throw "Le serveur n'a pas pu honoré la requête"
            }
            throw "problème inconnu"
        }
        return response.json()
    })
    .catch( err =>  {
        console.log(err)
        return false
    }));
}

