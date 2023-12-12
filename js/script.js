const lenis = new Lenis();

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener('click', (e) => {
	const target = e.target;

	if (target.closest('.our-services__item-bottom--left')) {
		const block = target.closest('.our-services__item-bottom--left');
		block.classList.toggle('clicked');
	}
});

let headerButton = document.querySelector('.header__servicosi');
if (headerButton) {
	headerButton.addEventListener('mouseenter', (e) => {
		document.querySelector('.popup__servicios').classList.add('active');
		document.querySelector('.header__servicosi').classList.add('active');
	});

	let header = document.querySelector('.header');
	header.addEventListener('mouseleave', (e) => {
		document.querySelector('.popup__servicios').classList.remove('active');
		document.querySelector('.header__servicosi').classList.remove('active');
	});
}

class DynamicAdapt {
	constructor(type) {
		this.type = type;
	}
	init() {
		// массив объектов
		this.оbjects = [];
		this.daClassname = '_dynamic_adapt_';
		// массив DOM-элементов
		this.nodes = [...document.querySelectorAll('[data-da]')];

		// наполнение объектами
		this.nodes.forEach((node) => {
			const data = node.dataset.da.trim();
			const dataArray = data.split(',');
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
			оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		});

		this.arraySort(this.оbjects);

		// массив уникальных медиа-запросов
		this.mediaQueries = this.оbjects
			.map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
			.filter((item, index, self) => self.indexOf(item) === index);

		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		this.mediaQueries.forEach((media) => {
			const mediaSplit = media.split(',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			// массив объектов с подходящим брейкпоинтом
			const оbjectsFilter = this.оbjects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint);
			matchMedia.addEventListener('change', () => {
				this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		});
	}
	// Основная функция
	mediaHandler(matchMedia, оbjects) {
		if (matchMedia.matches) {
			оbjects.forEach((оbject) => {
				// оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			});
		} else {
			оbjects.forEach(({ parent, element, index }) => {
				if (element.classList.contains(this.daClassname)) {
					this.moveBack(parent, element, index);
				}
			});
		}
	}
	// Функция перемещения
	moveTo(place, element, destination) {
		if (!destination) {
			return;
		}

		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.append(element);
			return;
		}
		if (place === 'first') {
			destination.prepend(element);
			return;
		}
		destination.children[place].before(element);
	}
	// Функция возврата
	moveBack(parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].before(element);
		} else {
			parent.append(element);
		}
	}
	// Функция получения индекса внутри родительского элемента
	indexInParent(parent, element) {
		return [...parent.children].indexOf(element);
	}
	// Функция сортировки массива по breakpoint и place
	// за зростанням для this.type = min
	// за спаданням для this.type = max
	arraySort(arr) {
		if (this.type === 'min') {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
					if (a.place === 'first' || b.place === 'last') {
						return -1;
					}
					if (a.place === 'last' || b.place === 'first') {
						return 1;
					}
					return 0;
				}
				return a.breakpoint - b.breakpoint;
			});
		} else {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
					if (a.place === 'first' || b.place === 'last') {
						return 1;
					}
					if (a.place === 'last' || b.place === 'first') {
						return -1;
					}
					return 0;
				}
				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	}
}

const da = new DynamicAdapt('max');
da.init();

setTimeout(() => {
	let cardLine = document.querySelectorAll('.digital__card-line');
	for (let i = 0; i < cardLine.length; i++) {
		cardLine[i].classList.remove('active');
	}
}, 2000);

setTimeout(() => {
	let cardLinegrafik = document.querySelector('.digital__card-line100');
	cardLinegrafik?.classList.add('active');
}, 1250);
setTimeout(() => {
	let cardLinegrafik1 = document.querySelector('.digital__card-line42');
	cardLinegrafik1?.classList.add('active');
}, 1250);
setTimeout(() => {
	let cardCircle = document.querySelector('.chart');
	cardCircle?.classList.add('active');
}, 1500);
setTimeout(() => {
	let cardCircle4 = document.querySelector('.digital__card3-btn');
	cardCircle4?.classList.add('active');
}, 1600);

