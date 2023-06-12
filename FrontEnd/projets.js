fetch("http://localhost:5678/api/works")
    .then(gallery => gallery.json())
    .then(projets => {
        console.log(projets)
        const images = projets.map(projet => projet.imageUrl);
        const titres = projets.map(projet => projet.title);
        const galleryElement = document.querySelector('#gallery');
        for (let i=0; i < projets.length; i++) {
            const projetElement = document.createElement('figure');
            projetElement.innerHTML = `<img src="${images[i]}" alt="${titres[i]}"></img> <figcation>${titres[i]}</figcaption>`
            galleryElement.appendChild(projetElement)
        };

        const filtres = document.querySelector('#filtres');
            console.log(filtres)

    });




/*    const categoryId = fetch("http://localhost:5678/api/");

const boutonFiltrer = document.querySelector(".btn-objets");
boutonFiltrer.addEventListener("click", function() {
    const objetsFiltres = projets.filter(function(projet) {
        return projet.categoryId;
    });
    document.querySelector(".btn-objets").innerHTML = "";
    genererProjets(objetsFiltres);
});



        let filtres = document.querySelector('#filtres div');
        for(let filtre of filtres){
            filtre.addEventListener('click', function(){
                let tag = this.id;
            })
        };*/