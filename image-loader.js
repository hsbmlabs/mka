document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            console.log('Image loaded successfully:', img.src);
            img.classList.add('loaded');
        });
        
        img.addEventListener('error', () => {
            console.error('Image failed to load:', img.src);
            // 이미지 로드 실패시 플레이스홀더로 대체
            img.src = 'https://via.placeholder.com/500x300?text=Image+Not+Available';
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}); 