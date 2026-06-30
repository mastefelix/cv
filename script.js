document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== 1. TYPING EFFECT ====================
    const textElement = document.getElementById('typing-text');
    const phrases = [
        "Превращаю сложные баги в понятные решения",
        "Оптимизирую процессы и ускоряю поддержку",
        "Объясняю техническое простым языком",
        "Владею SQL, Python, 1С и эмпатией",
        "11+ лет опыта в клиентском сервисе"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();


    // ==================== 2. SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ==================== 3. SKILL FILTER ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillTags = document.querySelectorAll('.skill-tag');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillTags.forEach(tag => {
                if (filterValue === 'all' || tag.getAttribute('data-category') === filterValue) {
                    tag.style.display = 'inline-block';
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    tag.style.opacity = '0';
                    tag.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        tag.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // ==================== 4. CHAT WIDGET (KILLER FEATURE) ====================
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const quickQuestions = document.querySelectorAll('.quick-q');

    const chatAnswers = {
        contact: {
            text: [
                "📞 <b>Телефон:</b> +7 (963) 744-34-41",
                "✉️ <b>Email:</b> alexandr.kurganskii@yandex.ru",
                "💬 <b>Telegram:</b> @maste_felix",
                "📍 <b>Локация:</b> Петрозаводск (готов к удалённой работе)"
            ]
        },
        experience: {
            text: [
                "💼 <b>Общий опыт:</b> 11 лет 8 месяцев",
                "• Преподаватель IT (3+ года) - Неосистемы ИТ, Алгоритмика",
                "• Промоутер Samsung (2 года) - ТОП-1 по продажам",
                "• Менеджер М.Видео (6 лет) - ускорил выдачу на 30%",
                "• Стажёр-аналитик 1С (сертификат 1С:Профессионал)"
            ]
        },
        skills: {
            text: [
                "💻 <b>Технические навыки:</b>",
                "• 1С (УТ, CRM), SQL, Python",
                "• HTML/CSS, JavaScript, JSON, REST API",
                "• BPMN, UML, Git, Figma, Tilda",
                "<br>🤝 <b>Soft Skills:</b>",
                "• Клиентский сервис, управление командой",
                "• Наставничество, обучение клиентов"
            ]
        },
        salary: {
            text: [
                "💰 <b>Ожидаемая зарплата:</b> 80 000 ₽ на руки",
                "<br>Открыт к обсуждению в зависимости от:",
                "• Формата работы (удалёнка/офис)",
                "• Соцпакета и бонусов",
                "• Возможностей для роста"
            ]
        },
        education: {
            text: [
                "🎓 <b>Высшее образование:</b>",
                "Петрозаводский гос. университет (2015)",
                "Физико-технический факультет",
                "<br><b>Сертификаты:</b>",
                "• 1С:Профессионал (2025)",
                "• Системный аналитик (2024)",
                "• Python (2022)"
            ]
        }
    };

    function openChat() {
        chatWindow.classList.add('active');
        chatToggle.style.display = 'none';
    }

    function closeChat() {
        chatWindow.classList.remove('active');
        setTimeout(() => {
            chatToggle.style.display = 'flex';
        }, 300);
    }

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        
        if (Array.isArray(text)) {
            text.forEach(line => {
                const p = document.createElement('p');
                p.innerHTML = line;
                messageDiv.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.innerHTML = text;
            messageDiv.appendChild(p);
        }
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function simulateTypingDelay(callback) {
        setTimeout(callback, 600);
    }

    chatToggle.addEventListener('click', openChat);
    chatClose.addEventListener('click', closeChat);

    quickQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const questionKey = button.getAttribute('data-q');
            const questionText = button.textContent.replace(/^[^\s]+\s*/, '');
            
            addMessage(questionText, true);
            
            simulateTypingDelay(() => {
                if (chatAnswers[questionKey]) {
                    addMessage(chatAnswers[questionKey].text);
                }
            });
        });
    });

    // Автоматическое приветствие через 3 секунды после загрузки
    setTimeout(() => {
        if (!chatWindow.classList.contains('active')) {
            chatToggle.style.animation = 'pulse-ring 2s infinite';
        }
    }, 3000);

});