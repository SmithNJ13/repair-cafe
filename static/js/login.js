const submitButton = document.getElementById("submitBtn");

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.setItem("authenticated", "true");
    window.location.href = "./profile.html";
});
 
