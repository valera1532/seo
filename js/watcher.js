function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}

class ScrollWatcher {
	constructor(props) {
		let defaultConfig = {
			logging: true,
		};
		this.config = Object.assign(defaultConfig, props);
		this.observer;
		!document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
	}
	// Обновляем конструктор
	scrollWatcherUpdate() {
		this.scrollWatcherRun();
	}
	// Запускаем конструктор
	scrollWatcherRun() {
		document.documentElement.classList.add('watcher');
		this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
	}
	// Конструктор наблюдателей
	scrollWatcherConstructor(items) {
		if (items.length) {
			this.scrollWatcherLogging(`Проснулся, слежу за объектами (${items.length})...`);
			// Уникализируем параметры
			let uniqParams = uniqArray(
				Array.from(items).map(function (item) {
					return `${
						item.dataset.watchRoot ? item.dataset.watchRoot : null
					}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
				})
			);
			// Получаем группы объектов с одинаковыми параметрами,
			// создаем настройки, инициализируем наблюдатель
			uniqParams.forEach((uniqParam) => {
				let uniqParamArray = uniqParam.split('|');
				let paramsWatch = {
					root: uniqParamArray[0],
					margin: uniqParamArray[1],
					threshold: uniqParamArray[2],
				};
				let groupItems = Array.from(items).filter(function (item) {
					let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
					let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
					let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
					if (
						String(watchRoot) === paramsWatch.root &&
						String(watchMargin) === paramsWatch.margin &&
						String(watchThreshold) === paramsWatch.threshold
					) {
						return item;
					}
				});

				let configWatcher = this.getScrollWatcherConfig(paramsWatch);

				// Инициализация наблюдателя со своими настройками
				this.scrollWatcherInit(groupItems, configWatcher);
			});
		} else {
			this.scrollWatcherLogging('Сплю, нет объектов для слежки. ZzzZZzz');
		}
	}
	// Функция создания настроек
	getScrollWatcherConfig(paramsWatch) {
		//Создаем настройки
		let configWatcher = {};
		// Родитель, в котором ведется наблюдение
		if (document.querySelector(paramsWatch.root)) {
			configWatcher.root = document.querySelector(paramsWatch.root);
		} else if (paramsWatch.root !== 'null') {
			this.scrollWatcherLogging(`Эмм... родительского элемента ${paramsWatch.root} нет на странице`);
		}
		// Отступление срабатывания
		configWatcher.rootMargin = paramsWatch.margin;
		if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
			this.scrollWatcherLogging(`Ой, настройку data-watch-margin нужно задавать в PX или %`);
			return;
		}
		// Точки срабатывания
		if (paramsWatch.threshold === 'prx') {
			// Режим паралакса
			paramsWatch.threshold = [];
			for (let i = 0; i <= 1.0; i += 0.005) {
				paramsWatch.threshold.push(i);
			}
		} else {
			paramsWatch.threshold = paramsWatch.threshold.split(',');
		}
		configWatcher.threshold = paramsWatch.threshold;

		return configWatcher;
	}
	// Функция создания нового наблюдателя со своими настройками
	scrollWatcherCreate(configWatcher) {
		this.observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				this.scrollWatcherCallback(entry, observer);
			});
		}, configWatcher);
	}
	// Функция инициализации наблюдателя со своими настройками
	scrollWatcherInit(items, configWatcher) {
		// Создание нового наблюдателя со своими настройками
		this.scrollWatcherCreate(configWatcher);
		// Передача наблюдателю элементов
		items.forEach((item) => this.observer.observe(item));
	}
	// Функция обработки базовых действий точек срабатывания
	scrollWatcherIntersecting(entry, targetElement) {
		if (entry.isIntersecting) {
			// Видим объект
			// Добавляем класс
			!targetElement.classList.contains('_watcher-view')
				? targetElement.classList.add('_watcher-view')
				: null;
			this.scrollWatcherLogging(`Я вижу ${targetElement.classList}, добавил класс _watcher-view`);
		} else {
			// Не видим объект
			// Забираем класс
			targetElement.classList.contains('_watcher-view')
				? targetElement.classList.remove('_watcher-view')
				: null;
			this.scrollWatcherLogging(`Я не вижу ${targetElement.classList}, убрал класс _watcher-view`);
		}
	}
	// Функция отключения слежения за объектом
	scrollWatcherOff(targetElement, observer) {
		observer.unobserve(targetElement);
		this.scrollWatcherLogging(`Я перестал следить за ${targetElement.classList}`);
	}
	// Функция вывода в консоль
	scrollWatcherLogging(message) {
		console.log(`[Наблюдатель]: ${message}`);
	}
	// Функция обработки наблюдения
	scrollWatcherCallback(entry, observer) {
		const targetElement = entry.target;
		// Обработка базовых действий точек срабатывания
		this.scrollWatcherIntersecting(entry, targetElement);
		// Если есть атрибут data-watch-once убираем слежку
		targetElement.hasAttribute('data-watch-once') && entry.isIntersecting
			? this.scrollWatcherOff(targetElement, observer)
			: null;
		// Создаем свое событие обратной связи
		document.dispatchEvent(
			new CustomEvent('watcherCallback', {
				detail: {
					entry: entry,
				},
			})
		);
	}
}

let watcher = new ScrollWatcher({});

function digitsCounter() {
	// Обнуление
	if (document.querySelectorAll('[data-digits-counter]').length) {
		document.querySelectorAll('[data-digits-counter]').forEach((element) => {
			element.dataset.digitsCounter = element.innerHTML;
			element.innerHTML = `0`;
		});
	}

	// Функция инициализации
	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems
			? digitsCountersItems
			: document.querySelectorAll('[data-digits-counter]');
		if (digitsCounters.length) {
			digitsCounters.forEach((digitsCounter) => {
				digitsCountersAnimate(digitsCounter);
			});
		}
	}
	// Функция анимации
	function digitsCountersAnimate(digitsCounter) {
		let startTimestamp = null;
		const duration = parseInt(digitsCounter.dataset.digitsCounterSpeed)
			? parseInt(digitsCounter.dataset.digitsCounterSpeed)
			: 2600;
		const startValue = parseFloat(digitsCounter.dataset.digitsCounter);
		const startPosition = 0;
		const fractionDigits = digitsCounter.dataset.digitsFraction;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			digitsCounter.innerHTML = (progress * (startPosition + startValue)).toFixed(fractionDigits);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}
	function digitsCounterAction(e) {
		const entry = e.detail.entry;
		const targetElement = entry.target;
		if (targetElement.querySelectorAll('[data-digits-counter]').length) {
			digitsCountersInit(targetElement.querySelectorAll('[data-digits-counter]'));
		}
	}

	document.addEventListener('watcherCallback', digitsCounterAction);
}

digitsCounter();