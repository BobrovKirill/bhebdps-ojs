document.addEventListener('DOMContentLoaded', function() {
    // Все элементы с подсказками
    const tooltipElements = document.querySelectorAll('.has-tooltip');

    // Создаем элемент подсказки
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    // Активная подсказка
    let activeTooltipElement = null;

    // Функция для расчета позиции подсказки
    function calculatePosition(element, position) {
        const elementRect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top, left;

        switch (position) {
            case 'top':
                top = elementRect.top + scrollTop - tooltipRect.height - 6;
                left = elementRect.left + scrollLeft + (elementRect.width / 2) - (tooltipRect.width / 2);
                break;

            case 'bottom':
                top = elementRect.bottom + scrollTop + 6;
                left = elementRect.left + scrollLeft + (elementRect.width / 2) - (tooltipRect.width / 2);
                break;

            case 'left':
                top = elementRect.top + scrollTop + (elementRect.height / 2) - (tooltipRect.height / 2);
                left = elementRect.left + scrollLeft - tooltipRect.width - 6;
                break;

            case 'right':
                top = elementRect.top + scrollTop + (elementRect.height / 2) - (tooltipRect.height / 2);
                left = elementRect.right + scrollLeft + 6;
                break;

            default: // top по умолчанию
                top = elementRect.top + scrollTop - tooltipRect.height - 6;
                left = elementRect.left + scrollLeft + (elementRect.width / 2) - (tooltipRect.width / 2);
        }

        // Корректировка, чтобы подсказка не выходила за пределы окна
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Проверка по горизонтали
        if (left < 10) left = 10;
        if (left + tooltipRect.width > viewportWidth - 10) {
            left = viewportWidth - tooltipRect.width - 10;
        }

        // Проверка по вертикали
        if (top < 10) top = 10;
        if (top + tooltipRect.height > viewportHeight + scrollTop - 10) {
            top = viewportHeight + scrollTop - tooltipRect.height - 10;
        }

        return { top, left };
    }

    // Функция для показа подсказки
    function showTooltip(element) {
        // Если эта подсказка уже активна, скрываем ее
        if (activeTooltipElement === element) {
            hideTooltip();
            return;
        }

        // Получаем текст подсказки из атрибута title
        const tooltipText = element.getAttribute('title');
        if (!tooltipText) return;

        // Получаем позицию из data-position или используем 'top' по умолчанию
        const position = element.getAttribute('data-position') || 'top';

        // Устанавливаем текст и позицию
        tooltip.textContent = tooltipText;
        tooltip.setAttribute('data-position', position);

        // Рассчитываем и устанавливаем позицию
        const { top, left } = calculatePosition(element, position);
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';

        // Показываем подсказку
        tooltip.classList.add('tooltip_active');
        activeTooltipElement = element;
    }

    // Функция для скрытия подсказки
    function hideTooltip() {
        tooltip.classList.remove('tooltip_active');
        activeTooltipElement = null;
    }

    // Добавляем обработчики событий для всех элементов с подсказками
    tooltipElements.forEach(element => {
        // Удаляем стандартное поведение title при наведении
        element.addEventListener('mouseenter', function(e) {
            // Сохраняем оригинальный title
            const originalTitle = this.getAttribute('title');
            if (originalTitle) {
                this.setAttribute('data-original-title', originalTitle);
                this.removeAttribute('title');
            }
        });

        // Восстанавливаем title при уходе мыши (если подсказка не активна)
        element.addEventListener('mouseleave', function(e) {
            if (activeTooltipElement !== this) {
                const originalTitle = this.getAttribute('data-original-title');
                if (originalTitle) {
                    this.setAttribute('title', originalTitle);
                    this.removeAttribute('data-original-title');
                }
            }
        });

        // Показываем подсказку по клику
        element.addEventListener('click', function(e) {
            e.preventDefault();
            showTooltip(this);
        });
    });

    // Скрываем подсказку при клике в любом другом месте
    document.addEventListener('click', function(e) {
        // Если клик был не по элементу с подсказкой и не по самой подсказке
        if (!e.target.closest('.has-tooltip') && e.target !== tooltip) {
            hideTooltip();

            // Восстанавливаем title для всех элементов
            tooltipElements.forEach(element => {
                const originalTitle = element.getAttribute('data-original-title');
                if (originalTitle) {
                    element.setAttribute('title', originalTitle);
                    element.removeAttribute('data-original-title');
                }
            });
        }
    });

    // Скрываем подсказку при изменении размера окна
    window.addEventListener('resize', function() {
        if (activeTooltipElement) {
            // Пересчитываем позицию при изменении размера окна
            const position = activeTooltipElement.getAttribute('data-position') || 'top';
            const { top, left } = calculatePosition(activeTooltipElement, position);
            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
        }
    });

    // Скрываем подсказку при прокрутке
    window.addEventListener('scroll', function() {
        if (activeTooltipElement) {
            hideTooltip();

            // Восстанавливаем title для всех элементов
            tooltipElements.forEach(element => {
                const originalTitle = element.getAttribute('data-original-title');
                if (originalTitle) {
                    element.setAttribute('title', originalTitle);
                    element.removeAttribute('data-original-title');
                }
            });
        }
    });
});document.addEventListener('DOMContentLoaded', function() {
    // Все элементы с подсказками
    const tooltipElements = document.querySelectorAll('.has-tooltip');

    // Создаем элемент подсказки
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    // Активная подсказка
    let activeTooltipElement = null;

    // Функция для расчета позиции подсказки
    function calculatePosition(element, position) {
        const elementRect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top, left;

        switch (position) {
            case 'top':
                top = elementRect.top + scrollTop - tooltipRect.height - 6;
                left = elementRect.left + scrollLeft + (elementRect.width / 2) - (tooltipRect.width / 2);
                break;

            case 'bottom':
                top = elementRect.bottom + scrollTop + 6;
                left = elementRect.left + scrollLeft + (elementRect.width / 2) - (tooltipRect.width / 2);
                break;

            case 'left':
                top = elementRect.top + scrollTop + (elementRect.height / 2) - (tooltipRect.height / 2);
                left = elementRect.left + scrollLeft - tooltipRect.width - 6;
                break;

            case 'right':
                top = elementRect.top + scrollTop + (elementRect.height / 2) - (tooltipRect.height / 2);
                left = elementRect.right + scrollLeft + 6;
                break;

            default: // top по умолчанию
                top = elementRect.top + scrollTop - tooltipRect.height - 6;
                left = elementRect.left + scrollLeft + (elementRect.width / 2) - (tooltipRect.width / 2);
        }

        // Корректировка, чтобы подсказка не выходила за пределы окна
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Проверка по горизонтали
        if (left < 10) left = 10;
        if (left + tooltipRect.width > viewportWidth - 10) {
            left = viewportWidth - tooltipRect.width - 10;
        }

        // Проверка по вертикали
        if (top < 10) top = 10;
        if (top + tooltipRect.height > viewportHeight + scrollTop - 10) {
            top = viewportHeight + scrollTop - tooltipRect.height - 10;
        }

        return { top, left };
    }

    // Функция для показа подсказки
    function showTooltip(element) {
        // Если эта подсказка уже активна, скрываем ее
        if (activeTooltipElement === element) {
            hideTooltip();
            return;
        }

        // Получаем текст подсказки из атрибута title
        const tooltipText = element.getAttribute('title');
        if (!tooltipText) return;

        // Получаем позицию из data-position или используем 'top' по умолчанию
        const position = element.getAttribute('data-position') || 'top';

        // Устанавливаем текст и позицию
        tooltip.textContent = tooltipText;
        tooltip.setAttribute('data-position', position);

        // Рассчитываем и устанавливаем позицию
        const { top, left } = calculatePosition(element, position);
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';

        // Показываем подсказку
        tooltip.classList.add('tooltip_active');
        activeTooltipElement = element;
    }

    // Функция для скрытия подсказки
    function hideTooltip() {
        tooltip.classList.remove('tooltip_active');
        activeTooltipElement = null;
    }

    // Добавляем обработчики событий для всех элементов с подсказками
    tooltipElements.forEach(element => {
        // Удаляем стандартное поведение title при наведении
        element.addEventListener('mouseenter', function(e) {
            // Сохраняем оригинальный title
            const originalTitle = this.getAttribute('title');
            if (originalTitle) {
                this.setAttribute('data-original-title', originalTitle);
                this.removeAttribute('title');
            }
        });

        // Восстанавливаем title при уходе мыши (если подсказка не активна)
        element.addEventListener('mouseleave', function(e) {
            if (activeTooltipElement !== this) {
                const originalTitle = this.getAttribute('data-original-title');
                if (originalTitle) {
                    this.setAttribute('title', originalTitle);
                    this.removeAttribute('data-original-title');
                }
            }
        });

        // Показываем подсказку по клику
        element.addEventListener('click', function(e) {
            e.preventDefault();
            showTooltip(this);
        });
    });

    // Скрываем подсказку при клике в любом другом месте
    document.addEventListener('click', function(e) {
        // Если клик был не по элементу с подсказкой и не по самой подсказке
        if (!e.target.closest('.has-tooltip') && e.target !== tooltip) {
            hideTooltip();

            // Восстанавливаем title для всех элементов
            tooltipElements.forEach(element => {
                const originalTitle = element.getAttribute('data-original-title');
                if (originalTitle) {
                    element.setAttribute('title', originalTitle);
                    element.removeAttribute('data-original-title');
                }
            });
        }
    });

    // Скрываем подсказку при изменении размера окна
    window.addEventListener('resize', function() {
        if (activeTooltipElement) {
            // Пересчитываем позицию при изменении размера окна
            const position = activeTooltipElement.getAttribute('data-position') || 'top';
            const { top, left } = calculatePosition(activeTooltipElement, position);
            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
        }
    });

    // Скрываем подсказку при прокрутке
    window.addEventListener('scroll', function() {
        if (activeTooltipElement) {
            hideTooltip();

            // Восстанавливаем title для всех элементов
            tooltipElements.forEach(element => {
                const originalTitle = element.getAttribute('data-original-title');
                if (originalTitle) {
                    element.setAttribute('title', originalTitle);
                    element.removeAttribute('data-original-title');
                }
            });
        }
    });
});