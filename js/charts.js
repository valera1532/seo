document.addEventListener('DOMContentLoaded', (event) => {
	seoIncreaseChart();
	ripdPieChart();
	ripdBarChar();
	ripdLineChart();
	reklamaPieChar();
});

const gridOptions = {
	color: 'rgba(236, 236, 236, 0.10)',
};

function seoIncreaseChart() {
	const ctx = document.getElementById('seo-increase-chart');

	if (!ctx) {
		return;
	}

	new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun'],
			datasets: [
				{
					data: [11, 24, 12, -6, -22, -6, 12],
					borderColor: '#fff',
					backgroundColor: '#fff',
				},
				{
					data: [-22, -4, -22, 64, 12, 28, -22],
					borderColor: '#E63114',
					backgroundColor: '#E63114',
				},
			],
		},
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					suggestedMin: 50,
					suggestedMax: 100,

					grid: gridOptions,
					ticks: {
						color: '#49336B',
					},
				},
				x: {
					grid: gridOptions,
					ticks: {
						color: '#49336B',
					},
				},
			},
			radius: 8,
		},
	});
}

function ripdPieChart() {
	const ctx = document.getElementById('ripd-pie-chart');

	if (!ctx) {
		return;
	}

	const gradients = [
		ctx.getContext('2d').createLinearGradient(0, 0, 0, 400),
		ctx.getContext('2d').createLinearGradient(0, 0, 0, 400),
		ctx.getContext('2d').createLinearGradient(0, 0, 0, 400),
		ctx.getContext('2d').createLinearGradient(0, 0, 0, 400),
		ctx.getContext('2d').createLinearGradient(0, 0, 0, 400),
	];
	gradients[0].addColorStop(0.4, '#EC604A');
	gradients[0].addColorStop(1, '#DE6652');

	gradients[1].addColorStop(0, '#E24E36');
	gradients[1].addColorStop(1, '#C9442F');

	gradients[2].addColorStop(0, '#E63114');
	gradients[2].addColorStop(1, '#BB2912');

	gradients[3].addColorStop(0, '#A9210C');
	gradients[3].addColorStop(1, '#96210E');

	gradients[4].addColorStop(0, '#A9210C');
	gradients[4].addColorStop(1, '#76180A');

	if (!ctx) {
		return;
	}

	new Chart(ctx, {
		type: 'doughnut',
		data: {
			datasets: [
				{
					data: [240, 50, 50, 200, 460],
					backgroundColor: [...gradients],
					hoverOffset: 4,
					borderWidth: 0,
				},
			],
		},
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
		},
	});
}

function ripdBarChar() {
	const ctx = document.getElementById('ripd-bar-chart');

	if (!ctx) {
		return;
	}

	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['', 'Jan', '', '', 'Feb', '', '', 'Mar', '', '', 'Apr', '', '', 'Mai', '', '', 'Jun', ''],
			datasets: [
				{
					base: -100,
					data: [-20, 0, 30, -20, 10, 56, -2, -10, 20, 8, 50, -16, 18, 16, -16, -16, 10, 40],
					backgroundColor: '#E63114',
					grouped: false,
				},
			],
		},
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					suggestedMin: -100,
					suggestedMax: 100,

					grid: gridOptions,
					ticks: {
						color: '#49336B',
					},
				},
				x: {
					grid: gridOptions,
					ticks: {
						autoSkip: true,
						color: '#49336B',
					},
				},
			},
			elements: {
				bar: {
					borderRadius: 8,
				},
			},
		},
	});
}

function ripdLineChart() {
	const ctx = document.getElementById('ripd-line-chart');

	if (!ctx) {
		return;
	}

	new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun'],
			datasets: [
				{
					data: [11, 24, 12, -6, -22, -6, 12],
					borderColor: '#fff',
					backgroundColor: '#fff',
				},
				{
					data: [-22, -4, -22, 64, 12, 28, -22],
					borderColor: '#E63114',
					backgroundColor: '#E63114',
				},
			],
		},
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					suggestedMin: 50,
					suggestedMax: 100,

					grid: gridOptions,
					ticks: {
						color: '#49336B',
					},
				},
				x: {
					grid: gridOptions,
					ticks: {
						color: '#49336B',
					},
				},
			},
			radius: 8,
		},
	});
}

function reklamaPieChar() {
	const ctx = document.getElementById('reklama-pie-chart');

	console.log(ctx);

	const gradients = [
		ctx.getContext('2d').createLinearGradient(0, 0, 0, 400),
		ctx.getContext('2d').createLinearGradient(0, 0, 0, 400),
		ctx.getContext('2d').createLinearGradient(0, 0, 0, 400),
		ctx.getContext('2d').createLinearGradient(0, 0, 0, 400),
	];
	gradients[0].addColorStop(0.4, '#36166B');
	gradients[0].addColorStop(1, '#E63114');
	gradients[1].addColorStop(0, '#6A42AD');
	gradients[1].addColorStop(1, '#7D50CA');
	gradients[2].addColorStop(0, '#462183');
	gradients[2].addColorStop(1, '#6A42AD');
	gradients[3].addColorStop(0, '#391772');
	gradients[3].addColorStop(1, '#4E2691');

	if (!ctx) {
		return;
	}

	new Chart(ctx, {
		type: 'doughnut',
		data: {
			datasets: [
				{
					data: [50, 50, 50, 50],
					hoverOffset: 4,
					backgroundColor: [...gradients],
					spacing: 26,
				},
			],
		},
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
			datasetRadiusBuffer: 25,
			cutoutPercentage: 75,
		},
	});
}
