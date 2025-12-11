const buttons = document.querySelector('.volume-control');
const indicator = document.querySelector('.indicator');
const bars = document.querySelectorAll('.volume-rect');

buttons.addEventListener('click', (e) => {
    const target = e.target
    const indicatorContent = Number(indicator.textContent)

    if (target.closest('.volume-up') && indicatorContent < 10 ) {
        bars[indicatorContent].style.backgroundColor = 'tomato';
        indicator.textContent = String(indicatorContent + 1)
    }

    if (target.closest('.volume-down') && indicatorContent > 0 ) {
        bars[indicatorContent - 1].style.backgroundColor = '';
        indicator.textContent = String(indicatorContent - 1)
    }
})