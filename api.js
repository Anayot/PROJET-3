const HOST = "http://localhost:5678"; 
const apiUrl = HOST+"/api";

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
        console.log("userId: "+userInfo.userId)
        console.log("token: "+userInfo.token)
        const result = {id:userInfo.userId, token:userInfo.token}
        localStorage.setItem("user", JSON.stringify(result))
        return result
    })
    .catch( err => {
        console.log("erreur : ", err)
        return {id:-1, token: "", error: err}
    }))
}

// fetch post api/works


