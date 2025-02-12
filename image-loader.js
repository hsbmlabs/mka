document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add fallback image on error
        img.onerror = function() {
            console.error('Image failed to load:', img.src);
            this.src = 'https://via.placeholder.com/500x300?text=Image+Not+Available';
            this.onerror = null; // Prevent infinite loop
        };

        // Show image when loaded
        img.onload = function() {
            console.log('Image loaded successfully:', img.src);
            this.style.opacity = '1';
        };

        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}); 