setTimeout(() => {
	let cardUnit = document.querySelectorAll('.unit');
	for (let i = 0; i < cardUnit.length; i++) {
		cardUnit[i].classList.add('active');
	}
}, 1600);
setTimeout(() => {
	let cardUnit1 = document.querySelectorAll('.digital__card3-line100');
	for (let i = 0; i < cardUnit1.length; i++) {
		cardUnit1[i].classList.add('active');
	}
}, 2000);
setTimeout(() => {
	let cardCircle = document.querySelector('.digital__card3-line42');
	cardCircle?.classList.add('active');
}, 2100);
setTimeout(() => {
	let cardCircle1 = document.querySelector('.digital__card-chart');
	cardCircle1?.classList.add('active');
}, 700);
setTimeout(() => {
	let cardCircle2 = document.querySelector('.digital__phone');
	cardCircle2?.classList.add('active');
}, 850);
setTimeout(() => {
	let cardCircle3 = document.querySelector('.digital__card3');
	cardCircle3?.classList.add('active');
}, 950);
// setTimeout(() => {let redLine = document.querySelector(".redline");
//   redLine.classList.add("active");
// }, 0)
// setTimeout(() => {let blueLine = document.querySelector(".blueline");
//   blueLine.classList.add("active");
// }, 0)
document.querySelector('.header__point5').addEventListener('click', function () {
	document.querySelector('.header__points-redline').classList.add('active5');
	document.querySelector('.header__points-redline').classList.remove('active4');
	document.querySelector('.header__points-redline').classList.remove('active3');
	document.querySelector('.header__points-redline').classList.remove('active2');
	document.querySelector('.header__points-redline').classList.remove('active1');
});
document.querySelector('.header__point4').addEventListener('click', function () {
	document.querySelector('.header__points-redline').classList.add('active4');
	document.querySelector('.header__points-redline').classList.remove('active5');
	document.querySelector('.header__points-redline').classList.remove('active3');
	document.querySelector('.header__points-redline').classList.remove('active2');
	document.querySelector('.header__points-redline').classList.remove('active1');
});
document.querySelector('.header__point3').addEventListener('click', function () {
	document.querySelector('.header__points-redline').classList.add('active3');
	document.querySelector('.header__points-redline').classList.remove('active5');
	document.querySelector('.header__points-redline').classList.remove('active4');
	document.querySelector('.header__points-redline').classList.remove('active2');
	document.querySelector('.header__points-redline').classList.remove('active1');
});
document.querySelector('.header__point2').addEventListener('click', function () {
	document.querySelector('.header__points-redline').classList.add('active2');
	document.querySelector('.header__points-redline').classList.remove('active5');
	document.querySelector('.header__points-redline').classList.remove('active3');
	document.querySelector('.header__points-redline').classList.remove('active4');
	document.querySelector('.header__points-redline').classList.remove('active1');
});
document.querySelector('.header__point1').addEventListener('click', function () {
	document.querySelector('.header__points-redline').classList.add('active1');
	document.querySelector('.header__points-redline').classList.remove('active5');
	document.querySelector('.header__points-redline').classList.remove('active3');
	document.querySelector('.header__points-redline').classList.remove('active2');
	document.querySelector('.header__points-redline').classList.remove('active4');
});

if (document.querySelector('.digital__card-chart')) {
	document.querySelector('.digital__card-chart').addEventListener('click', function () {
		document.querySelector('.digital__way11').classList.add('active');
		document.querySelector('.digital__way12').classList.remove('active');
		document.querySelector('.digital__way13').classList.remove('active');
		document.querySelector('.digital__phone').classList.remove('active1');
		document.querySelector('.digital__card3-content').classList.remove('active1');
		document.querySelector('.digital__card-chart-red').classList.add('active1');
		document.querySelector('.digital__card-content').classList.add('active1');
		document.querySelector('.ripple__bundle11').classList.add('active');
		document.querySelector('.ripple__bundle12').classList.add('active');
		document.querySelector('.ripple__bundle21').classList.remove('active');
		document.querySelector('.ripple__bundle22').classList.remove('active');
		document.querySelector('.ripple__bundle31').classList.remove('active');
		document.querySelector('.ripple__bundle32').classList.remove('active');
		document.querySelector('.digital__phone-main1').classList.remove('active1');
		document.querySelector('.digital__card3-none').classList.remove('active1');
		document.querySelector('.seocards__complex').classList.add('active1');
		document.querySelector('.seocards__promotion').classList.remove('active1');
		document.querySelector('.seocards__contextual').classList.remove('active1');
		document.querySelector('.digital__way-red').classList.add('active3');
		document.querySelector('.digital__way2-red').classList.remove('active3');
		document.querySelector('.digital__way3-red').classList.remove('active3');
		document.querySelector('.digital__way4-red').classList.add('active3');
		document.querySelector('.digital__way5-red').classList.remove('active3');
		document.querySelector('.digital__way6-red').classList.remove('active3');
	});
}

