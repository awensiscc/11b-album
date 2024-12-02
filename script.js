document.addEventListener('DOMContentLoaded', () => {
    // func to chk device orient
    function checkOrientation() {
        const rotateMessage = document.getElementById('rotate-message');
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;

        if (isPortrait) {
            // if vert, show msg & block scroll
            rotateMessage.style.display = 'flex';
            document.body.classList.add('orientation-locked');
        } else {
            // if hor, hide msg & unblock scroll
            rotateMessage.style.display = 'none';
            document.body.classList.remove('orientation-locked');
        }
    }

    // chk orient on load
    checkOrientation();

    // listen for orient change
    window.addEventListener('orientationchange', checkOrientation);

    // listen for resize
    window.addEventListener('resize', checkOrientation);

    // photo paths
    const groupPhotos = [
        'photo1.webp',
        'photo2.webp',
        'photo3.webp',
        'photo5.webp',
        'photo6.webp',
        'photo7.webp',
        'photo8.webp',
        'photo9.webp',
        'photo10.webp',
        'photo11.webp',
        // убрал коммент
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

        // set bg with blur img
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

    // start slideshow on load
    showSlide(slideIndex);
    startSlideshow();

    // modal for img zoom
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal .close');

    // open modal on img click
    slideshowImage.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = slideshowImage.src;
    });

    // close modal on close btn
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // close modal if click outside img
    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // students array
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
            photo: '/images/student4.webp',
            name: 'Владислава Пучинська',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student5.webp',
            name: 'Андрій Іванов',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student6.webp',
            name: 'Дарія Фесенко',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student7.webp',
            name: 'Ігор Косаківський',
            phrase: '"Мечтай и достигай!"'
        },
         {
            photo: '/images/student8.webp',
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
            photo: '/images/student15.webp',
            name: 'Марія Мироненко',
            phrase: '"Мечтай и достигай!"'
        },
        {
            photo: '/images/student16.webp',
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
            photo: '/images/student20.webp',
            name: 'Марго Бондар',
            phrase: '"Мечтай и достигай!"'
        },
         {
            photo: '/images/student21.webp',
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
            photo: '/images/student25.webp',
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

    // update display func
    function updateDisplay(direction) {
        if (!centralCard || !leftCard || !rightCard) {
            return;
        }

        // add anim class
        if (direction === 'left') {
            centralCard.classList.add('blur-out-right');
        } else if (direction === 'right') {
            centralCard.classList.add('blur-out-left');
        }

        // wait for anim then update
        setTimeout(() => {
            // update central card
            const frontImg = centralCard.querySelector('.front .photo img');
            frontImg.src = `${students[currentIndex].photo}`;
            const nameDiv = centralCard.querySelector('.overlay .name');
            nameDiv.textContent = students[currentIndex].name;
            const phraseDiv = centralCard.querySelector('.back .phrase');
            phraseDiv.textContent = students[currentIndex].phrase;

            // reset flip
            if (centralCard.classList.contains('flip')) {
                centralCard.classList.remove('flip');
            }

            // remove old anim classes & add new ones
            centralCard.classList.remove('blur-out-left', 'blur-out-right');
            if (direction === 'left') {
                centralCard.classList.add('blur-in-left');
            } else if (direction === 'right') {
                centralCard.classList.add('blur-in-right');
            }

            // update side cards
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

            // remove anim in classes after
            setTimeout(() => {
                centralCard.classList.remove('blur-in-left', 'blur-in-right');
            }, 500);
        }, 500);
    }

    // click handlers for side cards
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

    // init display
    updateDisplay();

    // handler for back to slideshow btn
    const backToSlideshowBtn = document.getElementById('back-to-slideshow-btn');
    const scrollContainer = document.querySelector('.scroll-container');
    const slideshowSection = document.querySelectorAll('.section')[1]; // second section is slideshow
    const portraitSection = document.querySelectorAll('.section')[2]; // third section - portraits

    let portraitSectionTop = portraitSection.offsetTop;
    let portraitSectionBottom = portraitSection.offsetTop + portraitSection.offsetHeight;

    // update positions on load
    window.addEventListener('load', () => {
        portraitSectionTop = portraitSection.offsetTop;
        portraitSectionBottom = portraitSection.offsetTop + portraitSection.offsetHeight;
    });

    // scroll handler
    scrollContainer.addEventListener('scroll', () => {
        const scrollPosition = scrollContainer.scrollTop;

        // debug: log pos
        console.log(`scrollPosition: ${scrollPosition}, portraitSectionTop: ${portraitSectionTop}, portraitSectionBottom: ${portraitSectionBottom}`);

        // show btn if in portraits section
        if (scrollPosition >= portraitSectionTop - 10 && scrollPosition <= portraitSectionBottom + 10) { // some margin
            backToSlideshowBtn.style.display = 'flex';
        } else {
            backToSlideshowBtn.style.display = 'none';
        }
    });

    // scroll to slideshow on btn click
    backToSlideshowBtn.addEventListener('click', () => {
        scrollContainer.scrollTo({
            top: slideshowSection.offsetTop,
            behavior: 'smooth'
        });
    });
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    // toggle fullscreen func
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            // enter fullscreen
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Ошибка при переходе в полноэкранный режим: ${err.message} (${err.name})`);
            });
        } else {
            // exit fullscreen
            document.exitFullscreen();
        }
    }

    // btn click handler
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // update btn icon on fullscreen change
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>'; // compress icon
        } else {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>'; // expand icon
        }
    });
     const fullscreenPopup = document.getElementById('fullscreen-popup');
    const closePopup = document.querySelector('.close-popup');
    const enterFullscreenBtn = document.getElementById('enter-fullscreen');

    // show popup
    function showFullscreenPopup() {
        fullscreenPopup.classList.add('active');
    }

    // hide popup
    function hideFullscreenPopup() {
        fullscreenPopup.classList.remove('active');
    }

    // show popup after 3 sec
    setTimeout(showFullscreenPopup, 3000);

    // close popup on btn
    closePopup.addEventListener('click', hideFullscreenPopup);

    // enter fullscreen on btn
    enterFullscreenBtn.addEventListener('click', () => {
        toggleFullscreen();
        hideFullscreenPopup();
    });

    // toggle fullscreen again (redundant but kept)
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Помилка при переході в повноекранний режим: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

});
