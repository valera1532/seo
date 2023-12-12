let galleryObserver = new MutationObserver((observerEvent) => {
	if (Array.isArray(observerEvent)) {
		observerEvent.forEach((observeEvent) => {
			if (observeEvent.target.classList.contains('lg-inner')) {
				let target = observeEvent.target;
				let targetContent = target.closest('.lg-content');

				if (targetContent) {
					let buttonPrev = targetContent.querySelector('.lg-prev');
					let buttonNext = targetContent.querySelector('.lg-next');
				}
			}
		});
	}
});

galleryObserver.observe(document.body, { childList: true, subtree: true });

if (document.querySelector('.about-gallery')) {
	lightGallery(document.querySelector('.about-gallery'), {
		// plugins: [lgZoom, lgThumbnail],
		licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
		speed: 500,
	});
}
