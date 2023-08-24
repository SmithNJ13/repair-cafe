document.addEventListener("DOMContentLoaded", async () => {
    const itemForm = document.getElementById("itemForm")
    const itemPostedMessage = document.getElementById("itemPostedMessage")
    itemForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(itemForm)
        const data = {}
        formData.forEach((value, key) => {
            data[key] = value
        })
        try {
            const response = await fetch("http://localhost:5000/items", {
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