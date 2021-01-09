function ready(fn) {
	/*if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}*/
}

ready(() => {
	const _init = () => {
        console.log("Outside Gatsby JS Script working...")
        //let header = document.querySelector(`body header`);
		//window.addEventListener('scroll', _shrinkNavigation.bind(null, header));
	};
    /*
    const _shrinkNavigation = (element) => {
		if (window.pageYOffset < 100) {
			element.classList.remove(`shrinked`);
		} else {
			if (!element.classList.contains(`shrinked`)) {
				element.classList.add(`shrinked`);
			}
		}
	};*/
	_init();
});
