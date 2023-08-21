const authenticated = localStorage.getItem("authenticated") === "true";
function updateNav() {
    const logout = document.getElementById("logout")
    const login = document.getElementById("login")
    const profile = document.getElementById("profile")

    if(authenticated) {
        logout.style.display = "block";
        login.style.display = "none";
        profile.style.display = "block";
    } else {
        logout.style.display = "none";
        login.style.display = "block";
        profile.style.display = "none";
    }
}
updateNav();
module.exports = authenticated;
