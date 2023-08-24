document.addEventListener("DOMContentLoaded", async () => {
    const itemForm = document.getElementById("itemForm")
    const itemPostedMessage = document.getElementById("itemPostedMessage")

    const options = {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }

    const res = await fetch("https://cafe-test-ngey.onrender.com/items", options)
    if (res.status !== 200) {
        window.location.assign('./redirect.html')
    }

    itemForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(itemForm)
        const data = {}
        data['seller_id'] = localStorage.getItem("id")

        formData.forEach((value, key) => {
            data[key] = value
        })
        try {
            const response = await fetch("https://cafe-test-ngey.onrender.com/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            })
            if (response.status === 201) {
                itemPostedMessage.style.display = "block";
                console.log("Item added successfully!")
                itemForm.reset()
            } else if (response.status === 400) {
                const errorData = await response.json()
                console.error("Error adding item:", errorData.error)
            } else {
                console.error("Error adding item:", response.status, response.statusText)
            }
        } catch (error) {
            console.error("Error adding item:", error)
        }
    })
})