document.addEventListener("DOMContentLoaded", () => {
    // Simulate a loading delay (3500 milliseconds = 3.5 seconds)
    setTimeout((3500) => {
        
        // Add a smooth fade-out effect to the body before leaving
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "0";

        // After the fade-out finishes, redirect to your main page
        setTimeout(() => {
            // Adjust "dashboard.html" to whatever you name your main content file later (e.g., home.html)
            window.location.href = "dashboard.html"; 
        }, 500);

    }, 3500);
});