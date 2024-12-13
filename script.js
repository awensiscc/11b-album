document.addEventListener('DOMContentLoaded', () => {
    // func dlya cheko orient dev
    function checkOrientation() {
        const rotateMessage = document.getElementById('rotate-message');
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;

        if (isPortrait) {
            // if vert, show msg & block scroll
            rotateMessage.style.display = 'flex';
            document.body.classList.add('orientation-locked');
        } else {
            // else horiz, hide msg & unblock scroll
            rotateMessage.style.display = 'none';
            document.body.classList.remove('orientation-locked');
        }
    }

    // check orient on load
    checkOrientation();

    // listen orient change
    window.addEventListener('orientationchange', checkOrientation);

    // listen resize window
    window.addEventListener('resize', checkOrientation);

    // arr photos low & high quality
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
        { low: 'photo21.webp', high: 'photo21.jpg' },
        { low: 'photo22.webp', high: 'photo22.jpg' },
        { low: 'photo23.webp', high: 'photo23.jpg' },
        { low: 'photo13.webp', high: 'photo13.jpg' },
        { low: 'photo16.webp', high: 'photo16.jpg' },
        { low: 'photo14.webp', high: 'photo14.jpg' },
        { low: 'photo15.webp', high: 'photo15.jpg' },
        { low: 'photo17.webp', high: 'photo17.jpg' },
        { low: 'photo19.webp', high: 'photo19.jpg' },
        { low: 'photo20.webp', high: 'photo20.jpg' },
        { low: 'vesna_last.webp', high: 'vesna_last.jpg' },
        { low: 'osen_horiz_1.webp', high: 'osen_horiz_1.jpg' },
        { low: 'osen_horiz_2.webp', high: 'osen_horiz_2.jpg' },
        { low: 'osen_horiz_3.webp', high: 'osen_horiz_3.jpg' },
        { low: 'osen_horiz_4.webp', high: 'osen_horiz_4.jpg' },
        { low: 'osen_horiz_5.webp', high: 'osen_horiz_5.jpg' },
        { low: 'osen_horiz_6.webp', high: 'osen_horiz_6.jpg' },
        { low: 'osen_horiz_7.webp', high: 'osen_horiz_7.jpg' },
        { low: 'osen_horiz_8.webp', high: 'osen_horiz_8.jpg' },
        { low: 'osen_horiz_9.webp', high: 'osen_horiz_9.jpg' },
        { low: 'osen_horiz_10.webp', high: 'osen_horiz_10.jpg' },
        { low: 'osen_horiz_11.webp', high: 'osen_horiz_11.jpg' },
        { low: 'osen_horiz_12.webp', high: 'osen_horiz_12.jpg' },
        { low: 'osen_horiz_13.webp', high: 'osen_horiz_13.jpg' },
        { low: 'osen_horiz_14.webp', high: 'osen_horiz_14.jpg' },
        { low: 'osen_vert_1.webp', high: 'osen_vert_1.jpg' },
        { low: 'osen_vert_2.webp', high: 'osen_vert_2.jpg' },
        { low: 'osen_vert_3.webp', high: 'osen_vert_3.jpg' },
        { low: 'osen_vert_4.webp', high: 'osen_vert_4.jpg' },
        { low: 'osen_vert5.webp', high: 'osen_vert5.jpg' },
        { low: 'osen_vert6.webp', high: 'osen_vert6.jpg' },
        { low: 'osen_vert7.webp', high: 'osen_vert7.jpg' },
        { low: 'osen_vert_8.webp', high: 'osen_vert_8.jpg' },
        { low: 'osen_vert_9.webp', high: 'osen_vert_9.jpg' },
        { low: 'osen_horiz_last.webp', high: 'osen_horiz_last.jpg' },
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

        // low quality first
        slideshowImage.src = `/group_photos/${currentPhoto.low}`;
        slideshowBackground.style.backgroundImage = `url('/group_photos/${currentPhoto.low}')`;

        // preload high quality
        const highResImage = new Image();
        highResImage.src = `/group_photos/${currentPhoto.high}`;
        highResImage.onload = () => {
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

    // start slideshow
    showSlide(slideIndex);
    startSlideshow();

    // modal for enlarge
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal .close');

    slideshowImage.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = slideshowImage.src;
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // arr students
    const students = [
        {
            photoLow: '/images/student1.webp',
            photoHigh: '/images/student1.jpg',
            name: 'Микита Дорошенко',
            phrase: '" qer 3301 qeweff the fddsteg biggest ffddsrwr puzzle fdsgfggfg in fds12gew da dfs6weg wrld eww1ew? who is next?🌊 "'
        },
        {
            photoLow: '/images/student2.webp',
            photoHigh: '/images/student2.jpg',
            name: 'Микита Тельчаров',
            phrase: '" ACHT🎩 "'
        },
        {
            photoLow: '/images/student3.webp',
            photoHigh: '/images/student3.jpg',
            name: 'Надія Шукалюк',
            phrase: '" Фан встреча Nadiiii "'
        },
        {
            photoLow: '/images/student4.webp',
            photoHigh: '/images/student4.webp',
            name: 'Владислава Пучинська',
            phrase: '" Пучік-Шукік-Шукалік "'
        },
        {
            photoLow: '/images/student5.webp',
            photoHigh: '/images/student5.webp',
            name: 'Андрій Іванов',
            phrase: '" Все буде добре, для кожного з нас. "'
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
    ];

    let currentIndex = 0;

    const centralCard = document.getElementById('central-card');
    if (!centralCard) {
        console.error('centralCard not found');
        return;
    }
    const leftCard = document.querySelector('.left-card');
    const rightCard = document.querySelector('.right-card');

    const hint = centralCard.querySelector('.hint');
    if (!hint) {
        console.error('hint not found in centralCard');
        return;
    }

    let hintShown = localStorage.getItem('cardHintShown');

    if (hintShown) {
        hint.style.display = 'none';
    } else {
        hint.style.display = 'flex';
    }

    function flipCard() {
        if (students[currentIndex].phrase && students[currentIndex].phrase.trim() !== '') {
            centralCard.classList.toggle('flip');
            if (hint && hint.style.display !== 'none') {
                hint.style.display = 'none';
                localStorage.setItem('cardHintShown', 'true');
            }
        }
    }

    centralCard.addEventListener('click', flipCard);
    if (hint) {
        hint.addEventListener('click', flipCard);
    }

    function updateDisplay(direction = null) {
        if (!centralCard || !leftCard || !rightCard) {
            return;
        }

        if (direction === 'left') {
            centralCard.classList.add('blur-out-right');
        } else if (direction === 'right') {
            centralCard.classList.add('blur-out-left');
        }

        const updateContent = () => {
            const frontImg = centralCard.querySelector('.front .photo img');
            const nameDiv = centralCard.querySelector('.overlay .name');
            const phraseDiv = centralCard.querySelector('.back .phrase');

            frontImg.src = `${students[currentIndex].photoLow}`;
            const highResImage = new Image();
            highResImage.src = `${students[currentIndex].photoHigh}`;
            highResImage.onload = () => {
                frontImg.src = `${students[currentIndex].photoHigh}`;
            };

            nameDiv.textContent = students[currentIndex].name;
            phraseDiv.textContent = students[currentIndex].phrase || '';

            if (centralCard.classList.contains('flip')) {
                centralCard.classList.remove('flip');
            }

            centralCard.classList.remove('blur-out-left', 'blur-out-right');
            if (direction === 'left') {
                centralCard.classList.add('blur-in-left');
            } else if (direction === 'right') {
                centralCard.classList.add('blur-in-right');
            }

            if (students[currentIndex].phrase && students[currentIndex].phrase.trim() !== '') {
                let hintShown = localStorage.getItem('cardHintShown');
                if (!hintShown) {
                    hint.style.display = 'flex';
                } else {
                    hint.style.display = 'none';
                }
                centralCard.style.cursor = 'pointer';
            } else {
                hint.style.display = 'none';
                centralCard.style.cursor = 'default';
            }

            if (currentIndex > 0) {
                leftCard.style.display = 'block';
                const leftImg = leftCard.querySelector('img');
                leftImg.src = `${students[currentIndex - 1].photoLow}`;

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

                const rightHighResImage = new Image();
                rightHighResImage.src = `${students[currentIndex + 1].photoHigh}`;
                rightHighResImage.onload = () => {
                    rightImg.src = `${students[currentIndex + 1].photoHigh}`;
                };
            } else {
                rightCard.style.display = 'none';
            }

            if (direction) {
                setTimeout(() => {
                    centralCard.classList.remove('blur-in-left', 'blur-in-right');
                }, 500);
            }
        };

        if (direction) {
            setTimeout(updateContent, 500);
        } else {
            updateContent();
        }
    }

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

    updateDisplay();

    const backToSlideshowBtn = document.getElementById('back-to-slideshow-btn');
    const scrollContainer = document.querySelector('.scroll-container');
    const sections = document.querySelectorAll('.section');
    const slideshowSection = sections[1];
    const portraitSection = sections[2];

    let portraitSectionTop = portraitSection.offsetTop;
    let portraitSectionBottom = portraitSection.offsetTop + portraitSection.offsetHeight;

    window.addEventListener('load', () => {
        portraitSectionTop = portraitSection.offsetTop;
        portraitSectionBottom = portraitSection.offsetTop + portraitSection.offsetHeight;
    });

    scrollContainer.addEventListener('scroll', () => {
        const scrollPosition = scrollContainer.scrollTop;

        // show btn if in portrait zone
        if (scrollPosition >= portraitSectionTop - 10 && scrollPosition <= portraitSectionBottom + 10) {
            backToSlideshowBtn.style.display = 'flex';
        } else {
            backToSlideshowBtn.style.display = 'none';
        }
    });

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

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Ошибка при переходе в полноэкранный режим: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    enterFullscreenBtn.addEventListener('click', () => {
        toggleFullscreen();
        hideFullscreenPopup();
    });

    fullscreenBtn.addEventListener('click', toggleFullscreen);

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    function showFullscreenPopup() {
        fullscreenPopup.classList.add('active');
    }

    function hideFullscreenPopup() {
        fullscreenPopup.classList.remove('active');
    }

    function isIOS() {
        const ua = window.navigator.userAgent;
        const iOS = /iPad|iPhone|iPod/.test(ua);
        const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
        return iOS || isSafari;
    }

    if (isIOS()) {
        fullscreenBtn.style.display = 'none';
        fullscreenPopup.style.display = 'none';
    } else {
        if (!localStorage.getItem('hideFullscreenPopup')) {
            setTimeout(showFullscreenPopup, 3000);
        }
    }

    closePopup.addEventListener('click', () => {
        popupContent.style.display = 'none';
        popupConfirmationContent.style.display = 'flex';
    });

    confirmHidePopupBtn.addEventListener('click', () => {
        localStorage.setItem('hideFullscreenPopup', 'true');
        hideFullscreenPopup();
    });

    cancelHidePopupBtn.addEventListener('click', () => {
        popupConfirmationContent.style.display = 'none';
        hideFullscreenPopup();
    });

    const slideHint = document.getElementById('slide-hint');
    let hintHidden = localStorage.getItem('hintHidden');

    // if hint not hidden before, show
    if (!hintHidden && slideHint) {
        slideHint.style.display = 'flex';
    } else if (slideHint) {
        slideHint.style.display = 'none';
    }

    const thirdSection = sections[2];
    let thirdSectionTop = thirdSection.offsetTop;

    window.addEventListener('load', () => {
        thirdSectionTop = thirdSection.offsetTop;
    });

    // track scroll
    scrollContainer.addEventListener('scroll', () => {
        const scrollPosition = scrollContainer.scrollTop;
        const viewportHeight = scrollContainer.clientHeight;

        // if user reach 3rd section (portrait)
        // or end scroll, hide hint forever
        if (!hintHidden && slideHint) {
            if ((scrollPosition + viewportHeight >= thirdSectionTop) ||
                (scrollPosition + viewportHeight >= scrollContainer.scrollHeight)) {
                slideHint.style.display = 'none';
                localStorage.setItem('hintHidden', 'true');
                hintHidden = 'true';
            } else {
                // else, if not reach 3rd sect & hint not hidden
                if (!hintHidden) {
                    slideHint.style.display = 'flex';
                }
            }
        }
    });

});
