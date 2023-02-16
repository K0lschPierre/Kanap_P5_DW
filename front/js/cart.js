document.title = "Panier"
// On récupère les données stockées dans le Live Server.
let basket = JSON.parse(window.localStorage.getItem("panier"));

// On déclare les variables qui nous permettront de calculer le prix et la quantité.
var totalQuantity = 0;
var totalPrice = 0;
let mesProduits = [];
const findProducts = 0;
let quantity = 0;

// On déclare les variables pour la gestion du formulaire
const buttonCommander = document.getElementById("order");
let errorFormulaireFirstName = true;
let errorFormulaireLastName = true;
let errorFormulaireAdress = true;
let errorFormulaireCity = true;
let errorFormulaire = true;

                                            // Fonctions pour le calcul des totaux \\
function recalculTotalQuantity() {
    let newTotalQuantity = 0;
    for (const produit of basket) {
        // On calcul le nombre de quantité total de produits dans le localStorage
        newTotalQuantity += parseInt(produit.quantityProduct);
    }
        console.log("Nouvelle quantité totale panier",newTotalQuantity);
    // On affiche la nouvelle quantité totale de produits dans le HTML
    document.getElementById("totalQuantity").innerText = newTotalQuantity;
}

// On crée la fonction pour recalculer le prix total du "Panier".
function recalculTotalPrice() {
    let newTotalPrice = 0;
    // (1) On fait une boucle sur le productRegisterInLocalStorage et dans cette boucle, 
    for (const produit of basket) {
        const idProductsLocalStorage = produit.idProduct;
        const quantityProductsLocalStorage = produit.quantityProduct;
        // (2) on vérifie si l'id correspond
        const findProducts = mesProduits.find((element) => element._id === idProductsLocalStorage);
        console.log(findProducts);
        // (3) et si c'est le cas, on récupère le prix.
        if (findProducts) {
            const newTotalProductPricePanier = findProducts.price * quantityProductsLocalStorage;
            newTotalPrice += newTotalProductPricePanier;
                console.log("Nouveau prix total panier",newTotalPrice);
        }
    // On affiche le nouveau prix total du "Panier" dans le HTML.
    document.getElementById("totalPrice").innerText = newTotalPrice;
    }
} 

// On crée la fonction pour l'ordre alphabétique des produits dans le "Panier".
function sortProducts(){
    basket.sort(function (a,b){
        if (a.nameProduct < b.nameProduct){
            return -1;
        }else{
            return 1;
        }
})}

// On crée la fonction supprimée un produit dans la page "Panier".
function deleteProduct() {
    let selectSupprimer = document.querySelectorAll(".deleteItem");
    selectSupprimer.forEach((selectSupprimer) => {
            selectSupprimer.addEventListener("click" , (event) => {
                event.preventDefault();
                // On pointe le parent hiérarchique <article> du lien "Supprimer"
                let myArticle = selectSupprimer.closest('article');
                console.log(myArticle);
                // On filtre les éléments du localStorage pour ne garder que ceux qui sont différents de l'élément qu'on supprime
                basket = basket.filter
                ( element => element.idProduct !== myArticle.dataset.id || element.colorProduct !== myArticle.dataset.color );
                // On met à jour le localStorage
                localStorage.setItem("panier", JSON.stringify(basket));
                // On informe l'utilisateur que le produit a été supprimé.
                alert("Vous venez de supprimer le produit de votre panier.");
                // On supprime physiquement la balise <article> du produit que l'on supprime depuis son parent, si elle existe
                if (myArticle.parentNode) {
                    myArticle.parentNode.removeChild(myArticle);
                    recalculTotalQuantity()
                    recalculTotalPrice()
                }
                //Si, le localStorage ou le tableau qu'il contient est vide on affiche le panier vide
                else {
                    alert("Votre panier est vide")
                }
            }); 
    })
}

// Fonction pour modifier les quantités directement sur la page panier
function changeQuantity() {
    // On sélectionne l'élément html (input) dans lequel la quantité est modifiée
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    changeQuantity.forEach(item => {
        //On écoute le changement sur l'input "itemQuantity"
        item.addEventListener("change", (event) => {
            event.preventDefault();
            choiceQuantity = Number(item.value);
            // On pointe le parent hiérarchique <article> de l'input "itemQuantity"
            let myArticle = item.closest('article');
            console.log(myArticle);
            // On récupère dans le localStorage l'élément (même id et même couleur) dont on veut modifier la quantité
            let selectMyArticleInLocalStorage = basket.find
            ( element => element.idProduct === myArticle.dataset.id && element.colorProduct === myArticle.dataset.color );
            console.log(selectMyArticleInLocalStorage);


            // Si les conditions sont corrects, on met à jour la quantité dans le localStorage et le DOM
            if(choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)){

                parseChoiceQuantity = parseInt(choiceQuantity);
                selectMyArticleInLocalStorage.quantityProduct = parseChoiceQuantity;
                console.log(parseChoiceQuantity);
                localStorage.setItem("panier", JSON.stringify(basket));

                recalculTotalQuantity();
                recalculTotalPrice();
            }
            else {
                item.value = selectMyArticleInLocalStorage.quantityProduct;
                alert("La quantité choisie doit être comprise entre 1 et 100");
            }})
        })
}
                                                    // REGEX \\

