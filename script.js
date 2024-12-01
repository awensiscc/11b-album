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
        'photo3spring.jpg',
        'photo4.jpg',
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
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
    }

    prevBtn.addEventListener('click', () => {
        showSlide(slideIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(slideIndex + 1);
    });

    playPauseBtn.addEventListener('click', () => {
        const icon = playPauseBtn.querySelector('i');
        if (isPlaying) {
            stopSlideshow();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        } else {
            startSlideshow();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
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
            photo: 'student1.jpg',
            name: 'Марія Бандурова',
            phrase: '"Никогда не сдавайся!"'
        },
        {
            photo: 'student2.jpg',
            name: 'Петр Петров',
            phrase: '"Всегда вперед!"'
        },
        {
            photo: 'student3.jpg',
            name: 'Мария Сидорова',
            phrase: '"Мечтай и достигай!"'
        },
        // Добавьте остальных учеников (всего должно быть 29)
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
            frontImg.src = `images/${students[currentIndex].photo}`;
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
                leftImg.src = `images/${students[currentIndex - 1].photo}`;
            } else {
                leftCard.style.display = 'none';
            }

            if (currentIndex < students.length - 1) {
                rightCard.style.display = 'block';
                const rightImg = rightCard.querySelector('img');
                rightImg.src = `images/${students[currentIndex + 1].photo}`;
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
    const secondBlock = document.querySelectorAll('.section')[1];

    // Обработчик прокрутки
    scrollContainer.addEventListener('scroll', () => {
        const scrollPosition = scrollContainer.scrollTop;
        const secondBlockTop = secondBlock.offsetTop;

        // Показываем кнопку, если прокрутка достигла второго блока
        if (scrollPosition >= secondBlockTop) {
            backToSlideshowBtn.style.display = 'flex';
        } else {
            backToSlideshowBtn.style.display = 'none';
        }
    });

    // Перемещение к первому блоку при клике на кнопку
    backToSlideshowBtn.addEventListener('click', () => {
        scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
