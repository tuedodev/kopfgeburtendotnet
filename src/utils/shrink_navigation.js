const shrink_navigation = (element) =>{
    if (window.pageYOffset < 100) {
        element.classList.remove(`shrinked`);
    } else {
        if (!element.classList.contains(`shrinked`)) {
            element.classList.add(`shrinked`);
        }
    }
}

export default shrink_navigation;