// Récupération des coordonnées du formulaire client et mise en variable
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');

// Création des expressions régulières pour contrôler les infos entrées par l'utilisateur
    let textRegex = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,. '-]+[^ ]+[^0-9]$");
    let addressRegex = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    let emailRegex = new RegExp("^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-z0-9]+[.][a-z][a-z]+$");

// Déclaration des variables pour vérifier la bonne valeur des champs du formulaire
    let checkValueFirstName;
    let checkValueLastName;
    let checkValueAddress;
    let checkValueCity;
    let checkValueEmail;

        // On écoute le contenu et on vérifie le champ "FirstName", on affiche un message s'il (le contenu du champ) est incorrect.
        inputFirstName.addEventListener('change', function() {
            let firstNameErrorMsg = inputFirstName.nextElementSibling;
            checkValueFirstName = textRegex.test(inputFirstName.value);
            if (checkValueFirstName) {
                firstNameErrorMsg.innerText = '';
                errorFormulaireFirstName = false;

            } 
            else {
                firstNameErrorMsg.innerText = 'Veuillez indiquer un prénom valide.';
                errorFormulaireFirstName = true;
            }
        });

        // On écoute le contenu et on vérifie le champ "Name", on affiche un message s'il (le contenu du champ) est incorrect.
        inputLastName.addEventListener('change', function() {
            let lastNameErrorMsg = inputLastName.nextElementSibling;
            checkValueLastName = textRegex.test(inputLastName.value);
            if (checkValueLastName) {
                lastNameErrorMsg.innerText = '';
                errorFormulaireLastName = false;
            }
            else {
                lastNameErrorMsg.innerText = 'Veuillez indiquer un nom de famille valide.';
                errorFormulaireLastName = true;
            }
        });

        // On écoute le contenu et on vérifie le champ "Address", on affiche un message s'il (le contenu du champ) est incorrect.
        inputAddress.addEventListener('change', function() {
            let addressErrorMsg = inputAddress.nextElementSibling;
            checkValueAddress = addressRegex.test(inputAddress.value);
            if (checkValueAddress) {
                addressErrorMsg.innerText = '';
                errorFormulaireAddress = false;
            }
            else {
                addressErrorMsg.innerText = 'Veuillez indiquer une adresse valide.';
                errorFormulaireAddress = true;
            }
        });

        // On écoute le contenu et on vérifie le champ "City", on affiche un message s'il (le contenu du champ) est incorrect.
        inputCity.addEventListener('change', function() {
            let cityErrorMsg = inputCity.nextElementSibling;
            checkValueCity = textRegex.test(inputCity.value);
            if (checkValueCity) {
                cityErrorMsg.innerText = '';
                errorFormulaireCity = false;
            } else {
                cityErrorMsg.innerText = 'Veuillez indiquer le nom d\'une ville valide.';
                errorFormulaireCity = true;
            }
        });

        // On écoute le contenu et on vérifie le champ "Email", on affiche un message s'il (le contenu du champ) est incorrect.
        inputEmail.addEventListener('change', function() {
            let emailErrorMsg = inputEmail.nextElementSibling;
            checkValueEmail = emailRegex.test(inputEmail.value);
            if (checkValueEmail) {
                emailErrorMsg.innerText = '';
                errorFormulaireEmail = false;
            }
            else {
                emailErrorMsg.innerText = 'Veuillez renseigner un email valide.';
                errorFormulaireEmail = true;
            }
        });

