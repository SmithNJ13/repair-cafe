document.getElementById("logout").addEventListener("click", async (e) => {
  e.preventDefault()

  try {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }

    const response = await fetch("https://cafe-test-ngey.onrender.com/accounts/logout", options)

    if (response.status = 200) {
      localStorage.removeItem("token")
      localStorage.removeItem("id")
      window.location.assign("./index.html")
    }
  } catch (error) {
    console.log(error.message)    
  }
})