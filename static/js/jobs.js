document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("https://cafe-test-ngey.onrender.com/jobs");
    const data = await response.json();
    const arr = data.data;

    // Create DOM Element(s)
    function pCreate(id, text) {
        const p = document.createElement('p')
        p.id = id
        p.textContent = text
        return p
    }

    // Create Container(s)
    function containerCreate(job) {
        const str = job.post_date.toString().split("T")[0];
        console.log(str);

        const jobElement = document.createElement('div');
        jobElement.className = 'container job';
        jobElement.id = `job_${job.job_id}`;jobElement
        jobElement.appendChild(pCreate('name', job.job_name));
        jobElement.appendChild(pCreate('date', str));
        jobElement.appendChild(pCreate('desc', job.job_description));
        jobElement.appendChild(pCreate('available', `available: ${job.available}`));
        jobElement.appendChild(pCreate('completed', `completed: ${job.completed}`));

        const acceptButton = document.createElement('button');
        acceptButton.id = 'accept';
        acceptButton.textContent = 'Accept';
        acceptButton.addEventListener("click", () => {
            getInfo(job.job_name, job.job_id);
        })
        jobElement.appendChild(acceptButton);

        return jobElement;
    }

    function createServicesContainer(serviceId) {
        const servicesContainer = document.createElement('div');
        servicesContainer.className = 'services';
        servicesContainer.id = serviceId.toString();
        return servicesContainer;
    }

    const mainBoxContainer = document.getElementById('main_box');
    let currentServicesId = 1;
    let currentServicesContainer = createServicesContainer(currentServicesId);
    let currentImagesContainer = null;
    let currentTextContainer = null;

    for (const item of arr) {
        if (!currentImagesContainer || currentImagesContainer.children.length >= 3) {
            mainBoxContainer.appendChild(currentServicesContainer);

            currentImagesContainer = document.createElement('div');
            currentImagesContainer.className = 'container row1-images';
            currentServicesContainer.appendChild(currentImagesContainer);

            currentTextContainer = document.createElement('div');
            currentTextContainer.className = 'container row1-text';
            currentServicesContainer.appendChild(currentTextContainer);

            currentServicesId++;
            currentServicesContainer = createServicesContainer(currentServicesId);
        }

        appendItemToContainers(item);
    }

    function appendItemToContainers(item) {
        const newItemElement = containerCreate(item);
        const newImageElement = document.createElement('img');
        newImageElement.src = './static/images/fixerCat.png';
        newImageElement.alt = 'cute cat';
        currentImagesContainer.appendChild(newImageElement);
        currentTextContainer.appendChild(newItemElement);
    }

    // Click purchase > popup appears "an item has been purchased! [item name]" > delete item and refresh page
    function getInfo(name, id) {
        alert(`A job has been accepted! [${name}]`);

        function deleteFromClient(id) {
            const DOMelement = document.querySelector(`#job_${id}`)
            if(DOMelement) {
                DOMelement.remove();
            }
        }
        async function deleteFromServer(id) {
            try {
                const response = await fetch(`https://cafe-test-ngey.onrender.com/jobs/${id}`, {
                    method: "DELETE"
                })
                if(response.status === 204) {
                    location.reload();
                }
            } catch (error) {
                console.error("An error occurred: ", error)
            }
        }
        deleteFromServer(id);
        deleteFromClient(id);
    }
});
