// Скрытие/показ skip-link при фокусе
document.addEventListener('DOMContentLoaded', function() {
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main');
    
    if (skipLink && mainContent) {
        skipLink.addEventListener('focus', function() {
            this.style.top = '1rem';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-100%';
        });
    }
});

// Модальное окно для проектов
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
let previousActiveElement = null;

if (modal && closeBtn) {
    const projectCards = document.querySelectorAll('.project-card-large');
    let currentProjectData = null;
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            openProjectModal(this);
        });
        
        // Поддержка клавиатуры для карточек проектов
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(this);
            }
        });
    });

    function openProjectModal(card) {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = description;
        currentProjectData = { title, description };
        
        // Запоминаем активный элемент для возврата фокуса
        previousActiveElement = document.activeElement;
        
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        
        // Скрываем фоновый контент от скринридеров
        document.querySelectorAll('main > *, header, footer').forEach(el => {
            el.setAttribute('aria-hidden', 'true');
        });
        
        // Фокус на модальном окне
        setTimeout(() => {
            modal.focus();
        }, 100);
        
        // Добавляем обработчик Escape
        document.addEventListener('keydown', handleEscapeKey);
    }

    closeBtn.addEventListener('click', closeModal);

    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        
        // Возвращаем видимость основному контенту
        document.querySelectorAll('[aria-hidden="true"]').forEach(el => {
            el.removeAttribute('aria-hidden');
        });
        
        // Возвращаем фокус на предыдущий элемент
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
        
        // Убираем обработчик Escape
        document.removeEventListener('keydown', handleEscapeKey);
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    // Ловим фокус внутри модального окна
    modal.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });

    // Закрытие модалки при клике вне контента
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Фильтрация проектов
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс и aria-pressed у всех кнопок
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            
            // Добавляем активный класс и aria-pressed текущей кнопке
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            
            const filter = button.textContent.toLowerCase();
            const projects = document.querySelectorAll('.project-card-large');
            
            projects.forEach(project => {
                if (filter === 'все' || project.dataset.category === filter) {
                    project.style.display = 'block';
                    project.setAttribute('aria-hidden', 'false');
                } else {
                    project.style.display = 'none';
                    project.setAttribute('aria-hidden', 'true');
                }
            });
        });
    });
}

// Валидация формы контактов
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Валидация имени
        if (name.value.trim().length < 2) {
            document.getElementById('nameError').textContent = 'Имя должно содержать минимум 2 символа';
            name.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            document.getElementById('nameError').textContent = '';
            name.removeAttribute('aria-invalid');
        }
        
        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('emailError').textContent = 'Введите корректный email';
            email.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            document.getElementById('emailError').textContent = '';
            email.removeAttribute('aria-invalid');
        }
        
        // Валидация сообщения
        if (message.value.trim().length < 10) {
            document.getElementById('messageError').textContent = 'Сообщение должно содержать минимум 10 символов';
            message.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            document.getElementById('messageError').textContent = '';
            message.removeAttribute('aria-invalid');
        }
        
        if (isValid) {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.setAttribute('role', 'status');
            successMessage.setAttribute('aria-live', 'polite');
            successMessage.innerHTML = '<p>Сообщение успешно отправлено! Спасибо за обращение.</p>';
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
            
            contactForm.reset();
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
            }, 5000);
        }
    });
}

// Добавление новой задачи в дневник
const addTaskBtn = document.getElementById('addTaskBtn');
if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
        const taskText = prompt('Введите новую задачу:');
        if (taskText) {
            const tasksList = document.querySelector('.tasks-list');
            if (tasksList) {
                const newTask = document.createElement('li');
                newTask.className = 'task-item in-progress';
                newTask.setAttribute('role', 'listitem');
                newTask.innerHTML = `
                    <span class="task-date">${new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}</span>
                    <span class="task-text">${taskText}</span>
                    <span class="task-status" aria-label="В процессе">in progress</span>
                `;
                tasksList.appendChild(newTask);
                
                // Добавляем анимацию появления
                setTimeout(() => {
                    newTask.style.opacity = '1';
                }, 10);
            }
        }
    });
}

// Анимация прогресс-баров при скролле
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress, .progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 100);
    });
}

// Запуск анимации при загрузке страницы
window.addEventListener('load', animateProgressBars);

// Lazy loading для изображений
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    // Здесь можно добавить логику для подмены low-quality изображений на полноразмерные
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
});