// Si le panier n'est pas vide, alors le panier s'affiche.
if (basket !== null){
    console.log(basket);
    sortProducts();

    fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .then(products =>{

        mesProduits = products;

        for (const produit of basket){

            // On déclare nos variable comprenant les infos du LiveServer.
            const ID = produit.idProduct
            const color = produit.colorProduct;
            let quantity = parseInt(produit.quantityProduct);
            let produitChoisi = products.find(element => element._id === ID);
            console.log(produitChoisi);    

            let newArticle = document.createElement('article');
            newArticle.setAttribute("class","cart__item");
            newArticle.setAttribute("data-id",`${ID}`);
            newArticle.setAttribute("data-color",`${color}`);
            document.getElementById("cart__items").appendChild(newArticle);

            let imgDiv = document.createElement('div');
            imgDiv.setAttribute("class","cart__item__img");
            newArticle.appendChild(imgDiv);

            let img = document.createElement('img');
            img.setAttribute("src",`${produitChoisi.imageUrl}`);
            img.setAttribute("alt",`${produitChoisi.altTxt}`)
            imgDiv.appendChild(img);

            let content = document.createElement('div');
            content.setAttribute("class","cart__item__content");
            newArticle.appendChild(content);

            let description = document.createElement("div");
            description.setAttribute("class","cart__item__content__description");
            content.appendChild(description);

            let productName = document.createElement('h2');
            productName.innerText = produitChoisi.name;
            description.appendChild(productName);

            let colorName = document.createElement('p');
            colorName.innerText = color;
            description.appendChild(colorName);

            const productsTotalPrice = produitChoisi.price * quantity;
            let price = document.createElement('p')
            price.innerText = ("Prix unitaire : "+ produitChoisi.price + "€");
            description.appendChild(price);

            let settings = document.createElement("div");
            settings.setAttribute("class","cart__item__content__settings");
            content.appendChild(settings);

            let quantitySetting = document.createElement('div');
            quantitySetting.setAttribute("class","cart__item__content__settings__quantity");
            settings.appendChild(quantitySetting);

            let quantitySettingContent = document.createElement('p');
            quantitySettingContent.innerHTML = ("Qté : ");
            quantitySetting.appendChild(quantitySettingContent);

            let quantitySettingInput = document.createElement('input')
            quantitySettingInput.type = "number";
            quantitySettingInput.setAttribute("class","itemQuantity");
            quantitySettingInput.name = "itemQuantity";
            quantitySettingInput.min = "1";
            quantitySettingInput.max = "100"
            quantitySettingInput.setAttribute("value",`${quantity}`);
            quantitySetting.appendChild(quantitySettingInput);


            let deleteProduct = document.createElement('div');
            deleteProduct.className = "cart__item__content__settings__delete";
            settings.appendChild(deleteProduct);

            let deleteProductButton = document.createElement('p');
            deleteProductButton.className = "deleteItem";
            deleteProductButton.innerText = "Supprimer";
            deleteProduct.appendChild(deleteProductButton);


            // On crée les fonctions de calcul de prix et de quantité totaux au chargement de la page.
            function totalQuantityInital (){        
                totalQuantity += produit.quantityProduct;
                document.querySelector("#totalQuantity").innerText = totalQuantity;
            }

            function totalPriceInitial(){
                totalPrice += productsTotalPrice;
                document.querySelector("#totalPrice").innerText = totalPrice;
                }

            totalQuantityInital();
            totalPriceInitial();

        }

        deleteProduct();    
        changeQuantity();
    })

    .catch(error =>{
        alert("Une erreur s'est produite lors du chargement de votre panier. Veuillez vérifier votre connexion internet et rafraichir la page svp.")
        console.log(error);
    })

    // On écoute le "click" sur le bouton commander.
    buttonCommander.addEventListener("click", event =>{
        event.preventDefault();
        // Si le panier est vide, on affiche un message.
        if(basket == null | basket == undefined | basket.length == 0){
            alert("Votre panier est vide.");
        }

        else {
            // Si un des champs du formulaire est vide, on affiche un message d'erreur.
            if(!inputFirstName.value | !inputLastName.value | !inputAddress.value | !inputCity.value | !inputCity.value | !inputEmail.value){
                alert("Attention ! Tous les champs du formulaire doivent être remplis.")
            }

            // Si les champs du formulaire ne sont pas correctement remplis, on affiche un message d'erreur.
            else if(errorFormulaireFirstName == true | errorFormulaireLastName == true | errorFormulaireAddress == true | errorFormulaireCity == true | errorFormulaireEmail == true){
                alert("Un problème est présent dans votre formulaire de contact, veuillez le remplir correctement.");
            }

            // Si tous les champs sont remplis correctement les informations sont transmises au "Panier".
            else {
                //Récupération des id des produits du panier, dans le localStorage
                let idProducts = [];
                for (let l = 0; l<basket.length;l++) {
                    idProducts.push(basket[l].idProduct);
                }
                    console.log(idProducts);
                // On créé un objet dans lequel on met les infos "Contact" et les infos "Produits du panier" (l'id)
                const order = {
                    contact: {
                        firstName: inputFirstName.value,
                        lastName: inputLastName.value,
                        address: inputAddress.value,
                        city: inputCity.value,
                        email: inputEmail.value,
                    },
                    products: idProducts,
                } 
                   console.log(order);
                // On indique la méthode d'envoi des données
                const options = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(order)
                };
                // On envoie les données "Contact" et l'Id des produits à l'API
                fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {
                    // on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
                    document.location.href = `confirmation.html?orderId=${data.orderId}`;
                })
                .catch((err) => {
                    console.log("Erreur Fetch product.js", err);
                    alert ("Nous rencontrons actuellement un problème technique, veuillez réitérer votre commande ultérieurement.");
                });
                // On vide le localStorage
                localStorage.clear();
            };
          }
        });
}else{alert("Votre panier est vide, veuillez sélectionner un article pour continuer.");}