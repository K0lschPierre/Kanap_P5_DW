// Récupération de la chaîne de requête et extraction de l'orderId à partir de l'URL.
const urlOrderId = new URLSearchParams(window.location.search).get("orderId");
// En l'absence d'un orderId dans l'URL, nous redirigeons vers la page d'accueil du site.
if (urlOrderId === null || urlOrderId === "") {
  alert(
    "Une erreur s'est produite lors de la validation de votre commande. Veuillez nous en excuser !"
  );
  window.location.href = "index.html";
}
// Sinon, la confirmation de commande et le numéro de commande apparaissent.
else {
  // Sélection de l'élément HTML dans lequel on veut afficher le numéro de commande
  const idCommande = document.getElementById("orderId");
  // On introduit le numéro de commande dans le HTML
  idCommande.innerText = urlOrderId;
  console.log(idCommande);
}
