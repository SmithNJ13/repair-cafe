document.addEventListener("DOMContentLoaded", async () => {
    const jobForm = document.getElementById("jobForm");
    const jobPostedMessage = document.getElementById("jobPostedMessage");
    
    jobForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(jobForm);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        try {
            const response = await fetch("http://localhost:5000/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            });
            
            if (response.status === 201) {
                jobPostedMessage.style.display = "block";
                console.log("Repair job posted successfully!");
                jobForm.reset();
            } else if (response.status === 400) {
                const errorData = await response.json();
                console.error("Error posting repair job:", errorData.error);
            } else {
                console.error("Error posting repair job:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error posting repair job:", error);
        }
    });
});
