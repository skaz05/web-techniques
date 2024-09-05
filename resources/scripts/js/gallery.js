document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.createElement('div');
    const lightboxImage = document.createElement('img');
    const closeButton = document.createElement('button');

    lightbox.className = 'lightbox';
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;'; 

    lightbox.appendChild(lightboxImage);
    lightbox.appendChild(closeButton);
    document.body.appendChild(lightbox);

    galleryGrid.addEventListener('click', (event) => {
        const target = event.target.closest('figure');
        if (target) {
            const img = target.querySelector('img');
            const largeSrc = img.src.replace('medium', 'big');

            lightboxImage.src = largeSrc;
            lightbox.classList.add('active');
        }
    });

    closeButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});
