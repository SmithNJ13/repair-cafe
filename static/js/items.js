document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:5000/items");
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
    
    // Append Item(s)
    function containerCreate(item) {
        const itemElement = document.createElement('div');
        itemElement.className = 'container item';
        itemElement.id = `item_${item.itemId}`;

        itemElement.appendChild(pCreate('name', item.itemName));
        itemElement.appendChild(pCreate('seller', item.sellerId));
        itemElement.appendChild(pCreate('desc', item.itemDescription));
        itemElement.appendChild(pCreate('price', `Price: £${item.price}`));

        const purchaseButton = document.createElement('button');
        purchaseButton.id = 'purchase';
        purchaseButton.textContent = 'Purchase';
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
        const newImageElement = document.createElement('img');
        newImageElement.src = './static/images/cuteCat.png'; // Set your image source
        newImageElement.alt = 'cute cat';
        currentImagesContainer.appendChild(newImageElement);
        currentTextContainer.appendChild(newItemElement);
    }
});