if (document.querySelector('.digital__phone')) {
	document.querySelector('.digital__phone').addEventListener('click', function () {
		document.querySelector('.digital__way11').classList.remove('active');
		document.querySelector('.digital__way12').classList.add('active');
		document.querySelector('.digital__way13').classList.remove('active');
		document.querySelector('.digital__phone').classList.add('active1');
		document.querySelector('.digital__card3-content').classList.remove('active1');
		document.querySelector('.digital__card-chart').classList.remove('active1');
		document.querySelector('.ripple__bundle11').classList.remove('active');
		document.querySelector('.ripple__bundle12').classList.remove('active');
		document.querySelector('.ripple__bundle21').classList.add('active');
		document.querySelector('.ripple__bundle22').classList.add('active');
		document.querySelector('.ripple__bundle31').classList.remove('active');
		document.querySelector('.ripple__bundle32').classList.remove('active');
		document.querySelector('.digital__phone-main1').classList.add('active1');
		document.querySelector('.digital__card3-none').classList.remove('active1');
		document.querySelector('.digital__card-chart-red').classList.remove('active1');
		document.querySelector('.digital__card-content').classList.remove('active1');
		document.querySelector('.seocards__complex').classList.remove('active1');
		document.querySelector('.seocards__promotion').classList.add('active1');
		document.querySelector('.seocards__contextual').classList.remove('active1');
		document.querySelector('.digital__way-red').classList.remove('active3');
		document.querySelector('.digital__way2-red').classList.add('active3');
		document.querySelector('.digital__way3-red').classList.remove('active3');
		document.querySelector('.digital__way4-red').classList.remove('active3');
		document.querySelector('.digital__way5-red').classList.add('active3');
		document.querySelector('.digital__way6-red').classList.remove('active3');
	});
}

if (document.querySelector('.digital__card3')) {
	document.querySelector('.digital__card3').addEventListener('click', function () {
		document.querySelector('.digital__way11').classList.remove('active');
		document.querySelector('.digital__way12').classList.remove('active');
		document.querySelector('.digital__way13').classList.add('active');
		document.querySelector('.digital__phone').classList.remove('active1');
		document.querySelector('.digital__card3-content').classList.add('active1');
		document.querySelector('.digital__card-chart').classList.remove('active1');
		document.querySelector('.digital__card3-none').classList.add('active1');
		document.querySelector('.ripple__bundle11').classList.remove('active');
		document.querySelector('.ripple__bundle12').classList.remove('active');
		document.querySelector('.ripple__bundle21').classList.remove('active');
		document.querySelector('.ripple__bundle22').classList.remove('active');
		document.querySelector('.ripple__bundle31').classList.add('active');
		document.querySelector('.ripple__bundle32').classList.add('active');
		document.querySelector('.digital__phone-main1').classList.remove('active1');
		document.querySelector('.digital__card-chart-red').classList.remove('active1');
		document.querySelector('.digital__card-content').classList.remove('active1');
		document.querySelector('.seocards__complex').classList.remove('active1');
		document.querySelector('.seocards__promotion').classList.remove('active1');
		document.querySelector('.seocards__contextual').classList.add('active1');
		document.querySelector('.digital__way-red').classList.remove('active3');
		document.querySelector('.digital__way2-red').classList.remove('active3');
		document.querySelector('.digital__way3-red').classList.add('active3');
		document.querySelector('.digital__way4-red').classList.remove('active3');
		document.querySelector('.digital__way5-red').classList.remove('active3');
		document.querySelector('.digital__way6-red').classList.add('active3');
	});
}

