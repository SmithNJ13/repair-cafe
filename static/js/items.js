document.addEventListener("DOMContentLoaded", async () => {
    const itemName = document.getElementById("name");
    const sellerId = document.getElementById("seller");
    const desc = document.getElementById("desc");
    const price = document.getElementById("price");

    const response = await fetch("http://localhost:5000/items")
    const data = await response.json();
    const arr = data.data;


    itemName.innerHTML = arr[0].itemName;
    sellerId.innerHTML = arr[0].sellerId;
    desc.innerHTML = arr[0].itemDescription;
    price.innerHTML = arr[0].price;
})
