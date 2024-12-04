document.addEventListener('DOMContentLoaded', () => {
    // Функция для проверки ориентации устройства
    function checkOrientation() {
        const rotateMessage = document.getElementById('rotate-message');
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;

        if (isPortrait) {
            // Если вертикально, показываем сообщение и блокируем скролл
            rotateMessage.style.display = 'flex';
            document.body.classList.add('orientation-locked');
        } else {
            // Если горизонтально, скрываем сообщение и разблокируем скролл
            rotateMessage.style.display = 'none';
            document.body.classList.remove('orientation-locked');
        }
    }

    // Проверяем ориентацию при загрузке
    checkOrientation();

    // Слушаем изменения ориентации
    window.addEventListener('orientationchange', checkOrientation);

    // Слушаем изменения размера окна
    window.addEventListener('resize', checkOrientation);

    // Массив фотографий с низким и высоким качеством
    const groupPhotos = [
        { low: 'photo1.webp', high: 'group_photo_1_high.webp' },
        { low: 'photo2.webp', high: 'photo2.jpg' },
        { low: 'photo3.webp', high: 'photo3.jpg' },
        { low: 'photo5.webp', high: 'photo5_high.webp' },
        { low: 'photo6.webp', high: 'photo6.jpg' },
        { low: 'photo7.webp', high: 'photo7.jpg' },
        { low: 'photo8.webp', high: 'photo8_high.webp' },
        { low: 'photo9.webp', high: 'photo9_high.webp' },
        { low: 'photo10.webp', high: 'photo10_high.webp' },
        { low: 'photo11.webp', high: 'photo11_high.webp' },
        // Добавьте остальные изображения аналогично
    ];

    let slideIndex = 0;
    let slideshowInterval;
    let isPlaying = true;

    const slideshowBackground = document.querySelector('.slideshow-background');
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

        // Устанавливаем низкокачественное изображение
        slideshowImage.src = `/group_photos/${currentPhoto.low}`;

        // Устанавливаем фон с низким качеством
        slideshowBackground.style.backgroundImage = `url('/group_photos/${currentPhoto.low}')`;

        // Предзагрузка высококачественного изображения
        const highResImage = new Image();
        highResImage.src = `/group_photos/${currentPhoto.high}`;
        highResImage.onload = () => {
            // Заменяем на высококачественное изображение после загрузки
            slideshowImage.src = `/group_photos/${currentPhoto.high}`;
            slideshowBackground.style.backgroundImage = `url('/group_photos/${currentPhoto.high}')`;
        };
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

    // Запускаем слайдшоу при загрузке
    showSlide(slideIndex);
    startSlideshow();

    // Модальное окно для увеличения изображения
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

    // Массив студентов с низким и высоким качеством фотографий
    const students = [
        {
            photoLow: '/images/student1.webp',
            photoHigh: '/images/student1.jpg',
            name: 'Микита Дорошенко',
            phrase: '" qer 3301 qeweff the fddsteg biggest ffddsrwr puzzle fdsgfggfg in fds12gew da dfs6weg wrld eww1ew? who is next?🌊"'
        },
        {
            photoLow: '/images/student2.webp',
            photoHigh: '/images/student2.jpg',
            name: 'Микита Тельчаров',
            phrase: '"ACHT👻"'
        },
        {
            photoLow: '/images/student3.webp',
            photoHigh: '/images/student3.jpg',
            name: 'Надія Шукалюк',
            phrase: '"Фан встреча Nadiiii"'
        },
        {
            photoLow: '/images/student4.webp',
            photoHigh: '/images/student4.webp',
            name: 'Владислава Пучинська',
            phrase: '"Пучік-Шукік-Шукалік"'
        },
        {
            photoLow: '/images/student5.webp',
            photoHigh: '/images/student5.webp',
            name: 'Андрій Іванов',
            phrase: '"Все буде добре, для кожного з нас."'
        },
        {
            photoLow: '/images/student6.webp',
            photoHigh: '/images/student6.webp',
            name: 'Дарія Фесенко',
            phrase: '"Це, не на вас, це на ситуацію!"'
        },
        {
            photoLow: '/images/student7.webp',
            photoHigh: '/images/student7.webp',
            name: 'Ігор Косаківський',
            phrase: '"за 11 років я все ще не зрозумів математику"'
        },
        {
            photoLow: '/images/student8.webp',
            photoHigh: '/images/student8.webp',
            name: 'Богдан Діденко',
            phrase: '"нанана"'
        },
        {
            photoLow: '/images/student9.webp',
            photoHigh: '/images/student9.jpg',
            name: 'Денис Сторожук',
            phrase: '"Життя надто важливе, щоб сприймати його серйозно."'
        },
        {
            photoLow: '/images/student10.webp',
            photoHigh: '/images/student10.jpg',
            name: 'Оксана Браткевич',
            phrase: '"oksana снайпеrrr"'
        },
        {
            photoLow: '/images/student11.webp',
            photoHigh: '/images/student11.jpg',
            name: 'Катерина Кравченко',
            phrase: '"Санечка снимает"'
        },
        {
            photoLow: '/images/student12.webp',
            photoHigh: '/images/student12.jpg',
            name: 'Евеліна Станкова',
            phrase: ''
        },
        {
            photoLow: '/images/student13.webp',
            photoHigh: '/images/student13.jpg',
            name: 'Максим Кюркчіу',
            phrase: ''
        },
        {
            photoLow: '/images/student14.webp',
            photoHigh: '/images/student14.jpg',
            name: 'Владислав Шкуріна',
            phrase: '"witch and snake my bfs"'
        },
        {
            photoLow: '/images/student15.webp',
            photoHigh: '/images/student15.jpg',
            name: 'Марія Мироненко',
            phrase: ''
        },
        {
            photoLow: '/images/student16.webp',
            photoHigh: '/images/student16.jpg',
            name: 'Вероніка Лутенко',
            phrase: '"\n12:53\nveronika ne vor\nВідкласти\nСтоп\n"'
        },
        {
            photoLow: '/images/student17.webp',
            photoHigh: '/images/student17.jpg',
            name: 'Анастасія Гафенко',
            phrase: ''
        },
        {
            photoLow: '/images/student18.webp',
            photoHigh: '/images/student18.jpg',
            name: 'Анастасія Мороз',
            phrase: ''
        },
        {
            photoLow: '/images/student19.webp',
            photoHigh: '/images/student19.jpg',
            name: 'Марія Бандурова',
            phrase: ''
        },
        {
            photoLow: '/images/student20.webp',
            photoHigh: '/images/student20.jpg',
            name: 'Марго Бондар',
            phrase: ''
        },
        {
            photoLow: '/images/student22.webp',
            photoHigh: '/images/student22.jpg',
            name: 'Ваеліря Бец',
            phrase: ''
        },
        {
            photoLow: '/images/student23.webp',
            photoHigh: '/images/student23.jpg',
            name: 'Соломонова Софія',
            phrase: ''
        },
        {
            photoLow: '/images/student24.webp',
            photoHigh: '/images/student24.jpg',
            name: 'Вікторія Василенко',
            phrase: ''
        },
        {
            photoLow: '/images/student25.webp',
            photoHigh: '/images/student25.jpg',
            name: 'Артем Богданов',
            phrase: ''
        },
        {
            photoLow: '/images/student26.webp',
            photoHigh: '/images/student26.jpg',
            name: 'Надія Цуркан',
            phrase: ''
        },
        {
            photoLow: '/images/student27.webp',
            photoHigh: '/images/student27.jpg',
            name: 'Костянтин Краснян',
            phrase: ''
        },
        {
            photoLow: '/images/student28.webp',
            photoHigh: '/images/student28.jpg',
            name: 'Кіра Лафазан',
            phrase: ''
        }
        // Добавьте остальных студентов аналогично
    ];

    let currentIndex = 0;

    const centralCard = document.getElementById('central-card');
    const leftCard = document.querySelector('.left-card');
    const rightCard = document.querySelector('.right-card');

    // Функция обновления отображения карточек
    function updateDisplay(direction = null) {
        if (!centralCard || !leftCard || !rightCard) {
            return;
        }

        // Добавляем класс анимации только если direction задан
        if (direction === 'left') {
            centralCard.classList.add('blur-out-right');
        } else if (direction === 'right') {
            centralCard.classList.add('blur-out-left');
        }

        const updateContent = () => {
            // Обновляем центральную карточку
            const frontImg = centralCard.querySelector('.front .photo img');
            const nameDiv = centralCard.querySelector('.overlay .name');
            const phraseDiv = centralCard.querySelector('.back .phrase');

            // Устанавливаем низкокачественное изображение
            frontImg.src = `${students[currentIndex].photoLow}`;

            // Предзагрузка высококачественного изображения
            const highResImage = new Image();
            highResImage.src = `${students[currentIndex].photoHigh}`;
            highResImage.onload = () => {
                // Заменяем на высококачественное изображение после загрузки
                frontImg.src = `${students[currentIndex].photoHigh}`;
            };

            nameDiv.textContent = students[currentIndex].name;
            phraseDiv.textContent = students[currentIndex].phrase || '';

            // Сбрасываем переворот
            if (centralCard.classList.contains('flip')) {
                centralCard.classList.remove('flip');
            }

            // Убираем старые классы анимации и добавляем новые
            centralCard.classList.remove('blur-out-left', 'blur-out-right');
            if (direction === 'left') {
                centralCard.classList.add('blur-in-left');
            } else if (direction === 'right') {
                centralCard.classList.add('blur-in-right');
            }

            // Проверка наличия фразы
            if (students[currentIndex].phrase && students[currentIndex].phrase.trim() !== '') {
                // Добавляем обработчик клика и меняем курсор на указатель
                centralCard.style.cursor = 'pointer';
                centralCard.addEventListener('click', flipCard);
            } else {
                // Убираем обработчик клика и меняем курсор на обычный
                centralCard.style.cursor = 'default';
                centralCard.removeEventListener('click', flipCard);
            }

            // Обновляем боковые карточки
            if (currentIndex > 0) {
                leftCard.style.display = 'block';
                const leftImg = leftCard.querySelector('img');
                leftImg.src = `${students[currentIndex - 1].photoLow}`;

                // Предзагрузка высококачественного изображения
                const leftHighResImage = new Image();
                leftHighResImage.src = `${students[currentIndex - 1].photoHigh}`;
                leftHighResImage.onload = () => {
                    leftImg.src = `${students[currentIndex - 1].photoHigh}`;
                };
            } else {
                leftCard.style.display = 'none';
            }

            if (currentIndex < students.length - 1) {
                rightCard.style.display = 'block';
                const rightImg = rightCard.querySelector('img');
                rightImg.src = `${students[currentIndex + 1].photoLow}`;

                // Предзагрузка высококачественного изображения
                const rightHighResImage = new Image();
                rightHighResImage.src = `${students[currentIndex + 1].photoHigh}`;
                rightHighResImage.onload = () => {
                    rightImg.src = `${students[currentIndex + 1].photoHigh}`;
                };
            } else {
                rightCard.style.display = 'none';
            }

            // Убираем классы анимации после завершения
            if (direction) {
                setTimeout(() => {
                    centralCard.classList.remove('blur-in-left', 'blur-in-right');
                }, 500);
            }
        };

        // Если direction задан, ждем окончания анимации
        if (direction) {
            setTimeout(updateContent, 500);
        } else {
            updateContent();
        }
    }

    // Обработчик для переворота карточки
    function flipCard() {
        centralCard.classList.toggle('flip');
    }

    // Обработчики клика для боковых карточек
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

    // Инициализируем отображение
    updateDisplay();

    // Обработчик для кнопки "Назад к слайдшоу"
    const backToSlideshowBtn = document.getElementById('back-to-slideshow-btn');
    const scrollContainer = document.querySelector('.scroll-container');
    const sections = document.querySelectorAll('.section');
    const slideshowSection = sections[1]; // вторая секция - слайдшоу
    const portraitSection = sections[2]; // третья секция - портреты

    let portraitSectionTop = portraitSection.offsetTop;
    let portraitSectionBottom = portraitSection.offsetTop + portraitSection.offsetHeight;

    // Обновляем позиции при загрузке
    window.addEventListener('load', () => {
        portraitSectionTop = portraitSection.offsetTop;
        portraitSectionBottom = portraitSection.offsetTop + portraitSection.offsetHeight;
    });

    // Обработчик скролла
    scrollContainer.addEventListener('scroll', () => {
        const scrollPosition = scrollContainer.scrollTop;

        // Показываем кнопку, если находимся в секции портретов
        if (scrollPosition >= portraitSectionTop - 10 && scrollPosition <= portraitSectionBottom + 10) {
            backToSlideshowBtn.style.display = 'flex';
        } else {
            backToSlideshowBtn.style.display = 'none';
        }
    });

    // Скроллим к слайдшоу при клике на кнопку
    backToSlideshowBtn.addEventListener('click', () => {
        scrollContainer.scrollTo({
            top: slideshowSection.offsetTop,
            behavior: 'smooth'
        });
    });

    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const fullscreenPopup = document.getElementById('fullscreen-popup');
    const closePopup = document.querySelector('.close-popup');
    const enterFullscreenBtn = document.getElementById('enter-fullscreen');
    const confirmHidePopupBtn = document.getElementById('confirm-hide-popup');
    const cancelHidePopupBtn = document.getElementById('cancel-hide-popup');
    const popupContent = document.querySelector('.popup-content');
    const popupConfirmationContent = document.querySelector('.popup-confirmation-content');

    // Функция переключения полноэкранного режима
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            // Входим в полноэкранный режим
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Ошибка при переходе в полноэкранный режим: ${err.message} (${err.name})`);
            });
        } else {
            // Выходим из полноэкранного режима
            document.exitFullscreen();
        }
    }

    // Обработчик клика по кнопке "Перейти в повноекранний режим"
    enterFullscreenBtn.addEventListener('click', () => {
        toggleFullscreen();
        hideFullscreenPopup();
    });

    // Обработчик клика по кнопке полноэкранного режима в правом нижнем углу
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Обновляем иконку кнопки при изменении полноэкранного режима
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>'; // Иконка для выхода
        } else {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>'; // Иконка для входа
        }
    });

    // Показываем всплывающее окно
    function showFullscreenPopup() {
        fullscreenPopup.classList.add('active');
    }

    // Скрываем всплывающее окно
    function hideFullscreenPopup() {
        fullscreenPopup.classList.remove('active');
    }

    // Функция для определения устройств iOS
    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }

    // Скрываем кнопку и всплывающее окно на iOS
    if (isIOS()) {
        fullscreenBtn.style.display = 'none';
        fullscreenPopup.style.display = 'none';
    } else {
        // Показываем всплывающее окно после 3 секунд, если пользователь не отключил его ранее
        if (!localStorage.getItem('hideFullscreenPopup')) {
            setTimeout(showFullscreenPopup, 3000);
        }
    }

    // Обработчик для кнопки закрытия (крестик)
    closePopup.addEventListener('click', () => {
        // Показываем блок подтверждения
        popupContent.style.display = 'none';
        popupConfirmationContent.style.display = 'flex';
    });

    // Обработчик для кнопки подтверждения (галочка)
    confirmHidePopupBtn.addEventListener('click', () => {
        localStorage.setItem('hideFullscreenPopup', 'true');
        hideFullscreenPopup();
    });

    // Обработчик для кнопки отмены (крестик)
    cancelHidePopupBtn.addEventListener('click', () => {
        popupConfirmationContent.style.display = 'none';
        hideFullscreenPopup();
    });
});
