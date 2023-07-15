const slider = document.querySelector('.table-responsive');
let mouseDown = false;
let startX, scrollLeft;

let startDragging = function (e) {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.cursor = 'pointer';
};
let stopDragging = function (event) {
    mouseDown = false;
    slider.style.cursor = 'auto';
};

slider.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (!mouseDown) { return; }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.style.cursor = 'pointer';
    slider.scrollLeft = scrollLeft - scroll;
});

// Add the event listeners
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);