if (document.querySelector('.seocards__complex')) {
	document.querySelector('.seocards__complex').addEventListener('click', function () {
		document.querySelector('.digital__way11').classList.add('active');
		document.querySelector('.digital__way12').classList.remove('active');
		document.querySelector('.digital__way13').classList.remove('active');
		document.querySelector('.digital__phone').classList.remove('active1');
		document.querySelector('.digital__card3-content').classList.remove('active1');
		document.querySelector('.digital__card-chart-red').classList.add('active1');
		document.querySelector('.digital__card-content').classList.add('active1');
		document.querySelector('.ripple__bundle11').classList.add('active');
		document.querySelector('.ripple__bundle12').classList.add('active');
		document.querySelector('.ripple__bundle21').classList.remove('active');
		document.querySelector('.ripple__bundle22').classList.remove('active');
		document.querySelector('.ripple__bundle31').classList.remove('active');
		document.querySelector('.ripple__bundle32').classList.remove('active');
		document.querySelector('.digital__phone-main1').classList.remove('active1');
		document.querySelector('.digital__card3-none').classList.remove('active1');
		document.querySelector('.seocards__complex').classList.add('active1');
		document.querySelector('.seocards__promotion').classList.remove('active1');
		document.querySelector('.seocards__contextual').classList.remove('active1');
		document.querySelector('.digital__way-red').classList.add('active3');
		document.querySelector('.digital__way2-red').classList.remove('active3');
		document.querySelector('.digital__way3-red').classList.remove('active3');
	});
}

if (document.querySelector('.seocards__promotion')) {
	document.querySelector('.seocards__promotion').addEventListener('click', function () {
		document.querySelector('.digital__way11').classList.remove('active');
		document.querySelector('.digital__way12').classList.add('active');
		document.querySelector('.digital__way13').classList.remove('active');
		document.querySelector('.digital__phone').classList.add('active1');
		document.querySelector('.digital__card3-content').classList.remove('active1');
		document.querySelector('.digital__card-chart').classList.remove('active1');
		document.querySelector('.ripple__bundle11').classList.remove('active');
		document.querySelector('.ripple__bundle12').classList.remove('active');
		document.querySelector('.ripple__bundle21').classList.add('active');
		document.querySelector('.ripple__bundle22').classList.add('active');
		document.querySelector('.ripple__bundle31').classList.remove('active');
		document.querySelector('.ripple__bundle32').classList.remove('active');
		document.querySelector('.digital__phone-main1').classList.add('active1');
		document.querySelector('.digital__card3-none').classList.remove('active1');
		document.querySelector('.digital__card-chart-red').classList.remove('active1');
		document.querySelector('.digital__card-content').classList.remove('active1');
		document.querySelector('.seocards__complex').classList.remove('active1');
		document.querySelector('.seocards__promotion').classList.add('active1');
		document.querySelector('.seocards__contextual').classList.remove('active1');
		document.querySelector('.digital__way-red').classList.remove('active3');
		document.querySelector('.digital__way2-red').classList.add('active3');
		document.querySelector('.digital__way3-red').classList.remove('active3');
	});
}

if (document.querySelector('.seocards__contextual')) {
	document.querySelector('.seocards__contextual').addEventListener('click', function () {
		document.querySelector('.digital__way11').classList.remove('active');
		document.querySelector('.digital__way12').classList.remove('active');
		document.querySelector('.digital__way13').classList.add('active');
		document.querySelector('.digital__phone').classList.remove('active1');
		document.querySelector('.digital__card3-content').classList.add('active1');
		document.querySelector('.digital__card-chart').classList.remove('active1');
		document.querySelector('.digital__card3-none').classList.add('active1');
		document.querySelector('.ripple__bundle11').classList.remove('active');
		document.querySelector('.ripple__bundle12').classList.remove('active');
		document.querySelector('.ripple__bundle21').classList.remove('active');
		document.querySelector('.ripple__bundle22').classList.remove('active');
		document.querySelector('.ripple__bundle31').classList.add('active');
		document.querySelector('.ripple__bundle32').classList.add('active');
		document.querySelector('.digital__phone-main1').classList.remove('active1');
		document.querySelector('.digital__card-chart-red').classList.remove('active1');
		document.querySelector('.digital__card-content').classList.remove('active1');
		document.querySelector('.seocards__complex').classList.remove('active1');
		document.querySelector('.seocards__promotion').classList.remove('active1');
		document.querySelector('.seocards__contextual').classList.add('active1');
		document.querySelector('.digital__way-red').classList.remove('active3');
		document.querySelector('.digital__way2-red').classList.remove('active3');
		document.querySelector('.digital__way3-red').classList.add('active3');
	});
}

