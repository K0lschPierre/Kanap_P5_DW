// On définit la chaîne de requête où URLSearchParams récupèrera ses données.
const queryString = window.location.search;
// Dans l'URL, on récupère l'ID du produit qui a été selectionné sur la page d'accueil.
const productID = (new URLSearchParams(queryString)).get("id");
console.log(productID);

// On récupère le produit sélectionner.
fetch(`http://localhost:3000/api/products/${productID}`)
.then(response => response.json())
.then(selectedProduct => {
    console.log(selectedProduct);

    document.title = selectedProduct.name;

    // On crée une variable "img" puis on y insère les attributs nécessaires.
    const img = document.createElement('img');
    img.setAttribute("src", selectedProduct.imageUrl);
    img.setAttribute("alt", selectedProduct.altTxt);
    // On ajoute la balise "img" dans la <div> prévue (préciser l'index de la variable "emplacementImg").
    let emplacementImg = document.querySelector(".item__img");
    let i = 0;
    emplacementImg.appendChild(img);

    // On combine les éléments existant avec les données requises.
    document.getElementById("title").innerText = selectedProduct.name;
    document.getElementById("price").innerText = selectedProduct.price;
    document.getElementById("description").innerText = selectedProduct.description;

    // On crée une option pour chaque élément de l'array "colors".
    selectedProduct.colors.forEach(color => {
        let option = document.createElement('option');
        option.setAttribute("value", `${color}`);
        option.innerHTML = color;
        document.getElementById("colors").appendChild(option);
    });

    // On sélectionne le bouton "Ajouter au panier".
    const addToCartButton = document.getElementById("addToCart");

    // On écoute l'évènement "addToCart", qui envoie le choix des utilisateurs.
    addToCartButton.addEventListener("click",(Event) => {
        Event.preventDefault();
        // On définit les variables qui apparaîtront dans le "Panier".
        const colorChoice = document.getElementById("colors").value;
        const quantity = document.getElementById("quantity");
        let quantityChoice = Number(quantity.value);

        // S'il n'y a pas de quantité ni de couleur sélectionné, alors on affiche un message d'erreur.
        if (colorChoice ==="" || colorChoice ==null || colorChoice == undefined || quantityChoice == undefined || quantityChoice == null || quantityChoice < 1 || quantityChoice > 100) {
            alert("Veuillez sélectionner une couleur et une quantité valide (entre 1 et 100) pour ce produit");
        }
        // Sinon, nous ajoutons le produit et ses caractéristiques au panier.
        else {
            const productOption = {
                idProduct: selectedProduct._id,
                colorProduct: colorChoice,
                quantityProduct: quantityChoice,
                nameProduct: selectedProduct.name 
            }
                console.log(productOption);

                // On ajoute dans le LiveServer un produit sélectionné par l'utilisateur en fonction des options choisies.
                const addProductToLocalStorage = () => {
                    // On crée la variable qui détermine si un objet est déjà présent dans le LiveServer.
                    let found = basket.find(element => {return ((element.idProduct === productOption.idProduct) && (element.colorProduct === productOption.colorProduct))});
                    console.log(found);
                    // Si le produit est déjà présent, on y ajoute la quantité sélectionner à celle du panier.
                    if (found) {
                        const total = found.quantityProduct + productOption.quantityProduct;
                        // Si le total dépasse les 100 unités, on affiche un message d'erreur.
                        if (total > 100) {
                            alert("La quantité totale d'un produit ne doit pas être supérieure à 100. Merci d'effectuer une autre commande en complément de celle-ci si votre demande est supérieure à 100 unités d'un même modèle.");
                        }
                        // Sinon, on définit la quantité sélectionnée comme celle du panier.
                        else {
                            found.quantityProduct = total;
                            // On informe l'utilisateur que la quantité est bien modifiée en spécifiant les caractéristiques du produit choisi.
                            alert(`Le ${selectedProduct.name} de couleur ${colorChoice} a bien été ajouter à votre panier.`);
                            console.log(found.quantityProduct);
                        }
                    }
                    // Si le produit n'est pas présent, on informe l'utilisateur et on ajoute les caractéristiques choisies au Live Server.
                    else {
                        basket.push(productOption);
                        alert(`Vous avez bien ajouté ${quantityChoice} ${selectedProduct.name} de couleur ${colorChoice} à votre panier.`)
                    }
                    // On conserve ces informations dans le Live Server, en reprenant les informations que l'on met sous JSON.
                    localStorage.setItem("panier",JSON.stringify(basket));
                }
            // On déclare la variable "basket", qui correspond au panier en récupérant les informations JSON du "Panier".
            let basket = JSON.parse(localStorage.getItem("panier"));
            // Si le Live Server contient déjà des informations, on ajoute un objet de l'array "basket".
            if(basket) {
                addProductToLocalStorage();
                console.log(basket);
            }
            // Sinon, on crée l'array "basket" et on y ajoute le produit et ses options au Live Server.
            else {
                basket = [];
                addProductToLocalStorage();
                console.log(basket);
                alert ("Vous venez d'ajouter cet article à votre panier.")
            }   
        }
    })
})

// On prévoit un message d'erreur en cas de problème.
.catch(error => {
    alert("Un problème est survenu, veuillez nous excuser.");
    console.log(error)
})