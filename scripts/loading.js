document.addEventListener("DOMContentLoaded", () => {
    // Wait 3.5 seconds
    setTimeout(() => {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "0";

        setTimeout(() => {
            // Redirects to main-hub.html inside the same html folder
            window.location.href = "main-hub.html"; 
        }, 500);
    }, 3500);
});