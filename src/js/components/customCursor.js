export default () => {
	setTimeout(() => {
		const mouseCursor = document.querySelector('.js-cursor');
		const hoveredElements =
			[...document.querySelectorAll('a, button, .js-hovered, [data-plyr=play]')];

		const cursor = (e, y, x) => {
			mouseCursor.style.top = y + 'px';
			mouseCursor.style.left = x + 'px';
		}

		window.addEventListener('mousemove', (e) => {
			cursor(e, e.pageY - window.scrollY, e.pageX);
		});

		hoveredElements.forEach(h => {
			h.addEventListener('mouseenter', () => {
				mouseCursor.classList.add('is-visible');
			})
			h.addEventListener('mouseleave', () => {
				mouseCursor.classList.remove('is-visible');
			});
		})
	}, 1000);
}
