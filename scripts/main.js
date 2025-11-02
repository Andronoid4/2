// Модальное окно для проектов
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');

if (modal && closeBtn) {
    const projectCards = document.querySelectorAll('.project-card-large');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalDescription').textContent = description;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Фильтрация проектов
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            const filter = button.textContent.toLowerCase();
            const projects = document.querySelectorAll('.project-card-large');
            
            projects.forEach(project => {
                if (filter === 'все' || project.dataset.category === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
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
            isValid = false;
        } else {
            document.getElementById('nameError').textContent = '';
        }
        
        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('emailError').textContent = 'Введите корректный email';
            isValid = false;
        } else {
            document.getElementById('emailError').textContent = '';
        }
        
        // Валидация сообщения
        if (message.value.trim().length < 10) {
            document.getElementById('messageError').textContent = 'Сообщение должно содержать минимум 10 символов';
            isValid = false;
        } else {
            document.getElementById('messageError').textContent = '';
        }
        
        if (isValid) {
            alert('Сообщение успешно отправлено!');
            contactForm.reset();
        }
    });
}

// Добавление новой задачи в дневник
const addTaskBtn = document.getElementById('addTaskBtn');
if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
        const taskText = prompt('Введите новую задачу:');
        if (taskText) {
            alert(`Задача "${taskText}" добавлена!`);
            // Здесь можно добавить логику для добавления задачи в список
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

