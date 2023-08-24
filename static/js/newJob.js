document.addEventListener("DOMContentLoaded", async () => {
    const jobForm = document.getElementById("jobForm")
    const jobPostedMessage = document.getElementById("jobPostedMessage")

    const options = {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }

    const res = await fetch("https://cafe-test-ngey.onrender.com/items", options)
    if (res.status !== 200) {
        window.location.assign('./redirect.html')
    }
    
    jobForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formData = new FormData(jobForm);
        const data = {}
        data['customer_id'] = localStorage.getItem("id")
        
        formData.forEach((value, key) => {
            data[key] = value
        })
        
        try {
            const response = await fetch("https://cafe-test-ngey.onrender.com/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            })
            
            if (response.status === 201) {
                jobPostedMessage.style.display = "block";
                console.log("Repair job posted successfully!")
                jobForm.reset();
            } else if (response.status === 400) {
                const errorData = await response.json()
                console.error("Error posting repair job:", errorData.error)
            } else {
                console.error("Error posting repair job:", response.status, response.statusText)
            }
        } catch (error) {
            console.error("Error posting repair job:", error)
        }
    })
})
