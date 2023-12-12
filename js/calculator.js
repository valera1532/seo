const ranges = new Map();
ranges.set('requests', [200, 400, 600, 800, 1000]);
ranges.set('age', [0, 2, 5, 7, 10]);
ranges.set('select', [1, 1.2, 1.2, 1.6, 1.4, 1.15, 1, 1.1, 1.15, 1.1, 1.05]);
ranges.set('result', {
	0: {
		0: 0,
		2: 0,
		5: 0,
		7: 0,
		10: 0,
	},
	200: {
		0: 67000,
		2: 64000,
		5: 62000,
		7: 60000,
		10: 60000,
	},
	400: {
		0: 113900,
		2: 108800,
		5: 105400,
		7: 102000,
		10: 102000,
	},
	600: {
		0: 160800,
		2: 153600,
		5: 148800,
		7: 144000,
		10: 144000,
	},
	800: {
		0: 207700,
		2: 198400,
		5: 192200,
		7: 186000,
		10: 186000,
	},
	1000: {
		0: 254600,
		2: 243200,
		5: 235600,
		7: 228000,
		10: 228000,
	},
});

class Calculator {
	constructor() {
		this._resultTag = document.querySelector('[data-calculator-result]');
		this._requestsInputs = document.querySelectorAll('[data-calculator-input]');
		this._select = document.querySelector('.calculator__range select');

		this._requestsInputs.forEach((input) => {
			const type = input.dataset.calculatorInput;
			this.inputsHandler(type, input);

			input.addEventListener('input', (e) => {
				this.inputsHandler(type, input);
			});
		});

		this.selectHandler(this._select.value);
		document.addEventListener('selectCallback', (event) => {
			const originalSelect = event.detail.select;
			const value = originalSelect.value;
			this.selectHandler(value);
		});
	}

	inputsHandler(type, input) {
		const value = input.value;

		switch (type) {
			case 'requests':
				this.requestsHandler(value);
				break;
			case 'age':
				this.ageHandler(value);
				break;
			default:
				break;
		}
	}

	requestsHandler(value) {
		const rangeItem = ranges.get('requests');

		const rightValue = rangeItem.find((val) => val >= value * 10);
		const leftValue = rangeItem[rangeItem.findIndex((val) => val >= value * 10) - 1] ?? 0;
		const offset = (value * 10 - leftValue) / 200;

		this._requestsItems = {
			leftValue,
			rightValue,
			offset,
		};

		this.calculateResult();
	}

	ageHandler(value) {
		const rangeItem = ranges.get('age');

		const rightValue = rangeItem.find((val) => val > value / 10) ?? 10;
		const leftValue = rangeItem[rangeItem.findIndex((val) => val > value / 10) - 1] ?? 7;
		const offset = (value / 10 - leftValue) / (rightValue - leftValue);

		this._ageValueItems = {
			leftValue,
			rightValue,
			offset,
		};

		this.calculateResult();
	}

	selectHandler(value) {
		this._selectValue = ranges.get('select')[value];
		this.calculateResult();
	}

	calculateResult() {
		const resultItem = ranges.get('result');

		const priceLeft =
			resultItem[this._requestsItems?.leftValue][this._ageValueItems?.leftValue] +
			(resultItem[this._requestsItems?.leftValue][this._ageValueItems?.rightValue] -
				resultItem[this._requestsItems?.leftValue][this._ageValueItems?.leftValue]) *
				this._ageValueItems?.offset;

		const priceRight =
			resultItem[this._requestsItems?.rightValue][this._ageValueItems?.leftValue] +
			(resultItem[this._requestsItems?.rightValue][this._ageValueItems?.rightValue] -
				resultItem[this._requestsItems?.rightValue][this._ageValueItems?.leftValue]) *
				this._ageValueItems?.offset;

		console.log(this._requestsItems);
		console.log('');

		const resultPrice =
			priceLeft + (priceRight * this._requestsItems.offset - priceLeft * this._requestsItems.offset);

		this.resultRender(Math.round(this._selectValue * resultPrice));
	}

	resultRender(value) {
		this._resultTag.innerHTML = value;
	}
}

document.addEventListener('DOMContentLoaded', (event) => {
	const calculator = new Calculator();
});