window.onload = function () {
	var path = document.getElementById('p');
	if (path) {
		const length = path.getTotalLength();
		path.style.strokeDasharray = length;
		path.style.strokeDashoffset = length;
	}

	var path1 = document.getElementById('r');
	if (path1) {
		const length1 = path1.getTotalLength();
		path1.style.strokeDasharray = length1;
		path1.style.strokeDashoffset = length1;
	}

	var path2 = document.getElementById('way1');
	if (path2) {
		const length2 = path2.getTotalLength();
		path2.style.strokeDasharray = length2;
		path2.style.strokeDashoffset = length2;
	}

	var path3 = document.getElementById('way2');
	if (path3) {
		const length3 = path3.getTotalLength();
		path3.style.strokeDasharray = length3;
		path3.style.strokeDashoffset = length3;
	}

	var path4 = document.getElementById('way3');
	if (path4) {
		const length4 = path4.getTotalLength();
		path4.style.strokeDasharray = length4;
		path4.style.strokeDashoffset = length4;
	}
};

document.querySelector('.header__burger').addEventListener('click', function () {
	document.querySelector('.header__burger').classList.toggle('active');
	document.querySelector('.header-burger__block').classList.toggle('active');
	document.querySelector('.header__popup').classList.toggle('active');
});
document.querySelector('.header__popup-servise ').addEventListener('click', function () {
	document.querySelector('.header__popup-servises').classList.toggle('active');
	document.querySelector('.header__popup-servise').classList.toggle('active');
});

setTimeout(() => {
	const paths = document.querySelectorAll('.animated-path');

	function animatePaths() {
		paths.forEach((path, index) => {
			setTimeout(() => {
				path.classList.add('active');
			}, index * 100);
		});
	}

	animatePaths();
}, 1450);

window.addEventListener('scroll', function () {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

	if (winScroll > 500) {
		myFunction(winScroll - 500, height - 500);
	}
});

function myFunction(scroll, height) {
	var triggerScroll = 300; // Значение скролла, при котором начинается заполнение полосы
	var progressBar = document.getElementById('myBar');
	if (progressBar) {
		var progressBarHeight = progressBar.offsetHeight;
		var progressBarCenterOffset = (100 - progressBarHeight) / 2;
		var speed = 1.3; // Коэффициент скорости заполнения (увеличьте значение для более быстрого заполнения)
		var stagesCards = Array.from(document.getElementsByClassName('stages__card'));

		if (scroll < triggerScroll) {
			progressBar.style.height = '0%';
		} else {
			var scrolled = ((scroll - triggerScroll) / height) * 100 * speed;
			progressBar.style.height = Math.min(scrolled, 100) + '%';

			stagesCards.forEach(function (card) {
				card.classList.remove('active');
			});

			if (scrolled >= 0 && scrolled < 20) {
				stagesCards[0].classList.add('active');
			} else if (scrolled >= 20 && scrolled < 42) {
				stagesCards[2].classList.add('active');
			} else if (scrolled >= 42 && scrolled < 70) {
				stagesCards[1].classList.add('active');
			} else if (scrolled >= 70) {
				stagesCards[3].classList.add('active');
			}
		}
		progressBar.style.top = progressBarCenterOffset + 'vh';
	}
}

var swiper = new Swiper('.swiper1', {
	spaceBetween: 20,
	initialSlide: 1, // Устанавливаем второй слайд как выбранный по умолчанию
	centeredSlides: true,
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
			slidesPerView: 1.8,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 1.8,
			spaceBetween: 20,
		},
		425: {
			slidesPerView: 1.2,
			spaceBetween: 20,
		},
	},
});

