document.getElementById("logout").addEventListener("click", async (e) => {
  e.preventDefault()

  try {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }

    const response = await fetch("http://localhost:3000/accounts/logout", options)

    if (response.status = 200) {
      localStorage.removeItem("token")
      window.location.assign("./redirect.html")
    }
  } catch (error) {
    console.log(error.message)    
  }
})