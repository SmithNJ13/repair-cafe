document.addEventListener("DOMContentLoaded", function() {
    const popup = document.querySelector(".popup");

    popup.style.top = "-100vh";

    function slideDown() {
        const start = Date.now();
        const startY = parseInt(popup.style.top);
        const endY = (window.innerHeight - popup.clientHeight) / 2;
        const duration = 300;

        function animate() {
            const currentTime = Date.now() - start;
            if (currentTime < duration) {
                const progress = currentTime / duration;
                const newPosition = startY + (endY - startY) * progress;
                popup.style.top = newPosition + "px";
                requestAnimationFrame(animate);
            } else {
                popup.style.top = endY + "px";
            }
        }

        animate();
    }
    slideDown();
});
