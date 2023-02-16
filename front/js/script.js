// Nous sélectionnons l'emplacement où nous montrerons nos produits.
const getData = async (endpoint= "http://localhost:3000/api/products") => {
    try {
        return await (await fetch(endpoint)).json()
    // On utilise un message d'excuse en cas d'erreur.
    } catch (error) {
        console.error(error)
        alert("Pas de données, veuillez nous excuser.");
    }
}

const chargerProduit = (products) => {
const Items = document.querySelector('#items');
    // On placera ces données dans une constante Product.
    for (const Product of products){
        console.log(Product);

        // On produit les éléments HTML de la page "index.html" pour ensuite y insérer les données récupérées de l'API.
        let newLink = document.createElement('a');
        newLink.href = `./product.html?id=${Product._id}`;
        Items.appendChild(newLink);

        let newArticle = document.createElement('article');
        newLink.appendChild(newArticle);

        let newImg = document.createElement('img');
        newImg.setAttribute("src", Product.imageUrl);
        newImg.setAttribute("alt", Product.altTxt);
        newArticle.appendChild(newImg);

        let newH3 = document.createElement('h3');
        newH3.setAttribute("class", "productName");
        newH3.innerText = Product.name;
        newArticle.appendChild(newH3);

        let newP = document.createElement('p')
        newP.setAttribute("class", "productDescription");
        newP.innerText = Product.description;
        newArticle.appendChild(newP);
    }
}
// On crée une fonction asynchrone auto-exécutée.
// (1) Appelle la fonction "getData()" qui retourne une promesse.
// (2) Attend la résolution de cette promesse avec "await".
// (3) Passe la valeur résolue à la fonction "chargerProduit" en tant qu'argument.
(async () => {
    chargerProduit(await getData())
})()