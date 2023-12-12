document.addEventListener('DOMContentLoaded', (e) => {
	let floatingBlocks = document.querySelectorAll('[animation-floating-block]');
	floatingBlocks?.forEach((block) => {
		block.addEventListener('mouseenter', (e) => block.classList.add('animation-floating'));
		block.addEventListener('mouseleave', (e) => block.classList.remove('animation-floating'));
	});

	let tarifs = document.querySelectorAll('.sermtarif_border');
	tarifs?.forEach((block) => {
		block.addEventListener('mouseenter', (e) => block.closest('.sermtarif_block').classList.add('_hover'));
		block.addEventListener('mouseleave', (e) => block.closest('.sermtarif_block').classList.remove('_hover'));
	});

	let tarifsPd = document.querySelectorAll('.tarifsmm_pd');
	tarifsPd.forEach((block) => {
		block.addEventListener('mouseenter', (e) => {
			let parentBlock = block.closest('.tarifsmm.tarifsmm--second');
			if (!parentBlock) {
				parentBlock = block.closest('.tarifsmm');
			}
			parentBlock.classList.add('_hover');
		});
		block.addEventListener('mouseleave', (e) => {
			let parentBlock = block.closest('.tarifsmm.tarifsmm--second');
			if (!parentBlock) {
				parentBlock = block.closest('.tarifsmm');
			}
			parentBlock.classList.remove('_hover');
		});
	});

	let relatedLineBlock = document.querySelector('[data-related-line]');
	if (relatedLineBlock) {
		relatedLineBlock.style.position = 'relative';
		let relatedBlocks = relatedLineBlock.querySelectorAll('[data-related-line-block]');

		let lineTag = createLine(relatedLineBlock);
		lineTag.style.position = 'absolute';
		lineTag.style.bottom = '0';
		lineTag.style.left = '0';
		lineTag.style.width = relatedBlocks[0].offsetWidth + 'px';

		relatedBlocks.forEach((block) => {
			block.addEventListener('click', (e) => {
				lineTag.style.width = block.offsetWidth + 'px';
				lineTag.style.left =
					block.getBoundingClientRect().left - getRelatedLeftCoord(document.body, relatedLineBlock) + 'px';
			});
		});

		function createLine(relatedBlock) {
			let lineTag = document.createElement('div');
			lineTag.classList.add(`related-line`);
			if (relatedLineBlock.dataset.relatedLine) {
				lineTag.classList.add(relatedLineBlock.dataset.relatedLine);
			}

			relatedLineBlock.append(lineTag);

			return lineTag;
		}

		function getRelatedLeftCoord(parent, relatedBlock) {
			return relatedBlock.getBoundingClientRect().left - parent.getBoundingClientRect().left;
		}
	}

	if (document.querySelector('.art_block2')) {
		let navBlocks = document.querySelectorAll('.art_naw_li');
		navBlocks.forEach((navBlock) => {
			navBlock.style.position = 'relative';

			let hoverLine = document.createElement('div');
			hoverLine.className = 'art-hover-line';
			hoverLine.style.cssText = `
				opacity: 0;
				visibility: hidden;
			`;
			navBlock.append(hoverLine);

			navBlock.addEventListener('mouseenter', (e) => {
				if (window.innerWidth > 900) {
					hoverLine.style.cssText = `
					opacity: 1;
					visibility: visible;
				`;
				}
			});

			navBlock.addEventListener('mouseleave', (e) => {
				if (window.innerWidth > 900) {
					hoverLine.style.cssText = `
					opacity: 0;
					visibility: hidden;
				`;
				}
			});
		});
	}
});
