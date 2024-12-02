document.addEventListener('DOMContentLoaded', () => {
    // Функция для проверки ориентации устройства
    function checkOrientation() {
        const rotateMessage = document.getElementById('rotate-message');
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;

        if (isPortrait) {
            // Если вертикальная ориентация, показываем сообщение и блокируем прокрутку
            rotateMessage.style.display = 'flex';
            document.body.classList.add('orientation-locked');
        } else {
            // Если горизонтальная ориентация, скрываем сообщение и разблокируем прокрутку
            rotateMessage.style.display = 'none';
            document.body.classList.remove('orientation-locked');
        }
    }

    // Проверяем ориентацию при загрузке страницы
    checkOrientation();

    // Добавляем обработчик события изменения ориентации
    window.addEventListener('orientationchange', checkOrientation);

    // Также добавим обработчик на изменение размеров окна (для браузеров)
    window.addEventListener('resize', checkOrientation);

    // Массив с путями к групповым фотографиям
    const groupPhotos = [
        'photo1.jpg',
        'photo2.jpg',
        'photo3.jpg',
        'photo4.jpg',
        'photo5.jpg',
        'photo6.jpg',
        'photo7.jpg',
        'photo8.jpg',
        'photo9.jpg',
        'photo10.jpg',
        'photo11.jpg',
        // Добавьте остальные фотографии
    ];

    let slideIndex = 0;
    let slideshowInterval;
    let isPlaying = true;

    const slideshowImage = document.querySelector('.slideshow img');
    const prevBtn = document.getElementById('prev-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');

    function showSlide(index) {
        if (index >= groupPhotos.length) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = groupPhotos.length - 1;
        } else {
            slideIndex = index;
        }

        const currentPhoto = groupPhotos[slideIndex];

        slideshowImage.src = `/group_photos/${currentPhoto}`;

        // Устанавливаем фон размытого изображения
        const slideshowContainer = document.querySelector('.slideshow-container');
        slideshowContainer.style.backgroundImage = `url('/group_photos/${currentPhoto}')`;
    }

    function startSlideshow() {
        slideshowInterval = setInterval(() => {
            showSlide(slideIndex + 1);
        }, 5000);
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    prevBtn.addEventListener('click', () => {
        showSlide(slideIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(slideIndex + 1);
    });

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
        isPlaying = !isPlaying;
    });

    // Запуск слайд-шоу при загрузке страницы
    showSlide(slideIndex);
    startSlideshow();

    // Модальное окно для увеличения изображений
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal .close');

    // Открываем модальное окно при клике на изображение
    slideshowImage.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = slideshowImage.src;
    });

    // Закрываем модальное окно при клике на кнопку закрытия
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрываем модальное окно при клике вне изображения
    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Массив учеников
    const students = [
        {
            photo: '/images/student1.jpg',
            name: 'Микита Дорошенко',
            phrase: '" qer 3301 qeweff the fddsteg biggest ffddsrwr puzzle fdsgfggfg in fds12gew da dfs6weg wrld eww1ew? who is next?🌊"'
        },
        {
            photo: '/images/student2.jpg',
            name: 'Микита Тельчаров',
            phrase: '"Всегда вперед!"'
        },
        {
            photo: '/images/student3.jpg',
            name: 'Надія Шукалюк',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student4.jpg',
            name: 'Владислава Пучинська',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student5.jpg',
            name: 'Андрій Іванов',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student6.jpg',
            name: 'Дарія Фесенко',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student7.jpg',
            name: 'Ігор Косаківський',
            phrase: '"Мечтай и достигай!"'
        },
         {
            photo: '/images/student8.jpg',
            name: 'Богдан Діденко',
            phrase: '"Мечтай и достигай!"'
        },
         {
            photo: '/images/student9.jpg',
            name: 'Денис Сторожук',
            phrase: '"Мечтай и достигай!"'
        },
         {
            photo: '/images/student10.jpg',
            name: 'Оксана Браткевич',
            phrase: '"Мечтай и достигай!"'
        },
         {
            photo: '/images/student11.jpg',
            name: 'Катерина Кравченко',
            phrase: '"Мечтай и достигай!"'
        },
         {
            photo: '/images/student12.jpg',
            name: 'Евеліна Станкова',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student13.jpg',
            name: 'Макисим Кюркчіу',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student14.jpg',
            name: 'Владислав Шкуріна',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student15.jpg',
            name: 'Марія Мироненко',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student16.jpg',
            name: 'Вероніка Лутенко',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student17.jpg',
            name: 'Анастасія Гафенко',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student18.jpg',
            name: 'Анастасія Мороз',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student19.jpg',
            name: 'Марія Бандурова',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student20.jpg',
            name: 'Марго Бондар',
            phrase: '"Мечтай и достигай!"'
        },
         {
            photo: '/images/student21.jpg',
            name: 'Владислава Крамаренко',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student22.jpg',
            name: 'Валерія Бец',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student23.jpg',
            name: 'Софія Соломонова',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student24.jpeg',
            name: 'Вікторія Василенко',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student25.jpg',
            name: 'Артем Богданов',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student26.jpg',
            name: 'Надія Цуркан',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student27.jpg',
            name: 'Костянтин Краснян',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student28.jpg',
            name: 'Кіра Лафазан',
            phrase: '"Мечтай и достигай!"'
        },

    ];

    let currentIndex = 0;

    const centralCard = document.getElementById('central-card');
    centralCard.addEventListener('click', () => {
        centralCard.classList.toggle('flip');
    });

    const leftCard = document.querySelector('.left-card');
    const rightCard = document.querySelector('.right-card');

    // Функция для обновления отображения
    function updateDisplay(direction) {
        if (!centralCard || !leftCard || !rightCard) {
            return;
        }

        // Добавляем класс анимации к текущей карточке
        if (direction === 'left') {
            centralCard.classList.add('blur-out-right');
        } else if (direction === 'right') {
            centralCard.classList.add('blur-out-left');
        }

        // Ждём завершения анимации перед обновлением контента
        setTimeout(() => {
            // Обновляем центральную карточку
            const frontImg = centralCard.querySelector('.front .photo img');
            frontImg.src = `${students[currentIndex].photo}`;
            const nameDiv = centralCard.querySelector('.overlay .name');
            nameDiv.textContent = students[currentIndex].name;
            const phraseDiv = centralCard.querySelector('.back .phrase');
            phraseDiv.textContent = students[currentIndex].phrase;

            // Сбрасываем переворот
            if (centralCard.classList.contains('flip')) {
                centralCard.classList.remove('flip');
            }

            // Удаляем старые классы анимации и добавляем новый класс для плавного появления
            centralCard.classList.remove('blur-out-left', 'blur-out-right');
            if (direction === 'left') {
                centralCard.classList.add('blur-in-left');
            } else if (direction === 'right') {
                centralCard.classList.add('blur-in-right');
            }

            // Обновляем боковые карточки
            if (currentIndex > 0) {
                leftCard.style.display = 'block';
                const leftImg = leftCard.querySelector('img');
                leftImg.src = `${students[currentIndex - 1].photo}`;
            } else {
                leftCard.style.display = 'none';
            }

            if (currentIndex < students.length - 1) {
                rightCard.style.display = 'block';
                const rightImg = rightCard.querySelector('img');
                rightImg.src = `${students[currentIndex + 1].photo}`;
            } else {
                rightCard.style.display = 'none';
            }

            // Удаляем класс анимации входа после завершения
            setTimeout(() => {
                centralCard.classList.remove('blur-in-left', 'blur-in-right');
            }, 500);
        }, 500);
    }

    // Обработчики событий для боковых карточек
    leftCard.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateDisplay('left');
        }
    });

    rightCard.addEventListener('click', () => {
        if (currentIndex < students.length - 1) {
            currentIndex++;
            updateDisplay('right');
        }
    });

    // Инициализация отображения
    updateDisplay();

    // Обработчик для кнопки возврата к слайд-шоу
    const backToSlideshowBtn = document.getElementById('back-to-slideshow-btn');
    const scrollContainer = document.querySelector('.scroll-container');
    const slideshowSection = document.querySelectorAll('.section')[1]; // Вторая секция теперь слайд-шоу
    const portraitSection = document.querySelectorAll('.section')[2]; // Третья секция - портреты

    let portraitSectionTop = portraitSection.offsetTop;
    let portraitSectionBottom = portraitSection.offsetTop + portraitSection.offsetHeight;

    // Обновляем позиции после полной загрузки страницы
    window.addEventListener('load', () => {
        portraitSectionTop = portraitSection.offsetTop;
        portraitSectionBottom = portraitSection.offsetTop + portraitSection.offsetHeight;
    });

    // Обработчик прокрутки
    scrollContainer.addEventListener('scroll', () => {
        const scrollPosition = scrollContainer.scrollTop;

        // Для отладки: выводим значения в консоль
        console.log(`scrollPosition: ${scrollPosition}, portraitSectionTop: ${portraitSectionTop}, portraitSectionBottom: ${portraitSectionBottom}`);

        // Показываем кнопку, если пользователь находится в третьей секции (портреты)
        if (scrollPosition >= portraitSectionTop - 10 && scrollPosition <= portraitSectionBottom + 10) { // Добавляем небольшой отступ
            backToSlideshowBtn.style.display = 'flex';
        } else {
            backToSlideshowBtn.style.display = 'none';
        }
    });

    // Перемещение к слайд-шоу секции при клике на кнопку
    backToSlideshowBtn.addEventListener('click', () => {
        scrollContainer.scrollTo({
            top: slideshowSection.offsetTop,
            behavior: 'smooth'
        });
    });
});
