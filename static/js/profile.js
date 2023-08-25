document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("https://cafe-test-ngey.onrender.com/accounts");
    const data = await response.json();
    const userName = document.querySelector("#username");

    userName.innerHTML = data.user_name;
    console.log(userName)
});
