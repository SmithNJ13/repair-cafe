document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const options = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_name: form.get("username"),
            user_password: form.get("password")
        })
    }

    const response = await fetch("https://cafe-test-ngey.onrender.com/accounts/login", options)
    const data = await response.json()

    if(response.status == 200) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("id", data.id)
        window.location.assign("index.html")
    } else {
        alert(data.error)
    }
})
