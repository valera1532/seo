if (document.querySelector('.our-cases__slider-top .our-cases__slider')) {
	let swiperTop = new Swiper('.our-cases__slider-top .our-cases__slider', {
		// Указываем класс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		observer: true,
		observeParents: true,
		slidesPerView: 2,
		spaceBetween: 40,
		// autoHeight: true,
		speed: 800,

		navigation: {
			prevEl: '.our-cases__slider-top .our-cases__slider .swiper-button-prev-custom',
			nextEl: '.our-cases__slider-top .our-cases__slider .swiper-button-next-custom',
		},
		/*
				// Брейкпоинты
				breakpoints: {
					640: {
						slidesPerView: 1,
						spaceBetween: 0,
						autoHeight: true,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1268: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
				},
				*/
	});
}

if (document.querySelector('#our-clients__slider')) {
	let swiperTop = new Swiper('#our-clients__slider', {
		// Указываем класс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		observer: true,
		observeParents: true,
		spaceBetween: 20,
		// autoHeight: true,
		speed: 800,

		navigation: {
			prevEl: '.swiper-button-prev-custom',
			nextEl: '.swiper-button-next-custom',
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
			},
			560: {
				slidesPerView: 3,
			},
			960: {
				slidesPerView: 5,
			},
		},
	});
} else if (document.querySelector('.our-clients__slider')) {
	let swiperTop = new Swiper('.our-clients__slider', {
		// Указываем класс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		observer: true,
		observeParents: true,
		spaceBetween: 20,
		// autoHeight: true,
		speed: 800,

		navigation: {
			prevEl: '.swiper-button-prev-custom',
			nextEl: '.swiper-button-next-custom',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			560: {
				slidesPerView: 3,
			},
			960: {
				slidesPerView: 5,
			},
		},
	});
}

if (document.querySelector('.swiper2')) {
	let swiper1 = new Swiper('.swiper2', {
		spaceBetween: 20,
		// centeredSlides: true,
		slidesPerView: 'auto',
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			834: {
				slidesPerView: 1.5,
				spaceBetween: 80,
			},
			425: {
				slidesPerView: 1,
				spaceBetween: 40,
			},
		},
	});
}

if (document.querySelector('.work-stages__slider')) {
	let progressWidth = 0;

	let swiperTop = new Swiper('.work-stages__slider', {
		// Указываем класс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		observer: true,
		observeParents: true,
		// autoHeight: true,
		speed: 800,

		navigation: {
			prevEl: '.work-stages__button-prev',
			nextEl: '.work-stages__button-next',
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			526: {
				slidesPerView: 1.3,
				spaceBetween: 25,
			},
		},
		on: {
			init: function (e) {
				let slides = e.slides;
				let dataIndex = [];
				slides.forEach((slide) => {
					dataIndex.push(slide.ariaLabel.split('/').map((slide) => slide.trim())[0]);
				});

				slides.forEach((slide, index) => (slide.dataset.slideIndex = dataIndex[index]));

				try {
					if (window.innerWidth <= 1068) {
						let wrapperWidth = slides.reduce(
							(width, slide) => (width += slide.clientWidth + Number.parseInt(slide.style.marginRight)),
							0
						);
						slides[0].parentNode.style.cssText += `--wrapper-width: ${wrapperWidth}px`;
						slides[0].parentNode.style.cssText += `--slide-width: ${slides[0].clientWidth}px`;
						slides[0].parentNode.style.cssText += `--progress-width: ${slides[0].clientWidth + 25 + 40}px`;
						document.querySelector('.work-stages__slider-wrapper-outer').style.cssText +=
							slides[0].parentNode.style.cssText += `--slide-width: ${slides[0].clientWidth}px`;
					}
				} catch (error) {}

				window.addEventListener('resize', (resizeEv) => {
					if (window.innerWidth <= 1068) {
						let wrapperWidth = slides.reduce(
							(width, slide) => (width += slide.clientWidth + Number.parseInt(slide.style.marginRight)),
							0
						);
						slides[0].parentNode.style.cssText += `--wrapper-width: ${wrapperWidth}px`;
						slides[0].parentNode.style.cssText += `--slide-width: ${slides[0].clientWidth}px`;
						document.querySelector('.work-stages__slider-wrapper-outer').style.cssText +=
							slides[0].parentNode.style.cssText += `--slide-width: ${slides[0].clientWidth}px`;
					}
				});
			},

			slideNextTransitionStart: function (e) {
				let slides = e.slides;
				slides[0].parentNode.style.cssText += `--progress-width: ${
					(slides[0].clientWidth + 25) * (e.activeIndex + 1) + 40
				}px`;
			},

			slidePrevTransitionStart: function (e) {
				let slides = e.slides;
				slides[0].parentNode.style.cssText += `--progress-width: ${
					(slides[0].clientWidth + 25) * (e.activeIndex + 1) + 40
				}px`;
			},
		},
	});
}

if (document.querySelector('.fare-cost__slider')) {
	new Swiper('.fare-cost__slider', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 10,
		speed: 800,
		allowTouchMove: false,

		// // Эффекты
		// effect: 'flip',

		pagination: {
			el: '.fare-cost__form-questions-count',
			type: 'fraction',
		},

		// Кнопки "влево/вправо"
		navigation: {
			nextEl: '.fare-cost__form-next',
		},
		/*
		// Брейкпоинты
		breakpoints: {
			640: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1268: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		*/
		// События
		on: {
			init: (e) => {
				let button = document.querySelector('.fare-cost__form-next');

				let buttonObserver = new MutationObserver((observerEvent) => {
					button.disabled = false;

					let container = document.querySelector('.fare-cost');
					let oldHeight = container.offsetHeight;

					button.addEventListener('mousedown', (eventClick) => {
						container.classList.add('form-success');

						container.style.height = oldHeight + 'px';
						container.querySelector('.container').style.height = '100%';
					});
				});

				buttonObserver.observe(button, { attributes: true, attributeFilter: ['disabled'] });
			},
		},
	});
}

if (document.querySelector('.about-slider')) {
	new Swiper('.about-slider', {
		observer: true,
		observeParents: true,
		spaceBetween: 16,
		speed: 800,

		navigation: {
			prevEl: '.about-slider__arrow-prev',
			nextEl: '.about-slider__arrow-next',
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			479: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
			1268: {
				slidesPerView: 5,
			},
		},

		on: {},
	});
}

if (document.querySelector('.cases-bottom__slider')) {
	new Swiper('.cases-bottom__slider', {
		observer: true,
		observeParents: true,
		spaceBetween: 20,
		speed: 800,

		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			375: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1268: {
				slidesPerView: 5,
			},
		},
	});
}
