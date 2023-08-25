document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("https://cafe-test-ngey.onrender.com/items");
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
    function containerCreate(item) {
        const itemElement = document.createElement('div');
        itemElement.className = 'container item';
        itemElement.id = `item_${item.item_id}`;

        itemElement.appendChild(pCreate('name', item.item_name));
        itemElement.appendChild(pCreate('seller', item.seller_id));
        itemElement.appendChild(pCreate('desc', item.item_description));
        itemElement.appendChild(pCreate('price', `Price: ${item.price}`));

        const purchaseButton = document.createElement('button');
        purchaseButton.id = 'purchase';
        purchaseButton.textContent = 'Purchase';
        purchaseButton.addEventListener("click", () => {
            getInfo(item.item_name, item.item_id);
        })
        itemElement.appendChild(purchaseButton);

        return itemElement;
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
        const newImageElement = document.createElement('img')
        newImageElement.src = './static/images/sellerCat.png'
        newImageElement.alt = 'cute cat'
        currentImagesContainer.appendChild(newImageElement)
        currentTextContainer.appendChild(newItemElement);
    }
    
    // Click purchase > popup appears "an item has been purchased! [item name]" > delete item and refresh page
    function getInfo(name, id) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.assign('./redirect.html')
        } else {
            alert(`An item has been purchased! [${name}]`);

            function deleteFromClient(id) {
                const DOMelement = document.querySelector(`#item_${id}`)
                if(DOMelement) {
                    DOMelement.remove();
                }
            }
            async function deleteFromServer(id) {
                try {
                    const response = await fetch(`https://cafe-test-ngey.onrender.com/items/${id}`, {
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

    }
});
