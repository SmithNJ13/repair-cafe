document.addEventListener("DOMContentLoaded", function() {
    // Example on how to target new elements created!
    const item2Name = document.querySelector("#job_2 #name")
    const item3Desc = document.querySelector("#job_3 #desc")
    item2Name.innerHTML = "this is a test!"
    item3Desc.innerHTML = "blah, blah, blah"
});
