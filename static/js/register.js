const submitButton = document.getElementById("submitBtn");

submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Redirect the user to the login page
    window.location.href = "./login.html";
});