swiper.on('slideChange', function (e) {
	if (e.activeIndex === 0) {
		document.querySelector('.digital__way11').classList.add('active');
		document.querySelector('.digital__way12').classList.remove('active');
		document.querySelector('.digital__way13').classList.remove('active');
		document.querySelector('.digital__phone').classList.remove('active1');
		document.querySelector('.digital__card3-content').classList.remove('active1');
		document.querySelector('.digital__card-chart-red').classList.add('active1');
		document.querySelector('.digital__card-content').classList.add('active1');
		document.querySelector('.ripple__bundle11').classList.add('active');
		document.querySelector('.ripple__bundle12').classList.add('active');
		document.querySelector('.ripple__bundle21').classList.remove('active');
		document.querySelector('.ripple__bundle22').classList.remove('active');
		document.querySelector('.ripple__bundle31').classList.remove('active');
		document.querySelector('.ripple__bundle32').classList.remove('active');
		document.querySelector('.digital__phone-main1').classList.remove('active1');
		document.querySelector('.digital__card3-none').classList.remove('active1');
		document.querySelector('.seocards__complex').classList.add('active1');
		document.querySelector('.seocards__promotion').classList.remove('active1');
		document.querySelector('.seocards__contextual').classList.remove('active1');
		document.querySelector('.digital__way4-red').classList.add('active3');
		document.querySelector('.digital__way5-red').classList.remove('active3');
		document.querySelector('.digital__way6-red').classList.remove('active3');
		document.querySelector('.digital__way7-red').classList.add('active3');
		document.querySelector('.digital__way8-red').classList.remove('active3');
		document.querySelector('.digital__way9-red').classList.remove('active3');
	} else if (e.activeIndex === 1) {
		document.querySelector('.digital__way11').classList.remove('active');
		document.querySelector('.digital__way12').classList.add('active');
		document.querySelector('.digital__way13').classList.remove('active');
		document.querySelector('.digital__phone').classList.add('active1');
		document.querySelector('.digital__card3-content').classList.remove('active1');
		document.querySelector('.digital__card-chart').classList.remove('active1');
		document.querySelector('.ripple__bundle11').classList.remove('active');
		document.querySelector('.ripple__bundle12').classList.remove('active');
		document.querySelector('.ripple__bundle21').classList.add('active');
		document.querySelector('.ripple__bundle22').classList.add('active');
		document.querySelector('.ripple__bundle31').classList.remove('active');
		document.querySelector('.ripple__bundle32').classList.remove('active');
		document.querySelector('.digital__phone-main1').classList.add('active1');
		document.querySelector('.digital__card3-none').classList.remove('active1');
		document.querySelector('.digital__card-chart-red').classList.remove('active1');
		document.querySelector('.digital__card-content').classList.remove('active1');
		document.querySelector('.seocards__complex').classList.remove('active1');
		document.querySelector('.seocards__promotion').classList.add('active1');
		document.querySelector('.seocards__contextual').classList.remove('active1');
		document.querySelector('.digital__way4-red').classList.remove('active3');
		document.querySelector('.digital__way5-red').classList.add('active3');
		document.querySelector('.digital__way6-red').classList.remove('active3');
		document.querySelector('.digital__way7-red').classList.remove('active3');
		document.querySelector('.digital__way8-red').classList.add('active3');
		document.querySelector('.digital__way9-red').classList.remove('active3');
	} else if (e.activeIndex === 2) {
		document.querySelector('.digital__way11').classList.remove('active');
		document.querySelector('.digital__way12').classList.remove('active');
		document.querySelector('.digital__way13').classList.add('active');
		document.querySelector('.digital__phone').classList.remove('active1');
		document.querySelector('.digital__card3-content').classList.add('active1');
		document.querySelector('.digital__card-chart').classList.remove('active1');
		document.querySelector('.digital__card3-none').classList.add('active1');
		document.querySelector('.ripple__bundle11').classList.remove('active');
		document.querySelector('.ripple__bundle12').classList.remove('active');
		document.querySelector('.ripple__bundle21').classList.remove('active');
		document.querySelector('.ripple__bundle22').classList.remove('active');
		document.querySelector('.ripple__bundle31').classList.add('active');
		document.querySelector('.ripple__bundle32').classList.add('active');
		document.querySelector('.digital__phone-main1').classList.remove('active1');
		document.querySelector('.digital__card-chart-red').classList.remove('active1');
		document.querySelector('.digital__card-content').classList.remove('active1');
		document.querySelector('.seocards__complex').classList.remove('active1');
		document.querySelector('.seocards__promotion').classList.remove('active1');
		document.querySelector('.seocards__contextual').classList.add('active1');
		document.querySelector('.digital__way4-red').classList.remove('active3');
		document.querySelector('.digital__way5-red').classList.remove('active3');
		document.querySelector('.digital__way6-red').classList.add('active3');
		document.querySelector('.digital__way7-red').classList.remove('active3');
		document.querySelector('.digital__way8-red').classList.remove('active3');
		document.querySelector('.digital__way9-red').classList.add('active3');
	}
});

var swiper1 = new Swiper('.swiper2', {
	spaceBetween: 20,
	centeredSlides: true,
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
if (window.innerWidth < 768) {
	document.querySelector('.ripple__bundle22')?.classList.add('active');
	document.querySelector('.digital__way12')?.classList.add('active');
	document.querySelector('.digital__way13')?.classList.add('active');
}
