document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const options = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: form.get("email"),
            user_name: form.get("username"),
            user_password: form.get("password")
        })
    }
    const response = await fetch("http://localhost:3000/accounts", options);
    const data = await response.json();
    if(response.status == 201) {
        window.location.href = "./login.html"
    } else {
        alert(data.error);
    }
})
